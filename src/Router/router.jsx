import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Products/Products";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardForAll from "../Pages/Dashboard/Common/DashboardForAll/DashboardForAll";
import ManageUsers from "../Pages/Dashboard/Admin/UserManagement/ManageUsers/ManageUsers";
import OurProducts from "../Pages/Dashboard/Admin/OurProducts/OurProducts";
import AddProducts from "../Pages/Dashboard/Admin/AddProducts/AddProducts";
import AllVautchers from "../Pages/Dashboard/Admin/AllVautchers/AllVautchers";
import ManageOrders from "../Pages/Dashboard/Admin/OrdersManagement/ManageOrders/ManageOrders";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Forbidden from "../Components/Forbidden/Forbidden";
import Admin from "../Routes/Admin";
import Moderator from "../Routes/Modarator";
import ManageAdminModerator from "../Pages/Dashboard/Admin/UserManagement/ManageAdminModerator/ManageAdminModerator";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";
import Processing from "../Pages/Dashboard/Admin/OrdersManagement/Processing/Processing";
import Returned from "../Pages/Dashboard/Admin/OrdersManagement/Returned/Returned";
import Cancelled from "../Pages/Dashboard/Admin/OrdersManagement/Cancelled/Cancelled";
import Delivered from "../Pages/Dashboard/Admin/OrdersManagement/Delivered/Delivered";
import Shipping from "../Pages/Dashboard/Admin/OrdersManagement/Shipping/Shipping";

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
        element: <Profile />,
      },
      {
        path: "manage-admin&moderators",
        element: (
          <Admin>
            <ManageAdminModerator />
          </Admin>
        ),
      },
      {
        path: "manage-users",
        element: (
          <Admin>
            <ManageUsers />
          </Admin>
        ),
      },
      {
        path: "add-products",
        element: (
          <Admin>
            <Moderator>
              <AddProducts />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "our-products",
        element: (
          <Admin>
            <Moderator>
              <OurProducts />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <Admin>
            <Moderator>
              <ManageOrders />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "processing-orders",
        element: (
          <Admin>
            <Moderator>
              <Processing />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "shipped-orders",
        element: (
          <Admin>
            <Moderator>
              <Shipping />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "delivered-orders",
        element: (
          <Admin>
            <Moderator>
              <Delivered />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "Cancelled-orders",
        element: (
          <Admin>
            <Moderator>
              <Cancelled />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "returned-orders",
        element: (
          <Admin>
            <Moderator>
              <Returned />
            </Moderator>
          </Admin>
        ),
      },
      {
        path: "all-receipts",
        element: (
          <Admin>
            <Moderator>
              <AllVautchers />
            </Moderator>
          </Admin>
        ),
      },
    ],
  },
]);
export default router;
