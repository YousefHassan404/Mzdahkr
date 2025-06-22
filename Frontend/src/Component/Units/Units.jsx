// import React from "react";
// import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
// import { BsWhatsapp, BsShareFill } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import useGetData from "../../Utils/Hooks/useGetData";

// export default function UnitsList({ limit, filterType  }) {
//   const { data, isLoading, isError } = useGetData({
//     url: "http://localhost:5000/api/units",
//     key: ["units"],
//   });

  

//   const navigate = useNavigate();

//   if (isLoading) return <p>Loading ...</p>;

//   if (isError)
//     return (
//       <div className="text-center py-20 text-red-500">
//         <p className="text-xl font-medium">حدث خطأ في جلب البيانات</p>
//         <p className="text-sm mt-2">الرجاء المحاولة مرة أخرى لاحقاً</p>
//       </div>
//     );

//   // تصفية بناءً على النوع إن وجد
//   let filteredData = data;
//   if (filterType) {
//     filteredData = filteredData.filter((unit) => unit.type === filterType);
//   }

//   // اقتصاص حسب العدد المحدد
//   if (limit) {
//     filteredData = filteredData.slice(0, limit);
//   }

//   const handleCardClick = (id) => navigate(`/buy/${id}`);
//   console.log(data);
//   return (
//     <div dir="rtl" className="container mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
//         {filteredData.map((unit) => (
//           <div
//             key={unit._id}
//             className="bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
//           >
//             {/* Image Section */}
//             <div className="relative">
//               <div
//                 onClick={() => handleCardClick(unit._id)}
//                 className="w-full h-60 sm:h-64 overflow-hidden cursor-pointer"
//               >
//                 <img
//                   src={unit.images?.[0] || "/placeholder-property.jpg"}
//                   alt={unit.type}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   onError={(e) => {
//                     e.target.src = "/placeholder-property.jpg";
//                   }}
//                 />
//               </div>
//               <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
//                 <BsShareFill className="text-gray-700" />
//               </div>
//             </div>

//             {/* Card Content */}
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <h3
//                   onClick={() => handleCardClick(unit._id)}
//                   className="text-xl font-semibold text-gray-800 hover:text-primary cursor-pointer line-clamp-1"
//                 >
//                   {unit.title || unit.type}
//                 </h3>
//                 <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
//                    للبيع
//                 </span>
//               </div>

//               <div className="flex items-center text-gray-500 text-sm">
//                 <IoLocationOutline className="ml-1" />
//                 <span className="line-clamp-1">
//                   {unit.location?.address}, {unit.location?.city}
//                 </span>
//               </div>

//               {/* Features Section */}
//               <div className="flex justify-between text-gray-600 border-y border-gray-200 py-3">
//                 <div className="flex flex-col items-center">
//                   <FaBed className="text-gray-400" />
//                   <span className="text-xs mt-1">{unit.noOfRooms} غرف</span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <FaBath className="text-gray-400" />
//                   <span className="text-xs mt-1">{unit.noOfBathrooms} حمام</span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <FaRulerCombined className="text-gray-400" />
//                   <span className="text-xs mt-1">{unit.size} م²</span>
//                 </div>
//               </div>

//               {/* Price and WhatsApp */}
//               <div className="flex justify-between items-center pt-2">
//                 <div>
//                   <p className="text-sm text-gray-500">السعر المعروض</p>
//                   <p className="text-xl font-bold text-primary">
//                     {unit.offeredPrice?.toLocaleString()} جنيه
//                   </p>
//                   {unit.expectedReturn && (
//                     <p className="text-sm text-green-600 font-medium mt-1">
//                       📈 العائد المتوقع: {unit.expectedReturn}%
//                     </p>
//                   )}
//                 </div>
//                 <a
//                   href={`https://wa.me/201234567890`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition duration-200"
//                 >
//                   <BsWhatsapp size={18} />
//                   تواصل
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
// import { BsWhatsapp, BsShareFill } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import useGetData from "../../Utils/Hooks/useGetData";

