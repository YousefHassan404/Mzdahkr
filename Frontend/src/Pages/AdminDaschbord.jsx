import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Component/AdminDashboard/Sidebar";
import { UserContext } from "../Utils/Context/userContext";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  FaUsers,
  FaChartLine,
  FaUserTie,
  FaUserTag,
  FaClock,
  FaUserCheck,
  FaUserPlus,
  FaDownload,
  FaUserCog,
  FaIdCard,
  FaSitemap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate=useNavigate();
  const { user, userLoading } = useContext(UserContext);
  const [stats, setStats] = useState({
    total: 0,
    sales: 0,
    marketing: 0,
    potentialClients: 0,
    currentClients: 0,
    admins: 0,
    newThisWeek: 0,
    teamLeaderSales: 0,
    teamLeaderMarketing: 0,
  });
  const [allUsers, setAllUsers] = useState([]);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const users = res.data;
        setAllUsers(users);

        const now = new Date();
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);

        // حساب الإحصائيات
        const newStats = {
          total: users.length,
          sales: users.filter((u) => u.role === "عضو سيلز").length,
          marketing: users.filter((u) => u.role === "عضو ماركتنج").length,
          potentialClients: users.filter((u) => u.type === "محتمل").length,
          currentClients: users.filter((u) => u.type === "حالي").length,
          admins: users.filter((u) => u.role === "مدير").length,
          teamLeaderSales: users.filter((u) => u.role === "تيم ليدر سيلز")
            .length,
          teamLeaderMarketing: users.filter(
            (u) => u.role === "تيم ليدر ماركتنج"
          ).length,
          newThisWeek: users.filter((u) => new Date(u.createdAt) >= lastWeek)
            .length,
        };
        setStats(newStats);

        // إنشاء البيانات الهرمية
        if (user?.role === "مدير" || user?.role === "مدير الإدارة") {
          const hierarchy = buildHierarchy(users);
          setHierarchyData(hierarchy);
        }

        // جلب فريق المستخدم إذا كان تيم ليدر
        if (
          user?.role === "تيم ليدر سيلز" ||
          user?.role === "تيم ليدر ماركتنج"
        ) {
          const team = users.filter((u) => u.createdBy === user._id);
          setMyTeam(team);
        }
      } catch (err) {
        console.error("فشل في تحميل البيانات:", err);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  // بناء الهيكل الهرمي
  const buildHierarchy = (users) => {
    const hierarchy = [];

    // المديرين
    const admins = users.filter(
      (u) => u.role === "مدير" || u.role === "مدير الإدارة"
    );

    admins.forEach((admin) => {
      const adminNode = {
        ...admin,
        children: [],
      };

      // تيم ليدرز تحت المدير
      const teamLeaders = users.filter(
        (u) =>
          (u.role === "تيم ليدر سيلز" || u.role === "تيم ليدر ماركتنج") &&
          u.createdBy === admin._id
      );

      teamLeaders.forEach((leader) => {
        const leaderNode = {
          ...leader,
          children: [],
        };

        // الأعضاء تحت التيم ليدر
        const teamMembers = users.filter(
          (u) =>
            (u.role === "عضو سيلز" || u.role === "عضو ماركتنج") &&
            u.createdBy === leader._id
        );

        leaderNode.children = teamMembers;
        adminNode.children.push(leaderNode);
      });

      hierarchy.push(adminNode);
    });

    return hierarchy;
  };

  // تصدير البيانات الأساسية إلى Excel
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // شيت الإحصائيات
    const statsData = [
      ["نوع الإحصائية", "العدد"],
      ["إجمالي المستخدمين", stats.total],
      ["عدد السيلز", stats.sales],
      ["عدد الماركتنج", stats.marketing],
      ["تيم ليدر سيلز", stats.teamLeaderSales],
      ["تيم ليدر ماركتنج", stats.teamLeaderMarketing],
      ["عملاء محتملين", stats.potentialClients],
      ["عملاء حاليين", stats.currentClients],
      ["عدد المديرين", stats.admins],
      ["مستخدمين جدد (7 أيام)", stats.newThisWeek],
    ];

    const statsSheet = XLSX.utils.aoa_to_sheet(statsData);
    XLSX.utils.book_append_sheet(workbook, statsSheet, "الإحصائيات");

    // شيت المستخدمين الأساسي
    const usersData = [
      [
        "الاسم",
        "البريد الإلكتروني",
        "الدور",
        "النوع",
        "الهاتف",
        "تاريخ الإنشاء",
      ],
    ];

    allUsers.forEach((user) => {
      usersData.push([
        user.name,
        user.email,
        user.role,
        user.type || "غير محدد",
        user.phone || "غير متوفر",
        new Date(user.createdAt).toLocaleDateString(),
      ]);
    });

    const usersSheet = XLSX.utils.aoa_to_sheet(usersData);
    XLSX.utils.book_append_sheet(workbook, usersSheet, "المستخدمين");

    // تصدير الملف
    XLSX.writeFile(
      workbook,
      `dashboard_report_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  // تصدير جميع البيانات التفصيلية للمستخدمين
  const exportAllUsersToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const usersData = [
      [
        "الاسم",
        "البريد الإلكتروني",
        "الرقم القومي",
        "الدور",
        "الحالة",
        "النوع",
        "الاهتمام",
        "الأولوية",
        "المنطقة المهتم بها",
        "الميزانية",
        "رقم الهاتف",
        "تم إنشاؤه بواسطة",
        "مخصص له",
        "تاريخ الإنشاء",
      ],
    ];

    allUsers.forEach((user) => {
      usersData.push([
        user.name || "غير متوفر",
        user.email || "غير متوفر",
        user.NN || "غير متوفر",
        user.role || "غير محدد",
        user.condition || "غير محدد",
        user.type || "غير محدد",
        user.status || "غير محدد",
        user.priority || "غير محدد",
        user.interstedLocation || "غير معروف",
        user.budget || 0,
        user.phone || "غير متوفر",
        user.createdBy?.name || user.createdBy || "غير معروف",
        user.assignedTo?.name || user.assignedTo || "غير محدد",
        new Date(user.createdAt).toLocaleDateString(),
      ]);
    });

    const sheet = XLSX.utils.aoa_to_sheet(usersData);
    XLSX.utils.book_append_sheet(workbook, sheet, "كل المستخدمين");

    XLSX.writeFile(
      workbook,
      `all_users_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "مدير":
      case "مدير الإدارة":
        return "border-red-500";
      case "تيم ليدر سيلز":
        return "border-blue-500";
      case "تيم ليدر ماركتنج":
        return "border-green-500";
      case "عضو سيلز":
        return "border-blue-300";
      case "عضو ماركتنج":
        return "border-green-300";
      default:
        return "border-gray-300";
    }
  };

  // عرض العقدة في الهيكل الهرمي
  const renderHierarchyNode = (node, level = 0) => {
    const indentClass = level === 0 ? "" : `ml-${level * 8}`;
    const roleColor = getRoleColor(node.role);

    return (
      <div  key={node._id} className={`${indentClass} mb-2`}>
        <div
          className={`p-3 rounded-lg border-r-4 ${roleColor} bg-white shadow-sm`}
          onClick={() => ShowMemberDetails(node._id)}
        >
          <div className="flex items-center gap-3">
            <FaUserCog className="text-gray-600" />
            <div>
              <h4 className="font-semibold text-gray-800">{node.name}</h4>
              <p className="text-sm text-gray-600">{node.role}</p>
              <p className="text-xs text-gray-500">{node.email}</p>
            </div>
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="mt-2">
            {node.children.map((child) =>
              renderHierarchyNode(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  

  const ShowMemberDetails = (id) => {
    navigate(`/admin-dashboard/member/${id}`)
  };

  // عرض جميع مديري الإدارة
  const renderAllManagersList = () => {
    const allManagers = allUsers.filter((u) => u.role === "مدير الإدارة");

    if (allManagers.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">
          لا يوجد مديري إدارة في النظام
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allManagers.map((manager) => (
          <div
            key={manager._id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow border-r-4 border-red-500"
          >
            <div className="flex items-center gap-3">
              <FaUserTie className="text-red-600 text-xl" />
              <div>
                <h4 className="font-semibold text-gray-800">{manager.name}</h4>
                <p className="text-sm text-gray-600">{manager.role}</p>
                <p className="text-xs text-gray-500">{manager.email}</p>
                <p className="text-xs text-gray-500">
                  انضم في: {new Date(manager.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // عرض جميع التيم ليدرز
  const renderAllTeamLeadersList = () => {
    const allTeamLeaders = allUsers.filter(
      (u) => u.role === "تيم ليدر سيلز" || u.role === "تيم ليدر ماركتنج"
    );

    if (allTeamLeaders.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">
          لا يوجد قادة فرق في النظام
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allTeamLeaders.map((leader) => {
          const teamMembers = allUsers.filter(
            (u) => u.createdBy === leader._id
          );
          const borderColor =
            leader.role === "تيم ليدر سيلز"
              ? "border-blue-500"
              : "border-green-500";
          const iconColor =
            leader.role === "تيم ليدر سيلز"
              ? "text-blue-600"
              : "text-green-600";

          return (
            <div
              key={leader._id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow border-r-4 ${borderColor}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <FaUserTie className={`${iconColor} text-xl`} />
                <div>
                  <h4 className="font-semibold text-gray-800">{leader.name}</h4>
                  <p className="text-sm text-gray-600">{leader.role}</p>
                  <p className="text-xs text-gray-500">{leader.email}</p>
                  <p className="text-xs text-gray-500">
                    انضم في: {new Date(leader.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <FaUsers className="inline ml-1" />
                  عدد أعضاء الفريق:{" "}
                  <span className="font-semibold">{teamMembers.length}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // عرض الأعضاء غير المخصصين لقادة فرق
  const renderUnassignedMembers = () => {
    const unassignedMembers = allUsers.filter((u) => {
      // الأعضاء الذين دورهم عضو سيلز أو ماركتنج ولكن لم يتم إنشاؤهم بواسطة تيم ليدر
      const isMember = u.role === "عضو سيلز" || u.role === "عضو ماركتنج";
      if (!isMember) return false;

      // التحقق من أن منشئهم ليس تيم ليدر
      const creator = allUsers.find((creator) => creator._id === u.createdBy);
      const isCreatedByTeamLeader =
        creator &&
        (creator.role === "تيم ليدر سيلز" ||
          creator.role === "تيم ليدر ماركتنج");

      return !isCreatedByTeamLeader;
    });

    if (unassignedMembers.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">
          جميع الأعضاء مخصصين لقادة فرق
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unassignedMembers.map((member) => {
          const borderColor =
            member.role === "عضو سيلز" ? "border-blue-300" : "border-green-300";
          const iconColor =
            member.role === "عضو سيلز" ? "text-blue-500" : "text-green-500";

          return (
            <div
              key={member._id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow border-r-4 ${borderColor}`}
            >
              <div className="flex items-center gap-3">
                <FaUserTag className={`${iconColor} text-lg`} />
                <div>
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                  <p className="text-xs text-gray-500">
                    انضم في: {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-orange-600 font-medium">
                    غير مخصص لقائد فريق
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // التحقق من صلاحية الوصول
  const allowedRoles = [
    "مدير",
    "مدير الإدارة",
    "تيم ليدر سيلز",
    "تيم ليدر ماركتنج",
    "عضو سيلز",
    "عضو ماركتنج",
  ];
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="p-4 mt-10 mx-auto max-w-md bg-red-100 border border-red-300 text-red-800 rounded-md text-center shadow">
        🚫 <strong>وصول مرفوض:</strong> ليس لديك صلاحية للوصول لهذه الصفحة.
      </div>
    );
  }

  // بطاقات الإحصائيات حسب الدور
  const getStatsCards = () => {
    if (user.role === "مدير" || user.role === "مدير الإدارة") {
      return [
        {
          icon: <FaUsers />,
          label: "إجمالي المستخدمين",
          value: stats.total,
          color: "bg-blue-100",
        },
        {
          icon: <FaUserTag />,
          label: "عدد السيلز",
          value: stats.sales,
          color: "bg-green-100",
        },
        {
          icon: <FaChartLine />,
          label: "عدد الماركتنج",
          value: stats.marketing,
          color: "bg-yellow-100",
        },
        {
          icon: <FaUserTie />,
          label: "تيم ليدر سيلز",
          value: stats.teamLeaderSales,
          color: "bg-indigo-100",
        },
        {
          icon: <FaUserTie />,
          label: "تيم ليدر ماركتنج",
          value: stats.teamLeaderMarketing,
          color: "bg-pink-100",
        },
        {
          icon: <FaUserPlus />,
          label: "عملاء محتملين",
          value: stats.potentialClients,
          color: "bg-purple-100",
        },
        {
          icon: <FaUserCheck />,
          label: "عملاء حاليين",
          value: stats.currentClients,
          color: "bg-teal-100",
        },
        {
          icon: <FaUserTie />,
          label: "عدد المديرين",
          value: stats.admins,
          color: "bg-orange-100",
        },
        {
          icon: <FaClock />,
          label: "مستخدمين جدد (7 أيام)",
          value: stats.newThisWeek,
          color: "bg-red-100",
        },
      ];
    } else if (
      user.role === "تيم ليدر سيلز" ||
      user.role === "تيم ليدر ماركتنج"
    ) {
      return [
        {
          icon: <FaUsers />,
          label: "أعضاء فريقي",
          value: myTeam.length,
          color: "bg-blue-100",
        },
        {
          icon: <FaUserCheck />,
          label: "النشطين",
          value: myTeam.filter((m) => m.isActive).length,
          color: "bg-green-100",
        },
      ];
    }

    return [];
  };

  const statsCards = getStatsCards();

  return (
    <div className="flex text-right rtl min-h-screen bg-gray-100 w-4/5 ml-auto">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        {/* العنوان وأزرار التصدير */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {user.role === "مدير" || user.role === "مدير الإدارة"
              ? "لوحة تحكم المدير"
              : user.role === "تيم ليدر سيلز" ||
                user.role === "تيم ليدر ماركتنج"
              ? "لوحة تحكم قائد الفريق"
              : "لوحة المستخدم"}
          </h1>

          {(user.role === "مدير" || user.role === "مدير الإدارة") && (
            <div className="flex gap-4">
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaDownload />
                تصدير الإحصائيات
              </button>

              <button
                onClick={exportAllUsersToExcel}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaDownload />
                تصدير كل المستخدمين
              </button>
            </div>
          )}
        </div>

        {/* بيانات المستخدم */}
        <div
          dir="rtl"
          className="bg-white p-6 rounded-lg shadow-md space-y-3 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaIdCard className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold text-blue-900">
              بيانات المستخدم
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>👤 الاسم:</strong> {user.name}
            </p>
            <p>
              <strong>📧 البريد الإلكتروني:</strong> {user.email}
            </p>
            <p>
              <strong>🆔 الرقم القومي:</strong> {user.NN || "غير متوفر"}
            </p>
            <p>
              <strong>📞 رقم الهاتف:</strong> {user.phone || "غير متوفر"}
            </p>
            <p>
              <strong>🎯 الدور:</strong> {user.role}
            </p>
            <p>
              <strong>📅 تاريخ الإنشاء:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* الإحصائيات */}
        {statsCards.length > 0 && (
          <div dir="rtl" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaChartLine />
              الإحصائيات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl shadow p-5 ${card.color} flex items-center justify-between`}
                >
                  <div className="text-4xl text-gray-700">{card.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {card.value}
                    </div>
                    <div className="text-sm text-gray-600">{card.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* الهيكل الهرمي للمديرين */}
        {(user.role === "مدير" || user.role === "مدير الإدارة") && (
          <div dir="rtl" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaSitemap />
              الهيكل التنظيمي
            </h2>

            {/* الهيكل الهرمي الخاص بي */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <FaUserTie />
                الفريق الذي أشرف عليه
              </h3>
              {hierarchyData.length > 0 ? (
                <div
                  className="space-y-4"
                >
                  {hierarchyData.map((node) => renderHierarchyNode(node))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  لا يوجد فريق تحت إشرافك
                </p>
              )}
            </div>

            {/* جميع مديري الإدارة */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                <FaUserTie />
                جميع مديري الإدارة
              </h3>
              {renderAllManagersList()}
            </div>

            {/* جميع التيم ليدرز */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <FaUsers />
                جميع قادة الفرق
              </h3>
              {renderAllTeamLeadersList()}
            </div>

            {/* جميع الأعضاء غير المخصصين */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                <FaUserTag />
                الأعضاء غير المخصصين لقادة فرق
              </h3>
              {renderUnassignedMembers()}
            </div>
          </div>
        )}

        {/* فريق التيم ليدر */}
        {(user.role === "تيم ليدر سيلز" ||
          user.role === "تيم ليدر ماركتنج") && (
          <div dir="rtl" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUsers />
              أعضاء فريقي
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {myTeam.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myTeam.map((member) => (
                    <div
                      key={member._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <FaUserCog className="text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500">
                            {member.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            انضم في:{" "}
                            {new Date(member.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  لا يوجد أعضاء في فريقك حتى الآن
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
