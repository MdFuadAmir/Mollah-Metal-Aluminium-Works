import { FaEdit, FaTrash } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "অ্যালুমিনিয়াম কড়াই",
    size: "বড়",
    weight: "৩.৫ কেজি",
    brand: "MMAW",
    price: "৩৫০ টাকা / কেজি",
    wholesale: "৩০০ টাকা / কেজি",
    category: "কড়াই",
    status: "in-stock",
    image:
      "https://i.ibb.co/7jQpZ4R/aluminium-pan.jpg",
  },
  {
    id: 2,
    name: "অ্যালুমিনিয়াম হাঁড়ি",
    size: "মাঝারি",
    weight: "২.৮ কেজি",
    brand: "MMAW",
    price: "৩৩০ টাকা / কেজি",
    wholesale: "২৯০ টাকা / কেজি",
    category: "হাঁড়ি",
    status: "out-of-stock",
    image:
      "https://i.ibb.co/jzX7W0H/aluminium-pot.jpg",
  },
];

const OurProducts = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        আমাদের সকল পণ্য
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-black/50 rounded-xl overflow-hidden shadow"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">
                {product.name}
              </h3>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold">সাইজ:</span> {product.size}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ওজন:</span> {product.weight}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ব্র্যান্ড:</span> {product.brand}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">খুচরা মূল্য:</span>{" "}
                {product.price}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">পাইকারি মূল্য:</span>{" "}
                {product.wholesale}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ক্যাটাগরি:</span>{" "}
                {product.category}
              </p>

              {/* Status */}
              <p
                className={`text-sm font-semibold ${
                  product.status === "in-stock"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                স্ট্যাটাস: {product.status}
              </p>

              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-3">
                <button className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-600 px-4 py-1 rounded text-sm">
                  <FaEdit />
                  আপডেট
                </button>

                <button className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 px-4 py-1 rounded text-sm">
                  <FaTrash />
                  ডিলিট
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
