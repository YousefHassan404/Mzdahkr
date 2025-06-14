import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

export default function EditShare() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [videosToRemove, setVideosToRemove] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/shares/${id}`)
      .then(res => {
        const data = res.data;
        // Ensure images and videos arrays exist
        if (!data.images) data.images = [];
        if (!data.videos) data.videos = [];
        setForm(data);
      })
      .catch(err => console.error('فشل في تحميل بيانات الوحدة:', err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        location: { ...prev.location, [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNewImages = e => setNewImages([...e.target.files]);
  const handleNewVideos = e => setNewVideos([...e.target.files]);

  const toggleRemoveImage = img => {
    setImagesToRemove(prev => 
      prev.includes(img)
        ? prev.filter(i => i !== img)
        : [...prev, img]
    );
  };

  const toggleRemoveVideo = vid => {
    setVideosToRemove(prev => 
      prev.includes(vid)
        ? prev.filter(v => v !== vid)
        : [...prev, vid]
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Add basic form data
      formData.append('type', form.type || '');
      formData.append('size', form.size || '');
      formData.append('price', form.price || '');
      formData.append('noOfShares', form.noOfShares || '');
      formData.append('marketPrice', form.marketPrice || '');
      formData.append('offeredPrice', form.offeredPrice || '');
      formData.append('deliveryDate', form.deliveryDate || '');
      formData.append('location', JSON.stringify(form.location || {}));
      formData.append('noOfRooms', form.noOfRooms || '');
      formData.append('noOfBathrooms', form.noOfBathrooms || '');
      
      // Add items to remove
      if (imagesToRemove.length > 0) {
        formData.append('imagesToRemove', JSON.stringify(imagesToRemove));
      }
      if (videosToRemove.length > 0) {
        formData.append('videosToRemove', JSON.stringify(videosToRemove));
      }
      
      // Add new files
      newImages.forEach(file => formData.append('images', file));
      newVideos.forEach(file => formData.append('videos', file));

      const response = await axios.put(`http://localhost:5000/api/shares/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('تم التحديث بنجاح:', response.data);
      navigate('/admin-dashboard/share-units');
    } catch (err) {
      console.error('فشل في تحديث البيانات:', err.response?.data || err.message);
      alert('حدث خطأ أثناء التحديث. يرجى المحاولة مرة أخرى.');
    }
  };

  if (!form) return <div className="text-center mt-10 text-lg">جاري تحميل بيانات الوحدة...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-right rtl">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">تعديل بيانات وحدة الشيرز</h1>
        <form dir='rtl' onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-6">

          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">معلومات الوحدة</legend>
            <div className="grid grid-cols-2 gap-4">
              <input name="type" value={form.type || ''} onChange={handleChange} placeholder="نوع الوحدة" className="input-style" />
              <input name="size" type="number" value={form.size || ''} onChange={handleChange} placeholder="المساحة" className="input-style" />
              <input name="noOfShares" type="number" value={form.noOfShares || ''} onChange={handleChange} placeholder="عدد الشيرز" className="input-style" />
              <input name="marketPrice" type="number" value={form.marketPrice || ''} onChange={handleChange} placeholder="السعر السوقي" className="input-style" />
              <input name="offeredPrice" type="number" value={form.offeredPrice || ''} onChange={handleChange} placeholder="السعر المعروض" className="input-style" />
              <input name="deliveryDate" type="date" value={form.deliveryDate?.split('T')[0] || ''} onChange={handleChange} className="input-style col-span-2" />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold text-gray-700 mb-2">الموقع</legend>
            <div className="grid grid-cols-3 gap-4">
              <input name="location.address" value={form.location?.address || ''} onChange={handleChange} placeholder="العنوان" className="input-style" />
              <input name="location.city" value={form.location?.city || ''} onChange={handleChange} placeholder="المدينة" className="input-style" />
              <input name="location.region" value={form.location?.region || ''} onChange={handleChange} placeholder="المنطقة" className="input-style" />
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-4">
            <input name="noOfRooms" type="number" value={form.noOfRooms || ''} onChange={handleChange} placeholder="عدد الغرف" className="input-style" />
            <input name="noOfBathrooms" type="number" value={form.noOfBathrooms || ''} onChange={handleChange} placeholder="عدد الحمامات" className="input-style" />
          </div>

          {/* Current Images */}
          <div>
            <label className="font-semibold mb-1 block text-gray-700">الصور الحالية</label>
            <div className="flex flex-wrap gap-3">
              {form.images?.map((img, i) => {
                const isMarkedForRemoval = imagesToRemove.includes(img);
                return (
                  <div key={i} className="relative group">
                    <img 
                      src={img.startsWith('http') ? img : `http://localhost:5000/uploads/${img}`} 
                      alt={`صورة ${i + 1}`} 
                      className={`w-24 h-24 object-cover rounded border-2 ${
                        isMarkedForRemoval ? 'opacity-40 border-red-500' : 'border-gray-300'
                      }`} 
                    />
                    <button 
                      type="button" 
                      onClick={() => toggleRemoveImage(img)}
                      className={`absolute top-1 right-1 rounded-full w-6 h-6 text-xs font-bold ${
                        isMarkedForRemoval 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}
                      title={isMarkedForRemoval ? 'إلغاء الحذف' : 'حذف الصورة'}
                    >
                      {isMarkedForRemoval ? '↶' : '×'}
                    </button>
                  </div>
                );
              })}
            </div>
            {imagesToRemove.length > 0 && (
              <p className="text-sm text-red-600 mt-2">
                سيتم حذف {imagesToRemove.length} صورة عند التحديث
              </p>
            )}
          </div>

          {/* New Images */}
          <div>
            <label className="font-semibold block text-gray-700">رفع صور جديدة</label>
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

          {/* Current Videos */}
          <div>
            <label className="font-semibold mb-1 block text-gray-700">الفيديوهات الحالية</label>
            <div className="flex flex-wrap gap-3">
              {form.videos?.map((vid, i) => {
                const isMarkedForRemoval = videosToRemove.includes(vid);
                return (
                  <div key={i} className="relative group">
                    <video 
                      src={vid.startsWith('http') ? vid : `http://localhost:5000/uploads/${vid}`} 
                      controls 
                      className={`w-32 h-24 rounded border-2 ${
                        isMarkedForRemoval ? 'opacity-40 border-red-500' : 'border-gray-300'
                      }`} 
                    />
                    <button 
                      type="button" 
                      onClick={() => toggleRemoveVideo(vid)}
                      className={`absolute top-1 right-1 rounded-full w-6 h-6 text-xs font-bold ${
                        isMarkedForRemoval 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}
                      title={isMarkedForRemoval ? 'إلغاء الحذف' : 'حذف الفيديو'}
                    >
                      {isMarkedForRemoval ? '↶' : '×'}
                    </button>
                  </div>
                );
              })}
            </div>
            {videosToRemove.length > 0 && (
              <p className="text-sm text-red-600 mt-2">
                سيتم حذف {videosToRemove.length} فيديو عند التحديث
              </p>
            )}
          </div>

          {/* New Videos */}
          <div>
            <label className="font-semibold block text-gray-700">رفع فيديوهات جديدة</label>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            تحديث البيانات
          </button>
        </form>
      </main>
    </div>
  );
}