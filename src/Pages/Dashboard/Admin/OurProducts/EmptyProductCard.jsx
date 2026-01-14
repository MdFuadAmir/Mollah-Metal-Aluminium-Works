import { FaBoxOpen, FaPlus } from "react-icons/fa";
import { Link } from "react-router";

const EmptyProductCard = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-black/50 border border-gray-800 rounded-xl p-10 text-center  w-full">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 text-gray-300">
            <FaBoxOpen size={28} />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-white mb-2">
          এখনো কোনো পণ্য যোগ করা হয়নি
        </h3>

        <p className="text-gray-400 text-sm mb-6">
          আপনার স্টোরে বর্তমানে কোনো পণ্য নেই। নতুন পণ্য যোগ করলে এখানে তালিকা দেখা যাবে।
        </p>

        {/* Action Button */}
        <Link
        to={'/dashboard/add-products'}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
        >
          <FaPlus />
          নতুন পণ্য যোগ করুন
        </Link>
      </div>
    </div>
  );
};

export default EmptyProductCard;
