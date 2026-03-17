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
    <div className="relative w-full max-w-sm glass-card rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] hover:border-primary/30 overflow-hidden group flex flex-col">
      {/* Product Image + Brand */}
      <div className="relative h-60 w-full overflow-hidden rounded-t-3xl">
        <Link to={`/product/${p._id}`} className="block w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
          <img
            src={`${IMAGE_BASE_URL}${p.image}`}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <span className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-md text-white border border-secondary/50 text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
            {p?.brand}
          </span>
        </Link>
        <div className="absolute top-4 right-4 z-20">
          <HeartIcon product={p} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-20 -mt-6 bg-gradient-to-b from-transparent to-card/90">
        <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl transform transition-transform duration-500 hover:-translate-y-1">
          <div className="flex justify-between items-start mb-3 gap-3">
            <h5 className="text-xl font-heading font-semibold text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              <Link to={`/product/${p._id}`}>{p.name}</Link>
            </h5>
            <span className="text-primary font-extrabold whitespace-nowrap bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 text-lg">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
            {p?.description}
          </p>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-auto gap-4">
            <Link
              to={`/product/${p._id}`}
              className="text-sm font-bold text-white btn-secondary flex-1 text-center py-3"
            >
              Read More
            </Link>

            <button
              onClick={() => addToCartHandler(p, 1)}
              aria-label="Add to Cart"
              className="text-white hover:text-white p-3 rounded-xl bg-primary/20 hover:bg-primary border border-primary/30 transition-all duration-300 group/btn shadow-lg hover:shadow-primary/40 focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <AiOutlineShoppingCart size={24} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
