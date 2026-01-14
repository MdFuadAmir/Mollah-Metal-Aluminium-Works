import { FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

// Sample orders
const ordersData = [
  {
    id: "ORD-1001",
    customer: "Abdur Rahman",
    product: "অ্যালুমিনিয়াম কড়াই",
    quantity: 5,
    total: "৫২৫০ টাকা",
    payment: "Paid",
    status: "pending",
  },
  {
    id: "ORD-1002",
    customer: "Hasan Traders",
    product: "অ্যালুমিনিয়াম হাঁড়ি",
    quantity: 10,
    total: "৯৮০০ টাকা",
    payment: "Unpaid",
    status: "processing",
  },
  {
    id: "ORD-1003",
    customer: "Rahim Store",
    product: "ধামা",
    quantity: 8,
    total: "৭২০০ টাকা",
    payment: "Paid",
    status: "completed",
  },
];

const statusColor = {
  pending: "text-yellow-400",
  processing: "text-blue-400",
  completed: "text-green-400",
};

// View Modal Component
const ViewOrderModal = ({ order, closeModal }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-full max-w-xl rounded-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h3 className="text-xl font-semibold mb-4">অর্ডারের বিস্তারিত তথ্য</h3>

        <div className="space-y-2 text-sm">
          <Info label="অর্ডার আইডি" value={order.id} />
          <Info label="ক্রেতা" value={order.customer} />
          <Info label="পণ্য" value={order.product} />
          <Info label="পরিমাণ" value={order.quantity} />
          <Info label="মোট মূল্য" value={order.total} />
          <Info label="পেমেন্ট" value={order.payment} />
          <Info label="স্ট্যাটাস" value={order.status} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-800 py-1">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value || "নেই"}</span>
  </div>
);

const ManageOrders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [viewOrder, setViewOrder] = useState(null);

  // Handlers
  const handleCancel = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    alert(`${id} অর্ডার বাতিল করা হয়েছে`);
  };

  const handleProcessing = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "processing" } : o))
    );
  };

  // const handleComplete = (id) => {
  //   setOrders((prev) =>
  //     prev.map((o) => (o.id === id ? { ...o, status: "completed" } : o))
  //   );
  // };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">অর্ডার ম্যানেজমেন্ট</h2>

      <div className="overflow-x-auto bg-black/50 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">অর্ডার আইডি</th>
              <th className="px-4 py-3 text-left">পণ্য</th>
              <th className="px-4 py-3 text-left">মোট মূল্য</th>
              <th className="px-4 py-3 text-left">পেমেন্ট</th>
              <th className="px-4 py-3 text-left">স্ট্যাটাস</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16">
                  <div className="flex justify-center">
                    <div className="text-center bg-gray-800/40 border border-gray-700 rounded-xl p-8 max-w-md w-full">
                      <p className="text-lg font-semibold text-white mb-2">
                        কোনো অর্ডার পাওয়া যায়নি
                      </p>
                      <p className="text-gray-400 text-sm">
                        নতুন অর্ডার যোগ করলে এখানে দেখা যাবে
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-800 hover:bg-gray-900/60"
                >
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.product}</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">{order.payment}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      statusColor[order.status]
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        <FaTrash /> বাতিল
                      </button>

                      <button
                        onClick={() => setViewOrder(order)}
                        className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                      >
                        <FaEye /> দেখুন
                      </button>

                      {order.status !== "completed" && (
                        <button
                          onClick={() => handleProcessing(order.id)}
                          className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                        >
                          <FaCheckCircle /> প্রক্রিয়াধীন
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewOrder && (
        <ViewOrderModal
          order={viewOrder}
          closeModal={() => setViewOrder(null)}
        />
      )}
    </div>
  );
};

export default ManageOrders;
