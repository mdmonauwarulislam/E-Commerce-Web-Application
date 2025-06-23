import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaHeart } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              M Mart
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop destination for premium electronics and lifestyle products. 
              Quality, innovation, and customer satisfaction at the heart of everything we do.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MdLocationOn className="text-teal-400" size={18} />
                <span className="text-gray-300 text-sm">123 Tech Street, Digital City, DC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone className="text-teal-400" size={18} />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail className="text-teal-400" size={18} />
                <span className="text-gray-300 text-sm">support@mmart.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 M Mart. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" size={14} />
              <span>by Mannu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer