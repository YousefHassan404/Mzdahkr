// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import UserCard from "./UserCard";
// import { UserContext } from "../../../Utils/Context/userContext";

// export default function UserManagerPage() {
//   const { user } = useContext(UserContext);

//   const [allUsers, setAllUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [assignToId, setAssignToId] = useState("");

//   const [filters, setFilters] = useState({
//     name: "",
//     NN: "",
//     role: "",
//     status: "",
//     priority: "",
//     interstedLocation: "",
//     type: "",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users");
//         setAllUsers(res.data);
//         const filtered = res.data.filter(
//           (u) => u.role === "مستخدم" && !u.assignedTo
//         );
//         setUsers(filtered);
//         setFilteredUsers(filtered);
//       } catch (error) {
//         console.error("فشل في جلب البيانات:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const filtered = users.filter((user) => {
//       const nameMatch = user.name?.toLowerCase().includes(filters.name.toLowerCase());
//       const nnMatch = user.NN?.includes(filters.NN);
//       const roleMatch = user.role?.includes(filters.role);
//       const statusMatch = user.status?.includes(filters.status);
//       const priorityMatch = user.priority?.includes(filters.priority);
//       const locationMatch = user.interstedLocation?.includes(filters.interstedLocation);
//       const typeMatch = user.type?.includes(filters.type);
//       return (
//         nameMatch &&
//         nnMatch &&
//         roleMatch &&
//         statusMatch &&
//         priorityMatch &&
//         locationMatch &&
//         typeMatch
//       );
//     });

//     setFilteredUsers(filtered);
//   }, [filters, users]);

//   const resetFilters = () => {
//     setFilters({
//       name: "",
//       NN: "",
//       role: "",
//       status: "",
//       priority: "",
//       interstedLocation: "",
//       type: "",
//     });
//   };

//   const toggleUserSelection = (id) => {
//     setSelectedUsers((prev) =>
//       prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedUsers.length === filteredUsers.length) {
//       setSelectedUsers([]);
//     } else {
//       const allIds = filteredUsers.map((user) => user._id);
//       setSelectedUsers(allIds);
//     }
//   };

//   const handleAssignTo = async () => {
//     if (!assignToId || selectedUsers.length === 0) {
//       alert("❗ يرجى تحديد مستخدمين وموظف للسيلر (assignedTo).");
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedUsers.map((userId) =>
//           axios.put(`http://localhost:5000/api/users/${userId}`, {
//             assignedTo: assignToId,
//           })
//         )
//       );
//       alert("✅ تم التحديث بنجاح");
//       window.location.reload();
//     } catch (err) {
//       console.error("فشل في التحديث:", err);
//       alert("❌ حدث خطأ أثناء التحديث");
//     }
//   };

//   if (!user || user.role !== "مدير") {
//     return (
//       <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
//         🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
//       </div>
//     );
//   }

//   return (
//     <div className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
//           <Link
//             to="/admin-dashboard/user/new"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
//           >
//             + إضافة مستخدم جديد
//           </Link>
//         </div>

//         {/* 🔍 فلاتر البحث */}
//         <div
//           dir="rtl"
//           className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row flex-wrap gap-4 items-end"
//         >
//           <input
//             type="text"
//             placeholder="بحث بالاسم"
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.name}
//             onChange={(e) => setFilters({ ...filters, name: e.target.value })}
//           />

//           <input
//             type="text"
//             placeholder="بحث بالرقم القومي"
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.NN}
//             onChange={(e) => setFilters({ ...filters, NN: e.target.value })}
//           />

//           <input
//             type="text"
//             placeholder="بحث بالمنطقة المهتم بها"
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.interstedLocation}
//             onChange={(e) =>
//               setFilters({ ...filters, interstedLocation: e.target.value })
//             }
//           />

//           <select
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="">كل الحالات</option>
//             <option value="شراء">شراء</option>
//             <option value="ايجار">إيجار</option>
//             <option value="استثمار">استثمار</option>
//             <option value="غير معروف">غير معروف</option>
//           </select>

