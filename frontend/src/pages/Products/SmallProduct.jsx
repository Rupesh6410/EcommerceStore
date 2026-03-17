import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';
import { IMAGE_BASE_URL } from '../../redux/constants';

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[16rem] h-[22rem] glass-card rounded-3xl group flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] hover:border-primary/30">

      {/* Product Image */}
      <div className="w-full h-[15rem] overflow-hidden rounded-t-3xl relative">
        <Link to={`/product/${product._id}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 right-3 z-20">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-20 -mt-6 bg-gradient-to-b from-transparent to-card/90">
        <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-lg transform transition-transform duration-500">
          <Link to={`/product/${product._id}`} className="block mb-2">
            <h2 className="text-[15px] font-semibold text-gray-200 hover:text-white transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h2>
          </Link>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-lg tracking-tight">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
