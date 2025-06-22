// import React from "react";
// import { Link } from "react-router-dom";

// export default function UserCard({ user }) {
  

//   return (
//     <div dir="rtl" className="bg-white rounded-2xl shadow-md p-5 space-y-3 border border-gray-100 hover:shadow-lg transition">
//       <h2 className="text-2xl font-bold text-blue-900">{user.name}</h2>

//       <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//         <p><span className="font-medium">📧 البريد الإلكتروني:</span> {user.email}</p>
//         <p><span className="font-medium">📞 رقم الهاتف:</span> {user.phone}</p>
//         <p><span className="font-medium">🆔 الرقم القومي:</span> {user.NN}</p>
//         <p><span className="font-medium">👤 الدور:</span> {user.role}</p>
//         <p><span className="font-medium">📌 الحالة:</span> {user.status}</p>
//         <p><span className="font-medium">⚡ الأولوية:</span> {user.priority}</p>
//         <p><span className="font-medium">📊 نوع العميل:</span> {user.type}</p>
//         <p><span className="font-medium">📍 المنطقة المهتم بها:</span> {user.interstedLocation}</p>
//         <p><span className="font-medium">💰 الميزانية:</span> {user.budget} جنيه</p>
//         <p><span className="font-medium">📅 تاريخ الإنشاء:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
//         <p><span className="font-medium">🕓 آخر تحديث:</span> {new Date(user.updatedAt).toLocaleDateString()}</p>
//       </div>

      
//     </div>
//   );
// }

import React from "react";

export default function UserCard({ user, selected, onSelect }) {
  return (
    <div
      dir="rtl"
      className={`relative bg-white rounded-2xl shadow-md p-5 space-y-3 border ${
        selected ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-100"
      } hover:shadow-lg transition`}
    >
      {/* ✅ Checkbox التحديد */}
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(user._id)}
        className="absolute top-3 left-3 w-5 h-5 cursor-pointer accent-blue-600"
        title="تحديد المستخدم"
      />

      <h2 className="text-2xl font-bold text-blue-900 pr-6">{user.name}</h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p><span className="font-medium">📧 البريد الإلكتروني:</span> {user.email}</p>
        <p><span className="font-medium">📞 رقم الهاتف:</span> {user.phone}</p>
        <p><span className="font-medium">🆔 الرقم القومي:</span> {user.NN}</p>
        <p><span className="font-medium">👤 الدور:</span> {user.role}</p>
        <p><span className="font-medium">📌 الحالة:</span> {user.status}</p>
        <p><span className="font-medium">⚡ الأولوية:</span> {user.priority}</p>
        <p><span className="font-medium">📊 نوع العميل:</span> {user.type}</p>
        <p><span className="font-medium">📍 المنطقة المهتم بها:</span> {user.interstedLocation}</p>
        <p><span className="font-medium">💰 الميزانية:</span> {user.budget} جنيه</p>
        <p><span className="font-medium">📅 تاريخ الإنشاء:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><span className="font-medium">🕓 آخر تحديث:</span> {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
