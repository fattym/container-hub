import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ showMobileNav, setShowMobileNav }) => {
  const [showQuoteModal, setShowQuoteModal] = React.useState(false);
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const quoteData = {
      name: formData.get("quoteName"),
      email: formData.get("quoteEmail"),
      phone: formData.get("quotePhone"),
      containerType: formData.get("quoteContainerType"),
      quantity: formData.get("quoteQuantity"),
      location: formData.get("quoteLocation"),
      requirements: formData.get("quoteRequirements"),
    };
    console.log("Quote Request Submitted:", quoteData);
    // Here you would typically send the quoteData to your backend API
    // For now, just close the modal and reset the form
    setShowQuoteModal(false);
    form.reset();
  };

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
              to="/"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="mx-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Nav Menu */}
          {showMobileNav && (
            <div className="relative md:hidden">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setShowMobileNav(false)}
              ></div>
              {/* Mobile Nav Menu */}
              <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40">
                <div className="flex justify-end pr-4 pt-4">
                  <button
                    className="text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <nav className="flex flex-col py-4 px-6">
                  <Link
                    to="/"
                    className="py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100"
                    onClick={() => setShowMobileNav(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100"
                    onClick={() => setShowMobileNav(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/about"
                    className="py-2 text-gray-700 hover:text-blue-600 border-b border-gray-100"
                    onClick={() => setShowMobileNav(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setShowMobileNav(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <button
            id="getQuoteBtn"
            onClick={() => setShowQuoteModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
          >
            Get Quote
          </button>
          {showQuoteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Request a Quote
                  </h2>
                  <button
                    id="closeQuoteModal"
                    onClick={() => setShowQuoteModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form
                  id="quoteForm"
                  onSubmit={handleQuoteSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="quoteName"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        id="quoteEmail"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        id="quotePhone"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Container Type
                      </label>
                      <select
                        id="quoteContainerType"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select container type</option>
                        <option value="20ft-standard">20ft Standard</option>
                        <option value="40ft-standard">40ft Standard</option>
                        <option value="40ft-high-cube">40ft High Cube</option>
                        <option value="refrigerated">Refrigerated</option>
                        <option value="special">Special Purpose</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quoteQuantity"
                        required
                        min="1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter quantity needed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Delivery Location
                      </label>
                      <input
                        type="text"
                        id="quoteLocation"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter delivery location"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      id="quoteRequirements"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter any special requirements or notes"
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowQuoteModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      Submit Quote Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <button className="md:hidden ml-4 text-gray-600">
            <i className="fas fa-bars text-xl"></i>
          </button>
          {/* Mobile Nav Toggle (shows on small screens) */}
          <button
            className="md:hidden ml-4 text-gray-600"
            aria-label="Open mobile navigation"
            onClick={() => setShowMobileNav((prev) => !prev)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
