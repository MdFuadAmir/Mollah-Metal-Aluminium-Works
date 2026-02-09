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
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Forbidden from "../Components/Forbidden/Forbidden";
import ManageAdminModerator from "../Pages/Dashboard/Admin/UserManagement/ManageAdminModerator/ManageAdminModerator";
import Profile from "../Pages/Dashboard/Common/Profile/Profile";
import RoleGuard from "../Routes/RoleGuard";
import ProductDetails from "../Pages/Products/ProductDetails";
import UpdateProduct from "../Pages/Dashboard/Admin/OurProducts/UpdateProduct";
import Wishlist from "../Pages/Dashboard/User/Wishlist/Wishlist";
import Private from "../Routes/Private";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/Cart/CheckOut";
import MyOrders from "../Pages/Dashboard/User/MyOrders/MyOrders";
import TrackOrder from "../Pages/Dashboard/User/MyOrders/TrackOrder";
import Invoice from "../Pages/Dashboard/User/MyOrders/Invoice";
import Receipt from "../Pages/Dashboard/User/Receipt/Receipt";
import {
  PendingOrders,
  ProcessingOrders,
  ShippingOrders,
  DeliveredOrders,
  CancelledOrders,
  ReturnedOrders,
} from "../Pages/Dashboard/Admin/OrdersManagement/OrdersTable/OrdersTable";
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
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/checkout",
        element: (
          <Private>
            <CheckOut />
          </Private>
        ),
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
    element: (
      <Private>
        <DashboardLayout />
      </Private>
    ),
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
        path: "wishlist",
        element: (
          <RoleGuard allow={["user"]}>
            <Wishlist />
          </RoleGuard>
        ),
      },
      {
        path: "my-orders",
        element: (
          <RoleGuard allow={["user"]}>
            <MyOrders />
          </RoleGuard>
        ),
      },
      {
        path: "track-order/:id",
        element: (
          <RoleGuard allow={["user"]}>
            <TrackOrder />
          </RoleGuard>
        ),
      },
      {
        path: "invoice/:id",
        element: (
          <RoleGuard allow={["user"]}>
            <Invoice />
          </RoleGuard>
        ),
      },
      {
        path: "receipt/:id",
        element: (
          <RoleGuard allow={["user"]}>
            <Receipt />
          </RoleGuard>
        ),
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
        path: "/dashboard/product/:id",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <UpdateProduct />
          </RoleGuard>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <PendingOrders />
          </RoleGuard>
        ),
      },
      {
        path: "processing-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <ProcessingOrders />
          </RoleGuard>
        ),
      },
      {
        path: "shipped-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <ShippingOrders />
          </RoleGuard>
        ),
      },
      {
        path: "delivered-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <DeliveredOrders />
          </RoleGuard>
        ),
      },
      {
        path: "cancelled-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <CancelledOrders />
          </RoleGuard>
        ),
      },
      {
        path: "returned-orders",
        element: (
          <RoleGuard allow={["admin", "moderator"]}>
            <ReturnedOrders />
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
