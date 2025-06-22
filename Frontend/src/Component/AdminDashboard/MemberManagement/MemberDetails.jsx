import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../Utils/Hooks/useGetData";
import Sidebar from "../Sidebar";

export default function MemberDetails() {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetData({
    url: `http://localhost:5000/api/users/${id}`,
    key: ["user", id],
  });

  const {
    data: assignedUsers,
    isLoading: assignedLoading,
    isError: assignedError,
  } = useGetData({
    url: `http://localhost:5000/api/users/assigned-users/${id}`,
    key: ["assignedUsers", id],
  });

  if (isLoading || assignedLoading) return <p>جاري التحميل...</p>;
  if (isError || assignedError) return <p>حدث خطأ أثناء تحميل البيانات</p>;

  return (
    <div dir="rtl" className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
  <Sidebar />
  <div className="flex-1 p-6 space-y-8">
    {/* بيانات المستخدم الرئيسية */}
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">البيانات الشخصية</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <p><span className="font-semibold text-gray-600">الاسم:</span> {user.name}</p>
        <p><span className="font-semibold text-gray-600">البريد الإلكتروني:</span> {user.email}</p>
        <p><span className="font-semibold text-gray-600">الرقم القومي:</span> {user.NN}</p>
        <p><span className="font-semibold text-gray-600">رقم الهاتف:</span> {user.phone}</p>
        <p><span className="font-semibold text-gray-600">الدور:</span> {user.role}</p>
        <p><span className="font-semibold text-gray-600">تاريخ الإنشاء:</span> {new Date(user.createdAt).toLocaleDateString("ar-EG")}</p>
      </div>
    </div>

    {/* المستخدمين التابعين */}
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">المستخدمون تحت إشرافه</h2>
      {assignedUsers.length === 0 ? (
        <p className="text-gray-500">لا يوجد مستخدمون تحت إشراف هذا العضو.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="border p-3">الاسم</th>
                <th className="border p-3">البريد الإلكتروني</th>
                <th className="border p-3">الرقم القومي</th>
                <th className="border p-3">الحالة</th>
                <th className="border p-3">الإجراء التالي</th>
              </tr>
            </thead>
            <tbody>
              {assignedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`text-center text-sm ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition duration-200`}
                >
                  <td className="border p-3 font-medium text-gray-800">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.NN}</td>
                  <td className="border p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "نشط"
                        ? "bg-green-100 text-green-700"
                        : user.status === "موقوف"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.status || "غير محددة"}
                    </span>
                  </td>
                  <td className="border p-3">{user.nextAction || "لا يوجد"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>

  );
}
