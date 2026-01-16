const AddProductForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  productImages,
  uploading,
  handleMultiImageUpload,
  selectedCategory,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-black/50 p-8 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-6">নতুন পণ্য যোগ করুন</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* 1. Product Name */}
        <div>
          <label className="text-gray-300 text-sm">পণ্যের নাম *</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
            })}
            placeholder="অ্যালুমিনিয়াম হাঁড়ি"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
          {errors.productName && (
            <p className="text-red-600 text-sm">{errors.productName.message}</p>
          )}
        </div>
        {/* 2. Brand */}
        <div>
          <label className="text-gray-300 text-sm">ব্র্যান্ড নাম *</label>
          <input
            type="text"
            {...register("brand", {
              required: "Product brandName is required",
            })}
            placeholder="Mollah Metal Aluminium Works"
            defaultValue={"Mollah Metal Aluminium Works"}
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
          {errors.brand && (
            <p className="text-red-600 text-sm">{errors.brandName.message}</p>
          )}
        </div>
        {/* 3. Category */}
        <div>
          <label className="text-gray-300 text-sm">ক্যাটাগরি *</label>
          <select
            {...register("category", {
              required: "Product category is required",
            })}
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              ক্যাটাগরি নির্বাচন করুন
            </option>
            {/* Piece based */}
            <option value="cookware">Cookware (পিস হিসাবে বিক্রি)</option>
            {/* KG based */}
            <option value="metal">Metal Products (কেজি হিসাবে বিক্রি)</option>
          </select>

          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>
        {/* 4. sub Category 1*/}
        {selectedCategory === "cookware" && (
          <div>
            <label className="text-gray-300 text-sm">সাব ক্যাটাগরি *</label>
            <select
              {...register("subCategory", {
                required: "Sub category is required",
              })}
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Cookware নির্বাচন করুন
              </option>
              <option value="electronic">ইলেকট্রনিক আইটেম</option>
              <option value="plastic">প্লাস্টিক আইটেম</option>
              <option value="steel">স্টিল আইটেম</option>
              <option value="aluminium">অ্যালুমিনিয়াম আইটেম</option>
              <option value="combo">কম্বো প্যাকেজ</option>
            </select>

            {errors.subCategory && (
              <p className="text-red-600 text-sm">
                {errors.subCategory.message}
              </p>
            )}
          </div>
        )}
        {/* 4. sub Category 2*/}
        {selectedCategory === "metal" && (
          <div>
            <label className="text-gray-300 text-sm">সাব ক্যাটাগরি *</label>
            <select
              {...register("subCategory", {
                required: "Sub category is required",
              })}
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Metal Products নির্বাচন করুন
              </option>
              <option value="aluminium">অ্যালুমিনিয়াম</option>
              <option value="steel">স্টিল</option>
              <option value="combo">কম্বো প্যাকেজ</option>
            </select>
            {errors.subCategory && (
              <p className="text-red-600 text-sm">
                {errors.subCategory.message}
              </p>
            )}
          </div>
        )}
        {/* //========= Pricing ==============// */}
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
              placeholder="৳ ৩৫০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.PretailPrice && (
              <p className="text-red-600 text-sm">
                {errors.PretailPrice.message}
              </p>
            )}
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
              placeholder="৳ ৩৫০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.KgretailPrice && (
              <p className="text-red-600 text-sm">
                {errors.KgretailPrice.message}
              </p>
            )}
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.PwholesalePrice && (
              <p className="text-red-600 text-sm">
                {errors.PwholesalePrice.message}
              </p>
            )}
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.KgwholesalePrice && (
              <p className="text-red-600 text-sm">
                {errors.KgwholesalePrice.message}
              </p>
            )}
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
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
              placeholder="৳ ৩০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
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
              placeholder="১০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.Pstock && (
              <p className="text-red-600 text-sm">{errors.Pstock.message}</p>
            )}
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
              placeholder="১০০"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.Kgstock && (
              <p className="text-red-600 text-sm">{errors.Kgstock.message}</p>
            )}
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
              placeholder="2.5 kg / 0.700 grm "
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.avgWaight && (
              <p className="text-red-600 text-sm">{errors.avgWaight.message}</p>
            )}
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
              placeholder="sm / md / lg / combo"
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.Psize && (
              <p className="text-red-600 text-sm">{errors.Psize.message}</p>
            )}
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
              placeholder="10 / 12 / 16 "
              className="w-full mt-1 p-2 rounded bg-black/70 outline-none font-mono"
            />
            {errors.Kgsize && (
              <p className="text-red-600 text-sm">{errors.Kgsize.message}</p>
            )}
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
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
          {errors.shortDescription && (
            <p className="text-red-600 text-sm">
              {errors.shortDescription.message}
            </p>
          )}
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
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
          {errors.longDescription && (
            <p className="text-red-600 text-sm">
              {errors.longDescription.message}
            </p>
          )}
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
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
          {errors.returnPolecy && (
            <p className="text-red-600 text-sm">
              {errors.returnPolecy.message}
            </p>
          )}
        </div>
        {/* 15. Image Upload */}
        <div className="flex flex-wrap gap-4 my-6">
          {/* Upload Input (NO register) */}
          <input
            type="file"
            multiple
            onChange={handleMultiImageUpload}
            className="w-full px-4 py-3 rounded-lg border cursor-pointer dark:text-gray-200 dark:bg-gray-700"
          />
          {/* Hidden form field */}
          <input
            type="hidden"
            {...register("images", { required: "At least 1 image needed" })}
          />
          {/* preview */}
          {productImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt=""
                className="w-24 h-24 rounded object-cover border"
              />
            </div>
          ))}

          {errors.images && (
            <p className="text-red-600 text-sm">{errors.images.message}</p>
          )}
        </div>
        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black"
          >
            {uploading ? "Image Uploading..." : "পণ্য যোগ করুন"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;