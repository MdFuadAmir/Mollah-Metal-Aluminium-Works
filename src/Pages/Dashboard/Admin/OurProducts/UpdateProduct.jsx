import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import { useEffect, } from "react";
import toast from "react-hot-toast";

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
  });

  const selectedCategory = product?.category;

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);


  const onSubmit =async (data) => {
    try{
       await axiosSecure.patch(`/products/${id}`,data); 
       toast.success("পণ্য সফলভাবে আপডেট করা হয়েছে")
       navigate("/dashboard/our-products")

    }catch(error){
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
        {/* 1. Product Name */}
        <div>
          <label className="text-gray-300 text-sm">পণ্যের নাম *</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
            })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>
        {/* 2. Brand */}
        <div>
          <label className="text-gray-300 text-sm">ব্র্যান্ড নাম *</label>
          <input
            type="text"
            {...register("brand", {
              required: "Product brandName is required",
            })}
            className="w-full mt-1 p-2 rounded bg-black/70 text-white outline-none"
          />
        </div>
        {/* 3.//================= Pricing =============// */}
        {/* 5. retail Price */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              খুচরা মূল্য (প্রতি পিস) *
            </label>
            <input
              type="number"
              {...register("PretailPrice", {
                required: "Product retailPrice is required",
              })}
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
              {...register("KgretailPrice", {
                required: "Product retailPrice is required",
              })}
              className="w-full text-white mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* 6. retail discount price  */}
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
              className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* 7. Wholesale price */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              পাইকারি মূল্য (প্রতি পিস) *
            </label>
            <input
              type="number"
              {...register("PwholesalePrice", {
                required: "Product wholesalePrice is required",
              })}
              className="w-full mt-1 p-2 text-white rounded bg-black/70 outline-none font-mono"
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
              {...register("KgwholesalePrice", {
                required: "Product wholesalePrice is required",
              })}
              className="w-full mt-1 p-2 text-white rounded bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* 8. Wholesale discount price */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">
              ছাড়ের পর পাইকারি মূল্য (প্রতি পিস)
            </label>
            <input
              type="number"
              {...register("PWholeSellDiscountPrice")}
              className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none font-mono"
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
        {/* 9. Stock */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">স্টক পরিমাণ (পিস) *</label>
            <input
              type="text"
              {...register("Pstock", {
                required: "Product stokc is required",
              })}
              className="w-full text-white mt-1 p-2 rounded bg-black/70 outline-none font-mono"
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
              {...register("Kgstock", {
                required: "Product stokc is required",
              })}
              className="w-full mt-1 p-2 text-white rounded bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* //=============== category spacific field =================// */}
        {/* 10. Approx Weight */}
        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">
              পণ্যের আনুমানিক ওজন (কেজি) *
            </label>
            <input
              type="text"
              {...register("avgWaight", {
                required: "Product avgWaight is required",
              })}
              className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* 11. Product Size */}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">পণ্যের সাইজ *</label>
            <input
              type="text"
              {...register("Psize", {
                required: "Product size is required",
              })}
              className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">পণ্যের সাইজ *</label>
            <input
              type="text"
              {...register("Kgsize", {
                required: "Product size is required",
              })}
              className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none font-mono"
            />
          </div>
        )}
        {/* 12. Short Description */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">সংক্ষিপ্ত বিবরণ *</label>
          <textarea
            rows="2"
            {...register("shortDescription", {
              required: "Product shortDescription is required",
              maxLength: {
                value: 70,
                message: "Maximum 70 characters allowed",
              },
            })}
            placeholder="পণ্যের সংক্ষিপ্ত বর্ণনা"
            className="w-full mt-1 p-2 text-white rounded bg-black/70 outline-none"
          />
        </div>
        {/* 13. Long Description */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">বিস্তারিত বিবরণ *</label>
          <textarea
            rows="4"
            {...register("longDescription", {
              required: "Product longDescription is required",
              minLength: {
                value: 50,
                message: "Minimum 50 characters required",
              },
            })}
            placeholder="পণ্যের বিস্তারিত বর্ণনা লিখুন"
            className="w-full mt-1 p-2 text-white rounded bg-black/70 outline-none"
          />
        </div>
        {/* 14. Return Policy */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">রিটার্ন পলিসি *</label>
          <textarea
            rows="3"
            {...register("returnPolecy", {
              required: "Product returnPolecy is required",
            })}
            placeholder="পণ্য ফেরত দেওয়ার নিয়ম"
            className="w-full mt-1 p-2 rounded text-white bg-black/70 outline-none"
          />
        </div>
        {/* Submit */}
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
