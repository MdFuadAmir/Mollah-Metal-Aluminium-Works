import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import Title from "../../Shared/Title/Title";
import Product from "./Product";

const Products = () => {
  const axiosPublic = useAxios();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default Products;

