import { NavLink } from "react-router";
import MMAW from "../../Shared/MMAW/MMAW";
import DarkMood from "../DarkMode/DarkMode";
import { FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiAccountCircleFill } from "react-icons/ri";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-b-orange-500 text-orange-500"
                : "border-transparent text-gray-700 dark:text-gray-200 hover:text-orange-500 hover:border-b-orange-500"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/products"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-b-orange-500 text-orange-500"
                : "border-transparent text-gray-700 dark:text-gray-200 hover:text-orange-500 hover:border-b-orange-500"
            }`
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-b-orange-500 text-orange-500"
                : "border-transparent text-gray-700 dark:text-gray-200 hover:text-orange-500 hover:border-b-orange-500"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            `pb-1 border-b-2 transition-all duration-300 rounded-none ${
              isActive
                ? "border-b-orange-500 text-orange-500"
                : "border-transparent text-gray-700 dark:text-gray-200 hover:text-orange-500 hover:border-b-orange-500"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <DarkMood />
      </li>
    </>
  );
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full flex justify-between items-center py-2 px-4 md:px-10 lg:px-20 bg-gray-200 dark:bg-gray-800 shadow-md shadow-gray-300 dark:shadow-gray-700 ">
        <div className="flex items-center gap-6">
          {/* mobile menu section */}
          <div className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? (
              <HiOutlineMenuAlt1 className="text-3xl dark:text-white" />
            ) : (
              <MdMenu className="text-3xl dark:text-white" />
            )}
          </div>
          {/* logo section*/}
          <MMAW />
        </div>
        {/* menu section */}
        <div className="hidden lg:block">
          <ul className="flex gap-4 items-center text-gray-600 dark:text-white">
            {navLinks}
          </ul>
        </div>
        {/* icon section */}
        <div className="flex justify-center items-center gap-8">
          {/* cart */}
          <NavLink to={"/"}>
            <FaShoppingCart
              size={25}
              className="dark:text-gray-300  relative"
            />
            <p className="absolute p-1 text-[8px] rounded-full bg-red-500 text-white -mt-2 ml-3 font-mono">
              1077
            </p>
          </NavLink>
          {/* login */}
          <button className="text-green-500 px-4 py-1 rounded border hover:bg-green-200">
            Login
          </button>
          {/* <button className="text-red-500 px-4 py-1 rounded border hover:bg-red-200">
            LogOut
          </button> */}
          {/* dashboard */}
          <div className="w-12 h-12 rounded-full border dark:border-white">
            <RiAccountCircleFill className="w-full h-full dark:text-white" />
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={`lg:hidden bg-gray-200 dark:bg-gray-800 px-4 overflow-hidden transition-all duration-300 w-56 text-center rounded-b-xl
  ${open ? "max-h-fit py-4" : "max-h-0"}`}
      >
        <ul className="flex flex-col items-center gap-6 mt-6 text-gray-700 dark:text-white font-semibold">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
