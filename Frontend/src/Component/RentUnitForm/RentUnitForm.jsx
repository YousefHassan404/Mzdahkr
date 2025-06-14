// import React, { useState } from 'react';
// import axios from 'axios';

// const RentUnitForm = () => {
//   const [formData, setFormData] = useState({
//     type: '',
//     size: '',
//     marketPrice: '',
//     offeredPrice: '',
//     deliveryDate: '',
//     location: {
//       address: '',
//       city: '',
//       region: '',
//     },
//     noOfRooms: '',
//     noOfBathrooms: '',
//   });

//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [responseMsg, setResponseMsg] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (['address', 'city', 'region'].includes(name)) {
//       setFormData(prev => ({
//         ...prev,
//         location: { ...prev.location, [name]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === 'images') setImages(files);
//     if (name === 'videos') setVideos(files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     const data = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === 'location') {
//         data.append('location', JSON.stringify(value));
//       } else {
//         data.append(key, value);
//       }
//     });

//     Array.from(images).forEach((file) => {
//       data.append('images', file);
//     });

//     Array.from(videos).forEach((file) => {
//       data.append('videos', file);
//     });

//     try {
//       const res = await axios.post('http://localhost:5000/api/rent', data);
//       setResponseMsg('تم الإضافة بنجاح');
//     } catch (error) {
//       console.error(error);
//       setResponseMsg('حدث خطأ أثناء الإرسال');
//     }

//     setLoading(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       dir='rtl'
//       className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 mt-20"
//     >
//       <h2 className="text-xl font-bold">إضافة عقار للإيجار</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="type" type="text" placeholder="نوع العقار" className="input" onChange={handleChange} required />
//         <input name="size" type="number" placeholder="المساحة (م²)" className="input" onChange={handleChange} required />
//         <input name="marketPrice" type="number" placeholder="السعر في السوق" className="input" onChange={handleChange} required />
//         <input name="offeredPrice" type="number" placeholder="السعر المعروض" className="input" onChange={handleChange} required />
//         <input name="deliveryDate" type="date" className="input" onChange={handleChange} required />
//         <input name="noOfRooms" type="number" placeholder="عدد الغرف" className="input" onChange={handleChange} required />
//         <input name="noOfBathrooms" type="number" placeholder="عدد الحمامات" className="input" onChange={handleChange} required />
//         <input name="address" type="text" placeholder="العنوان" className="input" onChange={handleChange} required />
//         <input name="city" type="text" placeholder="المدينة" className="input" onChange={handleChange} required />
//         <input name="region" type="text" placeholder="المنطقة" className="input" onChange={handleChange} required />
//       </div>

//       <div className="space-y-2">
//         <label className="block text-gray-700">صور العقار</label>
//         <input name="images" type="file" multiple accept="image/*" onChange={handleFileChange} required className="block w-full text-sm" />

//         <label className="block text-gray-700">فيديوهات العقار</label>
//         <input name="videos" type="file" multiple accept="video/*" onChange={handleFileChange} required className="block w-full text-sm" />
//       </div>

//       <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
//         {loading ? 'جارٍ الإرسال...' : 'إرسال'}
//       </button>

//       {responseMsg && <p className="mt-2 text-center text-green-600">{responseMsg}</p>}
//     </form>
//   );
// };

// export default RentUnitForm;




import React, { useState } from 'react';
import axios from 'axios';
// import './RentUnitForm.css'; // Assuming you have a CSS file for styles
const RentUnitForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    size: '',
    marketPrice: '',
    offeredPrice: '',
    deliveryDate: '',
    location: {
      address: '',
      city: '',
      region: '',
    },
    noOfRooms: '',
    noOfBathrooms: '',
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['address', 'city', 'region'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') setImages(files);
    if (name === 'videos') setVideos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'location') {
        data.append('location', JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    Array.from(images).forEach(file => data.append('images', file));
    Array.from(videos).forEach(file => data.append('videos', file));

    try {
      const res = await axios.post('http://localhost:5000/api/rent', data);
      setResponseMsg('تم الإضافة بنجاح');
    } catch (err) {
      console.error(err);
      setResponseMsg('حدث خطأ أثناء الإرسال');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="max-w-4xl mx-auto mt-20 bg-white shadow-xl rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">إضافة وحدة للإيجار</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="type" type="text" placeholder="نوع العقار" className="input-field" onChange={handleChange} required />
        <input name="size" type="number" placeholder="المساحة (م²)" className="input-field" onChange={handleChange} required />
        <input name="marketPrice" type="number" placeholder="السعر في السوق" className="input-field" onChange={handleChange} required />
        <input name="offeredPrice" type="number" placeholder="السعر المعروض" className="input-field" onChange={handleChange} required />
        <input name="deliveryDate" type="date" className="input-field" onChange={handleChange} required />
        <input name="noOfRooms" type="number" placeholder="عدد الغرف" className="input-field" onChange={handleChange} required />
        <input name="noOfBathrooms" type="number" placeholder="عدد الحمامات" className="input-field" onChange={handleChange} required />
        <input name="address" type="text" placeholder="العنوان" className="input-field" onChange={handleChange} required />
        <input name="city" type="text" placeholder="المدينة" className="input-field" onChange={handleChange} required />
        <input name="region" type="text" placeholder="المنطقة" className="input-field" onChange={handleChange} required />
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block mb-2 text-gray-600 font-medium">صور العقار</label>
          <input name="images" type="file" multiple accept="image/*" onChange={handleFileChange} required className="file-input" />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">فيديوهات العقار</label>
          <input name="videos" type="file" multiple accept="video/*" onChange={handleFileChange}  className="file-input" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
      >
        {loading ? 'جارٍ الإرسال...' : 'إرسال'}
      </button>

      {responseMsg && (
        <div className="text-center text-green-600 font-medium">
          {responseMsg}
        </div>
      )}
    </form>
  );
};

export default RentUnitForm;
