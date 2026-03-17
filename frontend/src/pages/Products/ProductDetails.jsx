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
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-primary font-medium transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Go Back
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64"><Loader /></div>
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 animate-fade-in relative">

          {/* Left Column - Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/5 glass-effect group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                <img
                  src={`${IMAGE_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                />
                <div className="absolute top-4 right-4 z-20">
                  <HeartIcon product={product} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-8">
            <div className="mb-2">
              <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.brand}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-card/50 px-4 py-2 rounded-xl border border-white/5">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ${product.price}
              </p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 border-b border-white/10 pb-10">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 text-primary">
                  <FaClock size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Added</p>
                  <p className="font-semibold text-white">{moment(product.createAt).fromNow()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 text-primary">
                  <FaBox size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">In Stock</p>
                  <p className="font-semibold text-white">{product.countInStock}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 text-primary">
                  <FaShoppingCart size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Quantity Sold</p>
                  <p className="font-semibold text-white">{product.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/5 text-primary">
                  <FaStar size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Ratings</p>
                  <p className="font-semibold text-white">{rating || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 border border-white/10 mt-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {product.countInStock > 0 && (
                  <div className="w-full sm:w-1/3 relative">
                    <label className="text-xs text-gray-400 mb-1 block">Quantity</label>
                    <div className="relative">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="w-full appearance-none bg-card/80 border border-white/10 text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1} className="bg-card">
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`w-full ${product.countInStock > 0 ? 'sm:w-2/3 mt-5' : 'mt-0'} py-4 px-6 text-lg font-bold rounded-xl transition-all duration-300 flex justify-center items-center shadow-lg ${product.countInStock === 0
                    ? "bg-card border border-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary text-white hover:shadow-primary/50 hover:-translate-y-1"
                    }`}
                >
                  {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-20 w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="glass-effect rounded-3xl p-6 sm:p-10 border border-white/5">
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
  );
};

export default ProductDetails;
