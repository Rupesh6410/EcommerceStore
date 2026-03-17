import { IMAGE_BASE_URL } from '../../redux/constants';
import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
  return (
    <div className="w-[18rem] sm:w-[20rem] glass-card rounded-3xl flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] hover:border-primary/30 group">
      <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        </Link>
        <div className="absolute top-4 right-4 z-20">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between relative z-20 -mt-8">
        <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl transform transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/30">
          <Link to={`/product/${product._id}`}>
            <h2 className="text-lg font-semibold text-white hover:text-primary transition-colors line-clamp-2 leading-snug mb-3 font-heading">
              {product.name}
            </h2>
          </Link>
          <div className="flex items-center justify-between mt-4">
            <span className="text-primary font-bold text-xl tracking-tight">
              ${product.price}
            </span>
            <Link
              to={`/product/${product._id}`}
              className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-primary/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
