import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingHeader from './Header';

const ShoppingLayout = () => {
  return (
    <div className="min-h-screen bg-green-50 text-green-900 flex flex-col">
      {/* Header */}
      <ShoppingHeader />

      {/* Page Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ShoppingLayout;
