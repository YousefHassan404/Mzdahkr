// import React from "react";
// import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
// import { BsWhatsapp, BsShareFill } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import useGetData from "../../Utils/Hooks/useGetData";

// export default function RentUnits({ limit, filterType }) {
//   const { data, isLoading, isError } = useGetData({
//     url: "http://localhost:5000/api/rent",
//     key: ["rent"],
//   });

//   const navigate = useNavigate();

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-pulse text-xl font-medium text-navy-800">
//           جار تحميل الوحدات...
//         </div>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="text-center py-20 bg-gradient-to-b from-white to-gray-50 rounded-xl">
//         <p className="text-xl font-medium text-orange-600">
//           حدث خطأ في جلب البيانات
//         </p>
//         <p className="text-sm mt-2 text-gray-600">
//           الرجاء المحاولة مرة أخرى لاحقاً
//         </p>
//       </div>
//     );

//   let filteredData = data;
//   if (filterType) {
//     filteredData = filteredData.filter((unit) => unit.type === filterType);
//   }

//   if (limit) {
//     filteredData = filteredData.slice(0, limit);
//   }

//   const handleCardClick = (id) => navigate(`/rent/${id}`);

//   const calculateSavingsPercentage = (marketPrice, offeredPrice) => {
//     if (!marketPrice || !offeredPrice || marketPrice <= offeredPrice) return 0;
//     return Math.round(((marketPrice - offeredPrice) / marketPrice) * 100);
//   };

//   return (
//     <div dir="rtl" className="container mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
//         {filteredData.map((unit) => {
//           const savingsPercentage = calculateSavingsPercentage(
//             unit.marketPrice,
//             unit.offeredPrice
//           );

//           return (
//             <div
//               key={unit._id}
//               className="bg-white w-full max-w-md mx-auto rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//             >
//               {/* Image Section */}
//               <div className="relative">
//                 <div
//                   onClick={() => handleCardClick(unit._id)}
//                   className="w-full h-60 sm:h-64 overflow-hidden cursor-pointer"
//                 >
//                   <img
//                     src={unit.images?.[0] || "/placeholder-property.jpg"}
//                     alt={unit.type}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                     onError={(e) => {
//                       e.target.src = "/placeholder-property.jpg";
//                     }}
//                   />
//                 </div>

//                 {/* Share Button */}
//                 <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-orange-500 hover:text-white transition-colors">
//                   <BsShareFill className="text-navy-800 hover:text-white" />
//                 </div>

//                 {/* Savings Badge (محسنة) */}
//                 {savingsPercentage > 0 && (
//                   <div className="absolute top-3 right-3 bg-gradient-to-l from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 8c.857-2.571 2.857-4 6-4 2.5 0 4 1.5 4 4 0 1.5-.5 2.5-2 3l-8 3-3 8-4-2 3-8-3-8 4-2 3 8z"
//                       />
//                     </svg>
//                     <span className="text-sm sm:text-base font-bold whitespace-nowrap">
//                       وفر {savingsPercentage}%
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Card Content */}
//               <div className="p-5 space-y-4">
//                 <div className="flex justify-between items-start">
//                   <h3
//                     onClick={() => handleCardClick(unit._id)}
//                     className="text-xl font-bold text-navy-800 hover:text-orange-600 cursor-pointer line-clamp-1"
//                   >
//                     {unit.title || unit.type}
//                   </h3>
//                   <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">
//                     للإيجار
//                   </span>
//                 </div>

//                 <div className="flex items-center text-gray-500 text-sm">
//                   <IoLocationOutline className="ml-1" />
//                   <span className="line-clamp-1">
//                     {unit.location?.address}, {unit.location?.city}
//                   </span>
//                 </div>

//                 {/* Features Section */}
//                 <div className="flex justify-between text-gray-600 border-y border-gray-100 py-3">
//                   <div className="flex flex-col items-center">
//                     <FaBed className="text-navy-600" />
//                     <span className="text-xs mt-1 text-gray-700">
//                       {unit.noOfRooms} غرف
//                     </span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <FaBath className="text-navy-600" />
//                     <span className="text-xs mt-1 text-gray-700">
//                       {unit.noOfBathrooms} حمام
//                     </span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <FaRulerCombined className="text-navy-600" />
//                     <span className="text-xs mt-1 text-gray-700">
//                       {unit.size} م²
//                     </span>
//                   </div>
//                 </div>

