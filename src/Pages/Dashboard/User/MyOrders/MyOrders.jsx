import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useState } from "react";

const STATUS_CLASSES = {
  requested: "bg-purple-500 text-white",
  pending: "bg-yellow-500 text-black",
  processing: "bg-blue-500 text-white",
  shipping: "bg-sky-500 text-white",
  delivered: "bg-green-500 text-white",
  canceled: "bg-red-500 text-white",
  refund_pending: "bg-orange-500 text-white",
};

const MyOrders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-orders", page, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/orders?email=${user.email}&page=${page}&limit=${limit}`,
      );
      return data;
    },
  });

  const orders = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // Cart-style getPrices function
  const getPrices = (product, quantity, sellType) => {
    if (!product) return { price: 0, discountPrice: 0 };

    const isWholesale = quantity >= 100;

    let retailPrice = 0,
      discountPrice = 0,
      wholesalePrice = 0,
      wholesaleDiscount = 0;

    if (sellType === "kg") {
      retailPrice = Number(product.KgretailPrice) || 0;
      discountPrice = Number(product.KgretailDiscountPrice) || 0;
      wholesalePrice = Number(product.KgwholesalePrice) || 0;
      wholesaleDiscount = Number(product.KgWholeSellDiscountPrice) || 0;
    } else {
      retailPrice = Number(product.PretailPrice) || 0;
      discountPrice = Number(product.PretailDiscountPrice) || 0;
      wholesalePrice = Number(product.PwholesalePrice) || 0;
      wholesaleDiscount = Number(product.PWholeSellDiscountPrice) || 0;
    }

    const finalPrice = isWholesale
      ? wholesaleDiscount > 0
        ? wholesaleDiscount
        : wholesalePrice
      : discountPrice > 0
        ? discountPrice
        : retailPrice;

    return {
      price: isWholesale ? wholesalePrice : retailPrice,
      discountPrice: finalPrice,
    };
  };

  const handleCancelOrder = async (id) => {
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
                  const res = await axiosPublic.patch(`/orders/cancel/${id}`);
                  if (res.data.modifiedCount > 0) {
                    toast.success("Order canceled successfully");
                    refetch();
                  } else {
                    toast.error("Order could not be canceled");
                  }
                } catch (err) {
                  console.error(err);
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

  const handleReturnRequest = async (id) => {
  try {
    const res = await axiosPublic.patch(`/orders/return/${id}`);

    if (res.data.modifiedCount > 0) {
      toast.success("Return request sent successfully");
      refetch();
    } else {
      toast.error("Return request failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


  if (isLoading) return <Loading />;

  if (!orders.length)
    return (
      <div className="text-center mt-20 text-gray-400">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p>
          You have not placed any orders yet.{" "}
          <button
            onClick={() => navigate("/products")}
            className="text-blue-500 underline"
          >
            Shop Now
          </button>
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 text-white space-y-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="grid gap-6">
        {orders.map((order) => {
          let totalDiscountPrice = 0;

          order.cartItems.forEach((item) => {
            const quantity = Number(item.quantity) || 0;
            const { discountPrice } = getPrices(
              item.productDetails,
              quantity,
              item.sellType,
            );
            totalDiscountPrice += discountPrice * quantity;
          });

          return (
            <div
              key={order._id}
              className="bg-gray-900 p-6 rounded-lg shadow-md"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4 flex-col md:flex-row md:items-start gap-2 md:gap-0">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #
                    <span className="font-mono text-sm">
                      {order._id.slice(-12)}
                    </span>
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    STATUS_CLASSES[order.paymentStatus || order.status] ||
                    "bg-gray-600"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-700 pt-4 space-y-2">
                {order.cartItems.map((item) => {
                  const quantity = Number(item.quantity) || 0;
                  const { price, discountPrice } = getPrices(
                    item.productDetails,
                    quantity,
                    item.sellType,
                  );
                  const finalPrice = discountPrice || price;
                  const safePrice = finalPrice * quantity;

                  return (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm md:text-base"
                    >
                      <span>
                        {item.productDetails?.productName || "Unknown"} ×{" "}
                        <span className="font-mono">{quantity}</span>
                      </span>
                      <span className="font-mono">
                        ৳ {safePrice.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total & Actions */}
              <div>
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row gap-2 md:gap-0">
                  <div className="font-bold text-lg">
                    Total:{" "}
                    <span className="font-bold text-lg text-emerald-400 font-mono">
                      {totalDiscountPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    {order.status !== "canceled" &&
                      order.status !== "delivered" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="px-2 py-1 bg-red-600 rounded hover:bg-red-700 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    {order.status !== "canceled" && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/track-order/${order._id}`)
                        }
                        className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs font-semibold"
                      >
                        Track
                      </button>
                    )}

                    {order.paymentStatus === "paid" && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/receipt/${order._id}`)
                        }
                        className="px-2 py-1 bg-indigo-600 rounded hover:bg-indigo-700 text-xs font-semibold"
                      >
                        Receipt
                      </button>
                    )}
                    {order.paymentStatus === "paid" &&
                      order.status === "delivered" && (
                        <button onClick={() => handleReturnRequest(order._id)}
                         className="px-2 py-1 bg-red-500/50 rounded hover:bg-red-600/50 text-xs font-semibold">
                          Return Request
                        </button>
                      )}
                  </div>
                </div>

                {order.status === "requested" && (
                  <p className="text-xs text-yellow-400 mt-4">
                    ⚠ Seller will review your order. Final amount will be
                    updated after approval.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {orders.length >= 10 && (
        <div className="my-12">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
