import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlistProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/full/${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (productId) => {
    try {
      await axiosSecure.post("/wishlist", {
        email: user.email,
        productId,
      });
      toast.success("Removed from wishlist");
      refetch();
    } catch {
      toast.error("Failed to remove");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 md:p-8">
      <h1 className="mb-6 text-2xl text-white">
        <span className="text-orange-500">{user?.displayName}</span> Wishlist
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-sm w-full">
          <thead className="bg-gray-900 text-gray-200">
            <tr>
              <th>ক্রম নং</th>
              <th>পণ্যের ছবি</th>
              <th>পণ্যের নাম</th>
              <th>মূল মূল্য</th>
              <th>ছাড়ের মূল্য</th>
              <th>ব্যবস্থা</th>
            </tr>
          </thead>

          <tbody className="text-white bg-black/50">
            {wishlistProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-400 py-10 text-lg"
                >
                  আপনার উইশলিস্ট এখনো খালি 💔
                </td>
              </tr>
            ) : (
              wishlistProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="font-semibold">{product.productName}</td>

                  <td className="line-through text-red-400">
                    ৳
                    {product.KgretailPrice
                      ? product.KgretailPrice
                      : product.PretailPrice}
                  </td>

                  <td className="text-green-400 font-bold">
                    ৳
                    {product.KgretailDiscountPrice
                      ? product.KgretailDiscountPrice
                      : product.PretailDiscountPrice}
                  </td>

                  <td>
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
