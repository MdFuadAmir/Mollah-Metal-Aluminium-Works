import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();

  const { data: cart = [], isLoading,refetch } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axiosPublic.get(`/orders?email=${user.email}`);
      return data.products || [];
    },
    enabled: !!user?.email,
  });

  return { cart, isLoading, cartRefetch: refetch };
};

export default useCart;
