import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import UpdateProductModal from "./UpdateProductModal";

const OurProducts = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/products");
      return res.data;
    },
  });

  const handleDelete = async (id, productName) => {
    toast(
      (t) => (
        <div className="text-center space-y-3">
          <p className="font-semibold text-red-500">
            আপনি কি নিশ্চিত এই পণ্যটি ডিলিট করতে চান?
          </p>
          <p>{id}</p>
          <p>{productName}</p>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-1 rounded bg-red-600 text-white text-sm"
              onClick={async () => {
                try {
                  await axiosSecure.delete(`/dashboard/products/${id}`);
                  toast.success("Product deleted successfully");
                  refetch();
                  toast.dismiss(t.id);
                } catch (err) {
                  toast.error(err.message);
                }
              }}
            >
              Yes, Delete
            </button>

            <button
              className="px-4 py-1 rounded bg-gray-500 text-white text-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  };
  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">আমাদের সকল পণ্য</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-black/50 rounded-xl overflow-hidden shadow"
          >
            {/* Image */}
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">
                {product.productName}
              </h3>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">সাইজ:</span>{" "}
                <span className="font-mono">{product.size}</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ওজন:</span>{" "}
                <span className="font-mono">{product.avgWaight}</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ব্র্যান্ড:</span>{" "}
                {product.brandName}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">খুচরা মূল্য:</span>{" "}
                <span className="font-mono">{product.retailPrice}</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ছাড়ের পর খুচরা মূল্য:</span>{" "}
                <span className="font-mono">{product.retailDiscountPrice}</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">পাইকারি মূল্য:</span>{" "}
                <span className="font-mono">{product.wholesalePrice}</span>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">ছাড়ের পর পাইকারি মূল্য:</span>{" "}
                <span className="font-mono">
                  {product.holeSellDiscountPrice}
                </span>
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
                স্ট্যাটাস: {product.status}{" "}
                <span className="font-mono">({product.stokc} kg)</span>
              </p>

              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-3">
                <button
                  onClick={() => handleOpenUpdate(product)}
                  className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-600 px-4 py-1 rounded text-sm"
                >
                  <FaEdit />
                  আপডেট
                </button>

                <button
                  onClick={() => handleDelete(product._id, product.productName)}
                  className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 px-4 py-1 rounded text-sm"
                >
                  <FaTrash />
                  ডিলিট
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <UpdateProductModal
          product={selectedProduct}
          closeModal={handleCloseModal}
          axiosSecure={axiosSecure}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OurProducts;
