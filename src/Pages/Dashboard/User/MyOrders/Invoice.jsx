import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/orders/${id}`);
      return data;
    },
  });

  const handleDownloadPDF = async () => {
    const element = document.getElementById("invoice-area");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${order._id}.pdf`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div id="invoice-area" className="bg-gray-900 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস</h2>

        <div className="flex justify-between">
          <div>
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
            <p><b>Status:</b> {order.status}</p>
          </div>
          <div>
            <p><b>Name:</b> {order.shippingInfo?.fullName}</p>
            <p><b>Phone:</b> {order.shippingInfo?.phone}</p>
            <p><b>Address:</b> {order.shippingInfo?.address}</p>
          </div>
        </div>

        <hr className="border-gray-700" />

        {order.cartItems?.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>
              {item.productDetails.productName} × {item.quantity}
            </span>
            <span>
              ৳{item.productDetails.PretailPrice * item.quantity}
            </span>
          </div>
        ))}

        <hr className="border-gray-700" />

        <div className="text-right text-lg font-bold">
          Total: ৳{order.totalPrice}
        </div>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-6 w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700 font-semibold"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
