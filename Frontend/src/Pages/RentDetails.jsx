import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../Utils/Hooks/useGetData";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

export default function RentDetails() {
  const { id } = useParams();
  const { data: unit, isLoading, isError } = useGetData({
    url: `http://localhost:5000/api/rent/${id}`,
    key: ["rent", id],
  });

  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  useEffect(() => {
    if (!unit?.deliveryDate) return;

    function updateCountdown() {
      const now = new Date();
      const deliveryDate = new Date(unit.deliveryDate);
      const diff = deliveryDate - now;

      if (diff <= 0) {
        setCountdown("تم التسليم");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`باقي ${days} يوم، ${hours} ساعة، ${minutes} دقيقة`);
      }
    }

    updateCountdown();
    const timerId = setInterval(updateCountdown, 60000);
    return () => clearInterval(timerId);
  }, [unit?.deliveryDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="animate-pulse text-xl font-medium text-white">
          جار تحميل بيانات الوحدة...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="text-center p-6 bg-white rounded-lg max-w-md shadow-xl">
          <h3 className="text-xl font-bold text-orange-600 mb-2">حدث خطأ</h3>
          <p className="text-gray-600">تعذر تحميل بيانات الوحدة. الرجاء المحاولة لاحقاً.</p>
        </div>
      </div>
    );
  }

  const imagesToShow = showAllImages ? unit.images : unit.images?.slice(0, 3) || [];
  const videosToShow = showAllVideos ? unit.videos : unit.videos?.slice(0, 1) || [];

  return (
    <>
      <Header />
      <main dir="rtl" className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen mt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{unit.type}</h1>
              <p className="text-gray-300">{unit.location?.address}, {unit.location?.city}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md">
              للإيجار
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">معرض الصور</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagesToShow.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => setOpen(true)}
                  >
                    <img src={img} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 2 && unit.images?.length > 3 && !showAllImages && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold">
                        +{unit.images.length - 3} صور إضافية
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {unit.images?.length > 3 && !showAllImages && (
                <button
                  onClick={() => setShowAllImages(true)}
                  className="mt-4 text-orange-600 hover:underline font-medium flex items-center"
                >
                  عرض جميع الصور ({unit.images.length})
                  <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </section>

            {/* Property Details */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-6 pb-2 border-b border-gray-200">تفاصيل الوحدة</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem label="الموقع" value={`${unit.location?.address}, ${unit.location?.city}`} />
                  <DetailItem label="المساحة" value={`${unit.size} م²`} />
                  <DetailItem label="عدد الغرف" value={unit.noOfRooms} />
                  <DetailItem label="عدد الحمامات" value={unit.noOfBathrooms} />
                  <DetailItem label="سعر السوق" value={`${unit.marketPrice?.toLocaleString()} جنيه`} />
                  <DetailItem label="تاريخ التسليم" value={new Date(unit.deliveryDate).toLocaleDateString("ar-EG")} />
                  <DetailItem label="الوقت المتبقي" value={countdown} />
                  <DetailItem label="الموقع على الخريطة" value={
                    <a href={`${unit.locationUrl}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                      عرض على خرائط جوجل
                    </a>
                  } />
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-navy-800 mb-2">السعر المعروض للإيجار</h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {unit.offeredPrice?.toLocaleString()} جنيه
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-navy-800 mb-2">حالة الوحدة</h3>
                  <p className="text-xl font-bold text-navy-800">متاحة للإيجار</p>
                </div>

                <a
                  href={`https://wa.me/${unit.ownerPhone || "201234567890"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.063c-.545 1.492-1.578 2.721-2.927 3.116-.298.086-.684.173-1.026.086-.416-.086-.771-.344-1.07-.708-.396-.465-.665-1.04-.834-1.656-.178-.627-.248-1.294-.198-1.94.05-.627.198-1.24.446-1.814.248-.574.595-1.104 1.016-1.556.52-.555 1.115-.92 1.785-1.114.669-.198 1.364-.211 2.04-.05.347.074.669.211.967.396.396.273.669.644.843 1.075.174.43.223.89.149 1.34-.074.45-.322.888-.669 1.23-.347.347-.777.595-1.24.694-.463.1-.94.05-1.39-.124"/>
                  </svg>
                  تواصل مع المالك
                </a>
              </div>
            </section>

            {/* Videos Section */}
            {unit.videos?.length > 0 && (
              <section className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-navy-800 mb-4">فيديوهات الوحدة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videosToShow.map((vid, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden bg-black">
                      <video
                        controls
                        className="w-full"
                        poster={`https://img.youtube.com/vi/${vid.split("v=")[1]}/0.jpg`}
                      >
                        <source src={vid} type="video/mp4" />
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                    </div>
                  ))}
                </div>
                {unit.videos.length > 1 && !showAllVideos && (
                  <button
                    onClick={() => setShowAllVideos(true)}
                    className="mt-4 text-orange-600 hover:underline font-medium flex items-center"
                  >
                    عرض جميع الفيديوهات ({unit.videos.length})
                    <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </section>
            )}
          </div>

          {/* Right Column - Rental Info */}
          <div className="space-y-8">
            {/* Rental Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-6 pb-2 border-b border-gray-200">معلومات الإيجار</h2>
              <div className="space-y-4">
                <InfoCard 
                  title="الإيجار الشهري" 
                  value={`${unit.offeredPrice?.toLocaleString()} جنيه`} 
                  description="شامل رسوم الصيانة والخدمات" 
                />
                <InfoCard 
                  title="مدة الإيجار" 
                  value="سنوي قابل للتجديد" 
                  description="قابلة للتجديد حسب العقد" 
                />
                <InfoCard 
                  title="التأمين" 
                  value="شهر واحد" 
                  description="يُسترد عند انتهاء العقد بدون أضرار" 
                />
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">مميزات الوحدة</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">تشطيب فاخر</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">خدمات 24 ساعة</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">مواقف سيارات</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">نظام أمن متكامل</span>
                </li>
              </ul>
            </div>

            {/* Current Investors */}
            {unit.users?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-navy-800 mb-6 pb-2 border-b border-gray-200">المساهمون الحاليون</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المساهم</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد الأسهم</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النسبة</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {unit.users.map((user, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-navy-900">المستخدم #{user.userId}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.shares}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {Math.round((user.shares / unit.noOfShares) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox for Images */}
        <Lightbox 
          open={open} 
          close={() => setOpen(false)} 
          slides={unit.images?.map((img) => ({ src: img })) || []} 
          plugins={[Thumbnails]} 
        />
      </main>
      <Footer />
    </>
  );
}

// Reusable Components
function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-medium text-navy-800">{value}</p>
    </div>
  );
}

function InfoCard({ title, value, description }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-b from-white to-gray-50">
      <h4 className="text-sm font-medium text-navy-600 mb-1">{title}</h4>
      <p className="text-lg font-bold text-navy-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}