import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContainerType } from "./containerTypes"; // Import your shared container data

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const container = ContainerType.find((c) => c.id === Number(id));

  // Fallback if not found
  if (!container) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          Container not found.
        </h2>
      </div>
    );
  }

  // Example FAQs (can be moved to shared data if needed)
  const faqs = [
    {
      id: 1,
      question: "What are the exact dimensions of this container?",
      answer: "See the specifications tab for detailed dimensions.",
    },
    {
      id: 2,
      question: "How long does delivery typically take?",
      answer: "Delivery is usually within 5-10 business days.",
    },
    {
      id: 3,
      question: "Are the containers wind and water tight?",
      answer: "Yes, all our containers are certified wind and water tight.",
    },
  ];

  const [activeTab, setActiveTab] = useState("specifications");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              aria-label="Back to Home"
              className="mr-4 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </Link>
            <Link
              to="/quote-summary"
              aria-label="Back to Quote Summary"
              className="mr-4 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Quote Summary
            </Link>
            <div className="text-2xl font-bold text-blue-600">
              <i className="fas fa-ship mr-2"></i>
              ContainerHub
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
            <Link
              to="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
            <span className="text-gray-800 font-medium">{container.type}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row -mx-4">
            {/* Product Image */}
            <div className="lg:w-1/2 px-4 mb-10 lg:mb-0">
              <div className="relative mb-4 bg-white rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={container.image}
                  alt={container.type}
                  className="w-full h-[400px] object-cover object-top"
                />
              </div>
            </div>
            {/* Product Info */}
            <div className="lg:w-1/2 px-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {container.type}
                </h1>
                <p className="text-gray-600 mb-4">{container.description}</p>
                <div className="mb-6">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-blue-600">
                    {container.price}
                  </span>
                </div>
                <Link
                  to="/quote-summary"
                  className="block w-full mb-4 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-lg font-medium text-center transition-colors"
                >
                  View Quote Summary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex flex-wrap -mb-px">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`mr-8 py-4 px-1 font-medium text-lg border-b-2 ${
                  activeTab === "specifications"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                } transition-colors cursor-pointer`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`mr-8 py-4 px-1 font-medium text-lg border-b-2 ${
                  activeTab === "features"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                } transition-colors cursor-pointer`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("customization")}
                className={`mr-8 py-4 px-1 font-medium text-lg border-b-2 ${
                  activeTab === "customization"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                } transition-colors cursor-pointer`}
              >
                Customization
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`mr-8 py-4 px-1 font-medium text-lg border-b-2 ${
                  activeTab === "delivery"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                } transition-colors cursor-pointer`}
              >
                Delivery
              </button>
            </div>
          </div>

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Technical Specifications
                </h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">
                        External Dimensions
                      </td>
                      <td className="py-3 font-medium">{container.external}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">
                        Internal Dimensions
                      </td>
                      <td className="py-3 font-medium">{container.internal}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Door Opening</td>
                      <td className="py-3 font-medium">
                        {container.doorOpening}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Tare Weight</td>
                      <td className="py-3 font-medium">{container.tare}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Max Payload</td>
                      <td className="py-3 font-medium">
                        {container.maxPayload}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Cubic Capacity</td>
                      <td className="py-3 font-medium">
                        {container.cubicCapacity}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Floor Strength</td>
                      <td className="py-3 font-medium">
                        {container.floorStrength}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Construction Details</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Material</td>
                      <td className="py-3 font-medium">{container.material}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Floor</td>
                      <td className="py-3 font-medium">{container.floor}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Wall Thickness</td>
                      <td className="py-3 font-medium">
                        {container.wallThickness}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Roof Thickness</td>
                      <td className="py-3 font-medium">
                        {container.roofThickness}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Door Type</td>
                      <td className="py-3 font-medium">{container.doorType}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600">Locking System</td>
                      <td className="py-3 font-medium">
                        _{container.lockingSystem}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600">Paint</td>
                      <td className="py-3 font-medium">{container.paint}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-ruler-vertical text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Extra Height</h4>
                    <p className="text-gray-600">
                      With an additional foot of height compared to standard
                      containers, the High Cube provides significantly more
                      vertical storage space.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-shield-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Weather Resistant</h4>
                    <p className="text-gray-600">
                      Constructed with Corten steel and sealed with marine-grade
                      paint for superior protection against harsh weather
                      conditions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-lock text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Enhanced Security</h4>
                    <p className="text-gray-600">
                      Features heavy-duty locking bars and the option to add
                      padlocks for additional security of your valuable items.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-wind text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Wind & Water Tight</h4>
                    <p className="text-gray-600">
                      All containers are certified wind and water tight (WWT),
                      ensuring your contents remain dry and protected.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-exchange-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Versatile Usage</h4>
                    <p className="text-gray-600">
                      Perfect for storage, shipping, or conversion into offices,
                      workshops, or living spaces with appropriate
                      modifications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <i className="fas fa-truck-loading text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Easy Loading</h4>
                    <p className="text-gray-600">
                      Wide door opening and level floor make loading and
                      unloading cargo efficient, even with forklifts or pallet
                      jacks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Certifications & Standards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>ISO 9001 Certified</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>CSC Plated</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>Wind & Water Tight Certified</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>IICL-5 Standards</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>CWO Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-blue-600 mr-3"></i>
                    <span>TIR Approved</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customization" && (
            <div>
              <h3 className="text-xl font-bold mb-6">Customization Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20modified%20shipping%20container%20with%20windows%20and%20door%20installed%2C%20blue%20exterior%20with%20white%20trim%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=600&height=400&seq=301&orientation=landscape"
                    alt="Container with windows and doors"
                    className="w-full h-64 object-cover object-top rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-bold mb-2">Doors & Windows</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Personnel doors (standard or roll-up)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>
                        Fixed or sliding windows with security options
                      </span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Roll-up cargo doors for easy access</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Custom placement to your specifications</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20shipping%20container%20interior%20with%20electrical%20wiring%2C%20lighting%2C%20and%20insulation%20installed%2C%20clean%20white%20walls%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=600&height=400&seq=302&orientation=landscape"
                    alt="Container with electrical and insulation"
                    className="w-full h-64 object-cover object-top rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-bold mb-2">
                    Electrical & Climate Control
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Electrical panel installation with outlets</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>LED lighting packages (interior and exterior)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>HVAC systems for climate control</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Insulation options for temperature regulation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-2">Interior Finishing</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Wall paneling (plywood, metal, or drywall)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Flooring options (vinyl, epoxy, or rubber)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Ceiling treatments with recessed lighting</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Custom shelving and storage solutions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">
                    Exterior Customization
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Custom paint in any color with your branding</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Additional security features (locks, bars)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>Roof vents and turbine ventilators</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                      <span>External tie-downs and securing points</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="text-blue-600 text-3xl mr-4">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      Custom Modifications
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Need something specific that's not listed here? Our team
                      specializes in creating custom container solutions for
                      unique requirements. From complex office conversions to
                      specialized storage solutions, we can design and implement
                      modifications to meet your exact specifications.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                      Request Custom Modification Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div>
              <h3 className="text-xl font-bold mb-6">Delivery Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-bold mb-3">Delivery Process</h4>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium">Order Confirmation</h5>
                        <p className="text-gray-600">
                          After your order is placed, you'll receive a
                          confirmation email with estimated delivery timeframe.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium">Delivery Scheduling</h5>
                        <p className="text-gray-600">
                          Our logistics team will contact you to schedule a
                          specific delivery date and time that works for you.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium">Site Preparation</h5>
                        <p className="text-gray-600">
                          We'll provide guidance on preparing your site for
                          container placement, including access requirements.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        4
                      </div>
                      <div>
                        <h5 className="font-medium">Delivery & Placement</h5>
                        <p className="text-gray-600">
                          Our specialized equipment will deliver and place the
                          container exactly where you need it.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        5
                      </div>
                      <div>
                        <h5 className="font-medium">Final Inspection</h5>
                        <p className="text-gray-600">
                          You'll have the opportunity to inspect the container
                          before the delivery is considered complete.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">
                    Delivery Requirements
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Access Requirements</h5>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-truck text-blue-600 mr-2 mt-1"></i>
                          <span>
                            Minimum 12' wide access for delivery truck
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-arrows-alt-v text-blue-600 mr-2 mt-1"></i>
                          <span>
                            14' overhead clearance (power lines, trees, etc.)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-road text-blue-600 mr-2 mt-1"></i>
                          <span>
                            Firm, level ground capable of supporting container
                            weight
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">
                        Foundation Requirements
                      </h5>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                          <span>
                            Level surface with less than 1" of variation
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                          <span>
                            Concrete pad, gravel bed, or foundation blocks
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                          <span>Support at all four corners minimum</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">
                        Delivery Zones & Timing
                      </h5>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <i className="fas fa-map-marker-alt text-blue-600 mr-2 mt-1"></i>
                          <span>Zone 1 (0-50 miles): 3-5 business days</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-map-marker-alt text-blue-600 mr-2 mt-1"></i>
                          <span>Zone 2 (51-150 miles): 5-7 business days</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-map-marker-alt text-blue-600 mr-2 mt-1"></i>
                          <span>Zone 3 (151+ miles): 7-10 business days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-bold mb-3">Delivery Pricing</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                          Distance
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                          Standard Delivery
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                          Expedited Delivery
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">0-50 miles</td>
                        <td className="py-3 px-4 border-b">$350</td>
                        <td className="py-3 px-4 border-b">$500</td>
                        <td className="py-3 px-4 border-b">
                          Free with purchase over $5,000
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">51-100 miles</td>
                        <td className="py-3 px-4 border-b">$450</td>
                        <td className="py-3 px-4 border-b">$650</td>
                        <td className="py-3 px-4 border-b">
                          Includes basic placement
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">101-150 miles</td>
                        <td className="py-3 px-4 border-b">$600</td>
                        <td className="py-3 px-4 border-b">$850</td>
                        <td className="py-3 px-4 border-b">
                          Includes basic placement
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">151+ miles</td>
                        <td className="py-3 px-4">Custom Quote</td>
                        <td className="py-3 px-4">Custom Quote</td>
                        <td className="py-3 px-4">Contact for details</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  * Additional fees may apply for difficult access, special
                  equipment requirements, or precise placement needs. All
                  delivery pricing includes standard placement within 20 feet of
                  the delivery truck's position.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Detail;
