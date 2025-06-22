import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { UserContext } from '../../../Utils/Context/userContext';

export default function DeleteShare() {

  const { user } = React.useContext(UserContext);
  if (!user || user.role !== "مدير"){
    return (
      <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
        🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
      </div>
    );
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const [share, setShare] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/shares/${id}`)
      .then((res) => setShare(res.data))
      .catch((err) => console.error('خطأ في جلب البيانات:', err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/shares/${id}`);
      navigate('/admin-dashboard/share-units');
    } catch (err) {
      console.error('فشل في الحذف:', err);
    }
  };

  if (!share) return <div className="text-center mt-10">جاري تحميل البيانات...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <div className="flex-1 p-6 max-w-xl mx-auto text-center">
        <h1 className="text-xl font-bold text-red-700 mb-4">هل أنت متأكد من حذف هذه الوحدة؟</h1>
        <p className="mb-4">النوع: {share.type} | المدينة: {share.location.city} | السعر المعروض: {share.offeredPrice} ج.م</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            نعم، احذف
          </button>
          <Link to="/admin-dashboard/share-units" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            إلغاء
          </Link>
        </div>
      </div>
    </div>
  );
}
