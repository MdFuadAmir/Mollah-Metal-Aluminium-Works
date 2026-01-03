import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log("current-user:", user);
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          role: "user",
          status: "verified",
        };
        await axiosInstance.post("/users", userInfo);
        toast.success("Login Success !!");
        console.log("Current_user", userInfo);
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div className="pt-6">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-4 px-4 py-2 bg-gray-800/50 text-gray-300 w-full rounded-lg justify-center"
      >
        <FaGoogle />
        Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
