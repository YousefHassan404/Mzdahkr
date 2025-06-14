import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function EditUnit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedVideos, setDeletedVideos] = useState([]);

  // جلب بيانات الوحدة عند تحميل الصفحة
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/units/${id}`)
      .then((res) => setUnit(res.data))
      .catch((err) => console.error("فشل تحميل بيانات الوحدة:", err));
  }, [id]);

  // عرض رسالة أثناء تحميل البيانات
  if (!unit)
    return (
      <div className="text-center py-10 text-gray-600">
        جاري تحميل البيانات...
      </div>
    );

  // التعامل مع التغييرات في المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("installmentPlan.")) {
      const key = name.split(".")[1];
      setUnit((prev) => ({
        ...prev,
        installmentPlan: { ...prev.installmentPlan, [key]: value },
      }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setUnit((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setUnit((prev) => ({ ...prev, [name]: value }));
    }
  };

  // رفع الصور والفيديوهات الجديدة
  const handleImagesChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleVideosChange = (e) => {
    setNewVideos(Array.from(e.target.files));
  };

  // دالة لاستخراج اسم الملف من الـ URL
  const extractFilename = (url) => {
    if (!url) return '';
    return url.split('/').pop();
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // الحقول النصية
      formData.append("type", unit.type);
      formData.append("size", unit.size);
      formData.append("marketPrice", unit.marketPrice);
      formData.append("offeredPrice", unit.offeredPrice);
      formData.append("deliveryDate", unit.deliveryDate);
      formData.append("noOfRooms", unit.noOfRooms);
      formData.append("noOfBathrooms", unit.noOfBathrooms);

      // الحقول المركبة
      formData.append("installmentPlan", JSON.stringify(unit.installmentPlan));
      formData.append("location", JSON.stringify(unit.location));

      // إرسال الصور والفيديوهات الجديدة
      newImages.forEach((file) => formData.append("images", file));
      newVideos.forEach((file) => formData.append("videos", file));

      // تحويل URLs إلى filenames قبل الإرسال
      const imagesToRemove = deletedImages.map(url => extractFilename(url));
      const videosToRemove = deletedVideos.map(url => extractFilename(url));

      // إرسال الصور والفيديوهات التي تم حذفها (كـ filenames)
      formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
      formData.append("videosToRemove", JSON.stringify(videosToRemove));

      // تحديث الوحدة
      await axios.put(`http://localhost:5000/api/units/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin-dashboard/units-sale");
    } catch (err) {
      console.error("خطأ أثناء التحديث:", err);
      alert("❌ حدث خطأ أثناء تحديث الوحدة");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h2 className="text-xl font-bold mb-6 text-center text-blue-700">
          تعديل بيانات الوحدة
        </h2>

        <form dir="rtl" onSubmit={handleSubmit} className="space-y-4">
          {/* بيانات أساسية */}
          <input
            type="text"
            name="type"
            value={unit.type || ""}
            onChange={handleChange}
            placeholder="نوع الوحدة"
            className="input"
            required
          />
          <input
            type="number"
            name="size"
            value={unit.size || ""}
            onChange={handleChange}
            placeholder="المساحة بالمتر"
            className="input"
            required
          />
          <input
            type="number"
            name="marketPrice"
            value={unit.marketPrice || ""}
            onChange={handleChange}
            placeholder="السعر السوقي"
            className="input"
            required
          />
          <input
            type="number"
            name="offeredPrice"
            value={unit.offeredPrice || ""}
            onChange={handleChange}
            placeholder="السعر المعروض"
            className="input"
            required
          />
          <input
            type="date"
            name="deliveryDate"
            value={unit.deliveryDate?.split("T")[0] || ""}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="number"
            name="noOfRooms"
            value={unit.noOfRooms || ""}
            onChange={handleChange}
            placeholder="عدد الغرف"
            className="input"
            required
          />
          <input
            type="number"
            name="noOfBathrooms"
            value={unit.noOfBathrooms || ""}
            onChange={handleChange}
            placeholder="عدد الحمامات"
            className="input"
            required
          />

          {/* خطة التقسيط */}
          <fieldset className="border-t pt-4">
            <legend className="font-semibold mb-2 text-gray-700">
              خطة التقسيط
            </legend>
            <input
              type="text"
              name="installmentPlan.duration"
              value={unit.installmentPlan?.duration || ""}
              onChange={handleChange}
              placeholder="مدة التقسيط"
              className="input"
            />
            <input
              type="text"
              name="installmentPlan.downPayment"
              value={unit.installmentPlan?.downPayment || ""}
              onChange={handleChange}
              placeholder="الدفعة المقدمة"
              className="input"
            />
          </fieldset>

          {/* موقع الوحدة */}
          <fieldset className="border-t pt-4">
            <legend className="font-semibold mb-2 text-gray-700">
              موقع الوحدة
            </legend>
            <input
              type="text"
              name="location.address"
              value={unit.location?.address || ""}
              onChange={handleChange}
              placeholder="العنوان"
              className="input"
            />
            <input
              type="text"
              name="location.city"
              value={unit.location?.city || ""}
              onChange={handleChange}
              placeholder="المدينة"
              className="input"
            />
            <input
              type="text"
              name="location.region"
              value={unit.location?.region || ""}
              onChange={handleChange}
              placeholder="المنطقة"
              className="input"
            />
          </fieldset>

          {/* عرض الصور القديمة مع زر حذف */}
          {unit.images && unit.images.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">الصور الحالية</h3>
              <div className="flex flex-wrap gap-2">
                {unit.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`صورة ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setDeletedImages((prev) => [...prev, img]);
                        setUnit((prev) => ({
                          ...prev,
                          images: prev.images.filter((i) => i !== img),
                        }));
                      }}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* عرض الفيديوهات القديمة مع زر حذف */}
          {unit.videos && unit.videos.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">الفيديوهات الحالية</h3>
              <div className="flex flex-wrap gap-2">
                {unit.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video width="120" height="90" controls className="rounded">
                      <source src={video} />
                      المتصفح لا يدعم عرض الفيديو
                    </video>
                    <button
                      type="button"
                      onClick={() => {
                        setDeletedVideos((prev) => [...prev, video]);
                        setUnit((prev) => ({
                          ...prev,
                          videos: prev.videos.filter((v) => v !== video),
                        }));
                      }}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تحميل الصور الجديدة */}
          <div className="border-t pt-4">
            <label className="block mb-1 font-semibold">رفع صور جديدة</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
            />
            {newImages.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                تم اختيار {newImages.length} صورة جديدة
              </p>
            )}
          </div>

          {/* تحميل الفيديوهات الجديدة */}
          <div className="border-t pt-4">
            <label className="block mb-1 font-semibold">
              رفع فيديوهات جديدة
            </label>
            <input
              type="file"
              name="videos"
              multiple
              accept="video/*"
              onChange={handleVideosChange}
            />
            {newVideos.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                تم اختيار {newVideos.length} فيديو جديد
              </p>
            )}
          </div>

          {/* زر التحديث */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            تحديث الوحدة
          </button>
        </form>
      </div>
    </div>
  );
}