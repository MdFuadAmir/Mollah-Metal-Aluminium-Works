import { FaTrash, FaCheckCircle } from "react-icons/fa";

const orders = [
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

const ManageOrders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        অর্ডার ম্যানেজমেন্ট
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-black/50 rounded-xl p-5 shadow space-y-2"
          >
            <h3 className="text-lg font-semibold text-white">
              অর্ডার আইডি: {order.id}
            </h3>

            <p className="text-gray-300 text-sm">
              <span className="font-semibold">ক্রেতা:</span>{" "}
              {order.customer}
            </p>

            <p className="text-gray-300 text-sm">
              <span className="font-semibold">পণ্য:</span> {order.product}
            </p>

            <p className="text-gray-300 text-sm">
              <span className="font-semibold">পরিমাণ:</span> {order.quantity}
            </p>

            <p className="text-gray-300 text-sm">
              <span className="font-semibold">মোট মূল্য:</span> {order.total}
            </p>

            <p className="text-gray-300 text-sm">
              <span className="font-semibold">পেমেন্ট:</span>{" "}
              {order.payment}
            </p>

            {/* Status */}
            <p
              className={`text-sm font-semibold ${statusColor[order.status]}`}
            >
              স্ট্যাটাস: {order.status}
            </p>

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-3">
              {order.status !== "completed" && (
                <button className="flex items-center gap-2 bg-green-600/80 hover:bg-green-700 px-4 py-1 rounded text-sm">
                  <FaCheckCircle />
                  Complete
                </button>
              )}

              <button className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 px-4 py-1 rounded text-sm">
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
