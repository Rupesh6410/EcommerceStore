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
    <div className="max-w-2xl mx-auto p-4">
      <ProgressStep step1 step2 />
      <div className="bg-gray-100 shadow-lg rounded-xl p-6 mt-6">
        <form onSubmit={submitHandler} className="space-y-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">Shipping</h1>

          {/* Address Fields */}
          <div className="space-y-2">
            <label className="block font-medium">Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">City</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Postal Code</label>
            <input
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Country</label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="block font-medium">Select Payment Method</label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-blue-500"
              />
              <span className="text-sm">PayPal</span>
            </div>
            {/* You can add more payment methods later here */}
            {/* <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-blue-500"
              />
              <span className="text-sm">Stripe</span>
            </div> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
