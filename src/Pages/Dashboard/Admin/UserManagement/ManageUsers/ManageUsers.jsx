import { FaUserShield, FaBan, FaEye } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../../../Components/Loading/Loading";
import useAuth from "../../../../../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import Pagination from "../../../../../Components/Pagination/Pagination";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const limit = 30;

  // ====== get user from database (with pagination)
  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["normal-users", page],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/normal-users?page=${page}&limit=${limit}`
      );
      return data;
    },
  });

  const { users = [], totalPages = 0 } = data;

  // ====== toggle block/unblock
  const toggleStatus = async (data) => {
    try {
      await axiosSecure.patch(`/users/toggle-status/${data._id}`);
      toast.success(
        `User ${data.status === "verified" ? "Blocked" : "Unblocked"}`
      );
      queryClient.invalidateQueries({ queryKey: ["normal-users"] });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ======= toggleRole
  const toggleRole = async (user) => {
    try {
      const res = await axiosSecure.patch(
        `/users/make-moderator/${user._id}`
      );
      if (res.data.modifiedCount > 0) {
        toast.success("User promoted to Moderator");
        queryClient.invalidateQueries({ queryKey: ["normal-users"] });
      } else {
        toast.error("Role change failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-red-400">ডাটা লোড করতে সমস্যা হয়েছে</p>;

  return (
    <div className="text-white p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">ইউজার ম্যানেজমেন্ট</h2>

      <div className="overflow-x-auto bg-black/40 rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/70 text-gray-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">ইমেইল</th>
              <th className="px-4 py-3">মোবাইল</th>
              <th className="px-4 py-3">রোল</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3 text-center">একশন</th>
            </tr>
          </thead>

          <tbody>
            {users.map((us, index) => (
              <tr
                key={us._id}
                className="border-b border-gray-700 hover:bg-black/30"
              >
                <td className="px-4 py-3">
                  {(page - 1) * limit + index + 1}
                </td>

                <td className="px-4 py-3">{us?.name || "N/A"}</td>
                <td className="px-4 py-3 text-gray-300">{us.email}</td>
                <td className="px-4 py-3 text-gray-300">
                  {us.phone ? us.phone : "N/A"}
                </td>

                <td className="px-4 py-3 capitalize text-blue-500">
                  {us.role}
                </td>

                <td className="px-4 py-3">
                  {us.status === "verified" ? (
                    <span className="text-green-400 font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      Blocked
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedUser(us)}
                      className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      <FaEye /> View
                    </button>

                    <button
                      onClick={() => toggleRole(us)}
                      className="flex items-center gap-1 bg-green-600/80 hover:bg-green-800 px-3 py-1 rounded text-xs"
                    >
                      <FaUserShield />
                      Moderator
                    </button>

                    <button
                      onClick={() => toggleStatus(us)}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-xs ${
                        us.status === "verified"
                          ? "bg-red-600/80 hover:bg-red-800"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                    >
                      <FaBan />
                      {us.status === "verified" ? "Block" : "Unblock"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-red-400">
                  কোনো ইউজার পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="mt-12">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>

      {/* user details view modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-1">
            <h3 className="text-lg font-bold mb-3 text-center">
              User Details
            </h3>
            <p>
              <b>Name:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.name || "N/A"}
              </span>
            </p>
            <p>
              <b>Email:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.email}
              </span>
            </p>
            <p>
              <b>Phone:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.phone || "N/A"}
              </span>
            </p>
            <p>
              <b>City:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.city || "N/A"}
              </span>
            </p>
            <p>
              <b>Post Code:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.postCode || "N/A"}
              </span>
            </p>
            <p>
              <b>Address:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.address || "N/A"}
              </span>
            </p>
            <p>
              <b>Role:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.role}
              </span>
            </p>
            <p>
              <b>Status:</b>{" "}
              <span className="text-gray-500">
                {selectedUser.status}
              </span>
            </p>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
