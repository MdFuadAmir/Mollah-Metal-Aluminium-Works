import AboutUs from "../../AboutUs/AboutUs";
import ContactUs from "../../ContactUs/ContactUs";
import Products from "../../Products/Products";
import Banner from "../Banner/Banner";
import News from "../News/News";

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-24">
      <Banner />
      <News />
      <Products />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
