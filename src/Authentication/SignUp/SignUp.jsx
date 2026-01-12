import { NavLink, useLocation, useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import { ImArrowLeft } from "react-icons/im";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";

const SignUp = () => {
  const { signUp, updateUserProfile } = useAuth();
  const [isUploading, setIsUploading] = useState();
  const [profilePic, setProfilePic] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUploadeImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res?.data?.data?.display_url);
    setIsUploading(false);
  };

  const onSubmit = (data) => {
    signUp(data?.email, data?.password)
      .then(async (result) => {
        const user = result.user;
        console.log("Current-user:", user);
        const userInfo = {
          email: user?.email,
          role: "user",
          status: "verified",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.success && userRes.data.insertedId) {
          toast.success("Your Account has been created");
        } else {
          toast.success("User already exists");
        }
        // update user
        const updateProfile = {
          displayName: data?.name,
          photoURL: profilePic,
        };
        updateUserProfile(updateProfile)
          .then(() => {
            toast.success("update user info");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-300 mt-2">
            Join Mollah Metal Aluminium Works
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* photo */}
          <div className="items-center flex flex-col  gap-2 px-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="rounded-full w-16 h-16 object-cover border border-white p-1"
              />
            ) : (
              <FaRegUser className="rounded-full w-16 h-16 border p-1 text-white" />
            )}
            <input
              onChange={handleUploadeImage}
              type="file"
              className="rounded-full w-12 h-12 text-transparent absolute border-red-600 cursor-pointer"
              placeholder="photo"
            />
            <p className="text-xs text-gray-300">Sellect Photo</p>
          </div>

          <div>
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaUser className="text-gray-300" />
              <input
                type="text"
                {...register("fullName", { required: true })}
                placeholder="Your full name"
                className="bg-transparent outline-none text-white w-full"
              />
              {errors?.fullName?.type === "required" && (
                <span className="text-red-500 text-sm">
                  Full Name is Required
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaEnvelope className="text-gray-300" />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Your email"
                className="bg-transparent outline-none text-white w-full"
              />
              {errors?.email?.type === "required" && (
                <span className="text-red-500 text-sm">Email is Required</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaLock className="text-gray-300" />
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Create password"
                className="bg-transparent outline-none text-white w-full"
              />
              {errors?.password?.type === "required" && (
                <span className="text-red-500 text-sm">
                  Password is Required
                </span>
              )}
              {errors?.password?.type === "minLength" && (
                <span className="text-red-500 text-sm">
                  Password must be 6 charecters
                </span>
              )}
            </div>
          </div>

          <button
            disabled={isUploading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black"
          >
            {isUploading ? "Uploading Image..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-orange-400 hover:underline">
            Login
          </NavLink>
        </p>
        {/* social login */}
        <SocialLogin />
        <p className="text-center text-gray-300 text-sm mt-6 flex items-center gap-2">
          Back To Home?{" "}
          <NavLink
            to="/"
            className="text-orange-400 hover:text-orange-600 duration-300 p-2 border rounded-full"
          >
            <ImArrowLeft />
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

// consept 12/part 5
