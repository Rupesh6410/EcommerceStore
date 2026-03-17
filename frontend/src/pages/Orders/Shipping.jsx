import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressStep from "../../components/ProgressStep";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 mb-20 text-gray-200">
      <ProgressStep step1 step2 />

      <div className="glass-card rounded-3xl p-8 sm:p-12 mt-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-heading font-extrabold text-white mb-8 text-center flex items-center justify-center">
            <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full mr-3 drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]"></span>
            Shipping Address
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Address Fields */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 ml-1">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400 ml-1">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400 ml-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="Enter Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 ml-1">Country</label>
              <input
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all font-medium"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-white/10 mt-6">
              <label className="block text-lg font-heading font-semibold text-white">Payment Method</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer group bg-card/60 border border-white/10 rounded-xl px-4 py-3 transition-all hover:bg-card hover:border-primary/50">
                  <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-full bg-card/50 checked:border-primary transition-all cursor-pointer"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </div>
                  <span className="text-white font-medium">PayPal</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 px-6 text-white font-bold text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 border border-primary/50"
              >
                Continue to Place Order
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
