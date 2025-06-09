// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ContainerType } from "./containerTypes";
import Navbar2 from "./com/nvabar2";
import Footer from "./com/footer";
import { Ban } from "lucide-react";
import emailjs from "@emailjs/browser"; // Import emailjs

type QuoteProps = {
  quoteItem: { id: number; quantity: number }[];
  setQuoteItem: React.Dispatch<
    React.SetStateAction<{ id: number; quantity: number }[]>
  >;
};

const QuoteSummary: React.FC<QuoteProps> = ({ quoteItem, setQuoteItem }) => {
  // Quote items state with quantity
  // const [quoteItems, setQuoteItems] = useState<
  //   { id: number; quantity: number }[]
  // >([
  //   { id: 2, quantity: 1 }, // Starting with one item in the quote
  // ]);
  // Customer information state

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    notes: "",
  });
  // Form validation state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Modal states
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [quoteReference, setQuoteReference] = useState("");
  // Container data

  // Get container by ID
  const getContainerById = (id: number) => {
    return ContainerType.find((container) => container.id === id);
  };
  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  // Calculate subtotal for an item
  const calculateItemSubtotal = (id: number, quantity: number) => {
    const Container = getContainerById(id);

    if (!Container) return 0; // Return 0 if container not found
    // Find the container price based on the type
    const container = ContainerType.find((c) => c.id === id);
    if (!container) return 0; // Return 0 if container not found

    // Return the subtotal for the item
    // Return the subtotal for the item
    // Return the subtotal for the item
    // Return the subtotal for the item

    return typeof container.price === "number" ? container.price * quantity : 0;
  };
  // Calculate total subtotal
  const calculateSubtotal = () => {
    return quoteItem.reduce((total, item) => {
      return total + calculateItemSubtotal(item.id, item.quantity);
    }, 0);
  };
  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuoteItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  // Handle remove item
  const handleRemoveItem = (id: number) => {
    setItemToRemove(id);
    setShowRemoveModal(true);
  };
  // Confirm remove item
  const confirmRemoveItem = () => {
    if (itemToRemove !== null) {
      const removeItem = quoteItem.filter((item) => item.id !== itemToRemove);
      setQuoteItem(removeItem);
      localStorage.setItem("addToQuote", JSON.stringify(removeItem));
      setShowRemoveModal(false);
      setItemToRemove(null);
    }
  };
  // Handle clear quote
  const handleClearQuote = () => {
    setShowClearModal(true);
  };
  // Confirm clear quote
  const confirmClearQuote = () => {
    setQuoteItem([]);
    setShowClearModal(false);
    localStorage.removeItem("addToQuote");
  };


  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is filled
    if (value.trim() && formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
    ];
    requiredFields.forEach((field) => {
      if (!customerInfo[field as keyof typeof customerInfo].trim()) {
        errors[field] = "This field is required";
      }
    });
    // Email validation
    if (customerInfo.email && !/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = "Please enter a valid email address";
    }
    // Phone validation
    if (
      customerInfo.phone &&
      !/^\+?[0-9\s\-()]{8,20}$/.test(customerInfo.phone)
    ) {
      errors.phone = "Please enter a valid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // Handle form submission
  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Get all required form fields
    const requiredFields = [
      { id: "fullName", label: "Full Name" },
      { id: "email", label: "Email Address" },
      { id: "phone", label: "Phone Number" },
      { id: "street", label: "Street Address" },
      { id: "city", label: "City" },
      { id: "state", label: "State/Province" },
      { id: "zipCode", label: "ZIP/Postal Code" },
      { id: "country", label: "Country" },
    ];

    // Scroll to first error if validation fails
    const scrollToError = (fieldId: string) => {
      const element = document.getElementById(fieldId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    };

    if (validateForm()) {
      // Generate unique reference number with timestamp
      const timestamp = new Date().getTime().toString().slice(-6);
      const random = Math.floor(1000 + Math.random() * 9000).toString();
      const reference = `Q-${timestamp}-${random}`;

      setQuoteReference(reference);
      setShowSuccessModal(true);

      // EmailJS integration
      const templateParams = {
        reference: reference,
        name: customerInfo.fullName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        deliveryAddress: `${customerInfo.street}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.zipCode}, ${customerInfo.country}`,
        items: quoteItem.reduce((total, item) => total + item.quantity, 0),
        total: formatPrice(calculateSubtotal()),
        containerDetails: quoteItem
          .map((item) => {
            const container = getContainerById(item.id);
            return container
              ? `${container.type} (Qty: ${item.quantity}, Price: ${formatPrice(
                  Number(container.price)
                )} each)`
              : null;
          })
          .join(", "),
        notes: customerInfo.notes,
      };

      emailjs
        .send(
          "service_ivi64bd", // Replace with your EmailJS service ID
          "template_t98fdfd", // Replace with your EmailJS template ID
          templateParams,
          "GEB7TdC6ixv1uc5W5" // Replace with your EmailJS public key
        )
        .then(
          (response) => {
            console.log(
              "SUCCESS! Quote email sent successfully",
              response.status,
              response.text
            );
          },
          (error) => {
            console.error("Failed to send quote email", error);
          }
        );
      // Reset form submission state
      setFormSubmitted(false);

      // Clear any existing error messages
      setFormErrors({});
    } else {
      // Find first field with error and scroll to it
      for (const field of requiredFields) {
        if (formErrors[field.id]) {
          scrollToError(field.id);
          break;
        }
      }
    }
  };
  // Suggested containers for empty state
  const suggestedContainers = ContainerType.slice(0, 3);
  // Listen for "add to quote" events from the product page via localStorage
  // useEffect(() => {
  //   // On mount, check if there's a pending addToQuote event in localStorage (for same-tab navigation)
  //   const addToQuote = localStorage.getItem("addToQuote");
  //   if (addToQuote) {
  //     try {
  //       const { id, quantity } = JSON.parse(addToQuote);
  //       setQuoteItem((prev) => {
  //         const exists = prev.find((item) => item.id === id);
  //         if (exists) {
  //           return prev.map((item) =>
  //             item.id === id
  //               ? { ...item, quantity: item.quantity + (quantity || 1) }
  //               : item
  //           );
  //         }
  //         return [...prev, { id, quantity: quantity || 1 }];
  //       });
  //     } catch {
  //       // ignore parse errors

  //       console.error("Failed to parse addToQuote from localStorage");
  //     }
  //     localStorage.removeItem("addToQuote");
  //   }

  //   const handleStorage = (event: StorageEvent) => {
  //     if (event.key === "addToQuote" && event.newValue) {
  //       try {
  //         const { id, quantity } = JSON.parse(event.newValue);
  //         setQuoteItem((prev) => {
  //           const exists = prev.find((item) => item.id === id);
  //           if (exists) {
  //             return prev.map((item) =>
  //               item.id === id
  //                 ? { ...item, quantity: item.quantity + (quantity || 1) }
  //                 : item
  //             );
  //           }
  //           return [...prev, { id, quantity: quantity || 1 }];
  //         });
  //       } catch {
  //         // ignore parse errors
  //       }
  //       localStorage.removeItem("addToQuote");
  //     }
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);
  // Handle email sending

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar2 quoteItem={quoteItem} setQuoteItem={setQuoteItem} />
      {/* Page Title */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <nav>
              <h1 className="text-3xl md:text-4xl font-bold">Quote Summary</h1>
              <div className="flex items-center mt-2 text-sm">
                <Link
                  to={"/"}
                  data-readdy="true"
                  className="text-blue-100 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </Link>
                <i className="fas fa-chevron-right mx-2 text-xs text-blue-200"></i>
                <Link
                  to={"/products"}
                  data-readdy="true"
                  className="text-blue-100 hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </Link>
                <i className="fas fa-chevron-right mx-2 text-xs text-blue-200"></i>
                <span>Quote Summary</span>
              </div>
            </nav>
            <div className="hidden md:block bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-white font-medium">
                {quoteItem.length} {quoteItem.length === 1 ? "Item" : "Items"}{" "}
                in Quote
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {quoteItem.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Quote Items and Customer Form */}
            <div className="lg:w-2/3">
              {/* Quote Items */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Quote Items</h2>
                <div className="space-y-6">
                  {/* Add Items from Product Page */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Add Container to Quote
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {ContainerType.filter(
                        (container) =>
                          !quoteItem.some((item) => item.id === container.id)
                      ).map((container) => (
                        <button
                          key={container.id}
                          type="button"
                          onClick={() =>
                            setQuoteItem((prev) => [
                              ...prev,
                              { id: container.id, quantity: 1 },
                            ])
                          }
                          className="flex items-center bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors text-sm"
                          title={`Add ${container.type}`}
                        >
                          <img
                            src={container.image}
                            alt={container.type}
                            className="w-8 h-8 object-cover rounded mr-2"
                          />
                          <span>{container.type}</span>
                          <span className="ml-2 font-bold">
                            {formatPrice(Number(container.price))}
                          </span>
                          <i className="fas fa-plus ml-2"></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  {quoteItem.map((item) => {
                    const container = getContainerById(item.id);
                    if (!container) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col md:flex-row border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <div className="h-32 w-full rounded-lg overflow-hidden">
                            <img
                              src={container.image}
                              alt={container.type}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/4 md:px-4">
                          <h3 className="text-lg font-bold text-gray-800">
                            {container.type}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {container.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center">
                              <i className="fas fa-ruler-combined mr-1"></i>
                              <span>{container.size}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-tag mr-1"></i>
                              <span>{container.condition}</span>
                            </div>
                            <div
                              className={`flex items-center ${
                                container.inStock
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <i
                                className={`fas ${
                                  container.inStock
                                    ? "fa-check-circle"
                                    : "fa-times-circle"
                                } mr-1`}
                              ></i>
                              <span>
                                {container.inStock ? "In Stock" : "Pre Order"}
                              </span>
                            </div>
                          </div>
                          <div className="text-blue-600 font-bold mt-2">
                            {formatPrice(Number(container.price))} / unit
                          </div>
                        </div>
                        <div className="md:w-1/4 flex flex-col justify-between mt-4 md:mt-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <i className="fas fa-minus text-gray-600"></i>
                              </button>
                              <span className="px-4 py-1 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <i className="fas fa-plus text-gray-600"></i>
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              Subtotal
                            </div>
                            <div className="font-bold text-lg">
                              {formatPrice(
                                calculateItemSubtotal(item.id, item.quantity)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Customer Information Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Customer Information</h2>
                <form onSubmit={handleSubmitQuote}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="fullName"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.fullName && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.email && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="phone"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.phone && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-4">Delivery Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="street"
                      >
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={customerInfo.street}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.street
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.street && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.street}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="city"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.city ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.city && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="state"
                      >
                        State/Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.state
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.state && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="zipCode"
                      >
                        ZIP/Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.zipCode
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {formErrors.zipCode && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.zipCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="country"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={customerInfo.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          formErrors.country
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white`}
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Baringo">Baringo</option>
                        <option value="Bomet">Bomet</option>
                        <option value="Bungoma">Bungoma</option>
                        <option value="Busia">Busia</option>
                        <option value="Elgeyo Marakwet">Elgeyo Marakwet</option>
                        <option value="Embu">Embu</option>
                        <option value="Garissa">Garissa</option>
                        <option value="Homa Bay">Homa Bay</option>
                        <option value="Isiolo">Isiolo</option>
                        <option value="Kajiado">Kajiado</option>
                        <option value="Kakamega">Kakamega</option>
                        <option value="Kericho">Kericho</option>
                        <option value="Kiambu">Kiambu</option>
                        <option value="Kilifi">Kilifi</option>
                        <option value="Kirinyaga">Kirinyaga</option>
                        <option value="Kisii">Kisii</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Kitui">Kitui</option>
                        <option value="Kwale">Kwale</option>
                        <option value="Laikipia">Laikipia</option>
                        <option value="Lamu">Lamu</option>
                        <option value="Machakos">Machakos</option>
                        <option value="Makueni">Makueni</option>
                        <option value="Mandera">Mandera</option>
                        <option value="Marsabit">Marsabit</option>
                        <option value="Meru">Meru</option>
                        <option value="Migori">Migori</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Murang'a">Murang'a</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Nandi">Nandi</option>
                        <option value="Narok">Narok</option>
                        <option value="Nyamira">Nyamira</option>
                        <option value="Nyandarua">Nyandarua</option>
                        <option value="Nyeri">Nyeri</option>
                        <option value="Samburu">Samburu</option>
                        <option value="Siaya">Siaya</option>
                        <option value="Taita Taveta">Taita Taveta</option>
                        <option value="Tana River">Tana River</option>
                        <option value="Tharaka Nithi">Tharaka Nithi</option>
                        <option value="Trans Nzoia">Trans Nzoia</option>
                        <option value="Turkana">Turkana</option>
                        <option value="Uasin Gishu">Uasin Gishu</option>
                        <option value="Vihiga">Vihiga</option>
                        <option value="Wajir">Wajir</option>
                        <option value="West Pokot">West Pokot</option>
                        <option value="">Select Country</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                      </select>
                      {formErrors.country && formSubmitted && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.country}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="notes">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any special requirements or delivery instructions..."
                    ></textarea>
                  </div>
                  <div className="lg:hidden">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors mb-4 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      Request Quote
                    </button>
                    <div className="flex justify-between">
                      <Link
                        to={"/products"}
                        data-readdy="true"
                        className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                      >
                        Continue Shopping
                      </Link>
                      <button
                        type="button"
                        onClick={handleClearQuote}
                        className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                      >
                        Clear Quote
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Quote Summary Panel */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6">Quote Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">
                      {formatPrice(calculateSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-bold">
                      {quoteItem.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-bold">3-5 business days</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Quote Total</span>
                    <span className="font-bold text-blue-600">
                      {formatPrice(calculateSubtotal())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Final pricing will be confirmed upon quote approval
                  </p>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={handleSubmitQuote}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Request Quote
                  </button>
                  <Link
                    to={"/home"}
                    data-readdy="true"
                    className="block w-full text-center text-blue-600 hover:text-blue-800 font-medium py-2 cursor-pointer"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={handleClearQuote}
                    className="w-full text-center text-red-500 hover:text-red-700 font-medium py-2 cursor-pointer"
                  >
                    Clear Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Quote State

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <span className="block margin-auto bg-red"><Ban size={50}/></span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your quote is empty
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't added any containers to your quote yet. Browse our
                products to find the perfect container for your needs.
              </p>
              <Link
                to={"/products"}
                data-readdy="true"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mb-8 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Browse Containers
              </Link>
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Popular Containers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {suggestedContainers.map((container) => (
                    <div
                      key={container.id}
                      className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="h-36 overflow-hidden">
                        <img
                          src={container.image}
                          alt={container.type}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800">
                          {container.type}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-blue-600 font-bold">
                            {ContainerType.find((c) => c.id === container.id)
                              ?.price
                              ? formatPrice(
                                  Number(
                                    ContainerType.find(
                                      (c) => c.id === container.id
                                    )?.price
                                  )
                                )
                              : "N/A"}
                          </span>
                          <Link
                            to={`/detail/${container.id}`}
                            data-readdy="true"
                            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
      {/* Remove Item Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-red-100 text-red-500 rounded-full p-3 inline-block mb-4">
                <i className="fas fa-trash-alt text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Remove Item
              </h3>
              <p className="text-gray-600">
                Are you sure you want to remove this item from your quote?
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveItem}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Clear Quote Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-red-100 text-red-500 rounded-full p-3 inline-block mb-4">
                <i className="fas fa-exclamation-triangle text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Clear Quote
              </h3>
              <p className="text-gray-600">
                Are you sure you want to clear all items from your quote? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearQuote}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Clear Quote
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-h-[90vh] max-h-[95vh] overflow-y-auto flex flex-col">
            <div className="text-center mb-6 px-2 pt-6 pb-2">
              <div className="bg-green-100 text-green-500 rounded-full p-3 inline-block mb-4">
                <i className="fas fa-check-circle text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quote Requested!
              </h3>
              <p className="text-gray-600 mb-2">
                Your quote has been submitted successfully.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mt-4 text-left text-sm sm:text-base">
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Reference:
                  </span>{" "}
                  <span className="text-blue-600 font-mono break-all">
                    {quoteReference}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  {customerInfo.fullName}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="break-all">{customerInfo.email}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Phone:</span>{" "}
                  {customerInfo.phone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Delivery:</span>{" "}
                  <span className="break-words">
                    {customerInfo.street}, {customerInfo.city},{" "}
                    {customerInfo.state}, {customerInfo.zipCode},{" "}
                    {customerInfo.country}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Items:</span>{" "}
                  {quoteItem.reduce((total, item) => total + item.quantity, 0)}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Total:</span>{" "}
                  <span className="text-blue-600 font-bold">
                    {formatPrice(calculateSubtotal())}
                  </span>
                </div>
                {/* Container Details */}
                <div className="mt-4">
                  <span className="font-semibold text-gray-700 block mb-2">
                    Container Details:
                  </span>
                  <ul className="space-y-2">
                    {quoteItem.map((item) => {
                      const container = getContainerById(item.id);
                      if (!container) return null;
                      return (
                        <li
                          key={item.id}
                          className="bg-white border border-gray-200 rounded p-2 flex flex-col"
                        >
                          <span className="font-bold text-gray-800">
                            {container.type}
                          </span>
                          <span className="text-xs text-gray-600">
                            {container.size} | {container.condition}
                          </span>
                          <span className="text-xs">
                            Qty: {item.quantity} &mdash;{" "}
                            {formatPrice(Number(container.price))} each
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* Responsive submit buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 px-2 pb-4">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer mb-2 sm:mb-0"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  // You can add additional logic for "Submit Another Quote" here
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                Submit Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuoteSummary;
