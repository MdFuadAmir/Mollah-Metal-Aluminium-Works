import AboutUs from "../../AboutUs/AboutUs";
import ContactUs from "../../ContactUs/ContactUs";
import HomeProducts from "../../Products/HomeProducts";
import Banner from "../Banner/Banner";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import News from "../News/News";
import Testmonial from "../Testmonial/Testmonial";

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-32">
      <Banner />
      <News />
      <AboutUs />
      <HomeProducts/>
      <FeedbackForm/>
      <Testmonial/>
      <ContactUs />
    </div>
  );
};

export default Home;
