/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaUserShield,
  FaBox,
  FaShoppingCart,
  FaHourglassHalf,
  FaCheckCircle,
  FaDollarSign,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";
import { Link } from "react-router";

const AdminDashboard = () => {
  const axiosPublic = useAxios();
    const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // =====
  const { data: statss = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/stats");
      return res.data;
    },
  });
  // =====
  const { data: orderChartData = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["order-chart"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/order-stats");
      return res.data;
    },
  });
  // =====
  const { data: recentOrders = [], isLoading: recentLoading } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/recent-orders");
      return res.data;
    },
  });
  // =====
  const { data: totalSellChartData = [], isLoading: revinueLoading } = useQuery(
    {
      queryKey: ["revenue-chart"],
      queryFn: async () => {
        const res = await axiosPublic.get("/admin/revenue-stats");
        return res.data;
      },
    },
  );

  const {
    totalUsers,
    totalAdmins,
    totalModerators,
    totalProducts,
    totalOrders,
    deliveredOrders,
    requestedOrders,
    totalRevenue,
  } = statss;
  const adminmoderator = totalAdmins + totalModerators;


  // ===== cards =====
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      path: "/dashboard/manage-users",
    },
    {
      title: "Moderators",
      value: adminmoderator,
      icon: FaUserShield,
      path: "/dashboard/manage-admin&moderators",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: FaBox,
      path: "/dashboard/our-products",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: FaShoppingCart,
    },
    {
      title: "Requested Orders",
      value: requestedOrders,
      icon: FaHourglassHalf,
      path: "/dashboard/requested-orders",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: FaCheckCircle,
      path: "/dashboard/delivered-orders",
    },
    {
      title: "Total Sell",
      value: `৳ ${(totalRevenue || 0).toLocaleString()}`,
      icon: FaDollarSign,
    },
  ];

  if (isLoading || revinueLoading || ordersLoading || recentLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black/70 px-6 md:px-8 py-12 text-white">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 mb-12">
        <h1 className="text-xl font-bold uppercase text-green-500">
          <span className="text-red-500/70">MMAW</span> Admin
        </h1>
        <p className="text-gray-400">
          Date: <span className="text-green-600 text-lg">{today}</span>
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="mb-4 font-semibold">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#00FFAA" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="mb-4 font-semibold">Total Sell Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={totalSellChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00FFAA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h3 className="mb-4 font-semibold">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Customer</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <OrderRow
                  key={o._id}
                  id={`#${o._id}`}
                  name={o.userEmail}
                  amount={`৳ ${o.totalPrice}`}
                  status={o.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// =========================
const StatCard = ({ title, value, icon: Icon, path }) => (
  <Link
    to={path}
    className="bg-gray-900 p-4 rounded-xl flex justify-between items-center"
  >
    <div>
      <p className="text-xs text-gray-400">{title}</p>
      <h3 className="text-lg font-bold">{value}</h3>
    </div>
    <Icon className="text-2xl text-blue-500" />
  </Link>
);

const OrderRow = ({ id, name, amount, status }) => {
  const color =
    status === "delivered"
      ? "text-green-500"
      : status === "requested"
        ? "text-yellow-500"
        : "text-blue-500";

  return (
    <tr className="border-b border-gray-800">
      <td className="py-2">{id}</td>
      <td className="py-2">{name}</td>
      <td className="py-2">{amount}</td>
      <td className={`py-2 font-medium ${color}`}>{status}</td>
    </tr>
  );
};
