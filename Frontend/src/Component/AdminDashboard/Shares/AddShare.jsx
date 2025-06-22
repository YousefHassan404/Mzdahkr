import React from 'react';
import Sidebar from '../Sidebar';
import SharesUnitForm from '../../SharesUnitForm/SharesUnitForm';
import { UserContext } from '../../../Utils/Context/userContext';

export default function AddShare() {
  const { user } = React.useContext(UserContext);

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

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-right text-gray-800 border-b pb-2">
          إضافة وحدة استثمار جديدة
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SharesUnitForm />
        </div>
      </div>
    </div>
  );
}
