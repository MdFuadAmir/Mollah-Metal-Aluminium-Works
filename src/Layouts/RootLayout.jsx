import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import bg from "../assets/bg-images/body.jpg";
const RootLayout = () => {
  return (
    <div className="relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 " />
      </div>
      <Navbar />
      <main className="min-h-screen  max-w-650 mx-auto px-4 pt-22 md:px-10 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
