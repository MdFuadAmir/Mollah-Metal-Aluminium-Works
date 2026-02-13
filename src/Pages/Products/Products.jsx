import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Product from "./Product";
import { useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import useDebounce from "../../Hooks/useDebounce";
import Error from "../../Components/Error/Error";
import Title from "../../Shared/Title/Title";

const Products = () => {
  const axiosPublic = useAxios();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const limit = 32;

  const debouncedSearch = useDebounce(search, 500);

  const { data = {}, isFetching } = useQuery({
    queryKey: ["products", page, category, debouncedSearch],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${page}&limit=${limit}&category=${category}&search=${debouncedSearch}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { products = [], totalPages = 0 } = data;

  return (
    <div className="mt-6">
      <Title title={"সমস্ত পণ্য"}/>

      {/* ✅ Search Box (smooth) */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 rounded border focus:outline-none bg-gray-900 border-gray-500/50 placeholder:text-gray-500 text-gray-200"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap mb-12 mt-6">
        {["all", "metal", "cookware"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat === "all" ? "" : cat);
              setPage(1);
            }}
            className={`px-4 py-2 border text-sm rounded-full ${
              (cat === "all" && category === "") || category === cat
                ? "text-orange-500"
                : "text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {isFetching && (
        <p className="text-center text-gray-400 mb-6 animate-pulse">
          Loading...
        </p>
      )}

      {!isFetching && products.length === 0 && debouncedSearch && <Error />}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((prod) => (
            <Product key={prod._id} prod={prod} />
          ))}
        </div>
      )}

      <div className="mt-24">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Products;
