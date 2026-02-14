import { Link } from "react-router";
import MMAW from "../../Shared/MMAW/MMAW";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import footerbg1 from "../../assets/bg-images/blk5.jpg";
const Footer = () => {
  return (
    <div
      className="mx-auto absolute bg-cover bg-center w-full px-4 md:px-10 lg:px-20 pt-8 bg-black/50 mt-12"
      style={{
        backgroundImage: `url(${footerbg1})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* col-1 */}
        <div className="flex flex-col col-span-2">
          <MMAW />
          <p className="font-bold text-gray-300 mt-4 text-center">
            <b className="text-xl leading-tight bg-linear-to-r from-orange-500 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস
            </b>
            <br />
            <span className="text-sm">
              রান্নাঘরের জন্য প্রয়োজনীয় সকল অ্যালুমিনিয়াম কুকওয়্যার পণ্যের
              নির্ভরযোগ্য ঠিকানা।
            </span>
          </p>
          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://www.facebook.com/mahafuzurrohman.fuad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl text-blue-500 hover:text-orange-500 duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/mdfuadamir/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl text-sky-500 hover:text-orange-500 duration-300" />
            </a>
            <a
              href="https://www.instagram.com/fuad_amir_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram className="text-2xl text-pink-500 hover:text-orange-500 duration-300" />
            </a>
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* col-2 */}
          <nav className="flex flex-col space-y-2 text-gray-500">
            <h6 className="font-bold text-lg  text-gray-300">Services</h6>
            <a className="link link-hover">ব্র্যান্ডিং</a>
            <a className="link link-hover">নকশা</a>
            <a className="link link-hover">ফ্ল্যাশ ডেলিভারি</a>
            <a className="link link-hover">কাস্টম অর্ডার</a>
          </nav>
          {/* col-3 */}
          <nav className="flex flex-col space-y-2 text-gray-500">
            <h6 className="font-bold text-lg  text-gray-300">কোম্পানি</h6>
            <Link to={"/about"} className="link link-hover">
              আমাদের সম্পর্কে
            </Link>
            <Link to={"/products"} className="link link-hover">
              পণ্যসমূহ
            </Link>
            <Link to={"/"} className="link link-hover">
              {" "}
              মতামত দিন
            </Link>
            <Link to={"/contact"} className="link link-hover">
              যোগাযোগ
            </Link>
          </nav>
          {/* col-4 */}
          <nav className="flex flex-col space-y-2 text-gray-500">
            <h6 className="font-bold text-lg  text-gray-300">নীতিমালা</h6>
            <a className="link link-hover">ব্যবহারের শর্তাবলী</a>
            <a className="link link-hover">গোপনীয়তা নীতি</a>
            <a className="link link-hover">রিফান্ড নীতি</a>
            <a className="link link-hover">ডেলিভারি তথ্য</a>
          </nav>
          {/* col-5 */}
          <nav className="flex flex-col space-y-2 text-gray-300">
            <p>
              <span className="text-white">ঠিকানা:</span> কুষ্টিয়া কাটাইখানা
              মোড় কুষ্টিয়া, বাংলাদেশ
            </p>
            <p>
              <span className="text-white">ফোন:</span> +8801705470131
            </p>
            <p>
              <span className="text-white">ইমেইল:</span> mdfuadamir@gmail.com
            </p>
          </nav>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-center p-4 text-gray-300">
          Copyright © {new Date().getFullYear()} মোল্লা মেটাল অ্যালুমিনিয়াম
          ওয়ার্কস | সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>
    </div>
  );
};

export default Footer;
