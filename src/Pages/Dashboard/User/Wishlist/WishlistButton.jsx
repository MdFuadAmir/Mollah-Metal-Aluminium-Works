import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";
import { useWishlist } from "../../../../Hooks/useWishlist";
import useAuth from "../../../../Hooks/useAuth";

const WishlistButton = ({ productId }) => {
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(user?.email);

  const inWishlist = wishlist.some(
    (item) => item.productId.toString() === productId.toString()
  );

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.email) return toast.error("Please login first");

    try {
      if (inWishlist) {
        await removeFromWishlist.mutateAsync(
          wishlist.find((i) => i.productId.toString() === productId.toString())._id
        );
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist.mutateAsync(productId);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={addToWishlist.isLoading || removeFromWishlist.isLoading}
      className="text-lg p-2 rounded-full text-red-500 hover:scale-125 duration-300"
    >
      {inWishlist ? <MdFavorite /> : <MdFavoriteBorder />}
    </button>
  );
};

export default WishlistButton;
