import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bg1 from "../../../assets/bg-images/bg-1.jpg"
import bg2 from "../../../assets/bg-images/bg2.jpg"
import bg3 from "../../../assets/bg-images/bg3.jpg"
import bg4 from "../../../assets/bg-images/bg4.jpg"
import bg5 from "../../../assets/bg-images/bg5.jpg"
import bg6 from "../../../assets/bg-images/bg6.jpg"
const slides = [
  {
    title: "Mollah Metal Aluminium Works",
    subtitle: "Trusted Aluminium Kitchen Utensils Factory",
    desc: "Quality aluminium hari, dhama, toyahari, korai and dhakna.",
    image:
      `${bg1}`,
  },
  {
    title: "New Product Update",
    subtitle: "Latest Aluminium Korai & Dhakna",
    desc: "Strong, lightweight and long-lasting kitchen utensils.",
    image:`${bg2}`,
  },
  {
    title: "Wholesale Supply Available",
    subtitle: "Bulk Order Accepted",
    desc: "Best price for wholesalers and retailers.",
    image:`${bg3}`,
  },
  {
    title: "Custom Size Orders",
    subtitle: "As Per Your Requirement",
    desc: "Custom aluminium hari, dhama & korai manufacturing.",
    image:`${bg4}`,
  },
  {
    title: "Factory Direct Production",
    subtitle: "Quality You Can Trust",
    desc: "Experienced workers & strict quality control.",
    image:`${bg5}`,
  },
  {
    title: "Factory Direct Production",
    subtitle: "Quality You Can Trust",
    desc: "Experienced workers & strict quality control.",
    image:`${bg6}`,
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
              <div className="px-6 md:px-16 max-w-xl">
                <h2 className="text-white text-xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <h4 className="text-green-400 text-sm md:text-lg mb-2">
                  {slide.subtitle}
                </h4>
                <p className="text-indigo-500/80 text-sm md:text-base">
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
