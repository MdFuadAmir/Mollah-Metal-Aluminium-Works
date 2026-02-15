import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRocket } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import useAxios from "../../../Hooks/useAxios";
const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const axiosPublic = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      rating: 5,
    },
  });

  const onSubmit = async (data) => {
    try {
      const finalData = {
        ...data,
        status: "requested",
      };
      const res = await axiosPublic.post("/feedbacks", finalData);
      if (res.data.success) {
        toast.success("Thanks for your feedback");
        reset({
          name: "",
          email: "",
          feedback: "",
          rating: 5,
        });

        setRating(5);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 overflow-hidden">
      <Helmet>
        <title>Feedback | MMAW</title>
        <meta name="description" content="Feedback MMAW" />
      </Helmet>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div className="w-full md:max-w-lg mx-auto ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 bg-gray-950/40 p-6 rounded-xl border border-white/10"
          >
            {/* Name */}
            <div>
              <input
                type="email"
                placeholder="Your email"
                {...register("email", { required: "emial is required" })}
                className="w-full bg-transparent border border-white/10 px-3 py-2 rounded outline-none text-white"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent border border-white/10 px-3 py-2 rounded outline-none text-white"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* ⭐ Star Rating */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Your Rating</p>
              <div className="flex gap-2 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => {
                      setRating(star);
                      setValue("rating", star);
                    }}
                    className={
                      star <= rating
                        ? "text-yellow-400 hover:scale-125 duration-200"
                        : "text-gray-500 hover:scale-125 duration-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <input type="hidden" {...register("rating")} />
            </div>

            {/* Feedback */}
            <div>
              <textarea
                rows="3"
                placeholder="Write your feedback..."
                maxLength={400}
                {...register("feedback", {
                  required: "Feedback is required",
                })}
                className="w-full bg-transparent border border-white/10 p-3 rounded outline-none text-white"
              />
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Be Honest</p>
                <p className="text-gray-400 text-sm">Maximum 400 letters</p>
              </div>
            </div>
            {errors.feedback && (
              <p className="text-red-400 text-sm">{errors.feedback.message}</p>
            )}

            <button
              disabled={isSubmitting}
              className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-black py-2 rounded font-semibold disabled:opacity-50"
            >
              {isSubmitting ? "Submiting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
        {/* 🌟 RIGHT — CONTENT */}
        <div className="relative w-full md:w-1/2 space-y-6 text-center md:text-left">
          {/* accent bar */}
          <div className="absolute -left-6 top-2 h-20 w-1 bg-sky-400 rounded-full hidden md:block"></div>

          <h3 className="text-4xl font-bold leading-tight bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            আপনার মতামত আমাদের জন্য অমূল্য
          </h3>

          <p className="text-gray-400 max-w-md">
            মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস (MMAW) সর্বদা উন্নতমানের পণ্য ও
            সেবা দেওয়ার চেষ্টা করে। আপনার মূল্যবান মতামত আমাদেরকে আরও ভালোভাবে
            বুঝতে সাহায্য করে, কী কাজ করছে, কী পরিবর্তনের প্রয়োজন এবং কিভাবে
            আমরা আপনাকে আরও সন্তুষ্ট করতে পারি। দয়া করে আপনার খোলামেলা মতামত
            দিন – আমরা তা খুব গুরুত্বের সঙ্গে বিবেচনা করব।
          </p>

          {/* feature pills */}

          <div className="flex gap-4 flex-wrap justify-center md:justify-start mt-6">
            {[
              { icon: <FaRocket />, text: "দ্রুত" },
              { icon: <MdOutlineCleaningServices />, text: "পরিষ্কার" },
              { icon: <HiSparkles />, text: "আধুনিক" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-sky-400 text-lg">{item.icon}</span>
                <span className="text-sm font-medium text-white">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
