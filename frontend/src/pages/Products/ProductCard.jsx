import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { IMAGE_BASE_URL } from "../../redux/constants";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="relative max-w-xs bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Product Image + Brand */}
      <div className="relative">
        <Link to={`/product/${p._id}`}>
          <img
            src={`${IMAGE_BASE_URL}/${p.image}`}
            alt={p.name}
            className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
          />
          <span className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">
            {p?.brand}
          </span>
        </Link>
        <HeartIcon product={p} />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-md font-semibold text-black truncate w-[70%]">{p.name}</h5>
          <span className="text-pink-500 font-bold">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {p?.description?.length > 60
            ? p.description.substring(0, 60) + "..."
            : p.description}
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="text-sm text-white bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md"
          >
            Read More
          </Link>

          <button
            onClick={() => addToCartHandler(p, 1)}
            aria-label="Add to Cart"
            className="text-pink-600 hover:text-pink-800 p-2 rounded-full bg-pink-50"
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
