import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const axiosPublic = useAxios();

    const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Backend payload
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "user",
        status: "verified",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Send user to backend, but don't block navigate on error
      try {
        await axiosPublic.post("/users", userInfo);
      } catch (err) {
        console.warn("Backend user creation failed, continue anyway.", err);
      }

      toast.success("Login Success !!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed!");
    }
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
