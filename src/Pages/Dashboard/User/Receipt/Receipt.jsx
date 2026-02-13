import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";
// import domtoimage from "dom-to-image";
import logo from "../../../../assets/mmaw.png";

const Receipt = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["receipt", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/orders/${id}`);
      return data;
    },
  });

  // const handleDownloadImage = async () => {
  //   const node = document.getElementById("receipt-area");
  //   if (!node) return;

  //   try {
  //     // div কে PNG হিসেবে capture করা
  //     const dataUrl = await domtoimage.toPng(node);

  //     // download link create করা
  //     const link = document.createElement("a");
  //     link.download = `receipt-${order._id}.png`;
  //     link.href = dataUrl;
  //     link.click();
  //   } catch (err) {
  //     console.error("Error capturing image:", err);
  //   }
  // };
const handlePrintPDF = () => {
  window.print();
};

  if (isLoading) return <Loading />;
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

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div
        id="receipt-area"
        className="bg-gray-900 p-6 rounded-lg space-y-4 border border-emerald-600"
      >
        <div className="">
          <div className="flex justify-center items-center">
            <img src={logo} alt="/logo" className="w-12" />
            <h2 className="text-xl font-bold text-center text-emerald-400">
              মেসার্স মোল্লা মেটাল এ্যালুমিনিয়াম ওয়াকর্স
            </h2>
          </div>
          <div className="mt-2 space-y-1 text-xs text-center">
            <p>এ্যালুমিনিয়ামের তৈজষ পত্র প্রস্তুতকারক ও সরবরাহকারী</p>
            <p>কারখানা: এম.এম. হোসেন রোড (পুরাতন কাটাইখানা মোড়) কুষ্টিয়া।</p>
            <p>শোরুম: সমবায়-১ (পুরাতন কাটাইখানা মোড়) কুষ্টিয়া।</p>
            <p>মোবাইল নম্বর: ০১৭১১-২০০৩৪০, 01705470131</p>
          </div>
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between text-sm ">
          <div>
            <p>
              <b>Receipt No:</b>{" "}
              <span className="text-emerald-500">
                RCPT-{order._id?.slice(-6)}
              </span>
            </p>
            <p>
              <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-emerald-400 font-bold">PAID</p>
            <p>
              <b>Method:</b> {order.paymentMethod}
            </p>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div>
          <p className="font-semibold">Billed To:</p>
          <p>{order.shippingInfo?.fullName}</p>
          <p>{order.shippingInfo?.phone}</p>
          <p>{order.shippingInfo?.address}</p>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-2">
          {order.cartItems?.map((item, i) => {
            const quantity = Number(item.quantity) || 0;
            const { discountPrice } = getPrices(
              item.productDetails,
              quantity,
              item.sellType,
            );

            const itemTotal = discountPrice * quantity;

            return (
              <div key={i} className="flex justify-between text-sm mb-3">
                <span className="flex justify-center items-center">
                  {item.productDetails.productName} × {quantity}
                </span>
                <span>৳{itemTotal.toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        <hr className="border-gray-700" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Paid</span>
          <span className="text-emerald-400">৳{order.totalPrice}</span>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          This receipt confirms that your payment has been successfully
          received.
        </p>
      </div>
      {/* <button
        onClick={handleDownloadImage}
        className="mt-6 w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700 font-semibold"
      >
        Download Receipt Image
      </button> */}
      <button
  onClick={handlePrintPDF}
  className="mt-6 w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700 font-semibold print:hidden"
>
  Download Receipt PDF
</button>

    </div>
  );
};

export default Receipt;
