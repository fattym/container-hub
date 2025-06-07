import React from "react";
import { Link } from "react-router-dom";
const Footer: React.FC = () => (
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
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
              <span className="text-gray-400">
                The Piano, Brookside drive, Westlands, Nairobi, Kenya.
              </span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone-alt mr-3 text-gray-400"></i>
              <span className="text-gray-400">(+254) 707 586837</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope mr-3 text-gray-400"></i>
              <span className="text-gray-400">
                contact@pitchforwardgroup.com{" "}
              </span>
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
);

export default Footer;
