// import React, { useState } from "react";
// import bg from'../../assets/bg.jpg'

// const Hero = () => {
//   const [filters, setFilters] = useState({
//     type: "",
//     rooms: "",
//     baths: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     console.log("Search with:", filters);
//   };

//   const handleStartNow = () => {
//     console.log("Start now button clicked");
//     // You can add navigation or other functionality here
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Img Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] opacity-80"></div>
//         <img src={bg} width={'100%'} height={'100%'} alt="" className="object-cover w-full h-full" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
//         <div className="animate-fadeIn">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
//             مزدخر – حيث تبدأ رحلتك إلى بيت الأحلام
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 font-medium text-blue-100">
//             مزدخر، دليلك الأمثل للعقار المناسب
//           </p>
//         </div>

//         {/* Glassmorphic Search Box - Hidden on mobile, visible from md breakpoint */}
//         <div className="hidden md:block w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 text-gray-100 space-y-4 border border-white border-opacity-20 shadow-2xl animate-slideUp">
//           <h3 className="text-xl font-semibold mb-2 text-white">
//             ابحث عن العقار المثالي
//           </h3>

//           {/* City Search */}
//           <div className="relative">
//             <input
//               type="text"
//               name="city"
//               value={filters.city}
//               onChange={handleChange}
//               placeholder="أدخل اسم المدينة"
//               className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#0F172A] placeholder-[#94A3B8]"
//               dir="rtl"
//             />
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>

//           {/* Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               {
//                 name: "type",
//                 options: ["نوع العقار", "شقة", "فيلا", "تجاري"],
//                 values: ["", "apartment", "villa", "commercial"],
//               },
//               {
//                 name: "rooms",
//                 options: ["عدد الغرف", "1 غرفة", "2 غرف", "3 غرف", "4+ غرف"],
//                 values: ["", "1", "2", "3", "4+"],
//               },
//               {
//                 name: "baths",
//                 options: ["عدد الحمامات", "1 حمام", "2 حمام", "3 حمام", "4+ حمام"],
//                 values: ["", "1", "2", "3", "4+"],
//               },
//             ].map((field) => (
//               <div className="relative" key={field.name}>
//                 <select
//                   name={field.name}
//                   value={filters[field.name]}
//                   onChange={handleChange}
//                   className="w-full p-3 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#0F172A] appearance-none"
//                   dir="rtl"
//                 >
//                   {field.options.map((label, idx) => (
//                     <option key={idx} value={field.values[idx]}>
//                       {label}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Search Button */}
//           <button
//             onClick={handleSearch}
//             className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-white py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 font-medium text-lg shadow-lg"
//           >
//             بحث
//             <svg
//               className="inline-block mr-2 w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Start Now Button - Visible only on mobile */}
//         <div className="md:hidden mt-8">
//           <button
//             onClick={handleStartNow}
//             className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-white py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 font-bold text-xl shadow-lg"
//           >
//             ابدأ الآن
//           </button>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 animate-bounce">
//           <svg
//             className="w-8 h-8 text-white opacity-80"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             ></path>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React from "react";
// import bg from '../../assets/bg.jpg';

// const Hero = () => {
//   const handleAction = (type) => {
//     console.log(`تم اختيار: ${type}`);
//     // هنا ممكن تضيف تنقل للرابط المناسب أو فلتر مثلاً
//   };

//   return (
//     <div dir="rtl" className="relative h-screen w-full overflow-hidden">
//       {/* خلفية الصورة */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] opacity-80"></div>
//         <img src={bg} alt="background" className="object-cover w-full h-full" />
//       </div>

//       {/* المحتوى */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
//         <div className="animate-fadeIn">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
//             مزدخر – حيث تبدأ رحلتك إلى بيت الأحلام
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 font-medium text-blue-100">
//             مزدخر، دليلك الأمثل لاكتشاف أفضل الفرص العقارية في مصر والعالم العربي
//           </p>
//         </div>

