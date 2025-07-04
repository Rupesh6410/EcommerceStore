import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice';
import Product from './Product';

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem] px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Favorite Products</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite products added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
