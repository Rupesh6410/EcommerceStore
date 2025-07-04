import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>

      <h2 className="text-2xl font-heading font-bold mb-6 text-neutral-800 dark:text-white">
        Orders
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto xl:ml-[4rem]">
          <table className="min-w-full text-sm border rounded shadow bg-white dark:bg-neutral-800">
            <thead className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-white">
              <tr>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Paid</th>
                <th className="text-left p-3">Delivered</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
                >
                  <td className="p-3">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order._id}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 truncate max-w-[10rem]">{order._id}</td>
                  <td className="p-3">{order.user?.username || "N/A"}</td>
                  <td className="p-3">
                    {order.createdAt?.substring(0, 10) || "N/A"}
                  </td>
                  <td className="p-3 font-semibold text-accent">
                    ${order.totalPrice}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.isDelivered ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-700 text-xs cursor-pointer">
                        More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No orders found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderList;
