import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Form/Input";
import Select from "../Form/Select";
import Button from "../Form/Button";

export default function SharesUnitForm() {
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    marketPrice: "",
    offeredPrice: "",
    deliveryDate: "",
    noOfShares: "",
    location: {
      address: "",
      city: "",
      region: "",
    },
    locationUrl: "",
    images: [],
    videos: [],
    noOfRooms: "",
    noOfBathrooms: "",
    users: [{ userId: "", shares: "" }],
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    images: [],
    videos: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsersList(response.data);
      } catch (error) {
        console.error("فشل في تحميل المستخدمين:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      [type]: previews,
    }));
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: files,
    }));
  };

  const handleUserChange = (index, field, value) => {
    const updatedUsers = [...formData.users];
    updatedUsers[index][field] = value;
    setFormData((prev) => ({ ...prev, users: updatedUsers }));
  };

  const addUser = () => {
    setFormData((prev) => ({
      ...prev,
      users: [...prev.users, { userId: "", shares: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("type", formData.type);
      payload.append("size", formData.size);
      payload.append("marketPrice", formData.marketPrice);
      payload.append("offeredPrice", formData.offeredPrice);
      payload.append("deliveryDate", formData.deliveryDate);
      payload.append("noOfShares", formData.noOfShares);
      payload.append("location", JSON.stringify(formData.location));
      payload.append("locationUrl", formData.locationUrl);
      payload.append("noOfRooms", formData.noOfRooms);
      payload.append("noOfBathrooms", formData.noOfBathrooms);

      uploadedFiles.images.forEach((file) => payload.append("images", file));
      uploadedFiles.videos.forEach((file) => payload.append("videos", file));
      payload.append("users", JSON.stringify(formData.users));

      await axios.post("http://localhost:5000/api/shares", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("تم حفظ الوحدة بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ الوحدة:", error);
      alert("فشل في حفظ البيانات");
    }
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-20 bg-white shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        إضافة وحدة بأسهم
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input id="type" label="نوع الوحدة" value={formData.type} handleChange={handleChange} />
        <Input id="size" label="المساحة (م²)" type="number" value={formData.size} handleChange={handleChange} />
        <Input id="marketPrice" label="السعر السوقي" type="number" value={formData.marketPrice} handleChange={handleChange} />
        <Input id="offeredPrice" label="السعر المعروض" type="number" value={formData.offeredPrice} handleChange={handleChange} />
        <Input id="deliveryDate" label="تاريخ التسليم" type="date" value={formData.deliveryDate} handleChange={handleChange} />
        <Input id="noOfShares" label="عدد الأسهم" type="number" value={formData.noOfShares} handleChange={handleChange} />
        <Input id="noOfRooms" label="عدد الغرف" type="number" value={formData.noOfRooms} handleChange={handleChange} />
        <Input id="noOfBathrooms" label="عدد الحمامات" type="number" value={formData.noOfBathrooms} handleChange={handleChange} />
      </div>

      <div className="border border-gray-200 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">الموقع</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input id="location.address" label="العنوان" value={formData.location.address} handleChange={handleChange} />
          <Input id="location.city" label="المدينة" value={formData.location.city} handleChange={handleChange} />
          <Input id="location.region" label="المنطقة" value={formData.location.region} handleChange={handleChange} />
        </div>
        <Input id="locationUrl" label="رابط الموقع على الخريطة" value={formData.locationUrl} handleChange={handleChange} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">رفع الصور</label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "images")} className="file-input" />
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.images.map((img, i) => (
              <img key={i} src={img} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">رفع الفيديوهات</label>
          <input type="file" accept="video/*" multiple onChange={(e) => handleFileUpload(e, "videos")} className="file-input" />
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.videos.map((vid, i) => (
              <video key={i} src={vid} controls className="w-32 h-20 rounded-lg border" />
            ))}
          </div>
        </div>
      </div>

      <Button type="submit">حفظ البيانات</Button>
    </form>
  );
}
