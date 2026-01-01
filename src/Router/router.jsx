import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <h2>home</h2>,
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
]);
export default router;
