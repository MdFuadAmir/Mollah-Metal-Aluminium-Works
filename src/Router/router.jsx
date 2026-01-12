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
import Forbidden from "../Components/Forbidden/Forbidden";
import Admin from "../Routes/Admin";
import Moderator from "../Routes/Modarator";
import ManageAdminModerator from "../Pages/Dashboard/Admin/ManageAdminModerator/ManageAdminModerator";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";


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
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
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
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "manage-admin&moderators",
        element: <Admin><ManageAdminModerator /></Admin>,
      },
      {
        path: "manage-users",
        element: <Admin><ManageUsers /></Admin>,
      },
      {
        path: "add-products",
        element: <Admin><Moderator><AddProducts /></Moderator></Admin>,
      },
      {
        path: "our-products",
        element: <Admin><Moderator><OurProducts /></Moderator></Admin>,
      },
      {
        path: "manage-orders",
        element: <Admin><Moderator><ManageOrders /></Moderator></Admin>,
      },
      {
        path: "completed-orders",
        element: <Admin><Moderator><CompletedOrders /></Moderator></Admin>,
      },

      {
        path: "all-receipts",
        element: <Admin><Moderator><AllVautchers /></Moderator></Admin>,
      },
    ],
  },
]);
export default router;
