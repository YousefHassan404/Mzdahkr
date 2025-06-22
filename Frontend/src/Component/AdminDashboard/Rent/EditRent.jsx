import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { UserContext } from "../../../Utils/Context/userContext";

export default function EditRent() {
    const { user } = useContext(UserContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    size: "",
    marketPrice: "",
    offeredPrice: "",
    deliveryDate: "",
    location: { address: "", city: "", region: "" },
    locationUrl: "",
    noOfRooms: "",
    noOfBathrooms: "",
    images: [],
    videos: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [videosToRemove, setVideosToRemove] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rent/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("فشل في جلب البيانات:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: val },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleNewImages = (e) => setNewImages([...e.target.files]);
  const handleNewVideos = (e) => setNewVideos([...e.target.files]);

  const toggleRemoveImage = (img) =>
    setImagesToRemove((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );

  const toggleRemoveVideo = (vid) =>
    setVideosToRemove((prev) =>
      prev.includes(vid) ? prev.filter((v) => v !== vid) : [...prev, vid]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("type", form.type);
      formData.append("size", form.size);
      formData.append("marketPrice", form.marketPrice);
      formData.append("offeredPrice", form.offeredPrice);
      formData.append("deliveryDate", form.deliveryDate || "");
      formData.append("location", JSON.stringify(form.location));
      formData.append("locationUrl", form.locationUrl || "");
      formData.append("noOfRooms", form.noOfRooms);
      formData.append("noOfBathrooms", form.noOfBathrooms);
      formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
      formData.append("videosToRemove", JSON.stringify(videosToRemove));
      newImages.forEach((file) => formData.append("images", file));
      newVideos.forEach((file) => formData.append("videos", file));

      await axios.put(`http://localhost:5000/api/rent/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin-dashboard/units-rent");
    } catch (err) {
      console.error("فشل في التحديث:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        جاري تحميل بيانات الوحدة...
      </div>
    );
  }
if (!user || user.role !== "مدير") {
  return (
    <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
      🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
    </div>
  );
}


  return (
    <div className="flex min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          تعديل بيانات الوحدة
        </h1>
        <form
          dir="rtl"
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-6"
        >
          {/* Basic Info */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">
              معلومات الوحدة
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="نوع الوحدة"
                className="input-style"
              />
              <input
                name="size"
                type="number"
                value={form.size}
                onChange={handleChange}
                placeholder="المساحة"
                className="input-style"
              />
              <input
                name="marketPrice"
                type="number"
                value={form.marketPrice}
                onChange={handleChange}
                placeholder="السعر السوقي"
                className="input-style"
              />
              <input
                name="offeredPrice"
                type="number"
                value={form.offeredPrice}
                onChange={handleChange}
                placeholder="السعر المعروض"
                className="input-style"
              />
              <input
                name="deliveryDate"
                type="date"
                value={form.deliveryDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="input-style col-span-2"
              />
            </div>
          </fieldset>

          {/* Location */}
          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">
              الموقع
            </legend>
            <div className="grid grid-cols-3 gap-4">
              <input
                name="location.address"
                value={form.location?.address || ""}
                onChange={handleChange}
                placeholder="العنوان"
                className="input-style"
              />
              <input
                name="location.city"
                value={form.location?.city || ""}
                onChange={handleChange}
                placeholder="المدينة"
                className="input-style"
              />
              <input
                name="location.region"
                value={form.location?.region || ""}
                onChange={handleChange}
                placeholder="المنطقة"
                className="input-style"
              />
            </div>
            <input
              name="locationUrl"
              value={form.locationUrl}
              onChange={handleChange}
              placeholder="رابط الموقع على الخريطة"
              className="input-style col-span-3"
            />
          </fieldset>

          {/* Room Info */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="noOfRooms"
              type="number"
              value={form.noOfRooms}
              onChange={handleChange}
              placeholder="عدد الغرف"
              className="input-style"
            />
            <input
              name="noOfBathrooms"
              type="number"
              value={form.noOfBathrooms}
              onChange={handleChange}
              placeholder="عدد الحمامات"
              className="input-style"
            />
          </div>

          {/* Images */}
          <div>
            <label className="font-semibold mb-1 block text-gray-700">
              الصور الحالية
            </label>
            <div className="flex flex-wrap gap-3">
              {form.images?.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt="img"
                    className={`w-24 h-24 object-cover rounded ${
                      imagesToRemove.includes(img) ? "opacity-40" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleRemoveImage(img)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold block text-gray-700">
              رفع صور جديدة
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleNewImages}
              className="mt-2 block w-full border border-gray-300 rounded p-2 text-sm"
            />
            {newImages.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                {newImages.length} صورة جديدة مضافة
              </p>
            )}
          </div>

          {/* Videos */}
          <div>
            <label className="font-semibold mb-1 block text-gray-700">
              الفيديوهات الحالية
            </label>
            <div className="flex flex-wrap gap-3">
              {form.videos?.map((vid, i) => (
                <div key={i} className="relative group">
                  <video
                    src={vid}
                    controls
                    className={`w-32 h-24 rounded ${
                      videosToRemove.includes(vid) ? "opacity-40" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleRemoveVideo(vid)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold block text-gray-700">
              رفع فيديوهات جديدة
            </label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleNewVideos}
              className="mt-2 block w-full border border-gray-300 rounded p-2 text-sm"
            />
            {newVideos.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                {newVideos.length} فيديو جديد مضاف
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg font-semibold transition"
          >
            تحديث البيانات
          </button>
        </form>
      </main>
    </div>
  );
}
