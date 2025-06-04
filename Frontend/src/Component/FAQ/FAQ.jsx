import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQ() {
  const faqs = [
    {
      question: "كيف أشتري عقار من خلال المنصة؟",
      answer:
        "يمكنك تصفح العقارات المتاحة، اختيار العقار المناسب، ثم إنشاء حساب وتقديم طلب شراء أو استثمار. فريق الدعم سيتواصل معك لتأكيد التفاصيل وإتمام العملية بأمان.",
    },
    {
      question: "هل هناك رسوم عند استخدام المنصة؟",
      answer:
        "الاشتراك في المنصة مجاني تمامًا. قد يتم فرض رسوم بسيطة عند إتمام عمليات الشراء أو الاستثمار، ويتم توضيحها قبل تأكيد العملية.",
    },
    {
      question: "هل العقارات موثقة ورسمية؟",
      answer:
        "نعم، جميع العقارات المعروضة على مزدخر يتم التحقق من ملكيتها وتوثيقها بشكل قانوني قبل عرضها على المستخدمين لضمان الأمان والثقة.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section dir="rtl" className="bg-white py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🧭 الأسئلة الشائعة
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-right text-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                {faq.question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
