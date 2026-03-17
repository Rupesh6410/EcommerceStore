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
    <div className="py-8 relative">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white tracking-tight flex items-center">
            <span className="text-4xl mr-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">🔥</span>
            Top Picks for You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up justify-items-center">
          {data?.map((product) => (
            <div key={product._id} className="w-full flex justify-center">
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-7xl mx-auto px-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-effect rounded-3xl p-4 md:p-8 border border-white/5">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;

