import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data:role,
    isLoading:roleLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role?email=${user.email}`
      );
      return res.data.role;
    },
    staleTime: 5 * 60 * 1000, 
  });

  return [role, roleLoading, isError];
};

export default useRole;
