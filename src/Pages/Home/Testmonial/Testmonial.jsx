import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../../Components/Loading/Loading";
import MarqueeModule from "react-fast-marquee";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import Title from "../../../Shared/Title/Title";
const Marquee = MarqueeModule.default || MarqueeModule;

const Testimonial = () => {
  const axiosPublic = useAxios();
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  const [selected, setSelected] = useState(null);

  if (isLoading) return <Loading />;

  const activeFeedbacks = feedbacks.filter((item) => item.status === "active");

  if (activeFeedbacks.length === 0) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-600"}
      >
        <IoStar />
      </span>
    ));
  };

  return (
    <section className="py-20">
      <div className="mx-auto px-6">
        <Title
          title="গ্রাহক কি বলেন"
          subTitle="আমাদের পণ্যের মান ও সেবা সম্পর্কে তাদের মতামত"
        />

        <Marquee pauseOnHover speed={50} gradient={false}>
          {activeFeedbacks.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className="mx-4 w-80 h-52 cursor-pointer bg-gray-950/30 border border-white/10 p-6 rounded-xl 
              hover:border-sky-500 transition flex flex-col justify-between"
            >
              <div>
                <h4 className="font-semibold text-white text-lg">
                  {item.name}
                </h4>
                <p className="text-gray-300 text-sm">{item.email}</p>

                {/* ⭐ rating */}
                <div className="mt-1 flex gap-1">
                  {renderStars(item.rating)}
                </div>
              </div>

              <p className="text-gray-400 mt-2 line-clamp-3">{item.feedback}</p>
            </div>
          ))}
        </Marquee>

        {/* ===== MODAL ===== */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl w-[90%] max-w-md relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 text-white text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-white">{selected.name}</h3>
              <p className="text-gray-400">{selected.email}</p>

              {/* ⭐ rating in modal */}
              <div className="mt-2 flex gap-1">{renderStars(selected.rating)}</div>

              <p className="text-gray-300 mt-4">{selected.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
