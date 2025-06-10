import React from "react";
import { Outlet } from "react-router-dom";
import authImage from "../../assets/auth-img.webp";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-[91vh] overflow-hidden">
      {/* Image Side */}
      <div
        className="relative hidden md:flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${authImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-800 to-green-600 opacity-40" />
        <div className="relative z-10 text-white px-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce</h1>
          <p className="text-lg">Login or Register to continue</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center bg-green-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
