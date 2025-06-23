import React, { useContext, useState, useEffect } from "react";

import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setMobileMenuOpen(false);
      }
      // Close user dropdown when clicking outside
      if (menuDisplay && !event.target.closest('.user-dropdown')) {
        setMenuDisplay(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, menuDisplay]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
      setMobileMenuOpen(false);
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"} className="flex items-center space-x-2 group">
              <div className="relative">
                <span className="text-white bg-gradient-to-r from-teal-500 to-teal-600 py-2 px-4 rounded-lg font-bold text-2xl lg:text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:from-teal-600 group-hover:to-teal-700">
                  M
                </span>
              </div>
              <span className="hidden sm:block text-xl lg:text-2xl font-bold outline-none text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                Mart
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  onChange={handleSearch}
                  value={search}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2 rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <GrSearch className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* User Profile */}
            {user?._id && (
              <div className="relative user-dropdown">
                <div
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-teal-500 transition-colors duration-300 shadow-md"
                      alt={user?.name}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                      <FaRegCircleUser className="w-5 h-5" />
                    </div>
                  )}
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors duration-300 font-medium">
                    {user?.name}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {menuDisplay && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            {user?._id && (
              <Link to={"/cart"} className="relative group">
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-teal-100 transition-colors duration-300">
                  <FaShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors duration-300" />
                </div>
                {context?.cartProductCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>
            )}

            {/* Login/Logout Button */}
            {!user?._id && (
              <Link
                to={"/login"}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6 text-gray-600" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-full focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                onChange={handleSearch}
                value={search}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2 rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
              >
                <GrSearch className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mobile-menu border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* User Info */}
              {user?._id && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                      alt={user?.name}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center text-white">
                      <FaRegCircleUser className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to={"/admin-panel/all-products"}
                    className="block px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                
                {user?._id && (
                  <Link
                    to={"/cart"}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Cart</span>
                    {context?.cartProductCount > 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {context?.cartProductCount}
                      </span>
                    )}
                  </Link>
                )}

                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="block px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-center font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
