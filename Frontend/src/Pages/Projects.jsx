import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
// import Search from "../Component/Search/Search";
import RentUnits from "../Component/RentUnits/RentUnits";
import SharesUnits from "../Component/SharesUnits/SharesUnits";
import UnitsList from "../Component/Units/Units";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-white mt-20">
      <Header />

      <main dir="rtl" className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10 py-8 bg-gradient-to-l from-[#1F2548]/10 to-white rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2548] mb-4">
            اكتشف وحدات الاستثمار والعقارات في مزدخر
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            سواء كنت تبحث عن الإيجار، الشراء أو الاستثمار – مزدخر توفر لك أفضل الخيارات
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-10 p-6 rounded-xl shadow-md">
          {/* <Search /> */}
        </div>

        {/* Rent Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
            <h2 className="text-2xl font-bold text-[#1F2548]">وحدات متاحة للإيجار</h2>
            <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
              عرض الكل →
            </button>
          </div>
          <RentUnits limit={3} />
        </div>

        {/* Buy Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
            <h2 className="text-2xl font-bold text-[#1F2548]">وحدات متاحة للشراء</h2>
            <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
              عرض الكل →
            </button>
          </div>
          <UnitsList limit={3} />
        </div>

        {/* Share/Investment Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
            <h2 className="text-2xl font-bold text-[#1F2548]">فرص استثمارية متاحة</h2>
            <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
              عرض الكل →
            </button>
          </div>
          <SharesUnits limit={3} />
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-[#1F2548] text-white p-8 rounded-xl text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">هل تحتاج مساعدة في اختيار الأنسب لك؟</h3>
          <p className="mb-6 text-lg">فريقنا جاهز لمساعدتك في اختيار الوحدة الأنسب لاحتياجاتك</p>
          <button className="bg-[#E87E0B] hover:bg-[#d9730a] text-white font-bold py-3 px-8 rounded-lg mx-2 transition duration-300">
            تواصل معنا
          </button>
          <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg mx-2 transition duration-300">
            الأسئلة الشائعة
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