// export default function UnitsList({ limit, filterType }) {
//   const { data, isLoading, isError } = useGetData({
//     url: "http://localhost:5000/api/units",
//     key: ["units"],
//   });

//   const navigate = useNavigate();

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-pulse flex space-x-4">
//           <div className="rounded-full bg-gray-200 h-12 w-12"></div>
//         </div>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="text-center py-20 text-red-500">
//         <p className="text-xl font-medium">حدث خطأ في جلب البيانات</p>
//         <p className="text-sm mt-2">الرجاء المحاولة مرة أخرى لاحقاً</p>
//       </div>
//     );

//   // Filter data
//   let filteredData = data;
//   if (filterType) {
//     filteredData = filteredData.filter((unit) => unit.type === filterType);
//   }

//   if (limit) {
//     filteredData = filteredData.slice(0, limit);
//   }

//   const handleCardClick = (id) => navigate(`/buy/${id}`);

//   return (
//     <div dir="rtl" className="bg-gradient-to-b from-[#F5F7FA] to-white">
//       <div className="container mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredData.map((unit) => (
//             <div
//               key={unit._id}
//               className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               {/* Image Section */}
//               <div className="relative">
//                 <div
//                   onClick={() => handleCardClick(unit._id)}
//                   className="w-full h-80 overflow-hidden cursor-pointer"
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

//                 {/* مشاركة */}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-[#1B2347] hover:text-white transition-colors">
//                   <BsShareFill className="text-[#1B2347] hover:text-white" />
//                 </div>

//                 {/* نوع الوحدة */}
//                 <div className="absolute bottom-4 right-4 bg-[#1B2347] text-white px-3 py-1 rounded-full text-sm font-medium">
//                   للبيع
//                 </div>

//                 {/* وفر نسبة */}
//                 {unit.marketPrice && unit.offeredPrice && (
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
//                     وفر {Math.round(((unit.marketPrice - unit.offeredPrice) / unit.marketPrice) * 100)}%
//                   </div>
//                 )}
//               </div>

//               {/* Card Content */}
//               <div className="p-6 space-y-4">
//                 {/* Title + Price */}
//                 <div>
//                   <h3
//                     onClick={() => handleCardClick(unit._id)}
//                     className="text-xl font-bold text-[#1B2347] hover:text-[#F39200] cursor-pointer line-clamp-1"
//                   >
//                     {unit.title || unit.type}
//                   </h3>

//                   <div className="flex items-center gap-2 mt-1">
//                     <p className="text-lg font-bold text-[#F39200]">
//                       {unit.offeredPrice?.toLocaleString()} جنيه
//                     </p>
//                     {unit.marketPrice && (
//                       <p className="line-through text-sm text-gray-500">
//                         {unit.marketPrice?.toLocaleString()} جنيه
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-center text-gray-600 text-sm">
//                   <IoLocationOutline className="ml-1 text-[#F39200]" />
//                   <span className="line-clamp-1">
//                     {unit.location?.address}, {unit.location?.city}
//                   </span>
//                 </div>

//                 {/* Features */}
//                 <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100">
//                   <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
//                     <FaBed className="text-[#1B2347]" />
//                     <span className="text-xs mt-1">{unit.noOfRooms} غرف</span>
//                   </div>
//                   <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
//                     <FaBath className="text-[#1B2347]" />
//                     <span className="text-xs mt-1">{unit.noOfBathrooms} حمام</span>
//                   </div>
//                   <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
//                     <FaRulerCombined className="text-[#1B2347]" />
//                     <span className="text-xs mt-1">{unit.size} م²</span>
//                   </div>
//                 </div>

//                 {/* Footer CTA */}
//                 <div className="flex justify-between items-center">
//                   {unit.expectedReturn && (
//                     <div className="bg-[#1B2347]/10 px-3 py-1 rounded-full">
//                       <p className="text-sm text-[#1B2347] font-medium">
//                         العائد المتوقع: <span className="text-[#F39200]">{unit.expectedReturn}%</span>
//                       </p>
//                     </div>
//                   )}
//                   <a
//                     href={`https://wa.me/201234567890`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 text-white bg-[#F39200] hover:bg-[#E08300] px-4 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-md hover:shadow-lg"
//                   >
//                     <BsWhatsapp size={16} />
//                     تواصل على واتساب
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
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

