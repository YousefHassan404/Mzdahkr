import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

export default function DeleteUnit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rent, setRent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/units/${id}`)
      .then((res) => setRent(res.data))
      .catch((err) => console.error('خطأ في جلب البيانات:', err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/units/${id}`);
      navigate('/admin-dashboard/units-sale');
    } catch (err) {
      console.error('فشل في الحذف:', err);
    }
  };

  if (!rent) return <div className="text-center mt-10">جاري تحميل البيانات...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <div className="flex-1 p-6 max-w-xl mx-auto text-center">
        <h1 className="text-xl font-bold text-red-700 mb-4">هل أنت متأكد من حذف هذه الوحدة؟</h1>
        <p className="mb-4">النوع: {rent.type} | المدينة: {rent.location.city} | السعر المعروض: {rent.offeredPrice} ج.م</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            نعم، احذف
          </button>
          <Link to="/rent" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            إلغاء
          </Link>
        </div>
      </div>
    </div>
  );
}
