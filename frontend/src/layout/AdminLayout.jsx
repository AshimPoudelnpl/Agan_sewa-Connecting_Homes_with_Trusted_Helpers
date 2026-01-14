import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from './../shared/Sidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
