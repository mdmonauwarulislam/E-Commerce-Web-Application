import React from "react";
import AuthLayout from "./components/auth/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProduct from "./pages/admin/Product";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
import ShoppingLayout from "./components/shopping/Layout";
import Home from "./pages/shopping/Home";
import Listing from "./pages/shopping/Listing";
import Checkout from "./pages/shopping/Checkout";
import Account from "./pages/shopping/Account";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      

      {/* Page Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          <Route path="/shop" element={<ShoppingLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="listing" element={<Listing />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="*" element= {<NotFound/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;
