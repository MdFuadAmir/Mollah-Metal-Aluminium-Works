import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bg1 from "../../../assets/bg-images/banner1.jpg";
import bg2 from "../../../assets/bg-images/banner2.jpg";
import bg3 from "../../../assets/bg-images/banner3.jpg";
import bg4 from "../../../assets/bg-images/blk5.jpg";
import bg5 from "../../../assets/bg-images/banner1.jpg";
import bg6 from "../../../assets/bg-images/banner.jpg";
import { Link } from "react-router";

// const slides = [
//   {
//     title: "মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস",
//     subtitle: "বাংলাদেশের বিশ্বস্ত অ্যালুমিনিয়াম কিচেন পণ্য প্রস্তুতকারক প্রতিষ্ঠান",
//     desc: "উচ্চমানের অ্যালুমিনিয়াম হাড়ি, ধামা, করাই ও ঢাকনা সরাসরি কারখানা থেকে।",
//     image: `${bg1}`,
//   },
//   {
//     title: "নতুন কিচেন কালেকশন",
//     subtitle: "আধুনিক ডিজাইন ও মানসম্মত অ্যালুমিনিয়াম কিচেন সামগ্রী",
//     desc: "দৃঢ়, হালকা ও দীর্ঘস্থায়ী অ্যালুমিনিয়াম কিচেন যন্ত্রাংশ।",
//     image: `${bg2}`,
//   },
//   {
//     title: "বাল্ক অর্ডার সুবিধা",
//     subtitle: "হোলসেল ও ব্যবসায়িক অর্ডারের জন্য বিশেষ সুবিধা",
//     desc: "আপনার ব্যবসার জন্য বড় অর্ডার গ্রহণ করা হয় সহজ শর্তে।",
//     image: `${bg3}`,
//   },
//   {
//     title: "কাস্টমাইজড অর্ডার",
//     subtitle: "আপনার প্রয়োজন অনুযায়ী কিচেন পণ্য প্রস্তুতের সুবিধা",
//     desc: "অ্যালুমিনিয়াম হাড়ি, ধামা ও করাই আপনার মাপ অনুযায়ী তৈরি করা হয়।",
//     image: `${bg4}`,
//   },
//   {
//     title: "কারখানা সরাসরি সরবরাহ",
//     subtitle: "নিজস্ব কারখানায় উৎপাদিত মানসম্মত কিচেন সামগ্রী",
//     desc: "অভিজ্ঞ কর্মী ও উন্নত মান নিয়ন্ত্রণ ব্যবস্থায় তৈরি পণ্য।",
//     image: `${bg5}`,
//   },
//   {
//     title: "বিশ্বস্ত মানের কিচেন যন্ত্রাংশ",
//     subtitle: "দৈনন্দিন রান্নার জন্য নিরাপদ ও টেকসই অ্যালুমিনিয়াম পণ্য",
//     desc: "দীর্ঘস্থায়ী ও ব্যবহারবান্ধব অ্যালুমিনিয়াম হাড়ি ও করাই।",
//     image: `${bg6}`,
//   },
// ];

const slides = [
  {
    title: "মোল্লা মেটাল অ্যালুমিনিয়াম ওয়ার্কস",
    subtitle:
      "বাংলাদেশের একটি বিশ্বস্ত ও অভিজ্ঞ অ্যালুমিনিয়াম কিচেন যন্ত্রাংশ প্রস্তুতকারী ও সরবরাহকারী প্রতিষ্ঠান",
    desc: "আমরা উন্নত মানের অ্যালুমিনিয়াম হাড়ি, ধামা, করাই ও ঢাকনা সরাসরি কারখানা থেকে উৎপাদন ও সরবরাহ করি, যা দৈনন্দিন রান্নার জন্য নিরাপদ ও টেকসই।",
    image: `${bg1}`,
  },
  {
    title: "নতুন কিচেন কালেকশন",
    subtitle:
      "আধুনিক ডিজাইন এবং মানসম্মত উপকরণে তৈরি সর্বশেষ অ্যালুমিনিয়াম কিচেন সামগ্রীর সংগ্রহ",
    desc: "এই নতুন কালেকশনে রয়েছে মজবুত, হালকা ও দীর্ঘস্থায়ী অ্যালুমিনিয়াম হাড়ি, করাই ও ঢাকনা, যা দীর্ঘদিন ব্যবহার উপযোগী।",
    image: `${bg2}`,
  },
  {
    title: "বাল্ক অর্ডার সুবিধা",
    subtitle:
      "হোলসেল ও ব্যবসায়িক গ্রাহকদের জন্য বিশেষ সুবিধাসহ বড় পরিমাণ অর্ডার গ্রহণ করা হয়",
    desc: "আপনার দোকান বা ব্যবসার প্রয়োজনে একসাথে বেশি পরিমাণ পণ্য অর্ডার করতে পারবেন সহজ শর্তে এবং প্রতিযোগিতামূলক দামে।",
    image: `${bg3}`,
  },
  {
    title: "কাস্টমাইজড অর্ডার",
    subtitle:
      "গ্রাহকের প্রয়োজন ও পছন্দ অনুযায়ী কিচেন যন্ত্রাংশ তৈরি করার বিশেষ ব্যবস্থা",
    desc: "আপনার চাহিদা অনুযায়ী নির্দিষ্ট মাপ ও ডিজাইনে অ্যালুমিনিয়াম হাড়ি, ধামা ও করাই প্রস্তুত করা হয়।",
    image: `${bg4}`,
  },
  {
    title: "কারখানা সরাসরি সরবরাহ",
    subtitle:
      "নিজস্ব কারখানায় উৎপাদিত উন্নত মানের অ্যালুমিনিয়াম কিচেন পণ্য সরাসরি গ্রাহকের কাছে পৌঁছে দেওয়া হয়",
    desc: "অভিজ্ঞ কর্মী ও কঠোর মান নিয়ন্ত্রণ প্রক্রিয়ার মাধ্যমে প্রতিটি পণ্য যাচাই করে বাজারে সরবরাহ করা হয়।",
    image: `${bg5}`,
  },
  {
    title: "বিশ্বস্ত মানের কিচেন যন্ত্রাংশ",
    subtitle:
      "দৈনন্দিন রান্নার জন্য নিরাপদ, টেকসই এবং ব্যবহারবান্ধব অ্যালুমিনিয়াম কিচেন সামগ্রী",
    desc: "আমাদের অ্যালুমিনিয়াম হাড়ি ও করাই দীর্ঘস্থায়ী, তাপ সহনশীল এবং পরিবারের প্রতিদিনের রান্নার কাজে নির্ভরযোগ্য সমাধান।",
    image: `${bg6}`,
  },
];

const Banner = () => {
  return (
    <div className="rounded-xl overflow-hidden md:pt-6 shadow-md">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        transitionTime={800}
        swipeable
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-64 md:h-150 rounded-xl">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover rounded-xl"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="px-6 md:px-16 max-w-4xl mx-auto">
                <h2 className="leading-tight bg-linear-to-r from-orange-600 via-indigo-500 to-indigo-800 bg-clip-text text-transparent text-2xl md:text-6xl font-bold mb-2">
                  {slide.title}
                </h2>
                <h4 className="text-green-400 text-sm md:text-lg mb-2">
                  {slide.subtitle}
                </h4>
                <p className="text-gray-400 text-sm md:text-base">
                  {slide.desc}
                </p>
                <div className="pt-8">
                  <Link
                    to={"/products"}
                    className="px-6 py-2 border rounded border-orange-500 text-orange-500 hover:bg-orange-500/20"
                  >
                    সমস্ত পণ্য দখুন
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
