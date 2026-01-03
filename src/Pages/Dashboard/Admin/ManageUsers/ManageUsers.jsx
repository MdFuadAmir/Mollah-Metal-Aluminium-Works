import { FaUserShield, FaBan } from "react-icons/fa";

const ManageUsers = () => {
  
  return (
    <div className=" text-white">
      <h2 className="text-2xl font-bold mb-6">ইউজার ম্যানেজমেন্ট</h2>

      <div className="overflow-x-auto bg-black/40 rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/70 text-gray-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">নাম</th>
              <th className="px-4 py-3">ইমেইল</th>
              <th className="px-4 py-3">রোল</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3 text-center">একশন</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-black/30"
              >
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3">{user.name}</td>

                <td className="px-4 py-3 text-gray-300">{user.email}</td>

                <td className="px-4 py-3 capitalize">
                  {user.role === "admin" ? (
                    <span className="text-green-400 font-semibold">Admin</span>
                  ) : (
                    <span className="text-blue-400">User</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {user.status === "active" ? (
                    <span className="text-green-400 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Blocked</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    {user.role !== "admin" && (
                      <button className="flex items-center gap-1 bg-green-600/80 hover:bg-green-700 px-3 py-1 rounded text-xs">
                        <FaUserShield />
                        Make Admin
                      </button>
                    )}

                    <button className="flex items-center gap-1 bg-red-600/80 hover:bg-red-700 px-3 py-1 rounded text-xs">
                      <FaBan />
                      Block
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
