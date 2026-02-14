/* eslint-disable react-hooks/incompatible-library */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// ================= PRICE HELPER ==================
const getPrices = (product, quantity) => {
  const isWholesale = quantity >= 100;
  let price = 0;
  let discountPrice = 0;

  if (product.category === "metal") {
    price = isWholesale
      ? Number(product.KgwholesalePrice)
      : Number(product.KgretailPrice);
    const rawDiscountPrice = isWholesale
      ? product.KgWholeSellDiscountPrice
      : product.KgretailDiscountPrice;

    discountPrice =
      rawDiscountPrice && rawDiscountPrice !== ""
        ? Number(rawDiscountPrice)
        : price;
  } else {
    price = isWholesale
      ? Number(product.PwholesalePrice)
      : Number(product.PretailPrice);

    const rawDiscountPrice = isWholesale
      ? product.PWholeSellDiscountPrice
      : product.PretailDiscountPrice;

    discountPrice =
      rawDiscountPrice && rawDiscountPrice !== ""
        ? Number(rawDiscountPrice)
        : price;
  }
  return { price, discountPrice };
};

// ================= CHECKOUT PAGE ==================
const CheckOut = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

  const {
    data: cartItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["checkout-cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/carts-with-details?email=${user.email}`,
      );
      return data;
    },
  });

  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const shippingInfo = watch();

  if (isLoading) return <Loading />;

  const totalDiscountPrice = cartItems.reduce((sum, item) => {
    const { discountPrice } = getPrices(item.productDetails, item.quantity);
    return sum + discountPrice * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    try {
      const orderRes = await axiosSecure.post("/orders", {
        userEmail: user.email,
        cartItems,
        totalPrice: totalDiscountPrice,
        paymentMethod: paymentMethod,
        paymentStatus:
          paymentMethod === "cash-on-delivery" ? "pending" : "paid",
        shippingInfo,
      });
      // ✅ Safely check success
      if (orderRes?.data?.success) {
        toast.success("Order placed successfully!");
        refetch();
        navigate("/products");
      } else {
        toast.error("Order creation failed. Try again.");
      }
    } catch {
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 text-white space-y-6">
      <h2 className="text-3xl font-bold">Checkout</h2>

      {/* Payment Method Selector */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            paymentMethod === "cash-on-delivery"
              ? "bg-emerald-600"
              : "bg-gray-700"
          }`}
          onClick={() => setPaymentMethod("cash-on-delivery")}
        >
          Cash on Delivery
        </button>
        <button
          className={`px-4 py-2 rounded ${
            paymentMethod === "stripe" ? "bg-blue-600" : "bg-gray-700"
          }`}
          onClick={() => setPaymentMethod("stripe")}
        >
          Pay with Stripe
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Shipping Info */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              className="bg-gray-800 p-2 rounded"
            />
            {errors.fullName && (
              <span className="text-red-400 text-xs md:col-span-2">
                {errors.fullName.message}
              </span>
            )}

            <input
              type="email"
              placeholder="Email"
              value={user.email}
              disabled
              className="bg-gray-800 p-2 rounded opacity-70"
            />

            <input
              type="text"
              placeholder="Phone"
              {...register("phone", { required: "Phone is required" })}
              className="bg-gray-800 p-2 rounded"
            />
            {errors.phone && (
              <span className="text-red-400 text-xs">
                {errors.phone.message}
              </span>
            )}

            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="bg-gray-800 p-2 rounded"
            />
            {errors.city && (
              <span className="text-red-400 text-xs">
                {errors.city.message}
              </span>
            )}

            <textarea
              placeholder="Full Address"
              rows="3"
              {...register("address", { required: "Address is required" })}
              className="bg-gray-800 p-2 rounded md:col-span-2"
            />
            {errors.address && (
              <span className="text-red-400 text-xs md:col-span-2">
                {errors.address.message}
              </span>
            )}
          </form>
        </div>

        {/* RIGHT: Order Summary & Payment */}
        <div className="bg-gray-900 p-6 rounded-lg h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cartItems.map((item) => {
              const { discountPrice } = getPrices(
                item.productDetails,
                item.quantity,
              );
              return (
                <div
                  key={item._id}
                  className="flex justify-between border-b border-gray-700 pb-2 mb-2"
                >
                  <span>
                    {item.productDetails.productName} × {item.quantity}
                  </span>
                  <span className="font-mono">
                    ৳{discountPrice * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span className="text-emerald-400 font-mono">
              ৳{totalDiscountPrice}
            </span>
          </div>

          {/* Place Order or Stripe */}
          {paymentMethod === "cash-on-delivery" ? (
            <button
              onClick={handlePlaceOrder}
              disabled={!isValid || cartItems.length === 0}
              className={`w-full mt-4 py-2 rounded font-semibold ${
                !isValid || cartItems.length === 0
                  ? "bg-gray-800 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Place Order
            </button>
          ) : (
            // <Elements stripe={stripePromise}>
            //   <StripePaymentForm
            //     cartItems={cartItems}
            //     totalPrice={totalDiscountPrice}
            //     user={user}
            //     refetchCart={refetch}
            //   />
            // </Elements>
            <button
              onClick={handlePlaceOrder}
              disabled={!isValid || cartItems.length === 0}
              className={`w-full mt-4 py-2 rounded font-semibold ${
                !isValid || cartItems.length === 0
                  ? "bg-gray-800 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Pay to Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
