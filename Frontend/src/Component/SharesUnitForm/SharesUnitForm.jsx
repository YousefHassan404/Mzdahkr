// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Input from "../Form/Input";
// import Select from "../Form/Select";
// import Button from "../Form/Button";
// import sharesApi from "../../API/SharesUnit";

// export default function SharesUnitForm() {
//   const [usersList, setUsersList] = useState([]);
//   const [formData, setFormData] = useState({
//     type: "",
//     size: "",
//     marketPrice: "",
//     offeredPrice: "",
//     deliveryDate: "",
//     noOfShares: "",
//     price: "",
//     location: {
//       address: "",
//       city: "",
//       region: "",
//     },
//     images: [],
//     videos: [],
//     noOfRooms: "",
//     noOfBathrooms: "",
//     users: [{ userId: "", shares: "" }],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users");
//         setUsersList(response.data);
//       } catch (error) {
//         console.error("فشل في تحميل المستخدمين:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("location.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         location: { ...prev.location, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileUpload = (e, type) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       [type]: files,
//     }));
//   };

//   const handleUserChange = (index, field, value) => {
//     const updatedUsers = [...formData.users];
//     updatedUsers[index][field] = value;
//     setFormData((prev) => ({ ...prev, users: updatedUsers }));
//   };

//   const addUser = () => {
//     setFormData((prev) => ({
//       ...prev,
//       users: [...prev.users, { userId: "", shares: "" }],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = new FormData();

//       // Basic fields
//       payload.append("type", formData.type);
//       payload.append("size", formData.size);
//       payload.append("marketPrice", formData.marketPrice);
//       payload.append("offeredPrice", formData.offeredPrice);
//       payload.append("deliveryDate", formData.deliveryDate);
//       payload.append("noOfShares", formData.noOfShares);
//       payload.append("price", formData.price);
//       payload.append("noOfRooms", formData.noOfRooms);
//       payload.append("noOfBathrooms", formData.noOfBathrooms);

//       // Location object
//       payload.append("location[address]", formData.location.address);
//       payload.append("location[city]", formData.location.city);
//       payload.append("location[region]", formData.location.region);

//       // Images and videos
//       formData.images.forEach((img) => payload.append("images", img));
//       formData.videos.forEach((vid) => payload.append("videos", vid));

//       // Users array
//       formData.users.forEach((user, i) => {
//         payload.append(`users[${i}][userId]`, user.userId);
//         payload.append(`users[${i}][shares]`, user.shares);
//       });

//       await sharesApi.createShares(payload);

//       alert("تم حفظ البيانات بنجاح!");

//       // Optional: Reset form
//       setFormData({
//         type: "",
//         size: "",
//         marketPrice: "",
//         offeredPrice: "",
//         deliveryDate: "",
//         noOfShares: "",
//         price: "",
//         location: { address: "", city: "", region: "" },
//         images: [],
//         videos: [],
//         noOfRooms: "",
//         noOfBathrooms: "",
//         users: [{ userId: "", shares: "" }],
//       });
//     } catch (error) {
//       console.error("فشل في حفظ البيانات:", error);
//       alert("حدث خطأ أثناء حفظ البيانات.");
//     }
//   };

//   return (
//     <form
//       dir="rtl"
//       onSubmit={handleSubmit}
//       className="space-y-6 p-6 bg-white rounded-xl shadow-md"
//     >
//       <Select
//         id="type"
//         label="نوع الوحدة"
//         value={formData.type}
//         handleChange={handleChange}
//         options={["سكني", "تجاري", "فيلا", "شقة"]}
//       />
//       <Input id="size" label="المساحة (م²)" type="number" value={formData.size} handleChange={handleChange} />
//       <Input id="marketPrice" label="السعر السوقي" type="number" value={formData.marketPrice} handleChange={handleChange} />
//       <Input id="offeredPrice" label="السعر المعروض" type="number" value={formData.offeredPrice} handleChange={handleChange} />
//       <Input id="deliveryDate" label="تاريخ التسليم" type="date" value={formData.deliveryDate} handleChange={handleChange} />
//       <Input id="noOfShares" label="عدد الأسهم" type="number" value={formData.noOfShares} handleChange={handleChange} />
//       <Input id="price" label="السعر الإجمالي" type="number" value={formData.price} handleChange={handleChange} />

//       <div className="border p-4 rounded-md">
//         <h3 className="text-lg font-semibold mb-2">الموقع</h3>
//         <Input id="location.address" label="العنوان" value={formData.location.address} handleChange={handleChange} />
//         <Input id="location.city" label="المدينة" value={formData.location.city} handleChange={handleChange} />
//         <Input id="location.region" label="المنطقة" value={formData.location.region} handleChange={handleChange} />
//       </div>

//       <div>
//         <label className="block mb-2 text-sm font-medium">رفع الصور</label>
//         <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "images")} />
//         <div className="flex flex-wrap gap-2 mt-2">
//           {formData.images.map((img, i) => (
//             <img key={i} src={URL.createObjectURL(img)} alt="preview" className="w-20 h-20 object-cover rounded" />
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="block mb-2 text-sm font-medium">رفع الفيديوهات</label>
//         <input type="file" accept="video/*" multiple onChange={(e) => handleFileUpload(e, "videos")} />
//         <div className="flex flex-wrap gap-2 mt-2">
//           {formData.videos.map((vid, i) => (
//             <video key={i} src={URL.createObjectURL(vid)} controls className="w-32 h-20 rounded" />
//           ))}
//         </div>
//       </div>

