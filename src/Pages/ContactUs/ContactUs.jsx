import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Title from "../../Shared/Title/Title";
import useAxios from "../../Hooks/useAxios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactUs = () => {
  const axiosPublic = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/contacts", data);
      if (res.data.success) {
        toast.success("Message sent successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="text-gray-800 dark:text-gray-100 py-8 overflow-hidden">
      {/* Header */}
      <Title
        title={`
আমাদের সাথে যোগাযোগ করুন`}
        subTitle={`কোন প্রশ্ন আছে অথবা কাস্টম ধাতু সমাধানের প্রয়োজন? MMAW-এর সাথে যোগাযোগ করুন।`}
      />

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div
            className="flex items-center gap-4"
          >
            <FaPhoneAlt className="text-2xl text-orange-500" />
            <p className="text-gray-300 font-mono">+880 1705470131</p>
          </div>

          <div
            className="flex items-center gap-4"
          >
            <FaEnvelope className="text-2xl text-orange-500" />
            <p className="text-gray-300">mdfuadamir@gmail.com</p>
          </div>

          <div
            className="flex items-center gap-4"
          >
            <FaMapMarkerAlt className="text-2xl text-orange-500" />
            <p className="text-gray-300">
              kushtia kataikhana mor kushtia, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-black/50 p-6 rounded-xl shadow space-y-4"
        >
          <div>
            <label className="block mb-1 text-gray-400">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-400">Message</label>
            <textarea
              rows="5"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className="w-full p-2 rounded border text-gray-400"
              placeholder="Your Message"
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
