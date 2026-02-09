import AboutUs from "../../AboutUs/AboutUs";
import ContactUs from "../../ContactUs/ContactUs";
import HomeProducts from "../../Products/HomeProducts";
import Banner from "../Banner/Banner";
import News from "../News/News";

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-32">
      <Banner />
      <News />
      <HomeProducts/>
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
