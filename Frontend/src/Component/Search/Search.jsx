import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../Form/Button";
import Select from "../Form/Select";
import Input from "../Form/Input";
import "./Search.scss"; // تأكد من إضافة هذا السطر لاستيراد ملف CSS الخاص بك
export default function Search() {
  const [searchData, setSearchData] = useState({
    propertyType: "",
    category: "",
    rooms: "",
    price: "",
    more: "",
    location: "",
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // نفذ البحث هنا
    console.log("Searching with:", searchData);
  };

  return (
    <div
      className="search-bar-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        padding: "16px",
        marginTop: "80px", // This pushes it below a fixed header
        zIndex: 1,
      }}
    >
      <Button type="button" onClick={handleSearch}>
        إبحث
      </Button>

      <Select
        id="propertyType"
        value={searchData.propertyType}
        label="للإيجار / للبيع"
        handleChange={handleChange}
        options={["للإيجار", "للبيع"]}
      />

      <Select
        id="category"
        value={searchData.category}
        label="نوع العقار"
        handleChange={handleChange}
        options={["شقة", "فيلا", "دوبلكس", "أرض", "محل"]}
      />

      <Select
        id="rooms"
        value={searchData.rooms}
        label="غرف وحمامات"
        handleChange={handleChange}
        options={["1 غرفة", "2 غرف", "3 غرف", "4+ غرف"]}
      />

      <Select
        id="price"
        value={searchData.price}
        label="السعر"
        handleChange={handleChange}
        options={["< 500,000", "500,000 - 1,000,000", "> 1,000,000"]}
      />

      <Select
        id="more"
        value={searchData.more}
        label="المزيد من الخيارات"
        handleChange={handleChange}
        options={["بلكونة", "تشطيب فاخر", "موقف سيارة", "مفروش"]}
      />

      <div style={{ position: "relative", minWidth: "240px", flexGrow: 1 }}>
        <Input
          id="location"
          type="text"
          label="أدخل المدينة أو المنطقة أو اسم البناء"
          value={searchData.location}
          handleChange={handleChange}
        />
        <FaSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
          }}
        />
      </div>
    </div>
  );
}
