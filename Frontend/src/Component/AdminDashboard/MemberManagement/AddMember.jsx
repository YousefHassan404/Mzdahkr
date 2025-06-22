import React, { useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { UserContext } from "../../../Utils/Context/userContext";

export default function AddMember() {
  const { user: currentUser } = useContext(UserContext);
  const currentRole = currentUser?.role;

  const getAllowedRoles = (role) => {
    switch (role) {
      case "مدير":
        return [
          "غير محدد",
          "مدير",
          "مدير الإدارة",
          "تيم ليدر ماركتنج",
          "تيم ليدر سيلز",
          "عضو ماركتنج",
          "عضو سيلز",
          "مستخدم",
        ];
      case "مدير الإدارة":
        return [
          "غير محدد",
          "تيم ليدر ماركتنج",
          "تيم ليدر سيلز",
          "عضو ماركتنج",
          "عضو سيلز",
          "مستخدم",
        ];
      case "تيم ليدر ماركتنج":
        return ["غير محدد","عضو ماركتنج", "مستخدم"];
      case "تيم ليدر سيلز":
        return ["غير محدد","عضو سيلز", "مستخدم"];
      case "عضو سيلز":
        return ["غير محدد","مستخدم"];
      default:
        return [];
    }
  };

  const allowedRoles = getAllowedRoles(currentRole);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
    email: "",
    NN: "",
    role: allowedRoles[0] || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users", {
        ...formData,
        createdBy: currentUser?._id,
      });
      alert("تم إضافة المستخدم بنجاح");
      setFormData({
        name: "",
        password: "",
        phone: "",
        email: "",
        NN: "",
        role: allowedRoles[0] || "",
      });
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">إضافة عضو جديد</h2>
        {allowedRoles.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="الاسم"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="NN"
              placeholder="الرقم القومي"
              value={formData.NN}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {allowedRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded transition ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "جارٍ الإضافة..." : "إضافة المستخدم"}
            </button>
          </form>
        ) : (
          <div className="text-red-600 text-center mt-10 font-bold">
            ليس لديك صلاحية لإضافة أعضاء.
          </div>
        )}
      </div>
    </div>
  );
}
