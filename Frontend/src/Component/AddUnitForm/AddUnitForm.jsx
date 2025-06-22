import React, { useState } from 'react';
import axios from 'axios';
import './AddUnitForm.css'
const AddUnitForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    size: '',
    marketPrice: '',
    offeredPrice: '',
    deliveryDate: '',
    noOfRooms: '',
    noOfBathrooms: '',
    installmentPlan: {
      downPayment: '',
      duration: '',
      monthlyInstallment: '',
    },
    location: {
      address: '',
      city: '',
      region: '',
    },
    locationUrl: '',
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('installmentPlan.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        installmentPlan: { ...prev.installmentPlan, [key]: value },
      }));
    } else if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') setImages(files);
    else if (name === 'videos') setVideos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    for (let img of images) data.append('images', img);
    for (let vid of videos) data.append('videos', vid);

    try {
      const res = await axios.post('http://localhost:5000/api/units', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ تم إضافة الوحدة بنجاح');
      setFormData({
        type: '',
        size: '',
        marketPrice: '',
        offeredPrice: '',
        deliveryDate: '',
        noOfRooms: '',
        noOfBathrooms: '',
        installmentPlan: {
          downPayment: '',
          duration: '',
          monthlyInstallment: '',
        },
        location: {
          address: '',
          city: '',
          region: '',
        },
        locationUrl: '',
      });
      setImages([]);
      setVideos([]);
    } catch (err) {
      console.error(err);
      setMessage('❌ حدث خطأ أثناء الإرسال');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir='rtl' className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">إضافة وحدة جديدة</h2>
            <p className="mt-2 text-sm text-gray-600">املأ النموذج أدناه لإضافة وحدة جديدة إلى النظام</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">المعلومات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    نوع الوحدة
                  </label>
                  <input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    المساحة (م²)
                  </label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="marketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    السعر السوقي
                  </label>
                  <input
                    type="number"
                    id="marketPrice"
                    name="marketPrice"
                    value={formData.marketPrice}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="offeredPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    السعر المعروض
                  </label>
                  <input
                    type="number"
                    id="offeredPrice"
                    name="offeredPrice"
                    value={formData.offeredPrice}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    تاريخ التسليم
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="noOfRooms" className="block text-sm font-medium text-gray-700 mb-1">
                    عدد الغرف
                  </label>
                  <input
                    type="number"
                    id="noOfRooms"
                    name="noOfRooms"
                    value={formData.noOfRooms}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="noOfBathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    عدد الحمامات
                  </label>
                  <input
                    type="number"
                    id="noOfBathrooms"
                    name="noOfBathrooms"
                    value={formData.noOfBathrooms}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Installment Plan Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">خطة التقسيط</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
                    المقدم
                  </label>
                  <input
                    type="number"
                    id="downPayment"
                    name="installmentPlan.downPayment"
                    value={formData.installmentPlan.downPayment}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    المدة (شهور)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="installmentPlan.duration"
                    value={formData.installmentPlan.duration}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="monthlyInstallment" className="block text-sm font-medium text-gray-700 mb-1">
                    القسط الشهري
                  </label>
                  <input
                    type="number"
                    id="monthlyInstallment"
                    name="installmentPlan.monthlyInstallment"
                    value={formData.installmentPlan.monthlyInstallment}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">الموقع</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    العنوان
                  </label>
                  <input
                    id="address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    المدينة
                  </label>
                  <input
                    id="city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                    المنطقة
                  </label>
                  <input
                    id="region"
                    name="location.region"
                    value={formData.location.region}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                  <label htmlFor="locationUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    الموقع علي Google Maps
                  </label>
                  <input
                    type="text"
                    id="locationUrl"
                    name="locationUrl"
                    value={formData.locationUrl}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
            </div>


            {/* Media Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">الوسائط</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                    صور الوحدة (يمكن اختيار أكثر من صورة)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="images"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>رفع ملفات</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                            required
                          />
                        </label>
                        <p className="pl-1">أو السحب والإفلات</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                      {images.length > 0 && (
                        <p className="text-sm text-green-600">{images.length} ملف(ات) تم اختيارها</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="videos" className="block text-sm font-medium text-gray-700 mb-1">
                    فيديوهات الوحدة (اختياري)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="videos"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>رفع ملفات</span>
                          <input
                            id="videos"
                            name="videos"
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">أو السحب والإفلات</p>
                      </div>
                      <p className="text-xs text-gray-500">MP4, MOV حتى 50MB</p>
                      {videos.length > 0 && (
                        <p className="text-sm text-green-600">{videos.length} ملف(ات) تم اختيارها</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الإرسال...
                  </>
                ) : (
                  'إضافة الوحدة'
                )}
              </button>
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-md ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="text-sm font-medium text-center">{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUnitForm;