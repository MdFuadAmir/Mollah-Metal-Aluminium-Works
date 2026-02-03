import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";


export const useWishlist = (userEmail) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // Fetch wishlist
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const { data } = await axios.get(`/wishlist?email=${userEmail}`);
      return data.products || [];
    },
  });

  // Add to wishlist
  const addToWishlist = useMutation({
    mutationFn: (productId) => axios.post("/wishlist", { userEmail, productId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist", userEmail] }),
  });

  // Remove from wishlist
  const removeFromWishlist = useMutation({
    mutationFn: (wishlistId) => axios.delete(`/wishlist/${wishlistId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist", userEmail] }),
  });

  return { wishlist: data || [], isLoading, addToWishlist, removeFromWishlist };
};
