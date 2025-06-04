import React, { useState } from "react";
import bg from'../../assets/bg.jpg'

const Hero = () => {
  const [filters, setFilters] = useState({
    type: "",
    rooms: "",
    baths: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Search with:", filters);
  };

  const handleStartNow = () => {
    console.log("Start now button clicked");
    // You can add navigation or other functionality here
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Img Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] opacity-80"></div>
        <img src={bg} width={'100%'} height={'100%'} alt="" className="object-cover w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            مزدخر – حيث تبدأ رحلتك إلى بيت الأحلام
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium text-blue-100">
            مزدخر، دليلك الأمثل للعقار المناسب
          </p>
        </div>

        {/* Glassmorphic Search Box - Hidden on mobile, visible from md breakpoint */}
        <div className="hidden md:block w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 text-gray-100 space-y-4 border border-white border-opacity-20 shadow-2xl animate-slideUp">
          <h3 className="text-xl font-semibold mb-2 text-white">
            ابحث عن العقار المثالي
          </h3>

          {/* City Search */}
          <div className="relative">
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              placeholder="أدخل اسم المدينة"
              className="w-full p-4 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#0F172A] placeholder-[#94A3B8]"
              dir="rtl"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "type",
                options: ["نوع العقار", "شقة", "فيلا", "تجاري"],
                values: ["", "apartment", "villa", "commercial"],
              },
              {
                name: "rooms",
                options: ["عدد الغرف", "1 غرفة", "2 غرف", "3 غرف", "4+ غرف"],
                values: ["", "1", "2", "3", "4+"],
              },
              {
                name: "baths",
                options: ["عدد الحمامات", "1 حمام", "2 حمام", "3 حمام", "4+ حمام"],
                values: ["", "1", "2", "3", "4+"],
              },
            ].map((field) => (
              <div className="relative" key={field.name}>
                <select
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#0F172A] appearance-none"
                  dir="rtl"
                >
                  {field.options.map((label, idx) => (
                    <option key={idx} value={field.values[idx]}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-white py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 font-medium text-lg shadow-lg"
          >
            بحث
            <svg
              className="inline-block mr-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Start Now Button - Visible only on mobile */}
        <div className="md:hidden mt-8">
          <button
            onClick={handleStartNow}
            className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-white py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 font-bold text-xl shadow-lg"
          >
            ابدأ الآن
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="w-8 h-8 text-white opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;