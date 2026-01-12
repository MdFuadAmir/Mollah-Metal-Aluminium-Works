import axios from "axios";
import { useMemo } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { token, logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });

    // 🔐 attach token
    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // 🚨 handle auth errors
    instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

        if (status === 401) {
          await logOut();
          navigate("/login", { replace: true });
        }

        if (status === 403) {
          navigate("/forbidden", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
