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
    <>
      <ProgressStep step1 step2 step3 />
      <div className="container ml-16 px-4 py-8">
        {/* Cart Items Table */}
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Image</th>
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">Items:</span> $
                  {cart.itemsPrice.toFixed(2)}
                </li>
                <li>
                  <span className="font-semibold">Shipping:</span> $
                  {cart.shippingPrice.toFixed(2)}
                </li>
                <li>
                  <span className="font-semibold">Tax:</span> $
                  {cart.taxPrice.toFixed(2)}
                </li>
                <li>
                  <span className="font-semibold">Total:</span> $
                  {cart.totalPrice.toFixed(2)}
                </li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping</h3>
              <p className="text-gray-700">
                <strong>Address:</strong>{" "}
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
              <p className="text-gray-700">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Message variant="danger" className="mt-4">
              {error?.data?.message || "Something went wrong"}
            </Message>
          )}

          {/* Place Order Button */}
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium text-lg transition duration-300"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {/* Loading Spinner */}
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

