import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import { FaBox, FaClock, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";

const UserDashboard = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth(); // Logged-in user

  const { data, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email, // Only run if user.email exists
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  const { totalOrders, pendingOrders, deliveredOrders, totalSpend, recentOrders } = data;

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: FaShoppingCart },
    { title: "Pending Orders", value: pendingOrders, icon: FaClock },
    { title: "Delivered Orders", value: deliveredOrders, icon: FaBox },
    { title: "Total Spend", value: `৳ ${totalSpend}`, icon: FaDollarSign },
  ];

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-black/70 px-6 md:px-8 py-12 text-white">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 mb-12">
        <h1 className="text-xl font-bold uppercase text-green-500">
          <span className="text-red-500/70">MMAW</span> User Dashboard
        </h1>
        <p className="text-gray-400">
          Date: <span className="text-green-600 text-lg">{today}</span>
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-gray-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-xs text-gray-400">{item.title}</p>
              <h3 className="text-lg font-bold">{item.value}</h3>
            </div>
            <item.icon className="text-2xl text-blue-500" />
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h3 className="mb-4 font-semibold">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o._id} className="border-b border-gray-800">
                  <td className="py-2">{o._id}</td>
                  <td className="py-2">{o.productName}</td>
                  <td className="py-2">৳ {o.totalPrice}</td>
                  <td
                    className={`py-2 font-medium ${
                      o.status === "delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {o.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
