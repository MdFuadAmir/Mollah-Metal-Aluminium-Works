import { FaTimes } from "react-icons/fa";

const Info = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-800 py-1">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value || "নেই"}</span>
  </div>
);

const ViewProductModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-full max-w-xl rounded-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-semibold mb-4">পণ্যের বিস্তারিত তথ্য</h3>

        <div className="space-y-2 text-sm">
          <Info label="পণ্যের নাম" value={product?.productName} />
          <Info label="ব্র্যান্ড" value={product?.brand} />
          <Info label="ক্যাটাগরি" value={product?.category} />
          <Info label="সাব ক্যাটাগরি" value={product?.subCategory} />
          <Info
            label="সাইজ"
            value={
              product?.category === "metal" ? product?.Kgsize : product?.Psize
            }
          />
          <Info label="ওজন" value={`${product?.avgWaight} kg`} />

          <Info
            label="খুচরা মূল্য"
            value={`৳ ${
              product?.category === "metal"
                ? product?.KgretailPrice
                : product?.PretailPrice
            }`}
          />
          <Info
            label="ছাড়ের পর খুচরা মূল্য"
            value={`৳ ${
              product?.category === "metal"
                ? product?.KgretailDiscountPrice
                : product?.PretailDiscountPrice
            }`}
          />
          <Info
            label="পাইকারি মূল্য"
            value={`৳ ${
              product?.category === "metal"
                ? product?.KgwholesalePrice
                : product?.PwholesalePrice
            }`}
          />
          <Info
            label="ছাড়ের পর পাইকারি মূল্য"
            value={`৳ ${
              product?.category === "metal"
                ? product?.KgWholeSellDiscountPrice
                : product?.PWholeSellDiscountPrice
            }`}
          />
          <Info
            label="স্টক পরিমাণ"
            value={`${
              product?.category === "metal" ? product?.Kgstock : product?.Pstock
            } ${product?.category === "metal" ? "Kg" : "Pic"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;


