import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { UserContext } from '../../../Utils/Context/userContext';

export default function UnitManagerPage() {
    const { user } = useContext(UserContext);

  const [rents, setRents] = React.useState([]);

  React.useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/units');
        setRents(res.data);
      } catch (error) {
        console.error("فشل في جلب البيانات:", error);
      }
    };
    fetchRents();
  }, []);

if (!user || user.role !== "مدير") {
  return (
    <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
      🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
    </div>
  );
}


  return (
    <div className="flex ml-64 min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">إدارة الوحدات للبيع</h1>
          <Link
            to="/admin-dashboard/unit/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + إضافة وحدة إيجار
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rents.map((rent) => (
            <div key={rent._id} className="bg-white rounded shadow p-4 space-y-2">
              <h2 className="text-xl font-semibold text-blue-800">{rent.type} - {rent.size} م²</h2>
              <p><span className="font-medium">المدينة:</span> {rent.location.city}</p>
              <p><span className="font-medium">المنطقة:</span> {rent.location.region}</p>
              <p><span className="font-medium">تاريخ التسليم:</span> {new Date(rent.deliveryDate).toLocaleDateString('ar-EG')}</p>
              <p><span className="font-medium">السعر المعروض:</span> {rent.offeredPrice} ج.م</p>
              
              <div className="flex gap-2 pt-2">
                <Link
                  to={`/admin-dashboard/unit/edit/${rent._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  تعديل
                </Link>
                <Link
                  to={`/admin-dashboard/unit/delete/${rent._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  حذف
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
