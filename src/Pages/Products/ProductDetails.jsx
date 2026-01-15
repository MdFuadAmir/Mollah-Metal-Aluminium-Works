import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [mainImage, setMainImage] = useState(0);
  //   get product
  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data;
    },
  });
  const stock = Number(product?.stock);
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
          <h2 className="text-xl font-bold text-white">
            {product?.productName}
          </h2>
          {/* Price */}
          <div>
            {product.retailDiscountPrice ? (
              <div className="flex gap-2 items-center mt-2">
                <p className="text-gray-500 line-through font-mono">
                  ৳{product.retailPrice}
                </p>
                <p className="text-emerald-400 text-lg font-bold font-mono">
                  ৳{product.retailDiscountPrice}
                </p>
              </div>
            ) : (
              <p className="text-emerald-400 text-lg font-bold font-mono">
                ৳{product.retailPrice}
              </p>
            )}
          </div>
          {/* Brand */}
          <p className="text-sm">
            <span className="text-gray-400">Brand:</span>
            <span className="font-semibold text-gray-100 ml-1">
              {product?.brandName}
            </span>
          </p>
          {/* Stock */}
          <p className="text-sm">
            <span className="text-gray-400">Stock:</span>
            <span
              className={`font-semibold font-mono ml-1 ${
                product?.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {product?.stock > 0
                ? `${product.stock} available`
                : "Out of Stock"}
            </span>
          </p>

          {/* Size */}
          {product.size && (
            <p className="text-sm">
              <span className="text-gray-400">Size:</span>
              <span className="font-semibold text-gray-100 font-mono ml-1">
                {product?.size}
              </span>
            </p>
          )}
          {/* avgWaight */}
          {product.avgWaight && (
            <p className="text-sm">
              <span className="text-gray-400">AVG Waight/Product:</span>
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
          <p className="text-sm">
            <span className="text-gray-400">Description:</span>
            <span className="font-semibold text-white ml-1">
              {product?.shortDescription}
            </span>
          </p>
          {/* reating */}
          <p className="text-sm">
            <span className="text-gray-400">Rating:</span>
            <span className="font-semibold text-orange-400 ml-1">
              star <span className=" font-mono">(12)</span>
            </span>
          </p>
          <div className="flex justify-center">
            <button
              disabled={stock === 0}
              className={`${
                stock === 0
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "hover:bg-gray-700"
              } mt-4 px-6 py-2 rounded-lg border-2  w-full`}
            >
              Add To Cart
            </button>
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
        <Reviews/>
      </div>
    </div>
  );
};

export default ProductDetails;
