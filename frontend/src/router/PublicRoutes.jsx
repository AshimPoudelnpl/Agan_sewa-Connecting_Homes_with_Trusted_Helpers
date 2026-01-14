import React from "react";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import BranchServices from "../pages/BranchServices";

export const PublicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "services/:place",
    element: <BranchServices  />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