export default function UnitsList({ limit, filterType }) {
  const { data, isLoading, isError } = useGetData({
    url: "http://localhost:5000/api/units",
    key: ["units"],
  });

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl font-medium text-amber-700">
          جار تحميل الوحدات...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 bg-gradient-to-b from-amber-50 to-orange-50 rounded-xl border border-amber-200/30">
        <p className="text-xl font-medium text-orange-600">حدث خطأ في جلب البيانات</p>
        <p className="text-sm mt-2 text-stone-600">الرجاء المحاولة مرة أخرى لاحقاً</p>
      </div>
    );

  // Filter data
  let filteredData = data;
  if (filterType) {
    filteredData = filteredData.filter((unit) => unit.type === filterType);
  }

  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }

  const handleCardClick = (id) => navigate(`/buy/${id}`);

  return (
    <div dir="rtl" className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredData.map((unit) => {
          const savingsPercentage =
            unit.marketPrice && unit.offeredPrice && unit.marketPrice > unit.offeredPrice
              ? Math.round(((unit.marketPrice - unit.offeredPrice) / unit.marketPrice) * 100)
              : 0;

          return (
            <div
              key={unit._id}
              className="bg-white/90 backdrop-blur-sm w-full max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden border border-amber-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-300/70"
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

                {/* Share Button */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 border border-amber-200/50">
                  <BsShareFill className="text-amber-600 hover:text-white transition-colors duration-300" />
                </div>

                {/* Savings Badge */}
                {savingsPercentage > 0 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-l from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-bounce border border-amber-300/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c.857-2.571 2.857-4 6-4 2.5 0 4 1.5 4 4 0 1.5-.5 2.5-2 3l-8 3-3 8-4-2 3-8-3-8 4-2 3 8z"
                      />
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">
                      وفر {savingsPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 space-y-4 bg-gradient-to-b from-white/95 to-amber-50/80">
                <div className="flex justify-between items-start">
                  <h3
                    onClick={() => handleCardClick(unit._id)}
                    className="text-xl font-bold text-stone-800 hover:text-amber-600 cursor-pointer line-clamp-1 transition-colors duration-300"
                  >
                    {unit.title || unit.type}
                  </h3>
                  <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-sm px-3 py-1 rounded-full font-medium border border-amber-200/50 shadow-sm">
                    للبيع
                  </span>
                </div>

                <div className="flex items-center text-stone-600 text-sm">
                  <IoLocationOutline className="ml-1 text-amber-600" />
                  <span className="line-clamp-1">
                    {unit.location?.address}, {unit.location?.city}
                  </span>
                </div>

                {/* Features Section */}
                <div className="flex justify-between text-stone-600 border-y border-amber-200/50 py-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-lg px-2">
                  <div className="flex flex-col items-center">
                    <FaBed className="text-amber-600" />
                    <span className="text-xs mt-1 text-stone-700 font-medium">{unit.noOfRooms} غرف</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaBath className="text-amber-600" />
                    <span className="text-xs mt-1 text-stone-700 font-medium">{unit.noOfBathrooms} حمام</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaRulerCombined className="text-amber-600" />
                    <span className="text-xs mt-1 text-stone-700 font-medium">{unit.size} م²</span>
                  </div>
                </div>

                {/* Price and WhatsApp */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-stone-600 font-medium">السعر</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {unit.offeredPrice?.toLocaleString()} جنيه
                      </p>
                      {unit.marketPrice && (
                        <p className="line-through text-sm text-stone-500">
                          {unit.marketPrice?.toLocaleString()} جنيه
                        </p>
                      )}
                    </div>
                    {unit.expectedReturn && (
                      <p className="text-sm text-amber-600 font-bold mt-1 bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-1 rounded-md border border-amber-200/50">
                        العائد المتوقع: {unit.expectedReturn}%
                      </p>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/201234567890`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 border border-amber-500/30"
                  >
                    <BsWhatsapp size={18} />
                    تواصل
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