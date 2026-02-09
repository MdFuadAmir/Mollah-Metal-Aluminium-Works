import { FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Modal to view order details
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
          <Info label="অর্ডার আইডি" value={order._id} />
          <Info label="ইমেইল" value={order.userEmail} />
          <Info label="মোট মূল্য" value={order.totalPrice} />
          <Info label="পেমেন্ট" value={order.paymentMethod} />
          <Info label="স্ট্যাটাস" value={order.status} />
          <Info label="ট্র্যাকিং আইডি" value={order.trackingId} />
        </div>
      </div>
    </div>
  );
};

// Row info component
const Info = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-800 py-1">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value || "নেই"}</span>
  </div>
);

// Status color map
const statusColor = {
  pending: "text-yellow-400",
  processing: "text-blue-400",
  shipping: "text-purple-400",
  delivered: "text-green-400",
  cancelled: "text-red-400",
  returned: "text-pink-400",
};

// Generic Orders Table
const OrdersTable = ({ status }) => {
  const [viewOrder, setViewOrder] = useState(null);

  // Fetch orders with useQuery
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`orders-${status}`],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/admin/orders?status=${status}`,
      );
      return res.data.products;
    },
  });

  // Cancel order
  const handleCancel = async (id) => {
    const confirm = window.confirm("আপনি কি নিশ্চিত অর্ডার বাতিল করবেন?");
    if (!confirm) return;

    await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
    refetch();
  };

  // Determine next status based on current
  const getNextStatus = (current) => {
    const nextStatusMap = {
      pending: "processing",
      processing: "shipping",
      shipping: "delivered",
    };
    return nextStatusMap[current] || null;
  };

  // Update to next status
  const handleNextStatus = async (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    await axios.patch(`http://localhost:3000/orders/update-status/${id}`, {
      status: nextStatus,
    });
    refetch();
  };

  if (isLoading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">
        {status.charAt(0).toUpperCase() + status.slice(1)} Orders
      </h2>

      <div className="overflow-x-auto bg-black/50 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!data || data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  কোনো {status} অর্ডার নেই
                </td>
              </tr>
            ) : (
              data.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-gray-900/60"
                >
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">{order.userEmail}</td>
                  <td className="px-4 py-3">{order.totalPrice}</td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td
                    className={`px-4 py-3 font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2 flex-wrap">
                      {/* Next Status Button */}
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() =>
                            handleNextStatus(order._id, order.status)
                          }
                          className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                        >
                          <FaCheckCircle />{" "}
                          {getNextStatus(order.status).charAt(0).toUpperCase() +
                            getNextStatus(order.status).slice(1)}
                        </button>
                      )}

                      {/* Cancel Button */}
                      {order.status !== "cancelled" &&
                        order.status !== "delivered" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 px-3 py-1 rounded text-sm"
                          >
                            <FaTrash /> Cancel
                          </button>
                        )}

                      {/* View Button */}
                      <button
                        onClick={() => setViewOrder(order)}
                        className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                      >
                        <FaEye /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewOrder && (
        <ViewOrderModal
          order={viewOrder}
          closeModal={() => setViewOrder(null)}
        />
      )}
    </div>
  );
};

// Export for each status page
export const PendingOrders = () => <OrdersTable status="pending" />;
export const ProcessingOrders = () => <OrdersTable status="processing" />;
export const ShippingOrders = () => <OrdersTable status="shipping" />;
export const DeliveredOrders = () => <OrdersTable status="delivered" />;
export const CancelledOrders = () => <OrdersTable status="canceled" />;
export const ReturnedOrders = () => <OrdersTable status="returned" />;
