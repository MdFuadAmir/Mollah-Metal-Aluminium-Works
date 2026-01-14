import { NavLink, useLocation, useNavigate } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ImArrowLeft } from "react-icons/im";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(async () => {
        await axiosInstance.patch("/users/last-login", {
          email: data.email,
        });
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <p className="text-gray-300 mt-2">Welcome back to MMAW</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaEnvelope className="text-gray-300" />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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

          <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-orange-400 hover:underline">
            Sign Up
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

export default Login;
