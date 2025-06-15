// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import Navbar2 from "./com/nvabar2";

import Footer from "./com/footer";



type QuoteProps = {
  quoteItem: { id: number, quantity: number }[];
  setQuoteItem: React.Dispatch<React.SetStateAction<{ id: number, quantity: number }[]>>;
};

const ServicePage: React.FC<QuoteProps> = ({quoteItem, setQuoteItem}) => {
  // Service inquiry form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    details: "",
    contactMethod: "email",
    file: null,
  });
  // Service category state
  const [activeService, setActiveService] = useState<string | null>(null);
  // Testimonial carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // Form validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSuccess, setFormSuccess] = useState(false);
  // Handle form input changes
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
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };
  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      contactMethod: e.target.value,
    });
  };
  // Handle file upload

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!formData.serviceType) {
      errors.serviceType = "Please select a service type";
    }
    if (!formData.details.trim()) {
      errors.details = "Please provide project details";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // Form is valid, show success message
    setFormSuccess(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        details: "",
        contactMethod: "email",
        file: null,
      });
    }, 3000);
  };

  // Toggle service details
  const toggleService = (service: string) => {
    if (activeService === service) {
      setActiveService(null);
    } else {
      setActiveService(service);
    }
  };
  // Service data
  const services = [
    {
      id: "delivery",
      name: "Delivery Services",
      icon: "fa-truck",
      shortDescription:
        "Fast and reliable container delivery to your location.",
      fullDescription:
        "Our comprehensive delivery services ensure your shipping containers arrive safely and on time. We handle all logistics, from route planning to final placement, with specialized equipment for any terrain or location.",
      features: [
        "Nationwide delivery network",
        "GPS tracking for real-time updates",
        "Specialized transport equipment",
        "Flexible scheduling options",
        "Remote location delivery capability",
      ],
      startingPrice: 350,
      timeframe: "1-5 business days",
    },
    {
      id: "installation",
      name: "Installation",
      icon: "fa-tools",
      shortDescription: "Professional container setup and positioning.",
      fullDescription:
        "Our expert installation team ensures your container is perfectly positioned and ready to use. We handle all aspects of setup, including leveling, foundation preparation, and utility connections where required.",
      features: [
        "Site preparation and assessment",
        "Precision placement and leveling",
        "Foundation options (concrete, gravel, etc.)",
        "Multi-container configuration",
        "Utility connection assistance",
      ],
      startingPrice: 450,
      timeframe: "1-2 business days",
    },
    {
      id: "maintenance",
      name: "Maintenance",
      icon: "fa-wrench",
      shortDescription: "Regular upkeep and repairs to extend container life.",
      fullDescription:
        "Keep your container in optimal condition with our comprehensive maintenance services. From routine inspections to emergency repairs, our technicians are trained to handle all aspects of container maintenance.",
      features: [
        "Scheduled inspection programs",
        "Rust prevention and treatment",
        "Door mechanism servicing",
        "Weatherproofing and sealing",
        "Structural repairs and reinforcement",
      ],
      startingPrice: 250,
      timeframe: "Scheduled or on-demand",
    },
    {
      id: "customization",
      name: "Customization",
      icon: "fa-paint-brush",
      shortDescription: "Transform containers to meet your specific needs.",
      fullDescription:
        "Turn your shipping container into a custom solution with our modification services. From basic alterations to complete transformations, our design and fabrication team can bring your vision to life.",
      features: [
        "Window and door installation",
        "Interior finishing and insulation",
        "Electrical and plumbing systems",
        "Climate control solutions",
        "Custom paint and branding",
      ],
      startingPrice: 1200,
      timeframe: "1-4 weeks depending on complexity",
    },
    {
      id: "consulting",
      name: "Consulting",
      icon: "fa-comments",
      shortDescription: "Expert advice on container selection and usage.",
      fullDescription:
        "Leverage our industry expertise with our container consulting services. We provide guidance on container selection, site planning, regulatory compliance, and innovative container applications for your projects.",
      features: [
        "Container type and size recommendations",
        "Site planning and layout design",
        "Regulatory and compliance guidance",
        "Project feasibility assessment",
        "Cost analysis and optimization",
      ],
      startingPrice: 200,
      timeframe: "Flexible scheduling",
    },
  ];
  // Pricing tiers
 
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "John Decker",
      company: "Decker Construction",
      industry: "Construction",
      rating: 5,
      text: "The delivery service was exceptional. The team arrived on time and positioned our containers exactly where we needed them. The driver's skill in navigating our tight construction site was impressive.",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520middle-aged%2520Caucasian%2520male%2520construction%2520manager%2520wearing%2520a%2520hardhat%2520and%2520safety%2520vest%2520against%2520a%2520neutral%2520background%2520with%2520soft%2520professional%2520lighting%2520and%2520shallow%2520depth%2520of%2520field%2520creating%2520a%2520professional%2520corporate%2520portrait&width=80&height=80&seq=101&orientation=squarish",
    },
    {
      id: 2,
      name: "Sarah Chen",
      company: "Innovative Retail Solutions",
      industry: "Retail",
      rating: 5,
      text: "The customization service transformed our shipping containers into beautiful pop-up shops. The attention to detail and quality of workmanship exceeded our expectations. Our customers love the unique shopping experience.",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520Asian%2520female%2520business%2520executive%2520in%2520her%2520thirties%2520wearing%2520business%2520attire%2520against%2520a%2520neutral%2520background%2520with%2520soft%2520professional%2520lighting%2520and%2520shallow%2520depth%2520of%2520field%2520creating%2520a%2520professional%2520corporate%2520portrait&width=80&height=80&seq=102&orientation=squarish",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      company: "Global Logistics Inc.",
      industry: "Logistics",
      rating: 4,
      text: "We rely on their maintenance services to keep our container fleet in top condition. Their preventative maintenance program has significantly reduced our downtime and extended the life of our assets.",
      image:
        "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520an%2520African%2520American%2520male%2520logistics%2520manager%2520in%2520his%2520forties%2520wearing%2520business%2520casual%2520attire%2520against%2520a%2520neutral%2520background%2520with%2520soft%2520professional%2520lighting%2520and%2520shallow%2520depth%2520of%2520field%2520creating%2520a%2520professional%2520corporate%2520portrait&width=80&height=80&seq=103&orientation=squarish",
    },
  ];
  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  // Navigation to next testimonial
  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  // Navigation to previous testimonial
  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar2 quoteItem={quoteItem} setQuoteItem={setQuoteItem}/>
      {/* Hero Section */}
      <div className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%2520photograph%2520of%2520shipping%2520container%2520operations%2520with%2520cranes%2520and%2520equipment%2520moving%2520containers%2520at%2520a%2520logistics%2520yard%2520during%2520golden%2520hour%2520with%2520soft%2520lighting%2520creating%2520a%2520gradient%2520from%2520dark%2520blue%2520on%2520the%2520left%2520to%2520lighter%2520blue%2520on%2520the%2520right%2520perfect%2520for%2520text%2520overlay%2520commercial%2520photography%2520style&width=1440&height=500&seq=001&orientation=landscape"
            alt="Container Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Comprehensive Container Services
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              From delivery and installation to maintenance and customization,
              we provide end-to-end solutions for all your shipping container
              needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
               href="https://www.pitchforwardgroup.com/"
               target="_blank" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Explore Our Services
              </a>
              <a
                href="#contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Service Categories */}
      <div id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of container services designed to
              meet your specific needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer"
                onClick={() => toggleService(service.id)}
              >
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`fas ${service.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto !rounded-button whitespace-nowrap cursor-pointer">
                    Learn More
                    <i
                      className={`fas fa-chevron-${activeService === service.id ? "up" : "down"} ml-2`}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Service Details */}
      {activeService && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {services
              .filter((service) => service.id === activeService)
              .map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                      <i className={`fas ${service.icon}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {service.fullDescription}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Pricing</h4>
                      <p className="text-gray-600 mb-2">Starting from:</p>
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPrice(service.startingPrice)}
                      </p>
                      <p className="text-sm text-gray-500">
                        *Prices may vary based on specific requirements and
                        location
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">
                        Timeframe
                      </h4>
                      <p className="text-gray-600 mb-2">
                        Estimated completion:
                      </p>
                      <p className="text-xl font-medium text-gray-800">
                        {service.timeframe}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        *Expedited options available
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                 
                    <a
                      href="#contact"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      Request Quote
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* Pricing Section */}
    
      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have benefited from our container
              services.
            </p>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < testimonials[activeTestimonial].rating ? "text-yellow-400" : "text-gray-300"} mr-1`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg italic mb-6">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[activeTestimonial].company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[activeTestimonial].industry} Industry
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? "bg-blue-600 w-6" : "bg-gray-300"} cursor-pointer`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Contact Form */}
      
      <div id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Request a Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our team will get back to you with a
              customized quote.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {formSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your service inquiry has been submitted successfully. Our team
                  will contact you shortly.
                </p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
               id="contaform"
                name="contaform"
              data-netlify="true"
              action="/contact"
              method="POST"
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-xl shadow-lg p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
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
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your phone number with +_ _"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone})
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.serviceType ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                      <option value="multiple">Multiple Services</option>
                    </select>
                    {formErrors.serviceType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.serviceType}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="details"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.details ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Please provide details about your project, requirements, location, timeline, etc."
                  ></textarea>
                  {formErrors.details && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.details}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <p className="block text-gray-700 font-medium mb-2">
                    Preferred Contact Method
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === "email"}
                        onChange={handleRadioChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === "phone"}
                        onChange={handleRadioChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Phone</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="either"
                        checked={formData.contactMethod === "either"}
                        onChange={handleRadioChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Either</span>
                    </label>
                  </div>
                </div>
               
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Immediate Assistance?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <i className="fas fa-phone-alt text-3xl text-white mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-blue-100 mb-4">
                Our support team is available Monday-Friday, 8am-6pm
              </p>
              <a
                href="tel:+18005551234"
                className="text-2xl font-bold text-white hover:text-blue-200 transition-colors cursor-pointer"
              >
                
(+254) 707 586837
              </a>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <i className="fas fa-envelope text-3xl text-white mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-blue-100 mb-4">
                Send us an email and we'll respond within 24 hours
              </p>
              <a
                href="mailto:services@containerhub.com"
                className="text-xl font-bold text-white hover:text-blue-200 transition-colors cursor-pointer"
              >
                contact@pitchforwardgroup.com
              </a>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <i className="fas fa-comment-dots text-3xl text-white mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
              <p className="text-blue-100 mb-4">
                Chat with our team for immediate assistance
              </p>
              <button 
              onClick={() => window.open("https://chat.whatsapp.com/F4K2rqS0hnNBOgTeYMTjQn", "_blank")}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                Start Chat
              </button>
            </div>
          </div>
          <div className="bg-red-500 inline-block rounded-lg px-4 py-2 mb-2">
            <span className="text-white font-medium">
              24/7 Emergency Service Available
            </span>
          </div>
          <p className="text-blue-100">
            For urgent after-hours assistance, call our emergency line:{" "}
            <a
              href="tel:+18005559999"
              className="font-bold text-white hover:text-blue-200 transition-colors cursor-pointer"
            >
              +1 (800) 555-9999
            </a>
          </p>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default ServicePage;
