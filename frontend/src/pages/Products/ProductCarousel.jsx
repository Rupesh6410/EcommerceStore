import React from 'react';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from 'react-icons/fa';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slideToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full md:w-[50%] lg:w-[40%] mx-auto mt-8">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <Link to={`/product/${_id}`} key={_id}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
                  {/* Image */}
                  <div className="h-[16rem] overflow-hidden relative">
                    <img
                      src={image}
                      alt={name || 'Product'}
                      className="w-full h-[16rem] object-contain transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow">
                      Top Rated
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-sm font-bold text-gray-800 truncate">{name}</h2>
                      <p className="text-sm font-semibold text-pink-600">${price}</p>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                      {description?.substring(0, 80)}...
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-1">
                        <FaStore className="text-pink-500" aria-hidden />
                        <span>{brand}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-orange-500" aria-hidden />
                        <span>{moment(createdAt).fromNow()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-500" aria-hidden />
                        <span>{Math.round(rating)} / 5</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaShoppingCart className="text-green-500" aria-hidden />
                        <span>Qty: {quantity}</span>
                      </div>
                      <div className="flex items-center space-x-1 col-span-2">
                        <FaBox className="text-blue-500" aria-hidden />
                        <span>Stock: {countInStock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
