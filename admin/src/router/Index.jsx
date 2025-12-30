import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Login from "../components/pages/Login";
import NotFound from "../components/shared/NotFound";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
