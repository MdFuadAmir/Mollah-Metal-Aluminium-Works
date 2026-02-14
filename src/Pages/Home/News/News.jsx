import Marquee from "react-fast-marquee";

const News = () => {
  return (
    <div className="flex items-center overflow-hidden" data-aos="fade-down">
      <p className="text-orange-500 font-bold uppercase bg-gray-700/40 py-3 px-2">
        News:-
      </p>
      <Marquee className="text-white" autoFill pauseOnHover>
        <p className="bg-gray-700/40 py-3 mr-8 px-4">
          মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস (MMAW) ধাতু ও অ্যালুমিনিয়াম
          তৈরিতে একটি বিশ্বস্ত নাম, যা গুণমান, শক্তি এবং নির্ভরযোগ্যতা প্রদান
          করে।
        </p>
        <p className="bg-gray-700/40 py-3 mr-8 px-4 text-orange-500">
          আমাদের ঠিকানা: কুষ্টিয়া কাটাইখানা মোড় কুষ্টিয়া, বাংলাদেশ | মোবাইল:
          01711200340 , 01705470131
        </p>
      </Marquee>
    </div>
  );
};

export default News;
