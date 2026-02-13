const Title = ({ title, subTitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold leading-tight bg-linear-to-r from-orange-600 via-indigo-500 to-indigo-800 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">{subTitle}</p>
    </div>
  );
};

export default Title;
