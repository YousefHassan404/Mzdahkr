// import React from "react";
// import Header from "../Component/Header/Header";
// import Footer from "../Component/Footer/Footer";
// // import Search from "../Component/Search/Search";
// import RentUnits from "../Component/RentUnits/RentUnits";
// import SharesUnits from "../Component/SharesUnits/SharesUnits";
// import UnitsList from "../Component/Units/Units";

// export default function Projects() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white mt-20">
//       <Header />

//       <main dir="rtl" className="flex-1 container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <div className="text-center mb-10 py-8 bg-gradient-to-l from-[#1F2548]/10 to-white rounded-xl">
//           <h1 className="text-3xl md:text-4xl font-bold text-[#1F2548] mb-4">
//             اكتشف وحدات الاستثمار والعقارات في مزدخر
//           </h1>
//           <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
//             سواء كنت تبحث عن الإيجار، الشراء أو الاستثمار – مزدخر توفر لك أفضل الخيارات
//           </p>
//         </div>

//         {/* Search Section */}
//         <div className="mb-10 p-6 rounded-xl shadow-md">
//           {/* <Search /> */}
//         </div>

//         {/* Rent Section */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
//             <h2 className="text-2xl font-bold text-[#1F2548]">وحدات متاحة للإيجار</h2>
//             <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
//               عرض الكل →
//             </button>
//           </div>
//           <RentUnits limit={3} />
//         </div>

//         {/* Buy Section */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
//             <h2 className="text-2xl font-bold text-[#1F2548]">وحدات متاحة للشراء</h2>
//             <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
//               عرض الكل →
//             </button>
//           </div>
//           <UnitsList limit={3} />
//         </div>

//         {/* Share/Investment Section */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
//             <h2 className="text-2xl font-bold text-[#1F2548]">فرص استثمارية متاحة</h2>
//             <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
//               عرض الكل →
//             </button>
//           </div>
//           <SharesUnits limit={3} />
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="bg-[#1F2548] text-white p-8 rounded-xl text-center mb-8">
//           <h3 className="text-2xl font-bold mb-4">هل تحتاج مساعدة في اختيار الأنسب لك؟</h3>
//           <p className="mb-6 text-lg">فريقنا جاهز لمساعدتك في اختيار الوحدة الأنسب لاحتياجاتك</p>
//           <button className="bg-[#E87E0B] hover:bg-[#d9730a] text-white font-bold py-3 px-8 rounded-lg mx-2 transition duration-300">
//             تواصل معنا
//           </button>
//           <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg mx-2 transition duration-300">
//             الأسئلة الشائعة
//           </button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }



import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
// import Search from "../Component/Search/Search";
import RentUnits from "../Component/RentUnits/RentUnits";
import SharesUnits from "../Component/SharesUnits/SharesUnits";
import UnitsList from "../Component/Units/Units";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 mt-20">
      <Header />

      <main dir="rtl" className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section with CTA Button */}
        <div className="text-center mb-10 py-12 bg-gradient-to-br from-amber-900/60 via-stone-800/50 to-zinc-900/70 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* خلفية متدرجة إضافية */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-500/20 to-yellow-600/20 blur-xl" />
          
          {/* عناصر هندسية متحركة */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-amber-600/30 to-yellow-600/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-600/30 to-amber-700/30 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 bg-clip-text text-transparent">
                اكتشف وحدات الاستثمار والعقارات في مزدخر
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              سواء كنت تبحث عن الإيجار، الشراء أو الاستثمار – مزدخر توفر لك أفضل الخيارات
            </p>
            <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">ابدأ استثمارك الآن</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-10 backdrop-blur-xl bg-white/80 p-8 rounded-3xl shadow-2xl border border-amber-200/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-orange-100/20 to-yellow-100/30" />
          <div className="relative z-10">
            {/* <Search /> */}
            <div className="text-center text-amber-800/60 font-medium">
              البحث المتقدم قريباً...
            </div>
          </div>
        </div>

        {/* Rent Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-b-4 border-gradient-to-r from-amber-500 to-orange-500">
            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text">
              وحدات متاحة للإيجار
            </h2>
            <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">عرض الكل ←</span>
            </button>
          </div>
          <RentUnits limit={3} />
        </div>

        {/* Buy Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-b-4 border-gradient-to-r from-amber-500 to-orange-500">
            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text">
              وحدات متاحة للشراء
            </h2>
            <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">عرض الكل ←</span>
            </button>
          </div>
          <UnitsList limit={3} />
        </div>

        {/* Share/Investment Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-b-4 border-gradient-to-r from-amber-500 to-orange-500">
            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-700 bg-clip-text">
              فرص استثمارية متاحة
            </h2>
            <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">عرض الكل ←</span>
            </button>
          </div>
          <SharesUnits limit={3} />
        </div>

        {/* Bottom CTA Section */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-amber-900/80 via-stone-800/70 to-zinc-900/80 text-white p-10 rounded-3xl text-center mb-8 shadow-2xl border border-amber-200/20 overflow-hidden">
          {/* تأثير الضوء */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-500/20 to-yellow-600/20 blur-xl" />
          
          {/* عناصر هندسية */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-5 left-5 w-20 h-20 bg-gradient-to-br from-amber-600/30 to-yellow-600/30 rounded-full blur-lg animate-pulse" />
            <div className="absolute bottom-5 right-5 w-24 h-24 bg-gradient-to-br from-orange-600/30 to-amber-700/30 rounded-full blur-lg animate-pulse delay-1000" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-100 bg-clip-text text-transparent">
              هل تحتاج مساعدة في اختيار الأنسب لك؟
            </h3>
            <p className="mb-8 text-xl text-white/90 font-medium leading-relaxed">
              فريقنا جاهز لمساعدتك في اختيار الوحدة الأنسب لاحتياجاتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">تواصل معنا</span>
              </button>
              <button className="group relative overflow-hidden bg-transparent hover:bg-white/10 border-2 border-amber-300 hover:border-orange-300 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">الأسئلة الشائعة</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}