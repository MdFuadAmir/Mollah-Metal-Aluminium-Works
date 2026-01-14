/* eslint-disable no-unused-vars */
import {
  FaBox,
  FaShoppingCart,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ModeratorDashboard = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = [
    { title: "Products", value: 540, icon: FaBox },
    { title: "Total Orders", value: 3420, icon: FaShoppingCart },
    { title: "Pending Orders", value: 120, icon: FaHourglassHalf },
    { title: "Delevered Orders", value: 3300, icon: FaCheckCircle },
  ];

  const orderData = [
    { name: "Mon", orders: 120 },
    { name: "Tue", orders: 200 },
    { name: "Wed", orders: 150 },
    { name: "Thu", orders: 280 },
    { name: "Fri", orders: 220 },
    { name: "Sat", orders: 300 },
  ];

  return (
    <div className="min-h-screen bg-black/70 px-6 md:px-8 py-12 text-white">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 mb-12">
        <div>
        <h1 className="text-xl font-bold uppercase text-green-500">
          <span className="text-red-500/70">MMAW</span> Moderator
        </h1>
        <p><span className="text-gray-500">Welcome Back,</span> <span className="text-orange-500/80">Md Fuad</span></p>
        </div>
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
            <LineChart data={orderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" />
            </LineChart>
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
              <OrderRow
                id="#ORD101"
                name="Rakib"
                amount="৳1200"
                status="Pending"
              />
              <OrderRow
                id="#ORD102"
                name="Fuad"
                amount="৳3500"
                status="Completed"
              />
              <OrderRow
                id="#ORD103"
                name="Hasan"
                amount="৳980"
                status="Processing"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-gray-900 p-4 rounded-xl flex justify-between items-center">
    <div>
      <p className="text-xs text-gray-400">{title}</p>
      <h3 className="text-lg font-bold">{value}</h3>
    </div>
    <Icon className="text-2xl text-blue-500" />
  </div>
);

const OrderRow = ({ id, name, amount, status }) => {
  const color =
    status === "Completed"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-blue-500";

  return (
    <tr className="border-b border-gray-800">
      <td className="py-2">{id}</td>
      <td className="py-2">{name}</td>
      <td className="py-2 ">{amount}</td>
      <td className={`py-2 font-medium ${color}`}>{status}</td>
    </tr>
  );
};
