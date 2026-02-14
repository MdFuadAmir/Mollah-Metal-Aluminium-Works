import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import Reviews from "./Reviews";
import WishlistButton from "../Dashboard/User/Wishlist/WishlistButton";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { IoStar } from "react-icons/io5";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const { user } = useAuth();
  const [mainImage, setMainImage] = useState(0);
  //   get product
  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/products/${id}`);
      return data;
    },
  });
  const stock =
    product?.category === "cookware"
      ? Number(product?.Pstock)
      : Number(product?.Kgstock);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please login first");
    }
    // Prepare cart data based on category
    const cartInfo = {
      productId: product._id,
      userEmail: user.email,
      sellType: product.category === "metal" ? "kg" : "piece",
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-4 rounded-lg overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* image */}
        <div>
          <div className="w-full h-72 rounded-lg overflow-hidden">
            <img
              src={product?.images[mainImage]}
              alt={product?.productName}
              className="w-full h-full rounded overflow-hidden hover:scale-110 transform duration-300"
            />
          </div>
          <div className="flex gap-2 mt-3 justify-center overflow-x-auto">
            {product?.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`w-16 h-16 rounded cursor-pointer overflow-hidden ${
                  mainImage === idx
                    ? "border-2 border-blue-500"
                    : "border-2 border-gray-500"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
        {/* text area */}
        <div className="space-y-3 text-gray-300">
          {/* name */}
          <h2 className="text-xl font-bold text-white">
            {product?.productName}
          </h2>
          {/* Price */}
          <div>
            {product?.category === "metal" && (
              <div>
                {product.KgretailDiscountPrice ? (
                  <div className="flex gap-2 items-center mt-2">
                    <p className="text-gray-500 text-sm line-through font-semibold font-mono">
                      ৳{product.KgretailPrice}
                    </p>
                    <p className="text-emerald-400 text-md font-bold font-mono">
                      ৳{product.KgretailDiscountPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-emerald-400 font-bold text-md">
                    ৳{product.KgretailPrice}
                  </p>
                )}
              </div>
            )}
            {product?.category === "cookware" && (
              <div>
                {product.PretailDiscountPrice ? (
                  <div className="flex gap-2 items-center mt-2">
                    <p className="text-gray-500 text-sm line-through font-semibold font-mono">
                      ৳{product.PretailPrice}
                    </p>
                    <p className="text-emerald-400 text-md font-bold font-mono">
                      ৳{product.PretailDiscountPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-emerald-400 font-bold text-md">
                    ৳{product.PretailPrice}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Brand */}
          <p className="text-sm">
            <span className="text-gray-400">Brand:</span>
            <span className="font-semibold text-gray-100 ml-1">
              {product?.brand}
            </span>
          </p>
          {/* Stock */}
          {product?.category === "metal" && (
            <p className="text-sm">
              <span className="text-gray-400">Stock:</span>
              <span
                className={`font-semibold font-mono ml-1 ${
                  product?.Kgstock > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {product?.Kgstock > 0
                  ? `${product.Kgstock}Kg (available)`
                  : "Out of Stock"}
              </span>
            </p>
          )}
          {product?.category === "cookware" && (
            <p className="text-sm">
              <span className="text-gray-400">Stock:</span>
              <span
                className={`font-semibold font-mono ml-1 ${
                  product?.Pstock > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {product?.Pstock > 0
                  ? `${product.Pstock} Pic (available)`
                  : "Out of Stock"}
              </span>
            </p>
          )}
          {/* Size */}
          {product?.category === "metal" && (
            <div>
              {product.Kgsize && (
                <p className="text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="font-semibold text-gray-100 font-mono ml-1">
                    {product?.Kgsize}
                  </span>
                </p>
              )}
            </div>
          )}
          {product?.category === "cookware" && (
            <div>
              {product.Psize && (
                <p className="text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span className="font-semibold text-gray-100 font-mono ml-1">
                    {product?.Psize}
                  </span>
                </p>
              )}
            </div>
          )}
          {/* avgWaight */}
          {product.avgWaight && (
            <p className="text-sm">
              <span className="text-gray-400">Approx Waight/Product:</span>
              <span className="font-semibold text-gray-100 font-mono ml-1">
                {product?.avgWaight} kg
              </span>
            </p>
          )}
          {/* Category */}
          <p className="text-sm">
            <span className="text-gray-400">Category:</span>
            <span className="font-semibold text-sky-400 ml-1">
              {product?.category}
            </span>
          </p>
          {/* Sub Category */}
          <p className="text-sm">
            <span className="text-gray-400">Sub Category:</span>
            <span className="font-semibold text-indigo-400 ml-1">
              {product?.subCategory}
            </span>
          </p>
          {/* reating todo*/}
          <p className="text-sm flex items-center">
            <span className="text-gray-400">Rating:</span>
            <span className="font-semibold text-orange-400 ml-1 flex items-center gap-2">
              <IoStar /> <span className=" font-mono">({product?.rating})</span>
            </span>
          </p>
          {/* add to cart btn */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`${
                stock === 0
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "hover:bg-gray-700"
              } px-6 py-2 rounded-lg border-2  w-fit`}
            >
              Add To Cart
            </button>
            {/* wishlist button */}
            <WishlistButton productId={id} />
          </div>
        </div>
      </div>
      {/* discription */}
      <div className="mt-12 w-full">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">Description</h2>
          <p className="text-sm text-gray-400 w-full pl-4">
            {product?.longDescription}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Return Polecy</h2>
          <p className="text-sm text-gray-400 pl-4">{product?.returnPolecy}</p>
        </div>
      </div>
      {/* review */}
      <div className="text-white mt-12">
        <Reviews />
      </div>
    </div>
  );
};

export default ProductDetails;
