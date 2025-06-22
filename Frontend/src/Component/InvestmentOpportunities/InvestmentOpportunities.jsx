// import React from "react";
// import SharesUnits from "../SharesUnits/SharesUnits";

// export default function InvestmentOpportunities() {
//   return (
//     <section className="py-10 px-4 md:px-16 bg-white">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         📈 فرص استثمارية
//       </h2>

//       {/* عرض فقط 3 مشاريع */}
//       <SharesUnits limit={3} />
//     </section>
//   );
// }



import React, { useState, useEffect } from "react";
import SharesUnits from "../SharesUnits/SharesUnits";

export default function InvestmentOpportunities() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('investment-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="investment-section"
      className="relative py-20 px-4 md:px-16 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 251, 235, 1) 0%, 
          rgba(254, 243, 199, 0.8) 25%, 
          rgba(253, 230, 138, 0.6) 50%, 
          rgba(252, 211, 77, 0.4) 75%, 
          rgba(245, 158, 11, 0.3) 100%)`
      }}
    >
      {/* العناصر الخلفية الزخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* دوائر هندسية */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-yellow-200/20 to-amber-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-orange-300/25 to-red-300/15 rounded-full blur-lg animate-pulse delay-500" />
        
        {/* أشكال هندسية إضافية */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-amber-400/40 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-6 h-6 bg-orange-400/30 rotate-12 animate-bounce" />
        
        {/* خطوط متدرجة */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-transparent via-orange-400/20 to-transparent" />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* العنوان والوصف */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* شارة مميزة */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                فرص ذهبية للاستثمار
              </div>
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent">
              فرص استثمارية
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-semibold text-stone-700">
              مختارة بعناية لضمان أفضل العائدات
            </span>
          </h2>

          {/* الخط الفاصل المزخرف */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32" />
            <div className="mx-4 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-32" />
          </div>

          {/* الوصف */}
          <p className="text-lg md:text-xl text-stone-600 font-medium max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعة مختارة من أفضل الفرص الاستثمارية العقارية، مدروسة بعناية لتحقيق أعلى عائد على الاستثمار مع أقل مخاطر ممكنة
          </p>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-amber-600 mb-2">+25%</div>
              <div className="text-stone-700 font-medium">متوسط العائد السنوي</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-stone-700 font-medium">مشروع ناجح</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-stone-700 font-medium">معدل رضا العملاء</div>
            </div>
          </div>
        </div>

        {/* قسم المشاريع */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* إطار المشاريع */}
          <div className="relative">
            {/* خلفية مزخرفة للمشاريع */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-amber-50/60 to-orange-50/40 rounded-3xl backdrop-blur-sm border border-amber-200/30 shadow-2xl" />
            
            {/* المحتوى */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">
                  أفضل الفرص المتاحة الآن
                </h3>
                <p className="text-stone-600">
                  مجموعة مختارة من المشاريع الواعدة بعائد مضمون
                </p>
              </div>

              {/* عرض المشاريع */}
              <SharesUnits limit={3} />
              
              {/* زر عرض المزيد */}
              <div className="text-center mt-12">
                <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    عرض جميع الفرص الاستثمارية
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* عبارة تحفيزية */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <p className="text-lg font-semibold">
              "استثمر اليوم في عقارات الغد - فرصتك لبناء ثروة حقيقية ومستدامة"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}