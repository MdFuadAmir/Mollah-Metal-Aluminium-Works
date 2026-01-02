import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Products/Products";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardForAll from "../Pages/Dashboard/Common/DashboardForAll/DashboardForAll";

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
    element: <p>Auth Layout</p>,
    children: [
      {
        path: "/login",
        Component: <p>ajbf</p>,
      },
      {
        path: "/signUp",
        Component: <p>ajbf</p>,
      },
    ],
  },
  {
    path:'/dashboard',
    element:<DashboardLayout/>,
    children:[
      {
        index:true,
        Component: DashboardForAll,
      },
    ]
  }
]);
export default router;
