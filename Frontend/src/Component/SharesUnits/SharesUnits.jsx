// import React from "react";
// import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
// import { BsWhatsapp, BsShareFill } from "react-icons/bs";
// import { IoLocationOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import useGetData from "../../Utils/Hooks/useGetData";

// export default function SharesUnits({ limit, filterType }) {
//   const { data, isLoading, isError } = useGetData({
//     url: "http://localhost:5000/api/shares",
//     key: ["shares"],
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
//         <p className="text-xl font-medium text-orange-600">حدث خطأ في جلب البيانات</p>
//         <p className="text-sm mt-2 text-gray-600">الرجاء المحاولة مرة أخرى لاحقاً</p>
//       </div>
//     );

//   let filteredData = data;
//   if (filterType) {
//     filteredData = filteredData.filter((unit) => unit.type === filterType);
//   }

//   if (limit) {
//     filteredData = filteredData.slice(0, limit);
//   }

//   const handleCardClick = (id) => navigate(`/shares/${id}`);

//   return (
//     <div dir="rtl" className="container mx-auto px-6 py-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
//         {filteredData.map((unit) => {
//           const remainingShares =
//             unit.noOfShares -
//             (unit.users?.reduce((total, user) => total + user.shares, 0) || 0);
//           const sharePercentage = (remainingShares / unit.noOfShares) * 100;
//           const savingsPercentage =
//             unit.marketPrice && unit.offeredPrice && unit.marketPrice > unit.offeredPrice
//               ? Math.round(((unit.marketPrice - unit.offeredPrice) / unit.marketPrice) * 100)
//               : 0;

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

//                 {/* Savings Badge */}
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
//                     <span className="text-sm font-bold whitespace-nowrap">
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
//                     {unit.noOfShares?.toLocaleString()} سهم
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
//                     <span className="text-xs mt-1 text-gray-700">{unit.noOfRooms} غرف</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <FaBath className="text-navy-600" />
//                     <span className="text-xs mt-1 text-gray-700">{unit.noOfBathrooms} حمام</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <FaRulerCombined className="text-navy-600" />
//                     <span className="text-xs mt-1 text-gray-700">{unit.size} م²</span>
//                   </div>
//                 </div>

//                 {/* Shares Progress */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-xs text-gray-600">
//                     <span>الأسهم المتبقية: {remainingShares?.toLocaleString()}</span>
//                     <span>{Math.round(sharePercentage)}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-orange-500 h-2 rounded-full"
//                       style={{ width: `${sharePercentage}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 {/* Price and WhatsApp */}
//                 <div className="flex justify-between items-center pt-2">
//                   <div>
//                     <p className="text-sm text-gray-500">سعر السهم</p>
//                     <p className="text-xl font-bold text-orange-600">
//                       {unit.offeredPrice && unit.noOfShares
//                         ? `${Math.round(unit.offeredPrice / unit.noOfShares).toLocaleString()}`
//                         : "N/A"}{" "}
//                       جنيه
//                     </p>
//                     {unit.expectedReturn && (
//                       <p className="text-sm text-green-600 font-medium mt-1">
//                         العائد المتوقع: {unit.expectedReturn}%
//                       </p>
//                     )}
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

export default function SharesUnits({ limit, filterType }) {
  const { data, isLoading, isError } = useGetData({
    url: "http://localhost:5000/api/shares",
    key: ["shares"],
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

  let filteredData = data;
  if (filterType) {
    filteredData = filteredData.filter((unit) => unit.type === filterType);
  }

  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }

  const handleCardClick = (id) => navigate(`/shares/${id}`);

  return (
    <div dir="rtl" className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredData.map((unit) => {
          const remainingShares =
            unit.noOfShares -
            (unit.users?.reduce((total, user) => total + user.shares, 0) || 0);
          const sharePercentage = (remainingShares / unit.noOfShares) * 100;
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
                    {unit.noOfShares?.toLocaleString()} سهم
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

                {/* Shares Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-stone-600 font-medium">
                    <span>الأسهم المتبقية: {remainingShares?.toLocaleString()}</span>
                    <span className="text-amber-600 font-bold">{Math.round(sharePercentage)}%</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-amber-100 to-orange-100 rounded-full h-3 shadow-inner border border-amber-200/50">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full shadow-sm transition-all duration-500 ease-out"
                      style={{ width: `${sharePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Price and WhatsApp */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-stone-600 font-medium">سعر السهم</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {unit.offeredPrice && unit.noOfShares
                        ? `${Math.round(unit.offeredPrice / unit.noOfShares).toLocaleString()}`
                        : "N/A"}{" "}
                      جنيه
                    </p>
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