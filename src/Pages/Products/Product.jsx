import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import WishlistButton from "../Dashboard/User/Wishlist/WishlistButton";
const Product = ({ prod }) => {
  return (
    <Link
      data-aos="fade-up"
      data-aos-duration="1000"
      to={`/product/${prod._id}`}
      key={prod._id}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-md shadow-gray-700 transition"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={prod.images?.[0]}
          alt={prod.productName}
          className="h-full w-full  hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mt-1">
          {prod.productName}
        </h3>
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
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <span className="text-gray-500">(100)</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <WishlistButton productId={prod._id}/>
            <Link className="text-xl shadow-sm shadow-gray-600  text-white rounded-full p-2 hover:scale-105 duration-200">
              <FaCartPlus />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
