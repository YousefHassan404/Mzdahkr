import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../Component/Form/Input";
import Button from "../../Component/Form/Button";
import { loginSchema } from "../../Utils/Zod/authSchemas";
import userApis from "../../API/userApi";
import authApi from "../../API/Auth";
import { UserContext } from "../../Utils/Context/userContext";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navgate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
    } else {
      try {
        const res = await userApis.loginUser(data);
        authApi.setToken(res.data);
        setUser(authApi.getUser() || null);
        if (res.status === 200) {
          toast.success("تم تسجيل الدخول بنجاح!");
          navgate("/");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول"
        );
      }
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-70 z-0"></div>
      
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-20 pb-10 px-4 relative z-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">تسجيل الدخول</h1>
            <p className="text-gray-600">أدخل بياناتك للوصول إلى حسابك</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                handleChange={handleChange}
                value={data.email}
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                handleChange={handleChange}
                value={data.password}
                placeholder="أدخل كلمة المرور"
                dir="rtl"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all shadow-md hover:shadow-lg"
            >
              تسجيل الدخول
            </Button>
            
            <div className="text-center text-gray-600">
              ليس لديك حساب؟{" "}
              <a href="/register" className="text-purple-600 font-medium hover:text-purple-800 hover:underline">
                سجل الآن
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
<Footer></Footer>
    </>
  );
}