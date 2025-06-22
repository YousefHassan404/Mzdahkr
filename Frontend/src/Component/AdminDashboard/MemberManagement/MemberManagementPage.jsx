import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../Utils/Context/userContext";
import UserCard from "../Users/UserCard";

export default function MemberManagementPage() {
  const { user, userLoading } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        const assignedUsers = res.data.filter((u) => u.assignedTo === user._id);
        setUsers(assignedUsers);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  if (!user)
    return (
      <div className="p-6 text-gray-600">جاري تحميل بيانات المستخدم...</div>
    );

  return (
    <div
      dir="rtl"
      className="flex ml-64 min-h-screen bg-gray-100 text-right rtl"
    >
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            إدارة اعضاء مزدخر
          </h1>
          <Link
            to="/admin-dashboard/sellers/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + إضافة عضو جديد
          </Link>
        </div>

        {/* ✅ عرض المستخدمين كسطور مفردة */}
        <div className="flex flex-col space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                selected={selectedUsers.includes(user._id)}
                onSelect={handleSelectUser}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">
              لا يوجد أعضاء معينين حاليًا.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
