"use client";
import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <span className="text-sm text-gray-400">{users.length} Users</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
                <tr>
                <td colSpan="5" className="px-6 py-8 text-center">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-500/20 text-purple-400"
                          : user.role === "recruiter"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
