import { FaCheckCircle } from "react-icons/fa";

const completedOrders = [
  {
    id: "ORD-9001",
    customer: "Rahim Store",
    product: "অ্যালুমিনিয়াম হাঁড়ি",
    quantity: 6,
    total: "৭২০০ টাকা",
    deliveredDate: "12 Jan 2026",
  },
  {
    id: "ORD-9002",
    customer: "Hasan Traders",
    product: "কড়াই ঢাকনা",
    quantity: 12,
    total: "৯৬০০ টাকা",
    deliveredDate: "14 Jan 2026",
  },
];

const CompletedOrders = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        সম্পন্ন অর্ডারসমূহ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedOrders.map((order) => (
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
              <span className="font-semibold">ডেলিভারি তারিখ:</span>{" "}
              {order.deliveredDate}
            </p>

            <div className="flex items-center gap-2 text-green-400 pt-2 font-semibold">
              <FaCheckCircle />
              Completed
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders;
