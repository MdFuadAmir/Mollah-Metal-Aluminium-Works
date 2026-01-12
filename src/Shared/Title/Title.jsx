const Title = ({ title, subTitle }) => {
  return (
    <div className="text-center mb-14">
      <h1 data-aos="fade-right" className="text-4xl font-bold mb-4 text-white">
        {title}
      </h1>
      <p data-aos="fade-left" className="text-gray-300 max-w-2xl mx-auto">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
