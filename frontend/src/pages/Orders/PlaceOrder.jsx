import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressStep from "../../components/ProgressStep";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Order placement failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 mb-20 text-gray-200">
      <ProgressStep step1 step2 step3 />

      <div className="grid lg:grid-cols-12 gap-8 mt-8">
        {/* Left Section: Cart Items */}
        <div className="lg:col-span-8 space-y-8 animate-slide-up">
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-heading font-extrabold text-white mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                Order Items
              </h2>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                      <th className="pb-4 font-medium pl-2">Product</th>
                      <th className="pb-4 font-medium">Qty</th>
                      <th className="pb-4 font-medium">Price</th>
                      <th className="pb-4 font-medium pr-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cart.cartItems.map((item, index) => (
                      <tr key={index} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-4">
                            <img
                              src={`${import.meta.env.VITE_IMAGE_BASE_URL || ''}${item.image}`}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-white/10"
                            />
                            <Link
                              to={`/product/${item.product}`}
                              className="text-white font-medium hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 text-gray-300 font-medium">{item.qty}</td>
                        <td className="py-4 text-gray-300 font-medium">${item.price.toFixed(2)}</td>
                        <td className="py-4 pr-2 text-right font-bold text-white">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card rounded-3xl p-6 lg:p-8 lg:sticky lg:top-28 border border-white/10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-heading font-extrabold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
              <span className="w-1.5 h-6 bg-secondary rounded-full mr-3"></span>
              Order Summary
            </h2>

            <div className="space-y-6 mb-8">
              {/* Shipping Info */}
              <div className="bg-card/40 rounded-2xl p-4 border border-white/5">
                <h3 className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Shipping To</h3>
                <p className="text-gray-200 leading-relaxed font-medium">
                  {cart.shippingAddress.address}<br />
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}<br />
                  {cart.shippingAddress.country}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-card/40 rounded-2xl p-4 border border-white/5">
                <h3 className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Payment Method</h3>
                <p className="text-gray-200 font-medium">
                  {cart.paymentMethod}
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-300 font-medium">
                  <span>Items</span>
                  <span className="text-white">${cart.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 font-medium">
                  <span>Shipping</span>
                  <span className="text-white">${cart.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 font-medium pb-4 border-b border-white/10">
                  <span>Tax</span>
                  <span className="text-white">${cart.taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl mt-2">
                  <span className="font-extrabold text-white">Total</span>
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6">
                <Message variant="error">
                  {error?.data?.message || "Something went wrong"}
                </Message>
              </div>
            )}

            {/* Place Order Button */}
            <button
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className={`w-full py-4 px-6 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${cart.cartItems.length === 0 || isLoading
                  ? "bg-card/50 border border-white/10 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 border border-primary/50 hover:border-primary"
                }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <>
                  Place Order
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

