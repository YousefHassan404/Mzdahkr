// import React, { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";

// export default function FAQ() {
//   const faqs = [
//     {
//       question: "كيف أشتري عقار من خلال المنصة؟",
//       answer:
//         "يمكنك تصفح العقارات المتاحة، اختيار العقار المناسب، ثم إنشاء حساب وتقديم طلب شراء أو استثمار. فريق الدعم سيتواصل معك لتأكيد التفاصيل وإتمام العملية بأمان.",
//     },
//     {
//       question: "هل هناك رسوم عند استخدام المنصة؟",
//       answer:
//         "الاشتراك في المنصة مجاني تمامًا. قد يتم فرض رسوم بسيطة عند إتمام عمليات الشراء أو الاستثمار، ويتم توضيحها قبل تأكيد العملية.",
//     },
//     {
//       question: "هل العقارات موثقة ورسمية؟",
//       answer:
//         "نعم، جميع العقارات المعروضة على مزدخر يتم التحقق من ملكيتها وتوثيقها بشكل قانوني قبل عرضها على المستخدمين لضمان الأمان والثقة.",
//     },
//   ];

//   const [openIndex, setOpenIndex] = useState(null);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section dir="rtl" className="bg-white py-12 px-6 sm:px-10 lg:px-20">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           🧭 الأسئلة الشائعة
//         </h2>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
//             >
//               <button
//                 onClick={() => toggle(index)}
//                 className="w-full flex justify-between items-center px-5 py-4 text-right text-lg font-medium text-gray-700 hover:bg-gray-50 transition"
//               >
//                 {faq.question}
//                 <FaChevronDown
//                   className={`transition-transform duration-300 ${
//                     openIndex === index ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {openIndex === index && (
//                 <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
//                   {faq.answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useState, useEffect } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "كيف أشتري عقار من خلال المنصة؟",
      answer:
        "يمكنك تصفح العقارات المتاحة، اختيار العقار المناسب، ثم إنشاء حساب وتقديم طلب شراء أو استثمار. فريق الدعم سيتواصل معك لتأكيد التفاصيل وإتمام العملية بأمان.",
      icon: "🏠"
    },
    {
      question: "هل هناك رسوم عند استخدام المنصة؟",
      answer:
        "الاشتراك في المنصة مجاني تمامًا. قد يتم فرض رسوم بسيطة عند إتمام عمليات الشراء أو الاستثمار، ويتم توضيحها قبل تأكيد العملية.",
      icon: "💰"
    },
    {
      question: "هل العقارات موثقة ورسمية؟",
      answer:
        "نعم، جميع العقارات المعروضة على مزدخر يتم التحقق من ملكيتها وتوثيقها بشكل قانوني قبل عرضها على المستخدمين لضمان الأمان والثقة.",
      icon: "✅"
    },
    {
      question: "ما هي أنواع العقارات المتاحة؟",
      answer:
        "نوفر مجموعة متنوعة من العقارات السكنية والتجارية والإدارية، بما في ذلك الشقق والفيلات والأراضي والمحلات التجارية والمكاتب.",
      icon: "🏢"
    },
    {
      question: "كيف يمكنني ضمان أمان استثماري؟",
      answer:
        "نوفر تقارير مالية شفافة، ودراسات جدوى مفصلة، وضمانات قانونية، بالإضافة إلى فريق خبراء للمتابعة والاستشارة المستمرة.",
      icon: "🛡️"
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);
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

    const section = document.getElementById('faq-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq-section"
      dir="rtl" 
      className="relative py-20 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(248, 250, 252, 1) 0%, 
          rgba(241, 245, 249, 0.8) 25%, 
          rgba(226, 232, 240, 0.6) 50%, 
          rgba(203, 213, 225, 0.4) 75%, 
          rgba(148, 163, 184, 0.2) 100%)`
      }}
    >
      {/* العناصر الخلفية الزخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-200/20 to-orange-300/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-32 w-60 h-60 bg-gradient-to-br from-stone-200/25 to-slate-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-amber-400/10 rounded-full blur-xl animate-pulse delay-500" />
        
        {/* نقاط متحركة */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-orange-400/50 rounded-full animate-bounce delay-700" />
        <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-stone-400/40 rounded-full animate-bounce delay-1400" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* العنوان والمقدمة */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* شارة الأسئلة الشائعة */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-400 to-slate-500 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-stone-600 to-slate-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                دليل الإجابات الشامل
              </div>
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-stone-700 via-slate-600 to-zinc-700 bg-clip-text text-transparent">
              الأسئلة الشائعة
            </span>
          </h2>

          {/* الخط الفاصل */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent w-32" />
            <div className="mx-4 w-3 h-3 bg-gradient-to-r from-stone-400 to-slate-500 rounded-full animate-pulse" />
            <div className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent w-32" />
          </div>

          {/* الوصف */}
          <p className="text-lg md:text-xl text-stone-600 font-medium max-w-3xl mx-auto leading-relaxed">
            إجابات شاملة على جميع استفساراتك حول منصة مزدخر والاستثمار العقاري الذكي
          </p>
        </div>

        {/* قسم الأسئلة */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-white to-amber-50/50 shadow-2xl scale-[1.02]' 
                    : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-xl'
                } backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-amber-300/50`}
              >
                {/* خلفية متحركة عند الفتح */}
                {openIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-orange-50/20 animate-pulse" />
                )}

                {/* السؤال */}
                <button
                  onClick={() => toggle(index)}
                  className="relative z-10 w-full flex justify-between items-center px-6 md:px-8 py-6 text-right transition-all duration-300 group-hover:px-10"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* الأيقونة */}
                    <div className={`text-2xl transition-all duration-300 ${
                      openIndex === index ? 'scale-125 animate-bounce' : 'group-hover:scale-110'
                    }`}>
                      {faq.icon}
                    </div>
                    
                    {/* نص السؤال */}
                    <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                      openIndex === index 
                        ? 'text-amber-700' 
                        : 'text-stone-700 group-hover:text-stone-900'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* سهم التوسيع */}
                  <div className={`transition-all duration-500 ${
                    openIndex === index ? "rotate-180 text-amber-600" : "text-stone-500 group-hover:text-stone-700"
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* الإجابة مع أنيميشن */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="relative z-10 px-6 md:px-8 pb-6">
                    {/* خط فاصل */}
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent mb-4" />
                    
                    {/* نص الإجابة */}
                    <div className="bg-gradient-to-r from-stone-50 to-amber-50/30 rounded-xl p-6 border border-amber-200/30">
                      <p className="text-stone-600 leading-relaxed text-base md:text-lg font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* قسم الدعم الإضافي */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-white/90 to-stone-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50">
            <h3 className="text-2xl font-bold text-stone-800 mb-4">
              لا تجد إجابة لسؤالك؟
            </h3>
            <p className="text-stone-600 mb-6 text-lg">
              فريق خدمة العملاء متاح 24/7 لمساعدتك في أي استفسار
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">تواصل معنا الآن</span>
              </button>
              <button className="group relative overflow-hidden bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-bold shadow-lg border-2 border-stone-300 hover:border-stone-400 transform hover:-translate-y-1 active:scale-95">
                <span className="relative z-10">دردشة فورية</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}