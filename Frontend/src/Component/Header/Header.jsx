import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Utils/Context/userContext";
import authApi from "../../API/Auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user , setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  console.log(user)


  const logout = () => {
    authApi.deleteToken();
    setUser(null);
    navigate("/");
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-3 flex flex-row-reverse items-center justify-between">
        {/* Logo with gradient text */}
        <Link
          to={"/"}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
        >
          مزدخر
          <span className="text-xs font-normal block text-gray-500 mt-[-5px]">
            حيث تبدأ رحلتك إلى بيت الأحلام
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 rtl:space-x-reverse text-sm">
          <Link
            to="/buy"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            البيع
          </Link>
          <Link
            to="/rent"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            للايجار
          </Link>
          <Link
            to="/commercial"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            تجارية
          </Link>
          <Link
            to="/new-projects"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            مشاريع جديدة
          </Link>
          <Link
            to="/shares"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            شراء اسهم
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
              اكتشف <span className="text-blue-500">▾</span>
            </button>
            {/* Drop down can be added here if needed */}
          </div>
        </nav>

        {/* Login Button */}
        <div className="hidden md:block">
          {user ? (
            <Link
            to="/"
    onClick={logout}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-900 transition-all shadow-md hover:shadow-lg"
            >
              تسجيل الخروج
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
            >
              الدخول
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm px-6 py-4 space-y-4 shadow-lg text-right border-t border-gray-100">
          <Link
            to="/buy"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            البيع
          </Link>
          <Link
            to="/rent"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            للايجار
          </Link>
          <Link
            to="/commercial"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            تجارية
          </Link>
          <Link
            to="/new-projects"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            مشاريع جديدة
          </Link>
          <Link
            to="/shares"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            شراء اسهم
          </Link>
          <Link
            to="/discover"
            className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            اكتشف
          </Link>
          {user ? (
  <Link
    to="/"
    onClick={logout}
    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
    </svg>
    تسجيل الخروج
  </Link>
) : (
  <Link
  
    to="/login"
    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m12 0l-4-4m4 4l-4 4" />
    </svg>
    الدخول
  </Link>
)}

        </div>
      )}
    </header>
  );
};

export default Header;
