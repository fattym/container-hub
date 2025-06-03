import React from "react";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">
            <i className="fas fa-ship mr-2"></i>
            ContainerHub
          </div>
          <nav className="hidden md:flex ml-10">
            <Link
              to={"/"}
              data-readdy="true"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={"/products"}
              className="mx-3 text-gray-600 font-medium transition-colors cursor-pointer"
            >
              Products
            </Link>
            <Link
              to={"/services"}
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Services
            </Link>
            <Link
              to={"/about"}
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to={"/contact"}
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link
            to={"/quote"}
            className="hidden md:flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap"
          >
            <span className="flex items-center">
              <i className="fas fa-clipboard-list mr-1"></i>
              View Quote
            </span>
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer">
            Get Quote
          </button>
          <button className="md:hidden ml-4 text-gray-600 cursor-pointer">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
