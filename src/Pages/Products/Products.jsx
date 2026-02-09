import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import Product from "./Product";
import { useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

const Products = () => {
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 32;

  const { data: data = [], isLoading } = useQuery({
    queryKey: ["products", page, category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${page}&limit=${limit}&category=${category}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  if (isLoading) {
    return <Loading />;
  }
  const { products, totalPages } = data;
  return (
    <div className="py-12">
      <h1 className="text-center text-4xl font-bold text-orange-500/70 mb-6 underline">
        All Products
      </h1>
      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap mb-12">
        {["all", "metal", "cookware"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat === "all" ? "" : cat);
              setPage(1); // 👈 category বদলালে page reset
            }}
            className={`px-4 py-2 border rounded-full ${
              (cat === "all" && category === "") || category === cat
                ? "text-orange-500"
                : "text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
      <div className="mt-24">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Products;
