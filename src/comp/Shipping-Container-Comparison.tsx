// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import Navbar2 from "./com/nvabar2";
import { ContainerType } from "./containerTypes";
import { Link } from "react-router-dom";

const Compare: React.FC = () => {
  // Selected containers for comparison
  const [compareItems, setCompareItems] = useState<number[]>([1, 2, 3]);

 const [quoteItems, setQuoteItems] = useState<
    { id: number; quantity: number }[]
  >([]);
  // Load compareItems from navigation state if available
  React.useEffect(() => {
    // Check if navigation state has compareItems (from Link)
    // Only run on mount
    // @ts-ignore
    const navState = window.history.state && window.history.state.usr;
    if (navState && Array.isArray(navState.compareItems)) {
      // If compareItems are objects with id, extract ids
      const ids = navState.compareItems.map((item: any) =>
        typeof item === "object" && item.id ? item.id : item
      );
      setCompareItems(ids);
    }
  }, []);
  // Add item to comparison
  const addItems = (id: number) => {
    setCompareItems([...compareItems, id]);
 };
  // Remove item from comparison
  const removeItem = (id: number) => {
    setCompareItems(compareItems.filter((itemId) => itemId !== id));
  };
  // Add to quote
  const addToQuote = (id: number) => {
    const existingItem = quoteItems.find((item) => item.id === id);
    if (existingItem) {
      setQuoteItems(
        quoteItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setQuoteItems([...quoteItems, { id, quantity: 1 }]);
    }
  };



  // Calculate total

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  // Get container by ID
  const getContainerById = (id: number) => {
    return ContainerType.find((container) => container.id === id);
  };
  // Print comparison
  const printComparison = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar2 quoteItem={quoteItems} setQuoteItem={setQuoteItems} />

      {/* Comparison Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Comparison Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Link
                to="/products"
                data-readdy="true"
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Products
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Compare Containers
            </h1>
            <p className="text-gray-600 mt-1">
              Comparing {compareItems.length} items
            </p>
          </div>
          <button
            onClick={printComparison}
            className="mt-4 md:mt-0 flex items-center bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 shadow-sm transition-colors !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i className="fas fa-print mr-2"></i>
            Print Comparison
          </button>
        </div>
        {/* Container Images Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {compareItems.map((itemId) => {
              const container = getContainerById(itemId);
              return container ? (
                <div key={itemId} className="relative p-6">
                  <button
                    onClick={() => removeItem(itemId)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <i className="fas fa-times text-gray-500"></i>
                  </button>
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={container.image}
                      alt={container.type}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {container.type}
                  </h3>
                  <div className="flex items-center mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${container.condition === "New" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {container.condition}
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${container.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {container.inStock ? "In Stock" : "Pre Order"}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    {formatPrice(container.price)}
                  </div>
            
                </div>
              ) : null;
            })}
          </div>
        </div>
        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Basic Information Section */}
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800">
                Basic Information
              </h2>
            </div>
            {/* Container Type */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">
                  Container Type
                </span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`type-${itemId}`} className="px-6 py-4">
                    <span>{container.type}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Size */}
            <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
              <div className="px-6 py-4">
                <span className="font-medium text-gray-700">Size</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`size-${itemId}`} className="px-6 py-4">
                    <span>{container.size}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Condition */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">Condition</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`condition-${itemId}`} className="px-6 py-4">
                    <span>{container.condition}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Price */}
            <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
              <div className="px-6 py-4">
                <span className="font-medium text-gray-700">Price</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`price-${itemId}`} className="px-6 py-4">
                    <span className="font-bold text-blue-600">
                      {formatPrice(container.price)}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Availability */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">Availability</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`availability-${itemId}`} className="px-6 py-4">
                    <span
                      className={
                        container.inStock
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {container.inStock ? "In Stock" : "Pre Order"}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          {/* Specifications Section */}
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800">
                Specifications
              </h2>
            </div>
            {/* External Dimensions */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">
                  External Dimensions
                </span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`ext-dim-${itemId}`} className="px-6 py-4">
                    <span>{container.external}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Internal Dimensions */}
            <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
              <div className="px-6 py-4">
                <span className="font-medium text-gray-700">
                  Internal Dimensions
                </span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`int-dim-${itemId}`} className="px-6 py-4">
                    <span>{container.internal}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Door Opening */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">Door Opening</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`door-${itemId}`} className="px-6 py-4">
                    <span>{container.doorOpening}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Maximum Payload */}
            <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
              <div className="px-6 py-4">
                <span className="font-medium text-gray-700">
                  Maximum Payload
                </span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`payload-${itemId}`} className="px-6 py-4">
                    <span>{container.maxPayload}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Cubic Capacity */}
            <div className="grid grid-cols-4 divide-x divide-gray-200">
              <div className="px-6 py-4 bg-gray-50">
                <span className="font-medium text-gray-700">
                  Cubic Capacity
                </span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`capacity-${itemId}`} className="px-6 py-4">
                    <span>{container.cubicCapacity}</span>
                  </div>
                ) : null;
              })}
            </div>
            {/* Tare Weight */}
            <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
              <div className="px-6 py-4">
                <span className="font-medium text-gray-700">Tare Weight</span>
              </div>
              {compareItems.map((itemId) => {
                const container = getContainerById(itemId);
                return container ? (
                  <div key={`tare-${itemId}`} className="px-6 py-4">
                    <span>{container.tare}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          {/* Features Section */}
          
          <div className="border-b border-gray-200">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800">Features</h2>
            </div>
            {/* All possible features combined */}
            {[
              "Wind and water tight",
              "Cargo worthy",
              "CSC plated",
              "Lockable doors",
              "Extra height",
              "Temperature control (-30°C to +30°C)",
              "Integrated cooling unit",
              "Digital temperature display",
              "Backup generator connection",
            ].map((feature, index) => (
              <div
                key={`feature-${index}`}
                className={`grid grid-cols-4 divide-x divide-gray-200 ${index % 2 === 0 ? "" : "bg-gray-50"}`}
              >
                <div
                  className={`px-6 py-4 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>

                {compareItems.map((itemId) => {
                  const container = getContainerById(itemId);
                  return container ? (
                    <div
                      key={`feature-${index}-${itemId}`}
                      className="px-6 py-4"
                    >
                      {container.features?.includes(feature) ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            ))}
          </div>
          {/* Delivery Options Section */}
          <div>
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-800">
                Delivery Options
              </h2>
            </div>
            {/* All possible delivery options combined */}
            {[
              "Standard delivery (3-5 business days)",
              "Express delivery (1-2 business days)",
              "Technical installation service",
            ].map((option, index) => (
              <div
                key={`delivery-${index}`}
                className={`grid grid-cols-4 divide-x divide-gray-200 ${index % 2 === 0 ? "" : "bg-gray-50"}`}
              >
                <div
                  className={`px-6 py-4 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <span className="font-medium text-gray-700">{option}</span>
                </div>
                {/* {compareItems.map((itemId) => {
                  const container = getContainerById(itemId);
                  return container ? (
                    <div
                      key={`delivery-${index}-${itemId}`}
                      className="px-6 py-4"
                    >
                      {container.deliveryOptions1.includes(option) ? (
                        <i className="fas fa-check text-green-500"></i>
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </div>
                  ) : null;
                })} */}
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-16">
          <a
            href="https://readdy.ai/home/28cfcebc-f00c-493e-a707-42ea23f910d2/0cf3f40b-4786-42e8-bb4a-50112957bedf"
            data-readdy="true"
            className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 shadow-sm transition-colors flex items-center !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Another Container
          </a>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={printComparison}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 shadow-sm transition-colors flex items-center !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-print mr-2"></i>
              Print Comparison
            </button>
            <Link
              to="/products"
              data-readdy="true"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer flex items-center"
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Get Quote for Selected
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ContainerHub</h3>
              <p className="text-gray-400 mb-4">
                The leading provider of high-quality shipping containers for
                businesses and individuals nationwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://readdy.ai/home/28cfcebc-f00c-493e-a707-42ea23f910d2/0cf3f40b-4786-42e8-bb4a-50112957bedf"
                    data-readdy="true"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://readdy.ai/home/28cfcebc-f00c-493e-a707-42ea23f910d2/0cf3f40b-4786-42e8-bb4a-50112957bedf"
                    data-readdy="true"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
                  <span className="text-gray-400">
                    123 Container Way, Shipping City, SC 12345
                  </span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-gray-400"></i>
                  <span className="text-gray-400">+1 (800) 555-1234</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-gray-400"></i>
                  <span className="text-gray-400">info@containerhub.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-clock mr-3 text-gray-400"></i>
                  <span className="text-gray-400">Mon-Fri: 8am - 6pm</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and special
                offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-2 rounded-l-lg border-none focus:outline-none text-gray-800 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-700 text-gray-400 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2025 ContainerHub. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <i className="fab fa-cc-visa text-2xl mr-2"></i>
                  <span>Visa</span>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-cc-mastercard text-2xl mr-2"></i>
                  <span>Mastercard</span>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-cc-paypal text-2xl mr-2"></i>
                  <span>PayPal</span>
                </div>
                <div className="flex items-center">
                  <i className="fab fa-cc-amex text-2xl mr-2"></i>
                  <span>Amex</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors mr-4 cursor-pointer"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors mr-4 cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Print Styles - Hidden in normal view, visible when printing */}
      <style>
        {`
@media print {
header, footer, button, .cursor-pointer {
display: none !important;
}
body, .container {
width: 100% !important;
max-width: 100% !important;
padding: 0 !important;
margin: 0 !important;
}
.shadow-md, .shadow-lg {
box-shadow: none !important;
}
.rounded-lg {
border-radius: 0 !important;
}
.bg-gray-50, .bg-white {
background-color: white !important;
}
.text-blue-600 {
color: #2563eb !important;
}
.text-green-500, .text-green-600 {
color: #10b981 !important;
}
.text-red-500, .text-red-600 {
color: #ef4444 !important;
}
}
`}
      </style>
    </div>
  );
};
export default Compare;