//                 {/* Price and WhatsApp */}
//                 <div className="flex justify-between items-center pt-2">
//                   <div>
//                     <p className="text-sm text-gray-500">السعر الشهري</p>
//                     <div className="flex items-baseline gap-2">
//                       <p className="text-xl font-bold text-orange-600">
//                         {unit.offeredPrice?.toLocaleString()} جنيه
//                       </p>
//                       {unit.marketPrice && (
//                         <p className="text-sm text-gray-400 line-through">
//                           {unit.marketPrice?.toLocaleString()}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <a
//                     href={`https://wa.me/201234567890`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-md hover:shadow-lg"
//                   >
//                     <BsWhatsapp size={18} />
//                     تواصل
//                   </a>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import React from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { BsWhatsapp, BsShareFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useGetData from "../../Utils/Hooks/useGetData";

export default function RentUnits({ limit, filterType }) {
  const { data, isLoading, isError } = useGetData({
    url: "http://localhost:5000/api/rent",
    key: ["rent"],
  });

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl font-medium bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
          جار تحميل الوحدات...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200/30">
        <p className="text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
          حدث خطأ في جلب البيانات
        </p>
        <p className="text-sm mt-2 text-stone-600">
          الرجاء المحاولة مرة أخرى لاحقاً
        </p>
      </div>
    );

  let filteredData = data;
  if (filterType) {
    filteredData = filteredData.filter((unit) => unit.type === filterType);
  }

  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }

  const handleCardClick = (id) => navigate(`/rent/${id}`);

  const calculateSavingsPercentage = (marketPrice, offeredPrice) => {
    if (!marketPrice || !offeredPrice || marketPrice <= offeredPrice) return 0;
    return Math.round(((marketPrice - offeredPrice) / marketPrice) * 100);
  };

  return (
    <div dir="rtl" className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredData.map((unit) => {
          const savingsPercentage = calculateSavingsPercentage(
            unit.marketPrice,
            unit.offeredPrice
          );

          return (
            <div
              key={unit._id}
              className="bg-white/90 backdrop-blur-sm w-full max-w-md mx-auto rounded-3xl shadow-xl overflow-hidden border border-amber-200/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative"
            >
              {/* تأثير الإضاءة الخفيف */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              {/* Image Section */}
              <div className="relative">
                <div
                  onClick={() => handleCardClick(unit._id)}
                  className="w-full h-60 sm:h-64 overflow-hidden cursor-pointer rounded-t-3xl"
                >
                  <img
                    src={unit.images?.[0] || "/placeholder-property.jpg"}
                    alt={unit.type}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/placeholder-property.jpg";
                    }}
                  />
                  {/* تأثير التدرج في الأسفل */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Share Button */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 group cursor-pointer">
                  <BsShareFill className="text-stone-700 group-hover:text-white text-sm" />
                </div>

                {/* Savings Badge */}
                {savingsPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">
                      وفر {savingsPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3
                    onClick={() => handleCardClick(unit._id)}
                    className="text-xl font-bold text-stone-800 hover:bg-gradient-to-r hover:from-amber-800 hover:to-orange-700 hover:bg-clip-text hover:text-transparent cursor-pointer line-clamp-1 transition-all duration-300"
                  >
                    {unit.title || unit.type}
                  </h3>
                  <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm px-3 py-1 rounded-full font-bold border border-amber-200">
                    للإيجار
                  </span>
                </div>

                <div className="flex items-center text-stone-600 text-sm">
                  <IoLocationOutline className="ml-1 text-amber-600" />
                  <span className="line-clamp-1">
                    {unit.location?.address}, {unit.location?.city}
                  </span>
                </div>

                {/* Features Section */}
                <div className="flex justify-between text-stone-600 border-y border-amber-200/50 py-4 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl px-4">
                  <div className="flex flex-col items-center">
                    <FaBed className="text-amber-600 text-lg mb-1" />
                    <span className="text-xs text-stone-700 font-medium">
                      {unit.noOfRooms} غرف
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaBath className="text-amber-600 text-lg mb-1" />
                    <span className="text-xs text-stone-700 font-medium">
                      {unit.noOfBathrooms} حمام
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaRulerCombined className="text-amber-600 text-lg mb-1" />
                    <span className="text-xs text-stone-700 font-medium">
                      {unit.size} م²
                    </span>
                  </div>
                </div>

                {/* Price and WhatsApp */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-stone-500 font-medium">السعر الشهري</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {unit.offeredPrice?.toLocaleString()} جنيه
                      </p>
                      {unit.marketPrice && (
                        <p className="text-sm text-stone-400 line-through">
                          {unit.marketPrice?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/201234567890`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden flex items-center gap-2 text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <BsWhatsapp size={18} className="relative z-10" />
                    <span className="relative z-10">تواصل</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}