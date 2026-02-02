import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Context/AuthProvider.jsx";
const queryClient = new QueryClient();
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import router from "./Router/router.jsx";
AOS.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="tagesschrift-regular">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
