import toast from "react-hot-toast";
import Loading from "../../../../Components/Loading/Loading";
import useAuth from "../../../../Hooks/useAuth";
import { useWishlist } from "../../../../Hooks/useWishlist";
import useAxios from "../../../../Hooks/useAxios";
import EmptyState from "../../../../Components/EmptyState/EmptyState";
import { MdFavorite } from "react-icons/md";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const { wishlist, isLoading, removeFromWishlist } = useWishlist(user?.email);

  if (!user) {
    return <p className="text-center mt-10">Please login to see wishlist</p>;
  }

  if (isLoading) return <Loading />;

  const handleAddToCart = async (item) => {
    try {
      const product = item.productDetails;

      const cartInfo = {
        productId: product._id,
        userEmail: user.email,
        sellType: product.category === "metal" ? "kg" : "piece",
        quantity: 1,
      };

      const res = await axiosPublic.post("/carts", cartInfo);

      if (res.data.insertedId) {
        // 👉 remove from wishlist after successful add
        await removeFromWishlist.mutateAsync(item._id);
        toast.success("Added to cart & removed from wishlist");
      } else {
        toast(res.data.message || "Already in cart");
      }
    } catch (err) {
      toast.error("Failed to add to cart");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">
        My Wishlist ({wishlist.length})
      </h2>

      {wishlist.length === 0 ? (
        <EmptyState
          icon={MdFavorite}
          title="Your wishlist is empty"
          message="Save items you like and find them here later."
          actionText="Browse Products"
          actionLink="/"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border-b border-gray-700">Image</th>
                <th className="p-3 border-b border-gray-700">Product</th>
                <th className="p-3 border-b border-gray-700">Price</th>
                <th className="p-3 border-b border-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => {
                const product = item.productDetails;
                return (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-800 transition text-center"
                  >
                    <td className="p-3 border-b border-gray-700">
                      <img
                        src={product?.images?.[0]}
                        alt={product?.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="p-3 border-b border-gray-700">
                      {product?.productName}
                    </td>

                    <td className="p-3 border-b border-gray-700 text-emerald-400 font-semibold">
                      ৳{product?.PretailDiscountPrice || product?.PretailPrice}
                    </td>

                    <td className="p-3 border-b border-gray-700 text-center space-x-2">
                      {/* ADD TO CART */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-emerald-500 px-3 py-1 rounded hover:bg-emerald-600"
                      >
                        Add to Cart
                      </button>

                      {/* REMOVE FROM WISHLIST */}
                      <button
                        onClick={() => removeFromWishlist.mutate(item._id)}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
