import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!loadingPayPal && !errorPayPal && paypal?.clientId && order && !order.isPaid) {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal.clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [paypal, errorPayPal, loadingPayPal, order, paypalDispatch]);

  const onApprove = (data, actions) =>
    actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });

  const createOrder = (data, actions) =>
    actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice.toFixed(2) } }],
      })
      .then((orderID) => orderID);

  const onError = (err) => {
    toast.error(err.message);
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      {/* Left: Order Items */}
      <div className="md:w-2/3 pr-4">
        <div className="border mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      </td>
                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">${item.price.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right: Shipping + Summary */}
      <div className="md:w-1/3">
        <div className="mt-5 border-b pb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-2">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>
          <p className="mb-2">
            <strong className="text-pink-500">Name:</strong> {order.user.username}
          </p>
          <p className="mb-2">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>
          <p className="mb-2">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className="mb-2">
            <strong className="text-pink-500">Method:</strong> {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Message variant="success">Paid on {order.paidAt}</Message>
          ) : (
            <Message variant="danger">Not Paid</Message>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>

          {/* PayPal Buttons */}
          {!order.isPaid && (
            <>
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              )}
            </>
          )}

          {/* Admin: Mark as Delivered */}
          {loadingDeliver && <Loader />}
          {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
            <button
              onClick={deliverHandler}
              className="w-full mt-4 py-2 bg-pink-500 text-white rounded"
            >
              Mark As Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
