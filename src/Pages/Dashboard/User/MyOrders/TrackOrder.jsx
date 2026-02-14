import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const STATUS_CLASSES = {
  pending: "bg-yellow-500 text-black",
  processing: "bg-blue-500 text-white",
  shipped: "bg-sky-500 text-white",
  delivered: "bg-green-500 text-white",
  canceled: "bg-red-500 text-white",
  refund_pending: "bg-orange-500 text-white",
};

const STATUS_ORDER = ["requested","pending", "processing", "shipping", "delivered"];

const TrackOrder = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["track-order", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${id}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (!order._id) return <div className="text-center mt-20">Order not found</div>;

  const currentStatusIndex = STATUS_ORDER.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 text-white space-y-6">
      <h2 className="text-3xl font-bold">Track Order</h2>

      {/* Order Info */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-3">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Tracking ID:</b> {order.trackingId}</p>
        <p><b>Status:</b> 
          <span className={`px-3 py-1 rounded-full ml-2 ${STATUS_CLASSES[order.status]}`}>
            {order.status.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Order Progress</h3>
        <div className="flex items-center justify-between relative">
          {STATUS_ORDER.map((status, idx) => (
            <div key={status} className="flex flex-col items-center w-1/4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  idx <= currentStatusIndex
                    ? STATUS_CLASSES[status]
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {idx + 1}
              </div>
              <span className="text-xs text-center">{status}</span>
            </div>
          ))}
          {/* Horizontal line behind */}
          <div className="absolute top-3.5 left-0 w-full h-1 bg-gray-700 z-0"></div>
          <div
            className="absolute top-3.5 left-0 h-1 z-10 bg-emerald-500"
            style={{
              width: `${((currentStatusIndex + 1) / STATUS_ORDER.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-3">
        <h3 className="font-semibold text-lg">Shipping Info</h3>
        <p>{order.shippingInfo.fullName}</p>
        <p>{order.shippingInfo.phone}</p>
        <p>{order.shippingInfo.city}</p>
        <p>{order.shippingInfo.address}</p>
      </div>

      {/* Products */}
      <div className="bg-gray-900 p-6 rounded-lg space-y-3">
        <h3 className="font-semibold text-lg">Products</h3>
        {order.cartItems?.map((item) => (
          <div key={item._id} className="flex justify-between border-b border-gray-700 py-2">
            <span>
              {item.productDetails.productName} × {item.quantity}
            </span>
            <span>
              ৳{item.productDetails.PretailPrice * item.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
