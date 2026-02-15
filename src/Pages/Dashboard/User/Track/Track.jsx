import { useState } from "react";
import {
  FaClipboardList,
  FaCogs,
  FaTruck,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

const steps = [
  {
    key: "pending",
    title: "পেন্ডিং",
    subtitle: "অর্ডার গ্রহণ করা হয়েছে",
    icon: FaClipboardList,
  },
  {
    key: "processing",
    title: "প্রসেসিং",
    subtitle: "অর্ডার প্রস্তুত করা হচ্ছে",
    icon: FaCogs,
  },
  {
    key: "shipping",
    title: "শিপিং",
    subtitle: "ডেলিভারির পথে রয়েছে",
    icon: FaTruck,
  },
  {
    key: "delivered",
    title: "ডেলিভারড",
    subtitle: "অর্ডার সফলভাবে পৌঁছেছে",
    icon: FaCheckCircle,
  },
];

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const handleSearch = () => {
    if (!orderId) return;
    setStatus("shipping");
  };

  const activeIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="p-6 md:p-8 ">
      <div className="max-w-4xl mx-auto p-6 bg-black/40 rounded-xl shadow-xl">
        {/* title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Track Your Orders By Order Id
          </h2>
          <p className="text-gray-500 text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
            dolorem.{" "}
          </p>
        </div>
        {/* 🔍 Search */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="অর্ডার আইডি লিখুন"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
          >
            <FaSearch /> সার্চ
          </button>
        </div>

        {/* 📊 Columns */}
        <div className="grid grid-cols-1 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeIndex;

            return (
              <div
                key={step.key}
                className={`relative p-4 rounded-xl border transition-all duration-300 flex items-center gap-6
              ${
                isActive
                  ? "bg-orange-500/10 border-orange-500"
                  : "bg-gray-900/60 border-gray-700"
              }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl 
                ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
                >
                  <Icon />
                </div>

                <div>
                  {/* Text */}
                  <h3
                    className={`text-lg font-bold ${
                      isActive ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">{step.subtitle}</p>
                </div>

                {/* Status Badge */}
                {isActive && (
                  <span className="absolute top-4 right-4 text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
                    সম্পন্ন
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Track;
