import React from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { BsWhatsapp, BsShareFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useGetData from "../../Utils/Hooks/useGetData";

export default function UnitsList({ limit, filterType  }) {
  const { data, isLoading, isError } = useGetData({
    url: "http://localhost:5000/api/units",
    key: ["shares"],
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        <p className="text-xl font-medium">حدث خطأ في جلب البيانات</p>
        <p className="text-sm mt-2">الرجاء المحاولة مرة أخرى لاحقاً</p>
      </div>
    );

  // تصفية بناءً على النوع إن وجد
  let filteredData = data;
  if (filterType) {
    filteredData = filteredData.filter((unit) => unit.type === filterType);
  }

  // اقتصاص حسب العدد المحدد
  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }

  const handleCardClick = (id) => navigate(`/buy/${id}`);
  console.log(data);
  return (
    <div dir="rtl" className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
        {filteredData.map((unit) => (
          <div
            key={unit._id}
            className="bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="relative">
              <div
                onClick={() => handleCardClick(unit._id)}
                className="w-full h-60 sm:h-64 overflow-hidden cursor-pointer"
              >
                <img
                  src={unit.images?.[0] || "/placeholder-property.jpg"}
                  alt={unit.type}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/placeholder-property.jpg";
                  }}
                />
              </div>
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                <BsShareFill className="text-gray-700" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3
                  onClick={() => handleCardClick(unit._id)}
                  className="text-xl font-semibold text-gray-800 hover:text-primary cursor-pointer line-clamp-1"
                >
                  {unit.title || unit.type}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {unit.noOfShares} سهم
                </span>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <IoLocationOutline className="ml-1" />
                <span className="line-clamp-1">
                  {unit.location?.address}, {unit.location?.city}
                </span>
              </div>

              {/* Features Section */}
              <div className="flex justify-between text-gray-600 border-y border-gray-200 py-3">
                <div className="flex flex-col items-center">
                  <FaBed className="text-gray-400" />
                  <span className="text-xs mt-1">{unit.noOfRooms} غرف</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaBath className="text-gray-400" />
                  <span className="text-xs mt-1">{unit.noOfBathrooms} حمام</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaRulerCombined className="text-gray-400" />
                  <span className="text-xs mt-1">{unit.size} م²</span>
                </div>
              </div>

              {/* Price and WhatsApp */}
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-sm text-gray-500">السعر المعروض</p>
                  <p className="text-xl font-bold text-primary">
                    {unit.offeredPrice?.toLocaleString()} جنيه
                  </p>
                  {unit.expectedReturn && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      📈 العائد المتوقع: {unit.expectedReturn}%
                    </p>
                  )}
                </div>
                <a
                  href={`https://wa.me/201234567890`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition duration-200"
                >
                  <BsWhatsapp size={18} />
                  تواصل
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
