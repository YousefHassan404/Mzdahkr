import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "../Form/Button";
import Select from "../Form/Select";
import Input from "../Form/Input";
import "./Search.scss";
import { useNavigate } from "react-router-dom";


export default function RentSearch() {
  const [searchData, setSearchData] = useState({
    type: "",
    rooms: "",
    price: "",
    location: "",
  });
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  console.log(results);
  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (searchData.type) params.append("type", searchData.type);

      if (searchData.rooms) {
        const rooms = searchData.rooms.includes("+")
          ? "5+"
          : searchData.rooms.split(" ")[0]; // "2 غرف" => "2"
        params.append("noOfRooms", rooms);
      }

      if (searchData.price) params.append("offeredPrice", searchData.price);

      if (searchData.location) params.append("location", searchData.location);

      const response = await fetch(
        `http://localhost:5000/api/rent/search/?${params.toString()}`
      );

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("خطأ في البحث:", err);
    }
  };
const handleCardClick = (id) => navigate(`/rent/${id}`);

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <div
        className="search-bar-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          padding: "16px",
          marginTop: "80px",
          zIndex: 1,
        }}
      >
        <Button type="button" onClick={handleSearch}>
          إبحث
        </Button>

        <Select
          id="type"
          name="type"
          value={searchData.type}
          label="نوع العقار"
          handleChange={handleChange}
          options={["شقة", "فيلا", "دوبلكس", "أرض", "محل"]}
        />

        <Select
          id="rooms"
          name="rooms"
          value={searchData.rooms}
          label="غرف وحمامات"
          handleChange={handleChange}
          options={["1 غرفة", "2 غرف", "3 غرف", "4+ غرف", "5+"]}
        />

        <Select
          id="price"
          name="price"
          value={searchData.price}
          label="السعر"
          handleChange={handleChange}
          options={["< 500000", "500000-1000000", "> 1000000"]}
        />

        <div style={{ position: "relative", minWidth: "240px", flexGrow: 1 }}>
          <Input
            id="location"
            name="location"
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

      {/* Search Results */}
      <div style={{ marginTop: "40px" }}>
        {results.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {results.map((unit) => (
              <div
                key={unit._id}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px",
                  width: "300px",
                }}
                onClick={() => handleCardClick(unit._id)}
              >
                <img
                  src={unit.images[0]}
                  alt="وحدة"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <h3>{unit.type}</h3>
                <p>
                  الموقع: {unit.location.city} - {unit.location.region}
                </p>
                <p>عدد الغرف: {unit.noOfRooms}</p>
                <p>السعر: {unit.offeredPrice.toLocaleString()} جنيه</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            لا توجد نتائج
          </p>
        )}
      </div>
    </div>
  );
}
