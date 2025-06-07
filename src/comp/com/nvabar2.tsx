import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContainerType } from "./containerTypes";

type QuoteProps = {
  quoteItem: { id: number, quantity: number }[];
  setQuoteItem: React.Dispatch<React.SetStateAction<{ id: number, quantity: number }[]>>;
};

const Navbar2: React.FC<QuoteProps> = ({quoteItem}) => {
  const [quoteItems] = useState<number[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getContainerById = (id: number) => {
    return ContainerType.find((container) => container.id === id);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    console.log("Mobile menu toggled. showMobileMenu:", !showMobileMenu); // ADDED console.log
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
            {/* Logo for mobile and desktop */}
            <div className="text-2xl font-bold text-blue-600 flex items-center md:mr-4 mr-2">
            <i className="fas fa-ship mr-2"></i>
            <span className="hidden sm:inline">ContainerHub</span>
            <span className="sm:hidden">PitchCHub</span>
            </div>
         
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-10">
            <Link
              to="/"
              data-readdy="true"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Products
            </Link>
            <Link
              to="/services"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </nav>
        </div>
        {/* Responsive Spacer */}
        <div className="flex-1" />
        <style>
          {`
            @media (max-width: 767px) {
              .view-quote-btn-mobile {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
              }
            }
          `}
        </style>
        <div className="flex items-center">
          <Link
            to={(() => {
              const container = getContainerById(quoteItems[0]);
              return container !== undefined
                ? `${ContainerType.indexOf(container)}`
                : "/quote-summary";
            })()}
            onClick={() => setShowMobileMenu(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mr-3 !rounded-button whitespace-nowrap cursor-pointer relative inline-block"
            data-readdy="true"
            data-readdy-id="view-quote-btn"
          >
            {quoteItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {quoteItem.length}
              </span>
            )}
            <i className="fas fa-clipboard-list mr-1"></i>
            View Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden ml-4 text-gray-600 cursor-pointer focus:outline-none"
          >
            <i
              className={`fas ${showMobileMenu ? "fa-times" : "fa-bars"} text-xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="bg-gray-50 md:hidden z-50">
          {" "}
          {/* ADDED z-50 */}
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              data-readdy="true"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-blue-600 font-medium transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar2;
