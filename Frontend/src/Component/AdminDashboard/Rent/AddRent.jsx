import React from 'react';
import RentUnitForm from '../../RentUnitForm/RentUnitForm';
import Sidebar from '../Sidebar';

export default function AddRent() {
  return (
    <div className="flex rtl">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-right text-gray-800 border-b pb-2">
          إضافة وحدة إيجار جديدة
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <RentUnitForm />
        </div>
      </div>
    </div>
  );
}
