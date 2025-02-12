import React from "react";
import { Heart, SearchIcon, ShoppingCart, User } from "lucide-react";
import Logo from "./Logo.jsx";

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Logo/>
        </div>
        {/* Search Section */}
        <div className="flex items-center w-1/2">
          <input
            type="text"
            placeholder="Search For Items..."
            className="border border-customGreen rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            className="border-t border-b border-customGreen bg-gray-100 text-gray-600 px-4 py-2 focus:outline-none"
          >
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
          </select>
          <button className="bg-red-500 text-white px-4 py-3 rounded-r-md border-t-1 border-b-2 border-red-500 hover:bg-red-600">
            <SearchIcon className="w-4 h-4"/>
          </button>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer">
            <User className="h-6 w-6 text-gray-700" />
            <span className="text-gray-700 font-semibold">Account</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Heart className="h-6 w-6 text-gray-700"/>
            <span className="text-gray-700 font-semibold">Wishlist</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <ShoppingCart className="h-6 w-6 text-gray-700"/>
            <span className="text-gray-700 font-semibold">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