//         {/* قسم اكتشف مزدخر */}
//         <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 text-gray-100 border border-white border-opacity-20 shadow-2xl animate-slideUp space-y-6">
//           <h2 className="text-2xl font-bold text-white">اكتشف مزدخر</h2>
//           <p className="text-lg text-gray-200 leading-relaxed">
//             سواء كنت تبحث عن شراء بيت العمر، أو استئجار مكان مثالي، أو ترغب في استثمار ذكي، مزدخر يقدم لك أفضل الفرص بخبرة وثقة.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
//             <button
//               onClick={() => handleAction("شراء")}
//               className="w-full md:w-auto bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 px-6 rounded-lg transition duration-300 text-lg font-semibold shadow-md"
//             >
//               شراء 🏠
//             </button>
//             <button
//               onClick={() => handleAction("تأجير")}
//               className="w-full md:w-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 text-lg font-semibold shadow-md"
//             >
//               تأجير 🏢
//             </button>
//             <button
//               onClick={() => handleAction("استثمار")}
//               className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-3 px-6 rounded-lg transition duration-300 text-lg font-semibold shadow-md"
//             >
//               استثمار 📈
//             </button>
//           </div>
//         </div>

//         {/* سهم التمرير للأسفل */}
//         <div className="absolute bottom-8 animate-bounce">
//           <svg
//             className="w-8 h-8 text-white opacity-80"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAction = (type) => {
    switch (type) {
      case "شراء":
        navigate("/buy");
        break;

      case "تأجير":
        navigate("/rent");
        break;

      case "استثمار":
        navigate("/shares");
        break;
      default:
        break;
    }
  };

  return (
    <div dir="rtl" className="relative h-screen w-full overflow-hidden">
      {/* خلفية متدرجة متحركة */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(184, 134, 11, 0.3) 0%, 
                      rgba(92, 81, 59, 0.25) 25%, 
                      rgba(41, 37, 36, 0.8) 50%, 
                      rgba(28, 25, 23, 0.9) 100%)`,
        }}
      />

      {/* طبقة إضافية للعمق */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-900/60 via-stone-800/50 to-zinc-900/70" />

      {/* عناصر هندسية متحركة */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-br from-orange-600/20 to-amber-700/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-lg animate-pulse delay-500" />
      </div>

      {/* شبكة خفيفة */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8 space-y-4">
            {/* العنوان الرئيسي */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 bg-clip-text text-transparent">
                مزدخر
              </span>
            </h1>

            {/* العنوان الفرعي */}
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold text-white/90 mb-4 leading-relaxed">
                حيث تبدأ رحلتك إلى بيت الأحلام
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </div>

            {/* الوصف */}
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              دليلك الأمثل لاكتشاف أفضل الفرص العقارية في مصر والعالم العربي
            </p>
          </div>
        </div>

        {/* بطاقة الاكتشاف */}
        <div
          className={`w-full max-w-4xl transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {/* تأثير الضوء */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-600/10 via-orange-500/10 to-yellow-600/10 blur-xl" />

            <div className="relative z-10 space-y-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  اكتشف مزدخر
                </h3>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  سواء كنت تبحث عن شراء بيت العمر، أو استئجار مكان مثالي، أو
                  ترغب في استثمار ذكي، مزدخر يقدم لك أفضل الفرص بخبرة وثقة.
                </p>
              </div>

              {/* الأزرار */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <button
                  onClick={() => handleAction("شراء")}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white py-4 px-8 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">شراء</span>
                </button>

                <button
                  onClick={() => handleAction("تأجير")}
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white py-4 px-8 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">تأجير</span>
                </button>

                <button
                  onClick={() => handleAction("استثمار")}
                  className="group relative overflow-hidden bg-gradient-to-r from-stone-600 to-zinc-700 hover:from-stone-500 hover:to-zinc-600 text-white py-4 px-8 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">استثمار</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* سهم التمرير المحسن */}
        <div
          className={`absolute bottom-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="animate-bounce">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors duration-300 cursor-pointer">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1000 opacity-60" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse delay-2000 opacity-50" />
      </div>
    </div>
  );
};

export default Hero;
