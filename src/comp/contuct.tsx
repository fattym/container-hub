// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import Navbar2 from "./com/nvabar2";
import { Link } from "react-router-dom";

type QuoteProps = {
  quoteItem: { id: number; quantity: number }[];
  setQuoteItem: React.Dispatch<
    React.SetStateAction<{ id: number; quantity: number }[]>
  >;
};

const ContactPage: React.FC<QuoteProps> = ({ quoteItem, setQuoteItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    privacyConsent: false,
  });
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    alert("Thank you for your message. We will get back to you soon!");
  };
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const faqItems = [
    {
      question: "What types of containers do you offer?",
      answer:
        "We offer a wide range of containers including standard shipping containers (20ft, 40ft), high cube containers, refrigerated containers, open top containers, flat rack containers, and custom modified containers for various applications.",
    },
    {
      question: "Do you provide container delivery services?",
      answer:
        "Yes, we provide nationwide container delivery services. Our logistics team ensures timely and safe delivery to your specified location, with real-time tracking available throughout the process.",
    },
    {
      question: "What are your container rental terms?",
      answer:
        "Our rental terms are flexible, ranging from short-term (monthly) to long-term contracts. We offer competitive pricing with discounts for longer rental periods and volume orders. Contact our sales team for a customized quote.",
    },
    {
      question: "Can containers be customized for specific needs?",
      answer:
        "Absolutely! We specialize in container modifications including adding windows, doors, insulation, electrical systems, plumbing, climate control, and custom paint. Our design team can work with you to create solutions for offices, storage, retail spaces, and more.",
    },
    {
      question: "What maintenance services do you provide?",
      answer:
        "We offer comprehensive maintenance services including regular inspections, repairs, cleaning, repainting, and component replacements. Our preventative maintenance programs help extend the lifespan of your containers and ensure they remain in optimal condition.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <Navbar2 quoteItem={quoteItem} setQuoteItem={setQuoteItem} />
      {/* Hero Section */}
      <div className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Modern%252520professional%252520office%252520environment%252520with%252520customer%252520service%252520representatives%252520at%252520desks%252520with%252520computers%252520and%252520phones%252520helping%252520clients%252520with%252520shipping%252520container%252520inquiries%252520warm%252520lighting%252520creating%252520a%252520gradient%252520effect%252520from%252520dark%252520blue%252520on%252520the%252520left%252520to%252520lighter%252520blue%252520on%252520the%252520right%252520perfect%252520for%252520text%252520overlay&width=1440&height=500&seq=201&orientation=landscape"
            alt="Contact ContainerHub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              We're here to help with all your container needs. Reach out to our
              team for personalized assistance, inquiries, or to schedule a
              consultation. We look forward to hearing from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Send a Message
              </a>
              <a
                href="#locations"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Find Our Offices
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Form Section */}
      <div id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sales Question">Sales Question</option>
                    <option value="Support Request">Support Request</option>
                    <option value="Container Rental">Container Rental</option>
                    <option value="Container Purchase">
                      Container Purchase
                    </option>
                    <option value="Custom Modifications">
                      Custom Modifications
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="mb-8">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 mr-3"
                    />
                    <label
                      htmlFor="privacyConsent"
                      className="text-gray-600 text-sm"
                    >
                      I agree to the processing of my personal data in
                      accordance with the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Privacy Policy
                      </a>
                      . <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Contact Information Cards */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Reach out directly to the department you need.
              </p>
              <div className="space-y-6">
                {/* General Inquiries */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    General Inquiries
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <i className="fas fa-phone-alt text-blue-600 mr-3"></i>
                      <span className="text-gray-700">(800) 555-1234</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-envelope text-blue-600 mr-3"></i>
                      <span className="text-gray-700">
                        contact@pitchforwardgroup.com
                      </span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-clock text-blue-600 mr-3"></i>
                      <span className="text-gray-700">Mon-Fri: 8am - 6pm</span>
                    </li>
                  </ul>
                </div>
                {/* Sales Department */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Sales Department
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <i className="fas fa-phone-alt text-green-600 mr-3"></i>
                      <span className="text-gray-700">(800) 555-2345</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-envelope text-green-600 mr-3"></i>
                      <span className="text-gray-700">
                        sales@pitchforwardgroup.com
                      </span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-user text-green-600 mr-3"></i>
                      <span className="text-gray-700">
                        Carlos Rodriguez, VP of Sales
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Technical Support */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Technical Support
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <i className="fas fa-headset text-purple-600 mr-3"></i>
                      <span className="text-gray-700">
                        (800) 555-3456 (24/7)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-envelope text-purple-600 mr-3"></i>
                      <span className="text-gray-700">
                        technical@pitchforwardgroup.com
                      </span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-comment-dots text-purple-600 mr-3"></i>
                      <a
                        href="#"
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Live Chat Support
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Alternative Contact Methods */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Alternative Ways to Connect
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <i className="fas fa-comments text-blue-600 mr-2"></i>
                      <span className="text-gray-700 text-sm">Live Chat</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <i className="fas fa-phone-volume text-blue-600 mr-2"></i>
                      <span className="text-gray-700 text-sm">
                        Request Callback
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <i className="fas fa-file-invoice-dollar text-blue-600 mr-2"></i>
                      <span className="text-gray-700 text-sm">
                        Request Quote
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
                      <span className="text-gray-700 text-sm">
                        Schedule Meeting
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Office Locations Map */}
      <div id="locations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Office Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at one of our offices across the country. Our team is
              ready to assist you in person.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="relative h-96">
              <img
                src="https://readdy.ai/api/search-image?query=Detailed%20map%20of%20Kenya%20with%20major%20cities%20marked%20including%20Nairobi%20Mombasa%20Kisumu%20and%20Nakuru%20showing%20geographical%20features%20roads%20and%20borders%20professional%20cartographic%20style%20with%20clean%20modern%20design%20perfect%20for%20business%20presentation%20high%20quality%20detailed%20map%20with%20blue%20color%20scheme&width=1200&height=500&seq=203&orientation=landscape"
                alt="ContainerHub Office Locations Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Headquarters */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <div className="flex items-center">
                  <i className="fas fa-building mr-2"></i>
                  <span className="font-medium">Headquarters</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nairobi
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
                    <span>123 Mombasa Road, Industrial Area, Nairobi</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone-alt text-blue-600 mr-3"></i>
                    <span>+254 20 555 1234</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 mr-3"></i>
                    <span>nairobi@containerhub.co.ke</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-clock text-blue-600 mr-3"></i>
                    <span>Mon-Fri: 8am - 5pm EAT</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4 cursor-pointer"
                >
                  Get Directions
                  <i className="fas fa-directions ml-2"></i>
                </a>
              </div>
            </div>
            {/* Mombasa Office */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <div className="flex items-center">
                  <i className="fas fa-anchor mr-2"></i>
                  <span className="font-medium">Port Office</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Mombasa
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
                    <span>456 Port Road, Kilindini, Mombasa</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone-alt text-blue-600 mr-3"></i>
                    <span>+254 41 555 2345</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 mr-3"></i>
                    <span>mombasa@containerhub.co.ke</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-clock text-blue-600 mr-3"></i>
                    <span>Mon-Fri: 8am - 5pm EAT</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4 cursor-pointer"
                >
                  Get Directions
                  <i className="fas fa-directions ml-2"></i>
                </a>
              </div>
            </div>
            {/* Kisumu Office */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <div className="flex items-center">
                  <i className="fas fa-water mr-2"></i>
                  <span className="font-medium">Lake Region Office</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Kisumu</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
                    <span>789 Oginga Odinga Road, Kisumu</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone-alt text-blue-600 mr-3"></i>
                    <span>+254 57 555 3456</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 mr-3"></i>
                    <span>kisumu@containerhub.co.ke</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-clock text-blue-600 mr-3"></i>
                    <span>Mon-Fri: 8am - 5pm EAT</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4 cursor-pointer"
                >
                  Get Directions
                  <i className="fas fa-directions ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services, containers,
              and processes.
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8">
            {/* Search Box */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for questions..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left font-medium flex items-center justify-between focus:outline-none cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-gray-800">{item.question}</span>
                    <i
                      className={`fas ${activeAccordion === index ? "fa-chevron-up text-blue-600" : "fa-chevron-down text-gray-400"} transition-transform`}
                    ></i>
                  </button>
                  <div
                    className={`px-6 pb-4 ${activeAccordion === index ? "block" : "hidden"}`}
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Still Have Questions */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help with any specific questions you may
                have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact-form"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Contact Support
                </a>
                <a
                  href="#"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  View Knowledge Base
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact our team today to discuss how ContainerHub can support your
            container needs with our comprehensive solutions and exceptional
            service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact-form"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
              Send a Message
            </a>
            <a
              href="https://readdy.ai/home/28cfcebc-f00c-493e-a707-42ea23f910d2/ec23607a-d11c-460a-8236-6351e7f9a906"
              data-readdy="true"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
              Explore Our Services
            </a>
            <a
              href="#"
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
              Request a Quote
            </a>
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
    </div>
  );
};
export default ContactPage;
