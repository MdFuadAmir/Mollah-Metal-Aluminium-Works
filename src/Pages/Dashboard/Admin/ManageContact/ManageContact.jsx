import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdMarkEmailUnread } from "react-icons/md";
import { Helmet } from "react-helmet";
import { useState } from "react";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../../Components/Loading/Loading";

const ManageContact = () => {
  const axiospublic = useAxios();
  const queryClient = useQueryClient();

  // ===== Pagination state =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await axiospublic.get("/contacts");
      return res.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiospublic.delete(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      toast.success("Message deleted!");
    },
    onError: () => toast.error("Failed to delete message!"),
  });

  const readMutation = useMutation({
    mutationFn: (id) => axiospublic.patch(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      toast.success("Message marked as read!");
    },
    onError: () => toast.error("Failed to mark message!"),
  });

  const unreadCount = messages.filter((msg) => msg.status === "unread").length;

  // ===== Pagination calculation =====
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = messages.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (isLoading) return <Loading />;

  if (!messages.length)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-black/40 border border-white/10 rounded-xl">
        <MdMarkEmailUnread className="text-5xl text-gray-500 mb-4" />
        <h3 className="text-lg font-semibold text-white">No Messages Yet</h3>
        <p className="text-sm text-gray-400 mt-2 max-w-xs">
          You don’t have any contact messages right now. New messages will
          appear here when someone reaches out.
        </p>
      </div>
    );

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <Helmet>
        <title>Manage Contact | MMAW Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
        <MdMarkEmailUnread className="text-sky-500" /> 
যোগাযোগ বার্তা
        <span className="text-sm text-gray-400">({unreadCount} unread)</span>
      </h2>

      <div className="space-y-6">
        {paginatedMessages.map((msg) => (
          <div
            key={msg._id}
            className={`p-5 rounded-xl border ${
              msg.status === "unread"
                ? "border-green-500/30 bg-green-500/5"
                : "border-white/20 bg-white/5"
            } shadow-sm hover:shadow-md transition duration-300`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Name:</span> {msg.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {msg.email}
                </p>
                <p className="wrap-break-word">
                  <span className="font-semibold">Message:</span>{" "}
                  <span className="text-gray-400">{msg.message}</span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                {msg.status === "unread" && (
                  <button
                    onClick={() => readMutation.mutate(msg._id)}
                    className="px-3 py-1 text-xs rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMutation.mutate(msg._id)}
                  className="px-3 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Pagination Buttons ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-1 text-sm border border-white/20 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-1 text-sm border border-white/20 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageContact;
