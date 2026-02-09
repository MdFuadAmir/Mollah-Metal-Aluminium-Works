import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import WishlistButton from "../Dashboard/User/Wishlist/WishlistButton";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const Product = ({ prod }) => {
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please login first");
    }
    // Prepare cart data based on category
    let cartInfo = {
      productId: prod._id,
      userEmail: user.email,
      sellType: prod.category === "metal" ? "kg" : "piece",
      quantity: 1,
    };
    try {
      const res = await axiosPublic.post("/carts", cartInfo);

      if (res.data.insertedId) {
        toast.success("Added to cart");
      } else {
        toast(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Link
      data-aos="fade-up"
      data-aos-duration="1000"
      to={`/product/${prod._id}`}
      key={prod._id}
      className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden shadow-md transition"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden p-3 rounded-t-xl">
        <img
          src={prod.images?.[0]}
          alt={prod.productName}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mt-1">
          {prod.productName}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{prod.shortDescription}</p>
        <div className="flex justify-between items-end gap-2">
          <div className="space-y-2">
            {prod?.category === "metal" && (
              <div>
                {prod.KgretailDiscountPrice ? (
                  <div className="flex gap-2 items-center mt-2">
                    <p className="text-gray-500 text-sm line-through font-semibold font-mono">
                      ৳{prod.KgretailPrice}
                    </p>
                    <p className="text-emerald-400 text-md font-bold font-mono">
                      ৳{prod.KgretailDiscountPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-emerald-400 font-bold text-md">
                    ৳{prod.KgretailPrice}
                  </p>
                )}
              </div>
            )}
            {prod?.category === "cookware" && (
              <div>
                {prod.PretailDiscountPrice ? (
                  <div className="flex gap-2 items-center mt-2">
                    <p className="text-gray-500 text-sm line-through font-semibold font-mono">
                      ৳{prod.PretailPrice}
                    </p>
                    <p className="text-emerald-400 text-md font-bold font-mono">
                      ৳{prod.PretailDiscountPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-emerald-400 font-bold text-md">
                    ৳{prod.PretailPrice}
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-orange-500">
              <IoStar />
              <span className="text-gray-500">(100)</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WishlistButton productId={prod._id} />
            <Link
              onClick={handleAddToCart}
              className="text-xl  text-gray-300 rounded-full p-2 hover:scale-125 duration-200"
            >
              <FaCartPlus />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
