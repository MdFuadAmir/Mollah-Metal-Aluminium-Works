import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Product from "./Product";
import Loading from "../../Components/Loading/Loading";
import Title from "../../Shared/Title/Title";
import { Link } from "react-router";

const HomeProducts = () => {
  const axiosPublic = useAxios();
  const limit = 32;
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?limit=${limit}`);
      return res.data.products;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-24">
      <Title
        title={`MMAW পণ্য`}
        subTitle={`আপনার রান্নাঘরের জন্য প্রয়োজনীয় সকল অ্যালুমিনিয়াম কুকওয়্যার পণ্য এখন এক জায়গায়, নির্ভরযোগ্য মানের নিশ্চয়তায়।`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
      {products.length >= 32 ? (
        <div className="flex justify-center">
          <Link
            to={"/products"}
            className="px-6 py-2 border border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600 rounded "
          >
            View All Products
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeProducts;
