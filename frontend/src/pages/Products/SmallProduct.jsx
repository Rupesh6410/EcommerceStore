import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      {/* Product Image */}
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover transition-transform duration-200 hover:scale-105"
        />
    <HeartIcon product={product} />
      </div>

      {/* Product Info */}
      <div className="p-4 relative">
        <Link to={`/product/${product._id}`} className="hover:text-orange-500 transition-colors">
          <h2 className="text-sm font-semibold text-gray-800 absolute bottom-2 right-2">
            {product.name}
          </h2>
        </Link>
        
        {/* Price with Background */}
        <span className="bg-orange-500 text-white text-sm font-medium px-2 py-1 rounded absolute bottom- left-2">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default SmallProduct;

