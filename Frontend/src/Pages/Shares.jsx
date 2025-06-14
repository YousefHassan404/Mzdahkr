import React from 'react'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'
import SharesSearch from '../Component/SharesSearch/SharesSearch'
import SharesUnitForm from '../Component/SharesUnitForm/SharesUnitForm'
import SharesUnits from '../Component/SharesUnits/SharesUnits'

export default function Shares() {
  return (
    <div className="min-h-screen flex flex-col bg-white mt-20"  >
      <Header />
      
      <main dir="rtl" className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section with Investment CTA */}
        <div className="text-center mb-10 py-12 bg-gradient-to-l from-[#1F2548]/10 to-white rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('pattern.svg')]"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2548] mb-4 relative z-10">
            استثمر في أسهم مزدخر
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto relative z-10">
            انضم إلى منصة الاستثمار الرائدة وابدأ رحلتك نحو تحقيق عوائد مالية متميزة
          </p>
          <button className="bg-[#E87E0B] hover:bg-[#d9730a] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 relative z-10 animate-bounce">
            استثمر الآن في مزدخر
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-10 p-6 rounded-xl shadow-lg">
          <SharesSearch />
        </div>

        {/* Shares Units Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 border-b-2 border-[#E87E0B] pb-2">
            <h2 className="text-2xl font-bold text-[#1F2548]">
              الفرص الاستثمارية المتاحة
            </h2>
            <button className="text-[#E87E0B] hover:text-[#d9730a] font-medium flex items-center">
              عرض جميع الفرص <span className="mr-1">→</span>
            </button>
          </div>
          <SharesUnits />
        </div>

        {/* Investment Form Section */}
        <div className="bg-gray-50 border-r-4 border-[#E87E0B] p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-bold text-[#1F2548] mb-6 flex items-center">
            <span className="bg-[#E87E0B] text-white p-2 rounded-full mr-3">
              ✓
            </span>
            ابدأ استثمارك الآن
          </h2>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-[#1F2548] to-[#0F172A] text-white p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">هل تحتاج إلى مساعدة في الاستثمار؟</h3>
          <p className="mb-6 text-lg">خبراؤنا الماليون جاهزون لتقديم الاستشارات المجانية</p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#E87E0B] hover:bg-[#d9730a] text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              احجز استشارة مجانية
            </button>
            <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              اتصل بنا الآن
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}