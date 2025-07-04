import { useEffect, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = useMemo(
    () => favorites.some((p) => p._id === product._id),
    [favorites, product._id]
  );

  useEffect(() => {
    if (favorites.length === 0) {
      const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
      dispatch(setFavorites(favoritesFromLocalStorage));
    }
  }, [dispatch, favorites.length]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-pink-600" />
      )}
    </div>
  );
};

export default HeartIcon;
