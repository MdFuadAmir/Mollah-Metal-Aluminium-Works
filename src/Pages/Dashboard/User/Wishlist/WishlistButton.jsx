import { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const WishlistButton = ({ productId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if product is already in wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(`/wishlist/${user.email}`);
        setInWishlist(res.data.products.includes(productId));
      } catch (err) {
        console.error("Fetch wishlist error:", err);
      }
    };
    fetchWishlist();
  }, [user?.email, productId, axiosSecure]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.email) return toast.error("Please login first");
    setLoading(true);
    try {
      const res = await axiosSecure.post("/wishlist", {
        email: user.email,
        productId,
      });
       if (res.data.action === "added") {
        setInWishlist(true);
        toast.success("Added to wishlist");
      }

      if (res.data.action === "removed") {
        setInWishlist(false);
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`text-lg p-2 rounded-full text-red-500  shadow-sm shadow-gray-600 hover:scale-110 duration-300`}
    >
      {inWishlist ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  );
};

export default WishlistButton;
