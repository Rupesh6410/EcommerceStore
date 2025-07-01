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
    <div className="container mx-auto bg-white p-5 rounded-lg shadow-md ml-5">
      <div className="flex md:flex-row">
        <div className="bg-gray-100 p-4 w-1/4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 text-center pb-3 border-b">Filter by Categories</h2>
          <div className="p-3">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="mr-2 h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <label className="text-gray-700">{c.name}</label>
              </div>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold text-gray-700 text-center pb-3 border-b">Filter by Brands</h2>
          <div className="p-3">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2 flex items-center">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="mr-2 h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <label className="text-gray-700">{brand}</label>
              </div>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold text-gray-700 text-center pb-3 border-b">Filter by Price</h2>
          <div className="p-3">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>
          
          <div className="p-3">
            <button
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-4 w-3/4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{products?.length} Products</h2>
          <div className="flex flex-wrap">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div className="p-3 w-1/3" key={p._id}>
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
