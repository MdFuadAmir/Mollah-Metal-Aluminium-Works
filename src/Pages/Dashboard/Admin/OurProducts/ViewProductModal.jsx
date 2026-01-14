// import { FaTimes } from "react-icons/fa";

// const ViewProductModal = ({ product, closeModal }) => {
//   if (!product) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
//       <div className="bg-gray-900 text-white w-full max-w-xl rounded-xl p-6 relative">
        
//         {/* Close */}
//         <button
//           onClick={closeModal}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         >
//           <FaTimes />
//         </button>

//         <h3 className="text-xl font-semibold mb-4">
//           Product Details
//         </h3>

//         <div className="space-y-2 text-sm">
//           <Info label="Product Name" value={product.productName} />
//           <Info label="Brand" value={product.brandName} />
//           <Info label="Category" value={product.category} />
//           <Info label="Size" value={product.size} />
//           <Info label="Weight" value={product.avgWaight} />

//           <Info label="Retail Price" value={`৳ ${product.retailPrice}`} />
//           <Info
//             label="Retail Discount Price"
//             value={`৳ ${product.retailDiscountPrice}`}
//           />
//           <Info label="Wholesale Price" value={`৳ ${product.wholesalePrice}`} />
//           <Info
//             label="Wholesale Discount Price"
//             value={`৳ ${product.holeSellDiscountPrice}`}
//           />

//           <Info label="Stock" value={`${product.stokc} kg`} />
//           <Info label="Status" value={product.status} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProductModal;

// /* Helper */
// const Info = ({ label, value }) => (
//   <div className="flex justify-between border-b border-gray-800 py-1">
//     <span className="text-gray-400">{label}</span>
//     <span className="font-medium">{value || "—"}</span>
//   </div>
// );


import { FaTimes } from "react-icons/fa";

const ViewProductModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-full max-w-xl rounded-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-semibold mb-4">
          পণ্যের বিস্তারিত তথ্য
        </h3>

        <div className="space-y-2 text-sm">
          <Info label="পণ্যের নাম" value={product.productName} />
          <Info label="ব্র্যান্ড" value={product.brandName} />
          <Info label="ক্যাটাগরি" value={product.category} />
          <Info label="সাইজ" value={product.size} />
          <Info label="ওজন" value={product.avgWaight} />

          <Info label="খুচরা মূল্য" value={`৳ ${product.retailPrice}`} />
          <Info
            label="ছাড়ের পর খুচরা মূল্য"
            value={`৳ ${product.retailDiscountPrice}`}
          />
          <Info label="পাইকারি মূল্য" value={`৳ ${product.wholesalePrice}`} />
          <Info
            label="ছাড়ের পর পাইকারি মূল্য"
            value={`৳ ${product.holeSellDiscountPrice}`}
          />

          <Info label="স্টক পরিমাণ" value={`${product.stokc} কেজি`} />
          <Info label="স্ট্যাটাস" value={product.status} />
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;

/* Helper Component */
const Info = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-800 py-1">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value || "নেই"}</span>
  </div>
);
