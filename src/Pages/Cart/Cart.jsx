import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router";

const Cart = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ================= GET CART ITEMS =================
  const {
    data: cartItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/carts-with-details?email=${user.email}`,
      );
      return data;
    },
  });

  // ================= UPDATE QUANTITY =================
  const handleQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axiosPublic.put(`/carts/${id}`, { quantity: newQuantity });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PRICE HELPERS =================
  const getPrices = (product, quantity, sellType) => {
    if (!product) return { price: 0, discountPrice: 0 };

    const isWholesale = quantity >= 100;

    let retailPrice = 0;
    let discountPrice = 0;
    let wholesalePrice = 0;
    let wholesaleDiscount = 0;

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

    // Final price determination
    let finalPrice = isWholesale
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

  if (isLoading) return <Loading />;

  // ================= ORDER SUMMARY =================
  const totalItems = cartItems.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);

  const totalPrice = cartItems.reduce((sum, i) => {
    const { price } = getPrices(i.productDetails, Number(i.quantity) || 0, i.sellType);
    return sum + price * (Number(i.quantity) || 0);
  }, 0);

  const totalDiscountPrice = cartItems.reduce((sum, i) => {
    const { discountPrice } = getPrices(i.productDetails, Number(i.quantity) || 0, i.sellType);
    return sum + discountPrice * (Number(i.quantity) || 0);
  }, 0);

  // ================= REMOVE FROM CART =================
  const handleRemoveFromCart = async (id) => {
    try {
      await axiosPublic.delete(`/carts/${id}`);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-6">My Cart ({cartItems.length})</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT: CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            if (!item.productDetails) return null;
            const product = item.productDetails;
            const quantity = Number(item.quantity) || 0;

            const { price, discountPrice } = getPrices(product, quantity, item.sellType);

            const finalPrice = discountPrice || price;
            const safePrice = Number(finalPrice) * quantity;

            return (
              <div
                key={item._id}
                className="flex justify-between gap-4 bg-gray-900 p-4 rounded-lg"
              >
                <div className="flex gap-5">
                  <img
                    src={product.images?.[0]}
                    alt={product.productName}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="space-y-2">
                    <h3 className="font-semibold">{product.productName}</h3>

                    <p className="text-emerald-400 font-bold font-mono">
                      {price !== discountPrice && (
                        <span className="line-through text-gray-500 mr-2">
                          ৳{price}
                        </span>
                      )}
                      ৳{discountPrice}
                      <span className="text-gray-400 ml-1">
                        {item.sellType === "kg" ? "/ কেজি" : "/ পিস"}
                      </span>
                    </p>

                    <div className="flex flex-col items-start space-y-2">
                      {quantity >= 100 && (
                        <span className="text-xs text-orange-400">
                          Wholesale price applied
                        </span>
                      )}
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="text-xs text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantity(item._id, quantity - 1)}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantity(item._id, Number(e.target.value))
                      }
                      className="w-16 py-1 font-mono text-center bg-gray-700 rounded text-white"
                    />

                    <button
                      onClick={() => handleQuantity(item._id, quantity + 1)}
                      className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm font-bold">
                    Total:{" "}
                    <span className="text-emerald-400 font-mono">৳{safePrice}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT: ORDER SUMMARY ================= */}
        <div className="bg-gray-900 p-5 rounded-lg h-fit sticky top-24">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span className="font-mono">{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Price</span>
              <span className="line-through text-gray-400 font-mono">৳{totalPrice}</span>
            </div>

            <div className="flex justify-between text-emerald-400 font-semibold">
              <span>Discount Price</span>
              <span className="font-mono">৳{totalDiscountPrice}</span>
            </div>

            <hr className="border-gray-700 my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Payable</span>
              <span className="font-mono">৳{totalDiscountPrice}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
            className={`w-full mt-4 bg-emerald-600 hover:bg-emerald-700 py-2 rounded disabled:bg-gray-800`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
