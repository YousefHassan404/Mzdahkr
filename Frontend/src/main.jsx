import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./Utils/Query/QueryProvider.jsx";
import "./Styles/import.scss";
import UserContextProvider from "./Utils/Context/userContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import Home from "./Pages/Home.jsx";
import Shares from "./Pages/shares.jsx";
import ShareDetails from "./Pages/ShareDetails.jsx";
import Projects from "./Pages/Projects.jsx";
import Units from "./Pages/Units.jsx";
import AdminDaschbord from "./Pages/AdminDaschbord.jsx";
import UnitDetails from "./Pages/UnitDetails.jsx";
import RentDetails from "./Pages/RentDetails.jsx";
import Rent from "./Pages/Rent.jsx";
import App from "./App.jsx";

import RentManagerPage from "./Component/AdminDashboard/Rent/RentManagerPage.jsx";
import AddRent from "./Component/AdminDashboard/Rent/AddRent.jsx";
import EditRent from "./Component/AdminDashboard/Rent/EditRent.jsx";
import DeleteRent from "./Component/AdminDashboard/Rent/DeleteRent.jsx";

import UnitManagerPage from "./Component/AdminDashboard/Unit/UnitManagerPage.jsx";
import AddUnit from "./Component/AdminDashboard/Unit/AddUnit.jsx";
import EditUnit from "./Component/AdminDashboard/Unit/EditUnit.jsx";
import DeleteUnit from "./Component/AdminDashboard/Unit/DeleteUnit.jsx";

import ShareManagerPage from "./Component/AdminDashboard/Shares/ShareManagerPage.jsx";
import AddShare from "./Component/AdminDashboard/Shares/AddShare.jsx";
import DeleteShare from "./Component/AdminDashboard/Shares/DeleteShare.jsx";
import EditShare from "./Component/AdminDashboard/Shares/EditShare.jsx";
import ManageInvento from "./Component/AdminDashboard/Shares/ManageInvento.jsx";

import UserManagerPage from "./Component/AdminDashboard/Users/userManagerPage.jsx";
import AddUser from "./Component/AdminDashboard/Users/AddUser.jsx";


import MemberManagementPage from "./Component/AdminDashboard/MemberManagement/MemberManagementPage.jsx";
import AddMember from "./Component/AdminDashboard/MemberManagement/AddMember.jsx";
import MemberDetails from "./Component/AdminDashboard/MemberManagement/MemberDetails.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/admin-dashboard", element: <AdminDaschbord /> },
  { path: "/admin-dashboard/member/:id", element: <MemberDetails /> },

    { path: "/admin-dashboard/sellers", element: <MemberManagementPage /> },
    { path: "/admin-dashboard/sellers/new", element: <AddMember /> },


    { path: "/admin-dashboard/users", element: <UserManagerPage /> },
    { path: "/admin-dashboard/user/new", element: <AddUser /> },

  { path: "/admin-dashboard/units-rent", element: <RentManagerPage /> },
  { path: "/admin-dashboard/rent/new", element: <AddRent /> },
  { path: "/admin-dashboard/rent/edit/:id", element: <EditRent /> },
  { path: "/admin-dashboard/rent/delete/:id", element: <DeleteRent /> },

  { path: "/admin-dashboard/units-sale", element: <UnitManagerPage /> },
  { path: "/admin-dashboard/unit/new", element: <AddUnit /> },
  { path: "/admin-dashboard/unit/edit/:id", element: <EditUnit /> },
  { path: "/admin-dashboard/unit/delete/:id", element: <DeleteUnit /> },

  { path: "/admin-dashboard/share-units", element: <ShareManagerPage /> },
  { path: "/admin-dashboard/share/new", element: <AddShare /> },
  { path: "/admin-dashboard/share/edit/:id", element: <EditShare /> },
  { path: "/admin-dashboard/share/delete/:id", element: <DeleteShare /> },
  { path: "/admin-dashboard/share/manage-investor/:id", element: <ManageInvento /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/shares/:id", element: <ShareDetails /> },
  { path: "/shares", element: <Shares /> },

  { path: "/buy/:id", element: <UnitDetails /> },
  { path: "/buy", element: <Units /> },

  { path: "/rent", element: <Rent /> },
  { path: "/rent/:id", element: <RentDetails /> },

  { path: "/new-projects", element: <Projects /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </QueryProvider>
  </StrictMode>
);
