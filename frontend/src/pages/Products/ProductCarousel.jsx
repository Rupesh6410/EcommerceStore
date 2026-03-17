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
import { IMAGE_BASE_URL } from '../../redux/constants';

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
    <div className="w-full relative group">
      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">Loading...</div>
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="rounded-3xl overflow-hidden">
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
              <div key={_id} className="relative w-full h-[400px] lg:h-[500px] outline-none">
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Background Image Setup */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={`${IMAGE_BASE_URL}${image}`}
                    alt={name}
                    className="w-full h-full object-cover opacity-30 blur-sm scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center container mx-auto px-6 lg:px-12">

                  {/* Left content: Information */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center h-full pt-10 md:pt-0">
                    <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
                      {brand} • Top Rated
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight drop-shadow-lg">
                      {name}
                    </h2>
                    <p className="text-gray-300 mb-6 line-clamp-2 md:line-clamp-3 max-w-lg text-lg">
                      {description}
                    </p>
                    <div className="flex items-center gap-6 mb-8">
                      <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        ${price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 max-w-md">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-primary" />
                        <span>{moment(createdAt).fromNow()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-primary" />
                        <span>{Math.round(rating)} / 5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaShoppingCart className="text-primary" />
                        <span>Sold: {quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBox className="text-primary" />
                        <span>Stock: {countInStock}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={`/product/${_id}`}
                        className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-full text-lg shadow-primary/40 hover:shadow-primary/60"
                      >
                        Buy Now <span className="text-xl">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right content: Product Image */}
                  <div className="hidden md:flex w-1/2 h-full items-center justify-center p-8 relative">
                    {/* Glowing background behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 blur-[60px] rounded-full pointer-events-none"></div>

                    <img
                      src={`${IMAGE_BASE_URL}${image}`}
                      alt={name}
                      className="w-full max-h-[90%] object-contain drop-shadow-2xl relative z-10 transition-transform duration-700 hover:scale-105"
                    />
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
