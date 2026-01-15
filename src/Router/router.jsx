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
import ManageAdminModerator from "../Pages/Dashboard/Admin/UserManagement/ManageAdminModerator/ManageAdminModerator";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";
import Processing from "../Pages/Dashboard/Admin/OrdersManagement/Processing/Processing";
import Returned from "../Pages/Dashboard/Admin/OrdersManagement/Returned/Returned";
import Cancelled from "../Pages/Dashboard/Admin/OrdersManagement/Cancelled/Cancelled";
import Delivered from "../Pages/Dashboard/Admin/OrdersManagement/Delivered/Delivered";
import Shipping from "../Pages/Dashboard/Admin/OrdersManagement/Shipping/Shipping";
import RoleGuard from "../Routes/RoleGuard";
import ProductDetails from "../Pages/Products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/product/:id",
        Component: ProductDetails,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
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
          <RoleGuard allow={["admin"]}>
            <ManageAdminModerator />
          </RoleGuard>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleGuard allow={["admin"]}>
            <ManageUsers />
          </RoleGuard>
        ),
      },
      {
        path: "add-products",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <AddProducts />
          </RoleGuard>
        ),
      },
      {
        path: "our-products",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <OurProducts />
          </RoleGuard>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <ManageOrders />
          </RoleGuard>
        ),
      },
      {
        path: "processing-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <Processing />
          </RoleGuard>
        ),
      },
      {
        path: "shipped-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <Shipping />
          </RoleGuard>
        ),
      },
      {
        path: "delivered-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <Delivered />
          </RoleGuard>
        ),
      },
      {
        path: "cancelled-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <Cancelled />
          </RoleGuard>
        ),
      },
      {
        path: "returned-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <Returned />
          </RoleGuard>
        ),
      },
      {
        path: "all-receipts",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <AllVautchers />
          </RoleGuard>
        ),
      },
    ],
  },
]);
export default router;
