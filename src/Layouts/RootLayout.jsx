import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="min-h-screen max-w-650 mx-auto px-4 pt-22 md:px-10 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
