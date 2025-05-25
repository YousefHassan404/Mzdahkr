import React, { useState } from "react";

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
    // Future: send filters to API or navigate to filtered results page
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background with better fallback */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-70"></div>
        <video
          autoPlay
          muted
          loop
          className="min-w-full min-h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-1084-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
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

        {/* Search Container with glass morphism effect */}
        <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 md:p-8 text-gray-100 space-y-4 border border-white border-opacity-20 shadow-2xl animate-slideUp">
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
              className="w-full p-4 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
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
            <div className="relative">
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="w-full p-3 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
                dir="rtl"
              >
                <option value="">نوع العقار</option>
                <option value="apartment">شقة</option>
                <option value="villa">فيلا</option>
                <option value="commercial">تجاري</option>
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

            <div className="relative">
              <select
                name="rooms"
                value={filters.rooms}
                onChange={handleChange}
                className="w-full p-3 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
                dir="rtl"
              >
                <option value="">عدد الغرف</option>
                <option value="1">1 غرفة</option>
                <option value="2">2 غرف</option>
                <option value="3">3 غرف</option>
                <option value="4+">4+ غرف</option>
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

            <div className="relative">
              <select
                name="baths"
                value={filters.baths}
                onChange={handleChange}
                className="w-full p-3 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 appearance-none"
                dir="rtl"
              >
                <option value="">عدد الحمامات</option>
                <option value="1">1 حمام</option>
                <option value="2">2 حمام</option>
                <option value="3">3 حمام</option>
                <option value="4+">4+ حمام</option>
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
          </div>

          {/* Search Button with hover effect */}
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg shadow-lg"
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

        {/* Scroll indicator */}
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
