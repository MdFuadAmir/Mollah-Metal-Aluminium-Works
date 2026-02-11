import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";

const STATUS_CLASSES = {
  requested: "bg-blue-500 text-white",
  pending: "bg-yellow-500 text-black",
  shipped: "bg-sky-500 text-white",
  delivered: "bg-green-500 text-white",
  canceled: "bg-red-500 text-white",
};

const PAYMENT_CLASSES = {
  pending: "bg-yellow-500 text-black",
  completed: "bg-green-500 text-white",
  failed: "bg-red-500 text-white",
};

const OrderDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const [quantities, setQuantities] = useState({});

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/admin/order/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error loading order</p>
    );
  if (!order)
    return <p className="text-white text-center mt-10">No order found</p>;

  const handleQtyChange = (itemId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: parseFloat(value),
    }));
  };

  const handleUpdateQuantity = async (item) => {
    const newQty = quantities[item._id] ?? item.quantity;

    if (!newQty || newQty <= 0) {
      return toast.error("Invalid quantity");
    }

    try {
      const res = await axiosPublic.patch(
        `/admin/update-order-item/${order._id}/${item._id}`,
        { quantity: newQty },
      );

      if (res.data.success) {
        toast.success("Quantity updated");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const getPricePerUnit = (item, qty) => {
    const isWholesale = qty >= 100;

    if (item.sellType === "kg") {
      return isWholesale
        ? Number(item.productDetails.KgWholeSellDiscountPrice) ||
            Number(item.productDetails.KgwholesalePrice) ||
            0
        : Number(item.productDetails.KgretailDiscountPrice) ||
            Number(item.productDetails.KgretailPrice) ||
            0;
    } else {
      return isWholesale
        ? Number(item.productDetails.PWholeSellDiscountPrice) ||
            Number(item.productDetails.PwholesalePrice) ||
            0
        : Number(item.productDetails.PretailDiscountPrice) ||
            Number(item.productDetails.PretailPrice) ||
            0;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-900 rounded-lg shadow-md p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-2xl font-bold text-white">Order Details</h2>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <span
              className={`px-3 py-1 rounded-full font-medium ${STATUS_CLASSES[order.status]}`}
            >
              {order.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full font-medium ${PAYMENT_CLASSES[order.paymentStatus]}`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-2">
            Shipping Info
          </h3>
          <div className="bg-gray-800 p-4 rounded-md space-y-1">
            <p className="text-white">{order.shippingInfo.fullName}</p>
            <p className="text-gray-300">{order.shippingInfo.email}</p>
            <p className="text-gray-300">{order.shippingInfo.phone}</p>
            <p className="text-gray-300">
              {order.shippingInfo.address}, {order.shippingInfo.city}
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-2">Cart Items</h3>
          <div className="space-y-4">
            {order.cartItems.map((item) => {
              const displayQty = quantities[item._id] ?? item.quantity;
              const pricePerUnit = getPricePerUnit(item, displayQty);
              const totalPrice = (displayQty * pricePerUnit).toFixed(2);

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between bg-gray-800 p-4 rounded-md gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productDetails.images[0]}
                      alt={item.productDetails.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-white font-medium font-mono text-sm">
                        {item._id}
                      </p>
                      <p className="text-white font-medium">
                        {item.productDetails.productName}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {item.productDetails.category}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Size:{" "}
                        {item.sellType === "kg"
                          ? item.productDetails.Kgsize
                          : item.productDetails.Psize}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={displayQty}
                        onChange={(e) =>
                          handleQtyChange(item._id, e.target.value)
                        }
                        className="w-24 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                      />
                      <span className="text-white">{item.sellType}</span>
                    </div>

                    <p className="text-white font-semibold">
                      ৳ {totalPrice}
                    </p>

                    <button
                      onClick={() => handleUpdateQuantity(item)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

