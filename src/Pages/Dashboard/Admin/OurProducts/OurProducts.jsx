import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import ViewProductModal from "./ViewProductModal";
import EmptyProductCard from "./EmptyProductCard";
import { useNavigate } from "react-router";

const OurProducts = () => {
  const axiosPublic = useAxios();
  const [viewProduct, setViewProduct] = useState(null);
  const navigate = useNavigate();


  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data?.products || [];
    },
  });

  // update product
  const handleUpdate = (product) => {
    navigate(`/dashboard/product/${product._id}`);
  };

  // delete product
  const handleDelete = async (id, productName) => {
    toast(
      (t) => (
        <div className="text-center space-y-3">
          <p className="font-semibold text-red-500">
            আপনি কি নিশ্চিত এই পণ্যটি ডিলিট করতে চান?
          </p>
          <p className="text-sm">{productName}</p>

          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-1 rounded bg-red-600 text-white text-sm"
              onClick={async () => {
                try {
                  await axiosPublic.delete(`/products/${id}`);
                  toast.success("Product deleted successfully");
                  refetch();
                  toast.dismiss(t.id);
                } catch (err) {
                  toast.error(err.response?.data?.message || err.message);
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
        duration: 9000,
        style: {
          background: "#111827",
          color: "#fff",
          border: "1px solid #374151",
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">
        আমাদের সকল পণ্য{" "}
        <span className="font-mono">({products.length})</span>
      </h2>

      <div className="overflow-x-auto bg-black/50 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product ID</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">খুচরা মূল্য</th>
              <th className="px-4 py-3 text-left">ছাড়ের পর মূল্য</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyProductCard />
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-800 hover:bg-gray-900/60"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.productName}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{product._id}</td>

                  <td className="px-4 py-3 font-medium">
                    {product.productName}
                  </td>

                  <td className="px-4 py-3 font-mono">
                    ৳{" "}
                    {product.category === "metal"
                      ? product?.KgretailPrice
                      : product?.PretailPrice}
                  </td>

                  <td className="px-4 py-3 font-mono">
                    ৳{" "}
                    {product.category === "metal"
                      ? product?.KgretailDiscountPrice
                      : product?.PretailDiscountPrice}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        title="View"
                        onClick={() => setViewProduct(product)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      >
                        <FaEye />
                      </button>

                      {viewProduct && (
                        <ViewProductModal
                          product={viewProduct}
                          closeModal={() => setViewProduct(null)}
                        />
                      )}

                      <button
                        onClick={() => handleUpdate(product)}
                        title="Update"
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                      >
                        <FaEdit />
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          handleDelete(product._id, product.productName)
                        }
                        className="p-2 bg-red-600 hover:bg-red-700 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurProducts;
