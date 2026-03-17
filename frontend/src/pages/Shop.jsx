import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20 text-gray-200">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 md:sticky md:top-28 h-fit space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-heading font-bold text-white mb-5 flex items-center">
              <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
              Categories
            </h2>
            <div className="space-y-4">
              {categories?.map((c) => (
                <label key={c._id} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded bg-card/50 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-heading font-bold text-white mb-5 flex items-center">
              <span className="w-1.5 h-6 bg-secondary rounded-full mr-3"></span>
              Brands
            </h2>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {uniqueBrands?.map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                    <input
                      type="radio"
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-full bg-card/50 checked:border-secondary transition-all cursor-pointer"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-secondary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium block truncate">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10">
            <h2 className="text-xl font-heading font-bold text-white mb-5 flex items-center">
              <span className="w-1.5 h-6 bg-indigo-400 rounded-full mr-3"></span>
              Price
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 font-bold">$</span>
              </div>
              <input
                type="text"
                placeholder="0.00"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full pl-8 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-600 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              className="w-full btn-secondary py-3.5 text-lg font-bold shadow-lg rounded-xl flex justify-center items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 animate-fade-in flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-3"></span>
            {products?.length} Products Found
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {products.length === 0 ? (
              <div className="col-span-full flex justify-center py-12"><Loader /></div>
            ) : (
              products?.map((p) => (
                <div className="flex justify-center" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;
