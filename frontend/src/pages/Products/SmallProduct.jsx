import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';
import { IMAGE_BASE_URL } from '../../redux/constants';

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[16rem] h-[20rem] bg-white rounded-lg shadow hover:shadow-lg transition duration-300 relative">
      
      {/* Product Image */}
      <div className="w-full h-[16rem] overflow-hidden rounded-t-lg relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <Link to={`/product/${product._id}`} className="block mb-2">
          <h2 className="text-sm font-semibold text-gray-800 hover:text-orange-500">
            {product.name}
          </h2>
        </Link>

        <span className="inline-block bg-orange-500 text-white text-sm font-medium px-2 py-1 rounded">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default SmallProduct;
