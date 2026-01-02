import AboutUs from "../../AboutUs/AboutUs";
import ContactUs from "../../ContactUs/ContactUs";
import Products from "../../Products/Products";
import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <div className="space-y-6 md:space-y-24">
            <Banner/>
            <Products/>
            <AboutUs/>
            <ContactUs/>
        </div>
    );
};

export default Home;