import { FaIndustry, FaTools, FaHandshake } from "react-icons/fa";
import amirHanza from "../../assets/owners/amir.jpg";
import maruf from "../../assets/owners/maruf.jpg";
import arafa from "../../assets/owners/araf.png";
import fuad from "../../assets/owners/fuad.png";
import arefin from "../../assets/owners/arefin.jpg";
import Title from "../../Shared/Title/Title";
const AboutUs = () => {
  return (
    <div className="py-8 overflow-hidden">
      {/* Header */}

      <Title
        title={"MMAW সম্পর্কে"}
        subTitle={`মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস (MMAW) একটি বিশ্বস্ত প্রতিষ্ঠান, যা মানসম্মত, টেকসই ও নির্ভরযোগ্য অ্যালুমিনিয়াম রান্নার সামগ্রী উৎপাদন ও সরবরাহ করে।`}
      />
      {/* Company Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-black/50 p-6 rounded-xl shadow">
          <FaIndustry className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">আমরা কে?</h3>
          <p className="text-sm text-gray-300">
            আমরা একটি অ্যালুমিনিয়াম ও ধাতব পণ্য প্রস্তুতকারক প্রতিষ্ঠান। আমরা তয়
            হাড়ি, ধামা, সেলনচি, ঘোড়া, কড়াই ঢাকনা, হাঁড়ির ঢাকনা এবং কাস্টম
            ডিজাইনের অ্যালুমিনিয়াম পণ্য তৈরি করি।
          </p>
        </div>

        <div className="bg-black/50 p-6 rounded-xl shadow">
          <FaTools className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">
            আমরা কি করি?
          </h3>
          <p className="text-sm text-gray-300">
            কাঁচামাল সংগ্রহ থেকে শুরু করে চূড়ান্ত পণ্য তৈরি পর্যন্ত প্রতিটি ধাপে
            আমরা নিখুঁত কারিগরি দক্ষতা, টেকসই গঠন এবং আধুনিক ডিজাইন নিশ্চিত করি।
          </p>
        </div>

        <div className="bg-black/50 p-6 rounded-xl shadow">
          <FaHandshake className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">
            কেন আমাদের ওপর আস্থা রাখবেন?
          </h3>
          <p className="text-sm text-gray-300">
            দক্ষ কারিগর, উন্নতমানের কাঁচামাল, ন্যায্য মূল্য এবং গ্রাহক
            সন্তুষ্টিই আমাদের প্রধান লক্ষ্য ও শক্তি।
          </p>
        </div>
      </div>

      {/* Owner & Developer Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Owner */}
        <div className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center">
          <img
            src={amirHanza}
            alt="Owner"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">Owner</h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">মোঃ আমির হামজা</b> – মোল্লা মেটাল
              অ্যালুমিনিয়াম ওয়ার্কস-এর প্রতিষ্ঠাতা ও মালিক। অ্যালুমিনিয়াম
              রান্নার সামগ্রী উৎপাদনে তার রয়েছে দীর্ঘদিনের অভিজ্ঞতা।
            </p>
          </div>
        </div>
        {/* partner */}
        <div className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center">
          <img
            src={arefin}
            alt="Company Partner"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">Partner</h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">আরেফিন কালাম</b> – মোল্লা মেটাল
              অ্যালুমিনিয়াম ওয়ার্কস-এর অংশীদার। তিনি ব্যবসায়িক উন্নয়ন, আর্থিক
              পরিকল্পনা এবং পার্টনারশিপ ব্যবস্থাপনায় গুরুত্বপূর্ণ ভূমিকা পালন
              করছেন।
            </p>
          </div>
        </div>

        {/* adviser */}
        <div className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center">
          <img
            src={maruf}
            alt="Adviser"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">Adviser</h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">মারুফ হাসান</b> – মোল্লা মেটাল
              অ্যালুমিনিয়াম ওয়ার্কস-এর উপদেষ্টা। তিনি ব্যবসায়িক কৌশল নির্ধারণ,
              দিকনির্দেশনা এবং দীর্ঘমেয়াদি পরিকল্পনায় পরামর্শ প্রদান করেন।
            </p>
          </div>
        </div>
        {/* Managing Director */}
        <div className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center">
          <img
            src={arafa}
            alt="Managing Director"
            className="w-24 h-24 rounded-full object-cover border bg-white"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-400">
              Managing Director
            </h3>
            <p className="text-gray-300 mt-1">
              <b className="text-orange-500">শাহরিয়ার আরাফা</b> – মোল্লা মেটাল
              অ্যালুমিনিয়াম ওয়ার্কস-এর ব্যবস্থাপনা পরিচালক। তিনি কারখানার
              সার্বিক কার্যক্রম, উৎপাদন ব্যবস্থাপনা, গুণগত মান নিয়ন্ত্রণ এবং
              সময়মতো পণ্য সরবরাহ নিশ্চিত করেন।
            </p>
          </div>
        </div>
      </div>
      {/* Developer */}
      <div className="bg-black/50 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-center w-full md:w-1/2 mt-10 mx-auto">
        <img
          src={fuad}
          alt="Developer"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <h3 className="text-xl font-semibold text-gray-400">Web Manager</h3>
          <p className="text-gray-300 mt-1">
            <b className="text-orange-500">মোঃ ফুয়াদ আমির</b> – মোল্লা মেটাল
            অ্যালুমিনিয়াম ওয়ার্কস-এর ব্যবসায়িক কার্যক্রম ও অনলাইন অর্ডার সিস্টেম
            পরিচালনা করেন। তিনি ওয়েবসাইট ম্যানেজমেন্ট এবং ডিজিটাল সেবার মাধ্যমে
            গ্রাহকদের সাথে সরাসরি সংযুক্ত থাকেন।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

