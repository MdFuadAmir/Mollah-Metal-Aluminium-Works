import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateProductModal = ({ product, closeModal, axiosSecure, refetch }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/dashboard/products/${product._id}`, formData);
      toast.success("Product updated successfully");
      refetch();
      closeModal();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-black text-white rounded-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">পণ্য আপডেট করুন</h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="productName"
            value={formData.productName || ""}
            onChange={handleChange}
            placeholder="পণ্যের নাম"
            className="input input-bordered bg-black/40"
          />

          <input
            name="size"
            value={formData.size || ""}
            onChange={handleChange}
            placeholder="সাইজ"
            className="input input-bordered bg-black/40"
          />

          <input
            name="avgWaight"
            value={formData.avgWaight || ""}
            onChange={handleChange}
            placeholder="ওজন"
            className="input input-bordered bg-black/40"
          />

          <input
            name="brandName"
            value={formData.brandName || ""}
            onChange={handleChange}
            placeholder="ব্র্যান্ড"
            className="input input-bordered bg-black/40"
          />

          <input
            name="retailPrice"
            value={formData.retailPrice || ""}
            onChange={handleChange}
            placeholder="খুচরা মূল্য"
            className="input input-bordered bg-black/40"
          />

          <input
            name="wholesalePrice"
            value={formData.wholesalePrice || ""}
            onChange={handleChange}
            placeholder="পাইকারি মূল্য"
            className="input input-bordered bg-black/40"
          />

          <input
            name="stokc"
            value={formData.stokc || ""}
            onChange={handleChange}
            placeholder="স্টক (kg)"
            className="input input-bordered bg-black/40"
          />

          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="select select-bordered bg-black/40"
          >
            <option value="in-stock">In Stock</option>
            <option value="out-stock">Out of Stock</option>
          </select>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button type="button" onClick={closeModal} className="btn btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-success btn-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
