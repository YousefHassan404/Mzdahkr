import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import useGetData from "../../Utils/Hooks/useGetData";

export default function SharesUnits() {
  const { data, isLoading, isError } = useGetData({
    url: "http://localhost:5000/api/shares",
    key: ["shares"],
  });

  if (isLoading)
    return <div className="text-center py-10">جار التحميل...</div>;
  if (isError)
    return <div className="text-center py-10 text-red-500">
      حدث خطأ في جلب البيانات
    </div>;

  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((unit) => (
        <div
          key={unit._id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
        >
          <div className="w-full h-64 overflow-hidden">
            <img
              src={unit.images?.[0]}
              alt="unit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-bold">{unit.type}</h3>
            <p className="text-sm text-gray-600">
              {unit.location?.address}, {unit.location?.city}
            </p>
            <div className="flex justify-between text-sm text-gray-700">
              <span>المساحة: {unit.size} م²</span>
              <span>عدد الأسهم: {unit.noOfShares}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <div className="flex gap-2 items-center">
                <FaBed /> {unit.noOfRooms}
              </div>
              <div className="flex gap-2 items-center">
                <FaBath /> {unit.noOfBathrooms}
              </div>
            </div>
            <div className="text-green-600 font-semibold">
              السعر المعروض: {unit.offeredPrice?.toLocaleString()} جنيه
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
