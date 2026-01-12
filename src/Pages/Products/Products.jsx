import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import Title from "../../Shared/Title/Title";

const Products = () => {
  const axiosInstance = useAxios();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-12">
      {/* Header */}
      <Title
        title={`MMAW Products`}
        subTitle={`Factory direct aluminium kitchen utensils`}
      />
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-black/50 rounded-xl overflow-hidden shadow-md hover:shadow-orange-500/30 transition"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.productName}
                className="h-full w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="text-xs text-orange-400 uppercase">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1">
                {product.productName}
              </h3>
              <p className="text-gray-300 mt-2">{product.retailPrice}</p>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 transition text-black font-semibold py-2 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
