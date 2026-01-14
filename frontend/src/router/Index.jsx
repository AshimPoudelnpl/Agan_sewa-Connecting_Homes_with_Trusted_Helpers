import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Guard from "./Guard";
import { PublicRoutes } from "./PublicRoutes";
import PublicLayout from "../layout/PublicLayout";
import NotFound from './../shared/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Guard>
        <PublicLayout />
      </Guard>
    ),
    children: PublicRoutes,
  },
  {
    path: "/admin",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
