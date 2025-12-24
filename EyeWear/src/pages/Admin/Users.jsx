import { useEffect, useState } from "react";
import { FiTrash2, FiUserCheck, FiUserPlus } from "react-icons/fi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    registered: 0,
    active: 0
  });

  const fetchUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    setUsers(storedUsers);
    
    // Calculate active users (users who logged in today)
    const today = new Date().toISOString().split('T')[0];
    const activeUsersData = JSON.parse(localStorage.getItem("activeUsersToday") || "{}");
    const activeCount = Object.keys(activeUsersData).length;
    
    setStats({
      registered: storedUsers.length,
      active: activeCount
    });
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = (id) => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const filtered = storedUsers.filter(u => u.id !== id);
    localStorage.setItem("registeredUsers", JSON.stringify(filtered));
    fetchUsers();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">User Management</h1>

        {/* USER STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Registered Users</h2>
                <p className="text-3xl font-bold mt-2">{stats.registered}</p>
              </div>
              <FiUserPlus size={40} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Active Users Today</h2>
                <p className="text-3xl font-bold mt-2">{stats.active}</p>
              </div>
              <FiUserCheck size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Role</th>
                  <th className="px-6 py-4 text-left font-semibold">Registered</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 text-gray-700">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          u.role === "admin" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {u.role === "admin" ? "👨‍💼 Admin" : "👤 User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.createdAt || "N/A"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
