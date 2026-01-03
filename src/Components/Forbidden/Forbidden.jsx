import { FaLock } from "react-icons/fa";
import { NavLink } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/50 text-center px-4">
      <FaLock className="text-red-500 text-6xl mb-4" />

      <h1 className="text-3xl font-bold text-white mb-2">
        Access Forbidden
      </h1>

      <p className="text-gray-300 max-w-md mb-6">
        দুঃখিত! এই পেজটি দেখার অনুমতি আপনার নেই।
      </p>

      <NavLink
        to="/"
        className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded text-white"
      >
        হোম পেজে ফিরে যান
      </NavLink>
    </div>
  );
};

export default Forbidden;
