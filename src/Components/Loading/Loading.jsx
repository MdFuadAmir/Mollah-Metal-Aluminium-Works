const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/50">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-gray-300 mt-6 text-sm animate-pulse">
        লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
      </p>
    </div>
  );
};

export default Loading;
