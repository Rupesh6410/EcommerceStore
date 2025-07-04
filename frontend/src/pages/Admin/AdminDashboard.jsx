import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: { type: "line" },
      tooltip: { theme: "dark" },
      colors: ["#f59e0b"],
      dataLabels: { enabled: true },
      stroke: { curve: "smooth" },
      title: { text: "Sales Trend", align: "left" },
      grid: { borderColor: "#ccc" },
      markers: { size: 1 },
      xaxis: { categories: [], title: { text: "Date" } },
      yaxis: { title: { text: "Sales" }, min: 0 },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formatted = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { categories: formatted.map((item) => item.x) },
        },
        series: [{ name: "Sales", data: formatted.map((item) => item.y) }],
      }));
    }
  }, [salesDetail]);

  const metrics = [
    {
      label: "Total Sales",
      value: sales?.totalSales?.toFixed(2) || 0,
      icon: "$",
      color: "bg-accent",
    },
    {
      label: "Customers",
      value: customers?.length || 0,
      icon: "👥",
      color: "bg-primary",
    },
    {
      label: "All Orders",
      value: orders?.totalOrders || 0,
      icon: "📦",
      color: "bg-secondary",
    },
  ];

  return (
    <section className="px-4 md:px-8 py-8 space-y-10 xl:ml-[1rem]">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <div
              className={`w-12 h-12 text-xl font-bold text-white flex items-center justify-center rounded-full ${metric.color}`}
            >
              {metric.icon}
            </div>
            <p className="mt-4 text-neutral-600 text-sm">{metric.label}</p>
            <h2 className="text-2xl font-semibold font-heading text-neutral-900 mt-1">
              {isLoading ? <Loader /> : metric.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <Chart options={state.options} series={state.series} type="bar" height={350} />
      </motion.div>

      {/* Order List */}
      <div>
        <OrderList />
      </div>
    </section>
  );
};

export default AdminDashboard;
