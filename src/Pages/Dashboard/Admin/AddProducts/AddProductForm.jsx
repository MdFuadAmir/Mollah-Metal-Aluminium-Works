import { useState } from "react";

const AddProductForm = () => {
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-black/50 p-8 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-6">
        নতুন পণ্য যোগ করুন
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Product Name */}
        <div>
          <label className="text-gray-300 text-sm">পণ্যের নাম</label>
          <input
            type="text"
            placeholder="অ্যালুমিনিয়াম হাঁড়ি"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 2. Product Size */}
        <div>
          <label className="text-gray-300 text-sm">পণ্যের সাইজ</label>
          <input
            type="text"
            placeholder="ছোট / মাঝারি / বড়"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 3. Approx Weight */}
        <div>
          <label className="text-gray-300 text-sm">
           পণ্যের আনুমানিক ওজন (কেজি)
          </label>
          <input
            type="text"
            placeholder="২.৫"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 4. Brand */}
        <div>
          <label className="text-gray-300 text-sm">ব্র্যান্ড নাম</label>
          <input
            type="text"
            placeholder="Mollah Metal Aluminium Works"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 5. Price */}
        <div>
          <label className="text-gray-300 text-sm">
            খুচরা মূল্য (প্রতি কেজি)
          </label>
          <input
            type="number"
            placeholder="৳ ৩৫০"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 6. Wholesale */}
        <div>
          <label className="text-gray-300 text-sm">
            পাইকারি মূল্য (প্রতি কেজি)
          </label>
          <input
            type="text"
            placeholder="৳ ৩০০"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 10. Category */}
        <div>
          <label className="text-gray-300 text-sm">ক্যাটাগরি</label>
          <select className="w-full mt-1 p-2 rounded bg-black/70 outline-none">
            <option>ক্যাটাগরি নির্বাচন করুন</option>
            <option>হাঁড়ি</option>
            <option>ডেকচি</option>
            <option>কড়াই</option>
            <option>ঢাকনা</option>
            <option>কাস্টম পণ্য</option>
          </select>
        </div>

        {/* Extra: Stock Qty */}
        <div>
          <label className="text-gray-300 text-sm">
            স্টক পরিমাণ (কেজি)
          </label>
          <input
            type="number"
            placeholder="১০০"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 7. Short Description */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">
            সংক্ষিপ্ত বিবরণ
          </label>
          <textarea
            rows="2"
            placeholder="পণ্যের সংক্ষিপ্ত বর্ণনা"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 8. Long Description */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">
            বিস্তারিত বিবরণ
          </label>
          <textarea
            rows="4"
            placeholder="পণ্যের বিস্তারিত বর্ণনা লিখুন"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* 9. Return Policy */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">
            রিটার্ন পলিসি
          </label>
          <textarea
            rows="3"
            placeholder="পণ্য ফেরত দেওয়ার নিয়ম"
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="text-gray-300 text-sm">
            পণ্যের ছবি আপলোড করুন
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="w-full mt-1 p-2 rounded bg-black/70 outline-none"
          />

          {/* Review Image */}
          {preview && (
      <img
        src={preview}
        alt="Preview"
        className="w-32 h-32 rounded"
      />
    )}
        </div>

        {/* Product Status */}
        <div>
          <label className="text-gray-300 text-sm">
            পণ্যের স্ট্যাটাস
          </label>
          <select className="w-full mt-1 p-2 rounded bg-black/70 outline-none">
            <option>in-stock</option>
            <option>out-of-stock</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black"
          >
            পণ্য যোগ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