//           <select
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.priority}
//             onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//           >
//             <option value="">كل الأولويات</option>
//             <option value="عالي">عالي</option>
//             <option value="متوسط">متوسط</option>
//             <option value="منخفض">منخفض</option>
//           </select>

//           <select
//             className="border p-2 rounded w-full md:w-1/5"
//             value={filters.type}
//             onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//           >
//             <option value="">كل الأنواع</option>
//             <option value="محتمل">محتمل</option>
//             <option value="حالي">حالي</option>
//             <option value="غير مهتم">غير مهتم</option>
//           </select>

//           <button
//             className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded mt-2 md:mt-0"
//             onClick={resetFilters}
//           >
//             🧹 مسح الفلاتر
//           </button>
//         </div>

//         {/* ✅ زر التعيين */}
//         <div dir="rtl" className="bg-white p-4 mb-4 rounded shadow flex gap-4 items-center">
//           <select
//             className="border p-2 rounded"
//             value={assignToId}
//             onChange={(e) => setAssignToId(e.target.value)}
//           >
//             <option value="">اختر موظف لتعيينه</option>
//             {allUsers
//               .filter((u) => u.role === "عضو سيلز" || u.role === "تيم ليدر سيلز")
//               .map((u) => (
//                 <option key={u._id} value={u._id}>
//                   {u.name} - {u.role}
//                 </option>
//               ))}
//           </select>
//           <button
//             onClick={handleAssignTo}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//           >
//             📌 تعيين للمستخدمين المحددين
//           </button>
//         </div>

//         {/* ✅ زر تحديد الكل */}
//         <div className="mb-4 text-right">
//           <button
//             onClick={toggleSelectAll}
//             className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
//           >
//             {selectedUsers.length === filteredUsers.length
//               ? "🔓 إلغاء تحديد الكل"
//               : "🔒 تحديد الكل"}
//           </button>
//         </div>

