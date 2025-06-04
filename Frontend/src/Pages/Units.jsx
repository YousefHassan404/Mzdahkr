import React from "react";
import UnitsList from "../Component/Units/Units";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import Search from "../Component/Search/Search";
// import AddUnitForm from "../Component/AddUnitForm/AddUnitForm";
export default function Units() {
  return (
    <>
      <Header></Header>
      <Search></Search>
      <UnitsList />
      <Footer></Footer>
    </>
  );
}
