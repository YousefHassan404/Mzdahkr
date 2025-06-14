import React from 'react';
import AddUnitForm from '../../AddUnitForm/AddUnitForm';
import Sidebar from '../Sidebar';

export default function AddUnit() {
  return (
    <div className="flex rtl">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-right text-gray-800 border-b pb-2">
          إضافة وحدة للبيع جديدة
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AddUnitForm />
        </div>
      </div>
    </div>
  );
}
