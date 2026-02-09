import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const handleDownloadPDF = async () => {
    const element = document.getElementById("receipt-area");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${order._id}.pdf`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <div
        id="receipt-area"
        className="bg-gray-900 p-6 rounded-lg space-y-4 border border-emerald-600"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-400">
          PAYMENT RECEIPT
        </h2>

        <div className="flex justify-between text-sm">
          <div>
            <p><b>Receipt No:</b> RCPT-{order._id?.slice(-6)}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-emerald-400 font-bold">PAID</p>
            <p><b>Method:</b> {order.paymentMethod}</p>
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
          {order.cartItems?.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>
                {item.productDetails.productName} × {item.quantity}
              </span>
              <span>
                ৳{item.productDetails.PretailPrice * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <hr className="border-gray-700" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Paid</span>
          <span className="text-emerald-400">৳{order.totalPrice}</span>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          This receipt confirms that your payment has been successfully received.
        </p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-6 w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700 font-semibold"
      >
        Download Receipt PDF
      </button>
    </div>
  );
};

export default Receipt;
