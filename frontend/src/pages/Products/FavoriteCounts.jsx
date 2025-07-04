import React from 'react';
import { useSelector } from 'react-redux';

const FavoriteCounts = () => {
  const favorites = useSelector((state) => state.favorites || []);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full shadow-md">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoriteCounts;