//         {/* 👥 عرض المستخدمين */}
//         <div className="space-y-4">
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((u) => (
//               <UserCard
//                 key={u._id}
//                 user={u}
//                 selected={selectedUsers.includes(u._id)}
//                 onSelect={toggleUserSelection}
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-600 py-8">لا يوجد مستخدمين يطابقون الفلاتر.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import UserCard from "./UserCard";
import { UserContext } from "../../../Utils/Context/userContext";

export default function UserManagerPage() {
  const { user } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignToId, setAssignToId] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    NN: "",
    role: "",
    status: "",
    priority: "",
    interstedLocation: "",
    type: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setAllUsers(res.data);
        const filtered = res.data.filter(
          (u) => u.role === "مستخدم" && !u.assignedTo
        );
        setUsers(filtered);
        setFilteredUsers(filtered);
      } catch (error) {
        console.error("فشل في جلب البيانات:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(filters.name.toLowerCase());
      const nnMatch = user.NN?.includes(filters.NN);
      const roleMatch = user.role?.includes(filters.role);
      const statusMatch = user.status?.includes(filters.status);
      const priorityMatch = user.priority?.includes(filters.priority);
      const locationMatch = user.interstedLocation?.includes(filters.interstedLocation);
      const typeMatch = user.type?.includes(filters.type);
      return (
        nameMatch &&
        nnMatch &&
        roleMatch &&
        statusMatch &&
        priorityMatch &&
        locationMatch &&
        typeMatch
      );
    });

    setFilteredUsers(filtered);
  }, [filters, users]);

  const resetFilters = () => {
    setFilters({
      name: "",
      NN: "",
      role: "",
      status: "",
      priority: "",
      interstedLocation: "",
      type: "",
    });
  };

  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      const allIds = filteredUsers.map((user) => user._id);
      setSelectedUsers(allIds);
    }
  };

  const handleAssignTo = async () => {
    if (!assignToId || selectedUsers.length === 0) {
      alert("❗ يرجى تحديد مستخدمين وموظف للسيلر (assignedTo).");
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          axios.put(`http://localhost:5000/api/users/${userId}`, {
            assignedTo: assignToId,
          })
        )
      );
      alert("✅ تم التحديث بنجاح");
      window.location.reload();
    } catch (err) {
      console.error("فشل في التحديث:", err);
      alert("❌ حدث خطأ أثناء التحديث");
    }
  };

  // ✅ الأدوار المسموح لها بدخول الصفحة
  const allowedRoles = [
    "مدير",
    "مدير الإدارة",
    "تيم ليدر ماركتنج",
    "تيم ليدر سيلز",
    "عضو ماركتنج",
  ];

  console.log(user);

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
        🚫 <strong>وصول مرفوض:</strong> ليس لديك صلاحية الوصول إلى هذه الصفحة.
      </div>
    );
  }

  // ✅ عضو ماركتنج فقط يشوف زر إضافة مستخدم
  if (user.role === "عضو ماركتنج") {
    return (
      <div className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">إضافة مستخدم جديد</h1>
          <Link
            to="/admin-dashboard/user/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + إضافة مستخدم جديد
          </Link>
        </div>
      </div>
    );
  }

  // ✅ باقي الأدوار تشوف الصفحة الكاملة
  return (
    <div className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
          <Link
            to="/admin-dashboard/user/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + إضافة مستخدم جديد
          </Link>
        </div>

        {/* 🔍 فلاتر البحث */}
        <div
          dir="rtl"
          className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row flex-wrap gap-4 items-end"
        >
          <input
            type="text"
            placeholder="بحث بالاسم"
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="بحث بالرقم القومي"
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.NN}
            onChange={(e) => setFilters({ ...filters, NN: e.target.value })}
          />

          <input
            type="text"
            placeholder="بحث بالمنطقة المهتم بها"
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.interstedLocation}
            onChange={(e) =>
              setFilters({ ...filters, interstedLocation: e.target.value })
            }
          />

          <select
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">كل الحالات</option>
            <option value="شراء">شراء</option>
            <option value="ايجار">إيجار</option>
            <option value="استثمار">استثمار</option>
            <option value="غير معروف">غير معروف</option>
          </select>

          <select
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">كل الأولويات</option>
            <option value="عالي">عالي</option>
            <option value="متوسط">متوسط</option>
            <option value="منخفض">منخفض</option>
          </select>

          <select
            className="border p-2 rounded w-full md:w-1/5"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">كل الأنواع</option>
            <option value="محتمل">محتمل</option>
            <option value="حالي">حالي</option>
            <option value="غير مهتم">غير مهتم</option>
          </select>

          <button
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded mt-2 md:mt-0"
            onClick={resetFilters}
          >
            🧹 مسح الفلاتر
          </button>
        </div>

        {/* ✅ زر التعيين */}
        <div dir="rtl" className="bg-white p-4 mb-4 rounded shadow flex gap-4 items-center">
          <select
            className="border p-2 rounded"
            value={assignToId}
            onChange={(e) => setAssignToId(e.target.value)}
          >
            <option value="">اختر موظف لتعيينه</option>
            {allUsers
              .filter((u) => u.role === "عضو سيلز" || u.role === "تيم ليدر سيلز")
              .map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} - {u.role}
                </option>
              ))}
          </select>
          <button
            onClick={handleAssignTo}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            📌 تعيين للمستخدمين المحددين
          </button>
        </div>

        {/* ✅ زر تحديد الكل */}
        <div className="mb-4 text-right">
          <button
            onClick={toggleSelectAll}
            className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            {selectedUsers.length === filteredUsers.length
              ? "🔓 إلغاء تحديد الكل"
              : "🔒 تحديد الكل"}
          </button>
        </div>

        {/* 👥 عرض المستخدمين */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <UserCard
                key={u._id}
                user={u}
                selected={selectedUsers.includes(u._id)}
                onSelect={toggleUserSelection}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">لا يوجد مستخدمين يطابقون الفلاتر.</p>
          )}
        </div>
      </div>
    </div>
  );
}
