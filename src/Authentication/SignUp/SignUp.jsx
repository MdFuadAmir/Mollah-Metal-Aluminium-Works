import { NavLink } from "react-router";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { ImArrowLeft } from "react-icons/im";
import SocialLogin from "../SocialLogin/SocialLogin";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-300 mt-2">
            Join Mollah Metal Aluminium Works
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            {/* <label className="text-gray-300 text-sm">Full Name</label> */}
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaUser className="text-gray-300" />
              <input
                type="text"
                placeholder="Your full name"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          </div>

          <div>
            {/* <label className="text-gray-300 text-sm">Email</label> */}
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaEnvelope className="text-gray-300" />
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          </div>

          <div>
            {/* <label className="text-gray-300 text-sm">Password</label> */}
            <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded">
              <FaLock className="text-gray-300" />
              <input
                type="password"
                placeholder="Create password"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-semibold text-black">
            Sign Up
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
        <SocialLogin/>
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
