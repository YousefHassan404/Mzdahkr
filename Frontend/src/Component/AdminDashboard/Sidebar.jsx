import { Home, Building2, Users, DollarSign, Key } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Utils/Context/userContext';
import { useContext } from 'react';
const links = [
  { label: ' الرئيسية', icon: <Home />, path: '/admin-dashboard' },
  { label: 'إدارة الوحدات بالأسهم', icon: <Home />, path: '/admin-dashboard/share-units' },
  { label: 'إدارة الوحدات للبيع', icon: <DollarSign />, path: '/admin-dashboard/units-sale' },
  { label: 'إدارة الوحدات للإيجار', icon: <Key />, path: '/admin-dashboard/units-rent' },
  { label: 'ادارة العملاء', icon: <Users />, path: '/admin-dashboard/users' },
  { label: 'ادارة البائعين', icon: <Users />, path: '/admin-dashboard/sellers' },
  ];

export default function Sidebar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

// if (!user || user.role !== "مدير") {
//   return (
//     <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
//       🚫 <strong>وصول مرفوض:</strong> هذه الصفحة مخصصة للمسؤولين فقط.
//     </div>
//   );
// }


  return (
    <div dir='rtl' className="fixed top-0 left-0 h-screen w-64 bg-white border-e shadow-sm flex flex-col rtl text-right">
      <div className="px-6 py-4 font-bold text-lg border-b">لوحة التحكم</div>
      <nav className="flex flex-col p-4 space-y-2">
        {links.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`flex items-center gap-3 p-3 rounded-md text-sm font-medium transition 
              ${location.pathname === link.path 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <span className="ml-2">{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