//       <Input id="noOfRooms" label="عدد الغرف" type="number" value={formData.noOfRooms} handleChange={handleChange} />
//       <Input id="noOfBathrooms" label="عدد الحمامات" type="number" value={formData.noOfBathrooms} handleChange={handleChange} />

//       <div className="border p-4 rounded-md">
//         <h3 className="text-lg font-semibold mb-2">المستخدمين المساهمين</h3>
//         {formData.users.map((user, idx) => (
//           <div key={idx} className="grid grid-cols-2 gap-4 mb-4">
//             <Select
//               id={`userId-${idx}`}
//               label={`رقم الهاتف #${idx + 1}`}
//               value={user.userId}
//               handleChange={(e) => handleUserChange(idx, "userId", e.target.value)}
//               options={usersList.map((u) => ({
//                 value: u._id,
//                 label: u.email,
//               }))}
//             />
//             <Input
//               id={`shares-${idx}`}
//               label="عدد الأسهم"
//               type="number"
//               value={user.shares}
//               handleChange={(e) => handleUserChange(idx, "shares", e.target.value)}
//             />
//           </div>
//         ))}
//         <Button onClick={addUser} type="button">إضافة مستخدم آخر</Button>
//       </div>

//       <Button type="submit">حفظ البيانات</Button>
//     </form>
//   );
// }



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
    price: "",
    location: {
      address: "",
      city: "",
      region: "",
    },
    images: [],
    videos: [],
    noOfRooms: "",
    noOfBathrooms: "",
    users: [{ userId: "", shares: "" }],
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

  const [uploadedFiles, setUploadedFiles] = useState({
    images: [],
    videos: [],
  });

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
      payload.append("price", formData.price);
  
      // 👇 هنا التعديل
      payload.append("location", JSON.stringify(formData.location));
  
      payload.append("noOfRooms", formData.noOfRooms);
      payload.append("noOfBathrooms", formData.noOfBathrooms);
  
      uploadedFiles.images.forEach((file) => payload.append("images", file));
      uploadedFiles.videos.forEach((file) => payload.append("videos", file));
  
      // المستخدمين كمصفوفة
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
      className="space-y-6 p-6 bg-white rounded-xl shadow-md"
    >
      <Select
        id="type"
        label="نوع الوحدة"
        value={formData.type}
        handleChange={handleChange}
        options={["سكني", "تجاري", "فيلا", "شقة"]}
      />
      <Input id="size" label="المساحة (م²)" type="number" value={formData.size} handleChange={handleChange} />
      <Input id="marketPrice" label="السعر السوقي" type="number" value={formData.marketPrice} handleChange={handleChange} />
      <Input id="offeredPrice" label="السعر المعروض" type="number" value={formData.offeredPrice} handleChange={handleChange} />
      <Input id="deliveryDate" label="تاريخ التسليم" type="date" value={formData.deliveryDate} handleChange={handleChange} />
      <Input id="noOfShares" label="عدد الأسهم" type="number" value={formData.noOfShares} handleChange={handleChange} />
      <Input id="price" label="السعر الإجمالي" type="number" value={formData.price} handleChange={handleChange} />

      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">الموقع</h3>
        <Input id="location.address" label="العنوان" value={formData.location.address} handleChange={handleChange} />
        <Input id="location.city" label="المدينة" value={formData.location.city} handleChange={handleChange} />
        <Input id="location.region" label="المنطقة" value={formData.location.region} handleChange={handleChange} />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">رفع الصور</label>
        <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "images")} />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((img, i) => (
            <img key={i} src={img} alt="preview" className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">رفع الفيديوهات</label>
        <input type="file" accept="video/*" multiple onChange={(e) => handleFileUpload(e, "videos")} />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.videos.map((vid, i) => (
            <video key={i} src={vid} controls className="w-32 h-20 rounded" />
          ))}
        </div>
      </div>

      <Input id="noOfRooms" label="عدد الغرف" type="number" value={formData.noOfRooms} handleChange={handleChange} />
      <Input id="noOfBathrooms" label="عدد الحمامات" type="number" value={formData.noOfBathrooms} handleChange={handleChange} />

      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">المستخدمين المساهمين</h3>
        {formData.users.map((user, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-4 mb-4">
            <Select
              id={`userId-${idx}`}
              label={`رقم الهاتف #${idx + 1}`}
              value={user.userId}
              handleChange={(e) => handleUserChange(idx, "userId", e.target.value)}
              options={usersList.map((u) => ({
                value: u._id,
                label: u.phone,
              }))}
            />
            <Input
              id={`shares-${idx}`}
              label="عدد الأسهم"
              type="number"
              value={user.shares}
              handleChange={(e) => handleUserChange(idx, "shares", e.target.value)}
            />
          </div>
        ))}
        <Button onClick={addUser}>إضافة مستخدم آخر</Button>
      </div>

      <Button type="submit">حفظ البيانات</Button>
    </form>
  );
}
