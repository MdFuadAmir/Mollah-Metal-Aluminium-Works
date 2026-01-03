import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Products/Products";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardForAll from "../Pages/Dashboard/Common/DashboardForAll/DashboardForAll";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import OurProducts from "../Pages/Dashboard/Admin/OurProducts/OurProducts";
import CompletedOrders from "../Pages/Dashboard/Admin/CompletedOrders/CompletedOrders";
import AddProducts from "../Pages/Dashboard/Admin/AddProducts/AddProducts";
import AllVautchers from "../Pages/Dashboard/Admin/AllVautchers/AllVautchers";
import ManageOrders from "../Pages/Dashboard/Admin/ManageOrders/ManageOrders";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import SocialLogin from "../Authentication/SocialLogin/SocialLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        Component: DashboardForAll,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "add-products",
        Component: AddProducts,
      },
      {
        path: "our-products",
        Component: OurProducts,
      },
      {
        path: "manage-orders",
        Component: ManageOrders,
      },
      {
        path: "completed-orders",
        Component: CompletedOrders,
      },

      {
        path: "all-vautchers",
        Component: AllVautchers,
      },
    ],
  },
]);
export default router;
