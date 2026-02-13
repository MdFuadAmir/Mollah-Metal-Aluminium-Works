import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { IoStar } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Pagination from "../../../../Components/Pagination/Pagination"; // ✅ তোমার pagination

const ManageFeedbacks = () => {
  const axiosSecure = useAxiosSecure();

  /* ===== PAGINATION STATE ===== */
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const {
    data: feedbacks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data;
    },
  });

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const visibleFeedbacks = feedbacks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // ===== PATCH (toggle status) =====
  const toggleStatusMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/feedbacks/${id}`);
    },
    onSuccess: () => {
      toast.success("Status updated");
      refetch();
    },
  });

  // ===== DELETE =====
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/feedbacks/${id}`);
    },
    onSuccess: () => {
      toast.success("Feedback deleted");
      refetch();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>Manage Feedback | Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-gray-100">
        সমস্ত প্রতিক্রিয়া{" "}
        <span className="text-gray-500">({feedbacks.length})</span>
      </h1>

      {/* ===== FEEDBACK GRID ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleFeedbacks.length === 0 ? (
          <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="p-4 bg-sky-500/10 rounded-full mb-4">
              <MdDelete className="text-4xl text-sky-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              No Feedback Available
            </h3>

            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              There are no feedback submissions yet. Once users leave feedback,
              it will appear here for review.
            </p>
          </div>
        ) : (
          visibleFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-4 flex flex-col justify-between border border-white/10 bg-gray-950/30 rounded-lg space-y-1"
            >
              <div>
                <h5 className="text-lg text-gray-300">{feedback?.name}</h5>
                <p className="text-sm flex gap-2 items-center text-gray-300">
                  Email:
                  <span className="text-gray-500">{feedback?.email}</span>
                </p>
                <p className="text-sm flex gap-2 items-center text-gray-300">
                  Rating:
                  <span className="flex items-center gap-1">
                    <IoStar className="text-yellow-500" />
                    {feedback?.rating}
                  </span>
                </p>
                <p className="text-sm text-gray-300">
                  Feedback:
                  <span className="text-gray-500 ml-2">
                    {feedback?.feedback}
                  </span>
                </p>
              </div>

              <div className="flex justify-between items-center gap-4 mt-2">
                <p className="text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                <div className="flex items-center gap-4">
                  {feedback?.status === "requested" ? (
                    <button
                      onClick={() => toggleStatusMutation.mutate(feedback._id)}
                      className="px-4 py-1 border border-green-500/40 bg-green-500/5 hover:bg-green-500/10 text-green-500 text-sm rounded"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatusMutation.mutate(feedback._id)}
                      className="px-4 py-1 border text-red-500 hover:bg-red-500/10 border-red-500/40 bg-red-500/5 text-sm rounded"
                    >
                      In Active
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(feedback._id)}
                    className="text-sm hover:bg-red-500/20 bg-red-500/10 text-red-500/70 p-2 border border-red-500/30 rounded"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== PAGINATION (your component) ===== */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;
