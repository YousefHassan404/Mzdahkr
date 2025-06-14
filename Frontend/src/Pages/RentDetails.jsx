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
  const {
    data: unit,
    isLoading,
    isError,
  } = useGetData({
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl font-medium text-gray-500">
          جار تحميل بيانات الوحدة...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h3 className="text-xl font-bold text-red-600 mb-2">حدث خطأ</h3>
          <p className="text-gray-600">
            تعذر تحميل بيانات الوحدة. الرجاء المحاولة لاحقاً.
          </p>
        </div>
      </div>
    );

  // صور للعرض (3 صور أو كل الصور لو مفتوح)
  const imagesToShow = showAllImages
    ? unit.images
    : unit.images?.slice(0, 3) || [];

  // فيديوهات للعرض (1 فيديو أو كل الفيديوهات لو مفتوح)
  const videosToShow = showAllVideos
    ? unit.videos
    : unit.videos?.slice(0, 1) || [];

  return (
    <>
      <Header />
      <main
        dir="rtl"
        className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen mt-20"
      >
        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {unit.type}
              </h1>
              <p className="text-gray-500">
                {unit.location?.address}, {unit.location?.city}
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              للإيجار
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            معرض الصور
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesToShow.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:shadow-md transition-all"
                onClick={() => setOpen(true)}
              >
                <img
                  src={img}
                  alt={`Property ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* زر عرض المزيد للصور */}
          {unit.images && unit.images.length > 3 && !showAllImages && (
            <button
              onClick={() => setShowAllImages(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              عرض المزيد من الصور
            </button>
          )}
        </section>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={unit.images?.map((img) => ({ src: img })) || []}
          plugins={[Thumbnails]}
        />

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              تفاصيل الوحدة
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label="الموقع"
                  value={`${unit.location?.address}, ${unit.location?.city}`}
                />
                <DetailItem label="المساحة" value={`${unit.size} م²`} />
                <DetailItem label="عدد الغرف" value={unit.noOfRooms} />
                <DetailItem label="عدد الحمامات" value={unit.noOfBathrooms} />
                <DetailItem
                  label="سعر السوق"
                  value={`${unit.marketPrice?.toLocaleString()} جنيه`}
                />
                <DetailItem
                  label="تاريخ التسليم"
                  value={new Date(unit.deliveryDate).toLocaleDateString(
                    "ar-EG"
                  )}
                />
                <DetailItem label="الوقت المتبقي" value={countdown} />
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  السعر المعروض للإيجار
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {unit.offeredPrice?.toLocaleString()} جنيه
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  للايجار
                </h3>
              </div>

              <a
                href={`https://wa.me/${unit.ownerPhone || "201234567890"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                تواصل مع المالك
              </a>
            </div>
          </div>

          {/* Investment Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              معلومات الايجار
            </h2>

            <div className="space-y-4">
              <InfoCard
                title="الإيجار الشهري"
                value={`${unit.offeredPrice?.toLocaleString()} جنيه`}
                description="شامل رسوم الصيانة والخدمات"
              />
              <InfoCard
                title="مدة الإيجار"
                value="متاح "
                description="قابلة للتجديد حسب العقد"
              />
              <InfoCard
                title="التأمين"
                value="شهر واحد"
                description="يُسترد عند انتهاء العقد بدون أضرار"
              />
            </div>
          </div>
        </div>

        {/* Investors Section */}
        {unit.users?.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              المساهمون الحاليون
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المساهم
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عدد الأسهم
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نسبة الملكية
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unit.users.map((user, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        المستخدم #{user.userId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {user.shares}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {Math.round((user.shares / unit.noOfShares) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Videos Section */}
        {unit.videos?.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              فيديوهات الوحدة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videosToShow.map((vid, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-black">
                  <video
                    controls
                    className="w-full"
                    poster={`https://img.youtube.com/vi/${
                      vid.split("v=")[1]
                    }/0.jpg`}
                  >
                    <source src={vid} type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                </div>
              ))}
            </div>

            {/* زر عرض المزيد للفيديوهات */}
            {unit.videos.length > 1 && !showAllVideos && (
              <button
                onClick={() => setShowAllVideos(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                عرض المزيد من الفيديوهات
              </button>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

// Reusable Detail Component
function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}

// Reusable Info Card Component
function InfoCard({ title, value, description }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-lg font-semibold text-gray-800 mb-2">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
