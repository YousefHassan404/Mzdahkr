import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          
          {/* Logo and About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800">مزدخر</h3>
            <p className="text-gray-600">
              منصة عقارية رائدة تساعدك في العثور على العقار المثالي لاحتياجاتك.
            </p>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">الرئيسية</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">العقارات</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">وكلائنا</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">المشاريع الجديدة</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">خدماتنا</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">بيع العقارات</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">ايجار العقارات</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">الاستثمار العقاري</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">تقييم العقارات</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">الاستشارات القانونية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-end gap-2 text-gray-600">
                <MapPin size={18} className="text-blue-600" />
                <span>القاهرة - مصر</span>
              </li>
              <li className="flex items-center justify-end gap-2 text-gray-600">
                <Phone size={18} className="text-blue-600" />
                <span>+966 12 345 6789</span>
              </li>
              <li className="flex items-center justify-end gap-2 text-gray-600">
                <Mail size={18} className="text-blue-600" />
                <span>info@mazdakhr.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} مزدخر. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;