import { IMAGE_BASE_URL } from '../../redux/constants';
import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="relative bg-white rounded-xl shadow-md p-3 w-48 sm:w-52 md:w-56 hover:shadow-lg transition-all duration-300">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <img
            src={`${IMAGE_BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
          <HeartIcon product={product} />
        </div>

        <div className="mt-3">
          <h2 className="text-sm font-medium text-gray-800 truncate">{product.name}</h2>
          <div className="text-pink-600 font-semibold mt-1">${product.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
