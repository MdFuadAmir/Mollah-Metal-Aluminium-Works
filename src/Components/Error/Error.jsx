import { FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/50 text-center px-4">
      <FaExclamationTriangle className="text-orange-500 text-6xl mb-4" />

      <h1 className="text-4xl font-bold text-white mb-2">
        404
      </h1>

      <p className="text-gray-300 mb-6">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>

      <NavLink
        to="/"
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
      >
        হোম পেজে ফিরে যান
      </NavLink>
    </div>
  );
};

export default Error;
