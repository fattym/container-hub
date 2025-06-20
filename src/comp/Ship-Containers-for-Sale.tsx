// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContainerType } from "./containerTypes"; // <-- import shared data
import Navbar2 from "./com/nvabar2";
import Footer from "./com/footer"; // <-- import shared footer component
const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm] = useState("");
  // const [setShowQuoteModal] = useState(false);
  

  // const handleQuoteSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const data = Object.fromEntries(formData);
  //   // Here you would typically send the data to your backend
  //   console.log("Quote Request Data:", data);
  //   // Show success message
  //   const successMessage = document.createElement("div");
  //   successMessage.className =
  //     "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  //   successMessage.textContent = "Quote request submitted successfully!";
  //   document.body.appendChild(successMessage);
  //   // Remove success message after 3 seconds
  //   setTimeout(() => {
  //     successMessage.remove();
  //   }, 3000);
  //   // Close modal
   
  // };

  const filterContainers = (type: string) => {
    setActiveFilter(type);
  };

  const filteredContainers =
    activeFilter === "all"
      ? ContainerType
      : ContainerType.filter((container) =>
          container.type.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const searchedContainers =
    searchTerm === ""
      ? filteredContainers
      : filteredContainers.filter(
          (container) =>
            container.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            container.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
        

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar2
        quoteItem={[]}
        setQuoteItem={() => {}}
      /> 
        {/* Toast Notification */}
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
        <div
          className="h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20panoramic%20view%20of%20a%20shipping%20container%20yard%20with%20neatly%20stacked%20containers%20in%20various%20colors%2C%20dramatic%20lighting%20with%20sun%20rays%20filtering%20through%2C%20creating%20a%20professional%20industrial%20atmosphere%2C%20wide%20angle%20shot%20showing%20scale%20and%20organization%2C%20clean%20sky%20background%2C%20commercial%20photography%20style&width=1440&height=500&seq=007&orientation=landscape')`,
          }}
        ></div>
        <div className="container mx-auto px-4 absolute inset-0 flex items-center z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Shipping Containers for Every Need
            </h1>
            <p className="text-lg mb-8">
              Industry-leading quality, competitive pricing, and nationwide
              delivery. Find the perfect container solution for your business or
              personal use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Browse Containers
              </Link>
              <Link
                to="/services"
                className="bg-transparent hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-lg font-medium border-2 border-white transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Ask Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Containers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Containers
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Explore our wide range of high-quality shipping containers available
            for immediate purchase or rental. All containers are inspected and
            certified.
          </p>
          {/* Filter Options */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => filterContainers("all")}
              className={`px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => filterContainers("standard")}
              className={`px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer ${
                activeFilter === "standard"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => filterContainers("high cube")}
              className={`px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer ${
                activeFilter === "high cube"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              High Cube
            </button>
            <button
              onClick={() => filterContainers("refrigerated")}
              className={`px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer ${
                activeFilter === "refrigerated"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Refrigerated
            </button>
            <button
              onClick={() => filterContainers("special")}
              className={`px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer ${
                activeFilter === "special"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Special Purpose
            </button>
          </div>
          {/* Container Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedContainers.map((container) => (
              <div
                key={container.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={container.image}
                    alt={container.type}
                    className="w-full h-full object-cover object-top transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{container.type}</h3>
                    <span className="text-blue-600 font-bold">
                     
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{container.description}</p>
                  {/* <Link
                    to="/detail/ + container.id "
                    data-readdy="true"
                    className="block w-full"
                  >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </Link> */}
                  <Link to={`/detail/${container.id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Key Benefits */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Choose Our Containers
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We pride ourselves on delivering the highest quality shipping
            containers with exceptional service and support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                All our containers undergo rigorous inspection and certification
                to ensure they meet the highest industry standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Nationwide Delivery</h3>
              <p className="text-gray-600">
                Fast and reliable delivery service to any location across the
                country, with real-time tracking available.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-tools"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Modifications</h3>
              <p className="text-gray-600">
                Tailor your container to your specific needs with our extensive
                range of modification options.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Product Specifications */}

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We've got answers to the most common questions about our containers,
            prices, and services.
          </p>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="text-lg font-bold cursor-pointer">
                What is the condition of your containers?
              </summary>
              <p className="mt-4 text-gray-600">
                Our containers are in excellent condition, with a maximum age of
                10 years. They are thoroughly inspected and certified by a third
                party before delivery.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="text-lg font-bold cursor-pointer">
                Can I modify my container?
              </summary>
              <p className="mt-4 text-gray-600">
                Yes, we offer a range of customization options including
                painting, signage, shelving, and more. Please contact us to
                discuss your specific requirements.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-md">
              <summary className="text-lg font-bold cursor-pointer">
                What is the delivery process?
              </summary>
              <p className="mt-4 text-gray-600">
                We offer fast and reliable delivery to any location across the
                country. Containers are typically delivered within 7-10 working
                days from the date of order.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Container Specifications
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Detailed specifications for our most popular container types. All
            measurements and capacities are guaranteed.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Container Type
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    External Dimensions
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Internal Dimensions
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Door Opening
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Max Payload
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Cubic Capacity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">20ft Standard</td>
                  <td className="py-3 px-4 border-b">20' x 8' x 8'6"</td>
                  <td className="py-3 px-4 border-b">19'4" x 7'8" x 7'10"</td>
                  <td className="py-3 px-4 border-b">7'8" x 7'5"</td>
                  <td className="py-3 px-4 border-b">28,200 kg</td>
                  <td className="py-3 px-4 border-b">33.2 m³</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">40ft Standard</td>
                  <td className="py-3 px-4 border-b">40' x 8' x 8'6"</td>
                  <td className="py-3 px-4 border-b">39'5" x 7'8" x 7'10"</td>
                  <td className="py-3 px-4 border-b">7'8" x 7'5"</td>
                  <td className="py-3 px-4 border-b">28,800 kg</td>
                  <td className="py-3 px-4 border-b">67.7 m³</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">40ft High Cube</td>
                  <td className="py-3 px-4 border-b">40' x 8' x 9'6"</td>
                  <td className="py-3 px-4 border-b">39'5" x 7'8" x 8'10"</td>
                  <td className="py-3 px-4 border-b">7'8" x 8'5"</td>
                  <td className="py-3 px-4 border-b">28,560 kg</td>
                  <td className="py-3 px-4 border-b">76.4 m³</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">20ft Refrigerated</td>
                  <td className="py-3 px-4 border-b">20' x 8' x 8'6"</td>
                  <td className="py-3 px-4 border-b">17'8" x 7'5" x 7'5"</td>
                  <td className="py-3 px-4 border-b">7'5" x 7'2"</td>
                  <td className="py-3 px-4 border-b">27,700 kg</td>
                  <td className="py-3 px-4 border-b">28.3 m³</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Call-to-Action Strip */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white mb-8 lg:mb-0 lg:mr-8 lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Your Container?
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Fill out our quick form for a personalized quote, or call us
                directly to speak with a container specialist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-xl"></i>
                  <span className="text-lg font-medium">(+254) 707 586837</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-xl"></i>
                  <span className="text-lg font-medium">
                    purchase@pitchforwardgroup.com
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 w-full">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Request a Quote
              </h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                      <option value="">Container Type</option>
                      <option value="20ft-standard">20ft Standard</option>
                      <option value="40ft-standard">40ft Standard</option>
                      <option value="40ft-high-cube">40ft High Cube</option>
                      <option value="refrigerated">Refrigerated</option>
                      <option value="special">Special Purpose</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Additional Requirements"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Home;
