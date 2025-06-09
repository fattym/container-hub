import React, { useState } from "react";
import Navbar2 from "./com/nvabar2";
import { Link } from "react-router-dom";
// Types
type ContainerInfo = {
  type: string;
  size: string;
  quantity: number;
};

type LocationInfo = {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
};

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
};

type FormData = {
  container: ContainerInfo;
  location: LocationInfo;
  contact: ContactInfo;
};

const ShippingQuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    container: { type: "", size: "", quantity: 1 },
    location: { pickupLocation: "", deliveryLocation: "", pickupDate: "" },
    contact: { name: "", email: "", phone: "" },
  });

  const handleChange = (section: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const totalSteps = 4; // Total number of steps in the form

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Quote submitted!");
  };
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div>
      <Navbar2 quoteItem={[]} setQuoteItem={() => {}} />
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Pitch Container Hub
          </h1>
          <div className="flex items-center mt-2 text-sm">
            <Link
              to={"/"}
              data-readdy="true"
              className="text-blue-100 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs text-blue-200"></i>
            <span>Products</span>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl space-y-6 mt-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Shipping Container Quote
        </h2>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="transition-all space-y-4">
          {/* Step 1: Container Info */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Container Information
              </h3>
              <div className="mb-3">
                <label className="block mb-1 font-medium">
                  Select Container Type
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                  value={formData.container.type}
                  onChange={(e) =>
                    handleChange("container", "type", e.target.value)
                  }
                >
                  <option value="">-- Select Type --</option>
                  <option value="Standard">Standard</option>
                  <option value="High Cube">High Cube</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Open Top">Open Top</option>
                  <option value="Flat Rack">Flat Rack</option>
                  <option value="Tank">Tank</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="packageType" className="block font-medium mb-1">
                  Choose a package type:
                </label>
                <select
                  id="packageType"
                  value={formData.container.type}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Size</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.container.size}
                  onChange={(e) =>
                    handleChange("container", "size", e.target.value)
                  }
                >
                  <option value="">-- Select Size --</option>
                  <option value="20ft">20ft</option>
                  <option value="40ft">40ft</option>
                  <option value="40ft High Cube">40ft High Cube</option>
                  <option value="45ft High Cube">45ft High Cube</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  min={1}
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.container.quantity}
                  onChange={(e) =>
                    handleChange(
                      "container",
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          )}

          {/* Step 2: Location Info */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Location Information
              </h3>
              <div className="mb-3">
                <label className="block mb-1 font-medium">
                  Pickup Location
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.location.pickupLocation}
                  onChange={(e) =>
                    handleChange("location", "pickupLocation", e.target.value)
                  }
                  placeholder="City, State or Address"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">
                  Delivery Location
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.location.deliveryLocation}
                  onChange={(e) =>
                    handleChange("location", "deliveryLocation", e.target.value)
                  }
                  placeholder="City, State or Address"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Pickup Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.location.pickupDate}
                  onChange={(e) =>
                    handleChange("location", "pickupDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.contact.name}
                  onChange={(e) =>
                    handleChange("contact", "name", e.target.value)
                  }
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleChange("contact", "email", e.target.value)
                  }
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    handleChange("contact", "phone", e.target.value)
                  }
                  placeholder="Phone Number"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Review Your Quote</h3>
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h4 className="font-bold mb-2">Container</h4>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {formData.container.type}
                </p>
                <p>
                  <span className="font-medium">Size:</span>{" "}
                  {formData.container.size}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {formData.container.quantity}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h4 className="font-bold mb-2">Location</h4>
                <p>
                  <span className="font-medium">Pickup:</span>{" "}
                  {formData.location.pickupLocation}
                </p>
                <p>
                  <span className="font-medium">Delivery:</span>{" "}
                  {formData.location.deliveryLocation}
                </p>
                <p>
                  <span className="font-medium">Pickup Date:</span>{" "}
                  {formData.location.pickupDate}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h4 className="font-bold mb-2">Contact</h4>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {formData.contact.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {formData.contact.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {formData.contact.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-xl"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl shadow"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-xl shadow"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingQuoteForm;
