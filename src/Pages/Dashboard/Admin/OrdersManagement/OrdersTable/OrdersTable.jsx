import { FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../Components/Loading/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "../../../../../Components/Pagination/Pagination";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

// Status color map
const statusColor = {
  requested: "text-cyan-400",
  pending: "text-yellow-400",
  processing: "text-blue-400",
  shipping: "text-purple-400",
  delivered: "text-green-400",
  canceled: "text-red-400",
  return_requested: "text-pink-400",
};

const OrdersTable = ({ status }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders", status, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/orders?status=${status}&page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const orders = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleCancel = async (id) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to cancel this order?
          <div className="mt-2 flex justify-center gap-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await axiosSecure.patch(`/orders/cancel/${id}`);
                  if (res.data.modifiedCount > 0) {
                    toast.success("Order canceled successfully");
                    refetch();
                  } else {
                    toast.error("Order could not be canceled");
                  }
                } catch {
                  toast.error("Something went wrong");
                }
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        duration: 3000,
        style: {
          background: "#111827",
          color: "#fff",
          border: "1px solid #374151",
        },
      },
    );
  };

  const getNextStatus = (current) => {
    const nextStatusMap = {
      requested: "pending",
      pending: "processing",
      processing: "shipping",
      shipping: "delivered",
    };
    return nextStatusMap[current] || null;
  };

  const handleNextStatus = async (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;
    await axiosSecure.patch(`/orders/update-status/${id}`, {
      status: nextStatus,
    });
    refetch();
  };

  if (isLoading) return <Loading />;

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
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  কোনো {status} অর্ডার নেই
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-gray-900/60"
                >
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3 font-mono">
                    ৳{Number(order.totalPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td
                    className={`px-4 py-3 font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2 flex-wrap">
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() =>
                            handleNextStatus(order._id, order.status)
                          }
                          className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          <FaCheckCircle />
                          {getNextStatus(order.status)}
                        </button>
                      )}

                      {order.status !== "canceled" &&
                        order.status !== "delivered" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded text-xs"
                          >
                            <FaTrash /> Cancel
                          </button>
                        )}

                      <button
                        onClick={() =>
                          navigate(`/dashboard/order-details/${order._id}`)
                        }
                        className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600 px-2 py-1 rounded text-xs"
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

      {/* ✅ Pagination (design unchanged, তোমার component) */}
      <div className="mt-10">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export const RequestedOrders = () => <OrdersTable status="requested" />;
export const PendingOrders = () => <OrdersTable status="pending" />;
export const ProcessingOrders = () => <OrdersTable status="processing" />;
export const ShippingOrders = () => <OrdersTable status="shipping" />;
export const DeliveredOrders = () => <OrdersTable status="delivered" />;
export const CancelledOrders = () => <OrdersTable status="canceled" />;
export const ReturnedOrders = () => <OrdersTable status="return_requested" />;
