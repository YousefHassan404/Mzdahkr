import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
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
import SharesUnitForm from "./Component/SharesUnitForm/SharesUnitForm.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/admin-dashboard", element: <SharesUnitForm /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/shares/:id", element: <ShareDetails /> },
  { path: "/shares", element: <Shares /> },
  { path: "/project", element: <Projects /> },
  { path: "/buy/:id", element: <UnitDetails /> },
  { path: "/buy", element: <Units /> },
]);




createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <Toaster
      position="center-top"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
    <StrictMode>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </StrictMode>
  </QueryProvider>
);
