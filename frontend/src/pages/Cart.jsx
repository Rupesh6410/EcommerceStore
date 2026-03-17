import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";
import { IMAGE_BASE_URL } from "../../src/redux/constants.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20 text-gray-200">
      {cartItems.length === 0 ? (
        <div className="glass-effect rounded-3xl p-12 text-center max-w-2xl mx-auto mt-12 animate-fade-in border border-white/5">
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/5 text-gray-400">
            <FaShoppingCart size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Shopping <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 relative">
          {/* Left Section: Cart Items */}
          <div className="lg:col-span-8 space-y-6 animate-slide-up">
            <h1 className="text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-3 drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]"></span>
              Shopping Cart
            </h1>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 border border-white/10 transition-all duration-300 hover:border-primary/30 group hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.2)]"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-28 h-32 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-lg">
                    <img
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Product Details & Actions */}
                  <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-heading font-semibold text-white hover:text-primary transition-colors line-clamp-2 leading-tight mb-2"
                      >
                        {item.name}
                      </Link>
                      <div className="inline-block bg-secondary/20 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-md mb-2 border border-secondary/30">
                        {item.brand}
                      </div>
                      <div className="text-xl font-extrabold text-primary">${item.price}</div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end border-t border-white/10 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                      {/* Quantity Selector */}
                      <div className="relative">
                        <select
                          className="appearance-none bg-card/60 border border-white/10 text-white py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium cursor-pointer transition-all hover:bg-card/80"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1} className="bg-card">
                              Qty: {x + 1}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-gray-400 hover:text-red-500 p-2.5 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all shadow-sm"
                        aria-label="Remove item"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Summary & Checkout */}
          <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-3xl p-6 lg:p-8 lg:sticky lg:top-28 border border-white/10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)]">
              <h2 className="text-2xl font-heading font-extrabold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                <span className="w-1.5 h-6 bg-indigo-400 rounded-full mr-3"></span>
                Order Summary
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-300 font-medium">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span className="text-white">
                    ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300 font-medium">
                  <span>Shipping</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-300 font-medium pb-5 border-b border-white/10">
                  <span>Taxes</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center text-xl mt-2">
                  <span className="font-extrabold text-white">Total</span>
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className={`w-full py-4 px-6 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${cartItems.length === 0
                  ? "bg-card/50 border border-white/10 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 border border-primary/50 hover:border-primary"
                  }`}
              >
                Proceed to Checkout
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>

              {/* Back to Shop Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/shop"
                  className="text-sm font-medium text-gray-400 hover:text-primary transition-colors inline-block pb-1 border-b border-transparent hover:border-primary/50"
                >
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
