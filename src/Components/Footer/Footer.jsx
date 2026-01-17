import { Link } from "react-router";
import MMAW from "../../Shared/MMAW/MMAW";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="mx-auto absolute w-full px-4 md:px-10 lg:px-20 pt-8 bg-black/50 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* col-1 */}
        <div className="flex flex-col">
          <MMAW />
          <p className="font-bold text-gray-300 mt-4">
            Md Fuad Amir
            <br />
            Providing reliable tech since 2026
          </p>
          <div className="flex items-center gap-6 mt-4">
            <Link>
              <FaFacebook className="text-2xl text-white hover:text-orange-500 duration-300" />
            </Link>
            <Link>
              <FaLinkedin className="text-2xl text-white hover:text-orange-500 duration-300" />
            </Link>
            <Link>
              <FaSquareInstagram className="text-2xl text-white hover:text-orange-500 duration-300" />
            </Link>
            <Link>
              <FaTwitter className="text-2xl text-white hover:text-orange-500 duration-300" />
            </Link>
          </div>
        </div>
        {/* col-2 */}
        <nav className="flex flex-col space-y-2 text-gray-200">
          <h6 className="font-bold text-lg  text-gray-400">
            Services
          </h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        {/* col-3 */}
        <nav className="flex flex-col space-y-2 text-gray-200">
          <h6 className="font-bold text-lg  text-gray-400">
            Company
          </h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        {/* col-4 */}
        <nav className="flex flex-col space-y-2 text-gray-200">
          <h6 className="font-bold text-lg  text-gray-400">
            Legal
          </h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
      <div>
        <p className="text-center p-4 text-gray-300">
          Copyright © {new Date().getFullYear()} - Md Fuad Amir All right
          reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
