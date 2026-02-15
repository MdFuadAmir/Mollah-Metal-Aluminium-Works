import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

const Reviews = () => {
  const axiosPublic = useAxios();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", id, page],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/reviews/product/${id}?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });

  const reviewsData = data?.reviews || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p className="animate-pulse">Loading...</p>;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {reviewsData.length === 0 && (
        <p className="text-gray-400">No reviews yet for this product.</p>
      )}

      {reviewsData.map((orderReview) => (
        <div key={orderReview._id} className="border-t p-4  bg-gray-900">
          <div className="space-y-3">
            {orderReview.reviews
              .filter((r) => r.productId === id)
              .map((item, index) => (
                <div key={index} className="pl-2"> 
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-400">
                        {orderReview.userEmail}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(orderReview.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center text-yellow-500/70">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= item.rating ? (
                          <IoStar key={star} />
                        ) : (
                          <IoStarOutline key={star} />
                        ),
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mt-1">{item.comment}</p>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default Reviews;
