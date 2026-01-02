import Marquee from "react-fast-marquee";

const News = () => {
  return (
    <div className="flex items-center">
      <p className="text-orange-500 font-bold uppercase bg-gray-700/40 py-3 px-2">News:-</p>
      <Marquee className="text-white" autoFill pauseOnHover>
        <p className="bg-gray-700/40 py-3 mr-8 px-4">
          Mollah Metal Aluminium Works (MMAW) is a trusted name in metal &
          aluminium fabrication, delivering quality, strength, and reliability.
        </p>
      </Marquee>
    </div>
  );
};

export default News;
