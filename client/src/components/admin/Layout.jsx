import React from 'react';
import AdminSidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import AdminHeader from './Header';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-green-50 text-green-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 p-4 overflow-hidden">
        {/* Header */}
        <AdminHeader />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white shadow-md rounded-xl p-6 mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
