import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["update", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
    retry: false,
  });

  const selectedCategory = product?.category || "";

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        category: product.category,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const { _id, ...patchData } = data;
      await axiosSecure.patch(`/products/${id}`, patchData);
      toast.success("পণ্য সফলভাবে আপডেট করা হয়েছে");
      navigate("/dashboard/our-products");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  if (isLoading || !product) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-black/50 my-12 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">
        পণ্য আপডেট করুন <span className="text-xs">({product._id})</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input type="hidden" {...register("category")} />

        {/* Product Name */}
        <div>
          <label className="text-gray-300 text-sm">পণ্যের নাম *</label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="text-gray-300 text-sm">ব্র্যান্ড নাম *</label>
          <input
            type="text"
            {...register("brand", { required: true })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>

        {/* Pricing */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              খুচরা মূল্য (প্রতি পিস) *
            </label>
            <input
              type="number"
              {...register("PretailPrice", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              খুচরা মূল্য (প্রতি কেজি) *
            </label>
            <input
              type="number"
              {...register("KgretailPrice", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              ছাড়ের পর খুচরা মূল্য (প্রতি পিস)
            </label>
            <input
              type="number"
              {...register("PretailDiscountPrice")}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              ছাড়ের পর খুচরা মূল্য (প্রতি কেজি)
            </label>
            <input
              type="number"
              {...register("KgretailDiscountPrice")}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              পাইকারি মূল্য (প্রতি পিস) *
            </label>
            <input
              type="number"
              {...register("PwholesalePrice", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              পাইকারি মূল্য (প্রতি কেজি) *
            </label>
            <input
              type="number"
              {...register("KgwholesalePrice", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              ছাড়ের পর পাইকারি মূল্য (প্রতি পিস)
            </label>
            <input
              type="number"
              {...register("PWholeSellDiscountPrice")}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              ছাড়ের পর পাইকারি মূল্য (প্রতি কেজি)
            </label>
            <input
              type="number"
              {...register("KgWholeSellDiscountPrice")}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              স্টক পরিমাণ (পিস) *
            </label>
            <input
              type="text"
              {...register("Pstock", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              স্টক পরিমাণ (কেজি) *
            </label>
            <input
              type="text"
              {...register("Kgstock", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              পণ্যের আনুমানিক ওজন (কেজি) *
            </label>
            <input
              type="text"
              {...register("avgWaight", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">পণ্যের সাইজ *</label>
            <input
              type="text"
              {...register("Psize", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">পণ্যের সাইজ *</label>
            <input
              type="text"
              {...register("Kgsize", { required: true })}
              className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none font-mono"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">সংক্ষিপ্ত বিবরণ *</label>
          <textarea
            rows="2"
            {...register("shortDescription", { required: true })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">বিস্তারিত বিবরণ *</label>
          <textarea
            rows="4"
            {...register("longDescription", { required: true })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">রিটার্ন পলিসি *</label>
          <textarea
            rows="3"
            {...register("returnPolecy", { required: true })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black"
          >
            পণ্য আপডেট করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
