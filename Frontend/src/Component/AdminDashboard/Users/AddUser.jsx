// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import { UserContext } from "../../../Utils/Context/userContext";

// export default function AddUser() {
//   const { user } = React.useContext(UserContext);

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     phone: "",
//     email: "",
//     NN: "",
//     role: "",
//     status: "",
//     priority: "",
//     type: "",
//     interstedLocation: "",
//     budget: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "budget" ? parseFloat(value) || 0 : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/users", formData);
//       alert("✅ تم إنشاء المستخدم بنجاح");
//       navigate("/admin-dashboard/users");
//     } catch (err) {
//       console.error(err);
//       alert("❌ حدث خطأ أثناء إنشاء المستخدم");
//     }
//   };

//   if (!user || user.role !== "مدير") {
//   return (
//     <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
//       🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
//     </div>
//   );
// }

//   return (
//     <div className="flex rtl">
//       <Sidebar />
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-900">
//           إضافة مستخدم جديد
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="الاسم الكامل"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="البريد الإلكتروني"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="كلمة المرور"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="رقم الهاتف"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="NN"
//           placeholder="الرقم القومي (14 رقمًا)"
//           value={formData.NN}
//           onChange={handleChange}
//           maxLength={14}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         >
//           <option value="">اختر الدور</option>
//           <option value="مدير">مدير</option>
//           <option value="مستخدم">مستخدم</option>
//         </select>

//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">اختر حالة العميل</option>
//           <option value="شراء">شراء</option>
//           <option value="ايجار">إيجار</option>
//           <option value="استثمار">استثمار</option>
//         </select>

//         <select
//           name="priority"
//           value={formData.priority}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">اختر مستوى الأولوية</option>
//           <option value="عالي">عالي</option>
//           <option value="متوسط">متوسط</option>
//           <option value="منخفض">منخفض</option>
//         </select>

//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">نوع العميل</option>
//           <option value="محتمل">محتمل</option>
//           <option value="غير مهتم">غير مهتم</option>
//           <option value="حالي">حالي</option>
//         </select>

//         <input
//           type="text"
//           name="interstedLocation"
//           placeholder="المنطقة المهتم بها"
//           value={formData.interstedLocation}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="number"
//           name="budget"
//           placeholder="الميزانية بالجنيه"
//           value={formData.budget}
//           onChange={handleChange}
//           min={0}
//           className="w-full border px-3 py-2 rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           إضافة المستخدم
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { UserContext } from "../../../Utils/Context/userContext";

export default function AddUser() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  console.log("User context:", user);

  const [formData, setFormData] = useState({
    name: "",
    password: "12345678",
    phone: "",
    email: "",
    NN: "",
    role: "مستخدم",
    condition: "جديد",
    status: "",
    priority: "",
    type: "",
    interstedLocation: "",
    budget: 0,
    nextActions: [],
    assignedTo: "", // (اختياري، إذا حبيت تسند لعضو معين)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        createdBy: user._id, // من السياق
      };

      const res = await axios.post(
        "http://localhost:5000/api/users",
        dataToSend
      );
      alert("✅ تم إنشاء المستخدم بنجاح");
      navigate("/admin-dashboard/users");
    } catch (err) {
      console.error(err);
      console.error("Axios Error:", err.response?.data || err.message);

      alert("❌ حدث خطأ أثناء إنشاء المستخدم");
    }
  };

  // if (!user || user.role !== "مدير") {
  //   return (
  //     <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
  //       🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
  //     </div>
  //   );
  // }

  return (
    <div className="flex rtl">
      <Sidebar />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
      >
        <h2 className="text-2xl font-bold text-center text-blue-900">
          إضافة مستخدم جديد
        </h2>

        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="hidden"
          name="password"
          placeholder="كلمة المرور"
          value="12345678"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="NN"
          placeholder="الرقم القومي (14 رقمًا)"
          value={formData.NN}
          onChange={handleChange}
          maxLength={14}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="الرقم القومي (14 رقمًا)"
          value="مستخدم"
          maxLength={20}
          className="w-full border px-3 py-2 rounded"
          required
          readOnly
        />

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">حالة التعامل</option>
          <option value="جديد">جديد</option>
          <option value="تم الاتصال">تم الاتصال</option>
          <option value="مهتم">مهتم</option>
          <option value="غير مهتم">غير مهتم</option>
          <option value="مغلق">مغلق</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">حالة المستخدم</option>
          <option value="شراء">شراء</option>
          <option value="ايجار">إيجار</option>
          <option value="استثمار">استثمار</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">مستوى الأولوية</option>
          <option value="عالي">عالي</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">نوع المستخدم</option>
          <option value="محتمل">محتمل</option>
          <option value="غير مهتم">غير مهتم</option>
          <option value="حالي">حالي</option>
        </select>

        <input
          type="text"
          name="interstedLocation"
          placeholder="المنطقة المهتم بها"
          value={formData.interstedLocation}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="budget"
          placeholder="الميزانية بالجنيه"
          value={formData.budget}
          onChange={handleChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
        />

        {/* nextActions (اختياري): إجراء واحد افتراضي */}
        <input
          type="text"
          placeholder="ملاحظة الإجراء القادم (اختياري)"
          onChange={(e) => {
            const action = {
              type: "متابعة",
              note: e.target.value,
              dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            };
            setFormData((prev) => ({
              ...prev,
              nextActions: [action],
            }));
          }}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          إضافة المستخدم
        </button>
      </form>
    </div>
  );
}
