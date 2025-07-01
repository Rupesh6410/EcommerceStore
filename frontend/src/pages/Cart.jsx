import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";

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
    <>
      <div className="container mx-auto mt-8 px-4 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
            <Link
              to="/shop"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              Go Back to Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 ml-8">
              {/* Left Section: Cart Items */}
              <div className="md:col-span-2 space-y-6">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 ml-4">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500">{item.brand}</div>
                      <div className="text-lg text-gray-700">${item.price}</div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="w-24">
                      <select
                        className="w-full p-1 border rounded text-gray-700"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Section: Summary & Checkout */}
              <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between text-lg mb-2">
                  <span>Items:</span>
                  <span>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg mb-4">
                  <span>Total:</span>
                  <span>
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.price * item.qty, 0)
                      .toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                
                <button
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition ${
                    cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  
                >
                  Proceed to Checkout
                </button>
                

                {/* Back to Shop Link */}
                <Link
                  to="/shop"
                  className="block mt-4 text-center text-blue-500 hover:text-blue-700 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

