import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../Component/Form/Input";
import Button from "../../Component/Form/Button";
import { registerSchema } from "../../Utils/Zod/authSchemas";
import userApis from "../../API/userApi";
import authApi from "../../API/Auth";
import { UserContext } from "../../Utils/Context/userContext";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navgate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { id, value } }) => {
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "حدث خطأ في البيانات.";
      toast.error(firstError);
      return;
    }

    const toastId = toast.loading("جاري التسجيل...");
    setIsLoading(true);

    try {
      const res = await userApis.createUser(data);
      authApi.setToken(res.data);
      setUser(authApi.getUser() || null);
      
      if (res.status >= 200 && res.status < 300) {
        toast.success("تم التسجيل بنجاح!", { id: toastId });
        navgate("/");
        setData({
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      } else {
        toast.error("استجابة غير متوقعة من الخادم", { id: toastId });
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                            error.response.data || 
                            "بريد إلكتروني مكرر!";
        toast.error(errorMessage, { id: toastId });
      } else if (error.request) {
        toast.error("لا يوجد اتصال بالخادم", { id: toastId });
      } else {
        toast.error("حدث خطأ أثناء الإرسال", { id: toastId });
      }
    } finally {
      setIsLoading(false);
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
            <h1 className="text-3xl font-bold text-purple-800 mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-600">املأ النموذج لإنشاء حسابك</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="name"
              type="text"
              handleChange={handleChange}
              value={data.name}
              label="اسم المستخدم"
              placeholder="أدخل اسمك الكامل"
              dir="rtl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <Input
              id="phone"
              type="tel"
              handleChange={handleChange}
              value={data.phone}
              label="رقم الهاتف"
              placeholder="أدخل رقم هاتفك"
              dir="rtl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <Input
              id="email"
              type="email"
              handleChange={handleChange}
              value={data.email}
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              dir="rtl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <Input
              id="password"
              type="password"
              handleChange={handleChange}
              value={data.password}
              label="كلمة المرور"
              placeholder="أنشئ كلمة مرور قوية"
              dir="rtl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <Input
              id="confirmPassword"
              type="password"
              handleChange={handleChange}
              value={data.confirmPassword}
              label="تأكيد كلمة المرور"
              placeholder="أعد إدخال كلمة المرور"
              dir="rtl"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {isLoading ? "جاري التسجيل..." : "تسجيل"}
            </Button>
            
            <div className="text-center text-gray-600">
              لديك حساب بالفعل؟{" "}
              <a href="/login" className="text-purple-600 font-medium hover:text-purple-800 hover:underline">
                تسجيل الدخول
              </a>
            </div>
          </form>
        </div>
      </main>
      
    </div>
    <Footer></Footer></>
  );
}