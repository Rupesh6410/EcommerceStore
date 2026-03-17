import React from 'react';
import { useGetTopProductsQuery } from './../redux/api/productApiSlice';
import Loader from './Loader';
import SmallProduct from '../pages/Products/SmallProduct';
import ProductCarousel from '../pages/Products/ProductCarousel';

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1 className="text-red-500 text-center mt-5">{error.message || 'Something went wrong!'}</h1>;

  return (
    <div className="bg-background py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-800 mb-4">🔥 Top Picks for You</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-4 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
            >
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
