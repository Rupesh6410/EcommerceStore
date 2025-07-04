import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import { IMAGE_BASE_URL } from "../../redux/constants";


const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({...product , qty}));
    navigate("/cart");
  };

  return (
    <>
      <div className="p-4 bg-white min-h-screen">
        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline ml-10"
        >
          ← Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-wrap items-start justify-center mt-8 gap-8">
            <div className="w-full lg:w-2/5">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={`${IMAGE_BASE_URL}/${product.image}`}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute top-4 right-4">
                  <HeartIcon product={product} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 bg-gray-100 p-6 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <p className="text-4xl font-extrabold text-blue-600 mb-4">
                $ {product.price}
              </p>

              <div className="flex flex-wrap justify-between mb-6 text-gray-700">
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-blue-600" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaClock className="mr-2 text-blue-600" /> Added: {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-blue-600" /> Reviews: {product.numReviews}
                  </h1>
                </div>
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-blue-600" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-blue-600" /> Quantity: {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-blue-600" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`w-full py-3 px-6 text-lg font-bold text-white rounded-lg shadow-lg transition duration-300 ${
                  product.countInStock === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Add To Cart
              </button>
            </div>

            <div className="w-full lg:w-3/5 mt-8">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
