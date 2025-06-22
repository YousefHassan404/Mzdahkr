import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../../../Utils/Context/userContext';

export default function ManageInvento() {
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [shares, setShares] = useState({ users: [] });
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(shares);
  console.log(allUsers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // جلب بيانات المستخدمين أولاً
        const usersResponse = await axios.get(`http://localhost:5000/api/users`);
        const usersData = usersResponse.data;
        setAllUsers(usersData);

        // جلب بيانات الوحدة
        const sharesResponse = await axios.get(`http://localhost:5000/api/shares/${id}`);
        const sharesData = sharesResponse.data;

        // دمج بيانات المستخدمين مع بيانات الأسهم
        if (sharesData.users && sharesData.users.length > 0) {
          const enrichedUsers = sharesData.users.map(shareUser => {
            const userData = usersData.find(user => user._id === shareUser.userId);
            return {
              ...shareUser,
              name: userData ? userData.name : shareUser.name || 'غير معروف',
              NN: userData ? userData.NN : shareUser.NN || 'غير متوفر'
            };
          });
          
          setShares({ ...sharesData, users: enrichedUsers });
        } else {
          setShares(sharesData);
        }
        
      } catch (err) {
        console.error('فشل في تحميل البيانات:', err);
        setError('فشل في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const totalSharesUsed = shares?.users?.reduce((acc, u) => acc + u.shares, 0) || 0;

  const handleAddUser = () => {
    if (!selectedUserId) return;

    // التحقق من وجود المستخدم بناءً على userId
    const alreadyExists = shares.users?.some(u => u.userId === selectedUserId);
    if (alreadyExists) {
      setError('هذا المستخدم مضاف بالفعل');
      return;
    }

    const selectedUser = allUsers.find(u => u._id === selectedUserId);
    if (!selectedUser) {
      setError('المستخدم غير موجود');
      return;
    }

    const updatedUsers = [
      ...(shares.users || []),
      {
        userId: selectedUser._id,
        name: selectedUser.name,
        NN: selectedUser.NN,
        shares: 0
      }
    ];

    setShares({ ...shares, users: updatedUsers });
    setSelectedUserId('');
    setError('');
  };

  const handleShareChange = (userId, shareValue) => {
    const updatedUsers = shares.users.map(u =>
      u.userId === userId ? { ...u, shares: Number(shareValue) } : u
    );
    setShares({ ...shares, users: updatedUsers });
  };

  const handleRemoveUser = (userId) => {
    const updatedUsers = shares.users.filter(u => u.userId !== userId);
    setShares({ ...shares, users: updatedUsers });
  };

  const handleSubmit = async () => {
    const total = shares.users.reduce((sum, u) => sum + u.shares, 0);
    if (total > shares.noOfShares) {
      setError(`إجمالي الأسهم المدخلة (${total}) يتجاوز الحد المسموح (${shares.noOfShares})`);
      return;
    }

    try {
      // إرسال البيانات مع تنظيف المعلومات الإضافية للحفظ
      const dataToSend = {
        ...shares,
        users: shares.users.map(user => ({
          userId: user.userId,
          shares: user.shares
        }))
      };

      await axios.put(`http://localhost:5000/api/shares/${id}`, dataToSend);
      alert("تم تحديث بيانات الوحدة بنجاح");
      navigate(`/admin-dashboard/share/manage-investor/${id}`);
    } catch (err) {
      console.error("خطأ أثناء حفظ التعديلات:", err);
      alert("فشل في الحفظ");
    }
  };

  // فلترة المستخدمين المتاحين (غير المضافين بالفعل)
  const availableUsers = allUsers.filter(user => 
    !shares.users?.some(shareUser => shareUser.userId === user._id)
  );

  if (loading) {
    return (
      <div className="flex rtl">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">جاري التحميل...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "مدير") {
  return (
    <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
      🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
    </div>
  );
}

  return (
    <div className="flex rtl">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-right text-gray-800 border-b pb-2">
          إدارة الأسهم للوحدة الاستثمارية
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="text-right">
            <label className="block mb-1 font-semibold">اختر عميل لإضافة أسهم:</label>
            <div className="flex gap-2">
              <select
                className="border p-2 rounded w-full text-right"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- اختر عميل بالرقم القومي --</option>
                {availableUsers.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.NN} - {user.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
                disabled={!selectedUserId}
              >
                إضافة
              </button>
            </div>
            {availableUsers.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                جميع العملاء تم إضافتهم بالفعل
              </p>
            )}
          </div>

          {shares.users?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border text-right">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border">الرقم القومي</th>
                    <th className="p-3 border">اسم العميل</th>
                    <th className="p-3 border">عدد الأسهم</th>
                    <th className="p-3 border">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {shares.users.map(({ userId, name, NN, shares }) => (
                    <tr key={userId} className="hover:bg-gray-50">
                      <td className="p-3 border font-mono text-center bg-blue-50">
                        <strong>{NN || 'غير متوفر'}</strong>
                      </td>
                      <td className="p-3 border">{name || 'غير معروف'}</td>
                      <td className="p-3 border">
                        <input
                          type="number"
                          min="0"
                          max={shares.noOfShares}
                          className="border rounded p-2 w-full text-center"
                          value={shares || 0}
                          onChange={(e) => handleShareChange(userId, e.target.value)}
                          placeholder="0"
                        />
                      </td>
                      <td className="p-3 border text-center">
                        <button
                          onClick={() => handleRemoveUser(userId)}
                          className="text-red-600 hover:text-red-800 hover:underline px-2 py-1 rounded"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <p>إجمالي الأسهم المتاحة: <strong className="text-blue-600">{shares.noOfShares || 0}</strong></p>
                <p>إجمالي الأسهم المخصصة: <strong className="text-green-600">{totalSharesUsed}</strong></p>
                <p>الأسهم المتبقية: <strong className="text-orange-600">{(shares.noOfShares || 0) - totalSharesUsed}</strong></p>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                disabled={totalSharesUsed > shares.noOfShares}
              >
                حفظ التعديلات
              </button>
            </div>
            
            {totalSharesUsed > shares.noOfShares && (
              <div className="text-red-600 text-sm font-semibold">
                ⚠️ تحذير: إجمالي الأسهم المخصصة يتجاوز الحد المسموح
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}