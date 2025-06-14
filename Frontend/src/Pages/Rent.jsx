import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
// import Search from "../Component/Search/Search";
import RentSearch from "../Component/RentSearch/RentSearch";
import RentUnits from "../Component/RentUnits/RentUnits";

export default function Rent() {
  return (
    <div className="min-h-screen flex flex-col bg-white mt-20">
      <Header />

      <main dir="rtl" className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section with CTA Button */}
        <div className="text-center mb-10 py-8 bg-gradient-to-l from-[#1F2548]/10 to-white rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2548] mb-4">
            استأجر وحدتك من مزدخر
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            نوفر لك خيارات إيجار مرنة وآمنة في مواقع مميزة ومناسبة لاحتياجاتك
          </p>
          <button className="bg-[#E87E0B] hover:bg-[#d9730a] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 relative z-10 animate-bounce">
            استأجر الآن بسهولة ويسر
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-10 p-6 rounded-xl shadow-md">
          <RentSearch />
        </div>

        {/* Rent Units List */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
            <h2 className="text-2xl font-bold text-[#1F2548]">الوحدات المتاحة للإيجار</h2>
            <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium">
              عرض الكل →
            </button>
          </div>
          <RentUnits />
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-[#1F2548] text-white p-8 rounded-xl text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">هل تحتاج مساعدة في الإيجار؟</h3>
          <p className="mb-6 text-lg">فريقنا جاهز لتقديم الدعم والإجابة على جميع استفساراتك</p>
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
