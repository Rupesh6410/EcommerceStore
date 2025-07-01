import React from 'react';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slideToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full md:w-[50%] lg:w-[40%] mx-auto mt-8 relative">
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
              <div
                key={_id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  {/* Name and Price */}
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-bold text-gray-800">{name}</h2>
                    <p className="text-sm font-semibold text-orange-500">
                      ${price}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3">
                    {description.substring(0, 80)}...
                  </p>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    <div className="flex items-center space-x-1">
                      <FaStore className="text-orange-500" />
                      <span>{brand}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaClock className="text-orange-500" />
                      <span>{moment(createdAt).fromNow()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-500" />
                      <span>{Math.round(rating)} / 5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaShoppingCart className="text-green-500" />
                      <span>Qty: {quantity}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaBox className="text-blue-500" />
                      <span>Stock: {countInStock}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
