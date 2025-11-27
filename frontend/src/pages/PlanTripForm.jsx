import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const PlanTripForm = () => {
    const { globalPackages } = useAuth();
    console.log(globalPackages)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/plan-trip`, {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        interestedIn: formData.package || "Custom Package",
        message: formData.message,
      });

      toast.success("Thank you! We'll contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Plan Your Dream Sports Trip
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us what you're looking for — our experts will create the perfect itinerary just for you
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400
                           focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                           outline-none transition-all text-base"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400
                           focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                           outline-none transition-all text-base"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 
                           bg-white text-gray-900 placeholder-gray-400
                           focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                           outline-none transition-all text-base"
                />
              </div>

              {/* Package */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interested In
                </label>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 
                           bg-white text-gray-900
                           focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                           outline-none transition-all text-base cursor-pointer"
                >
                  <option value="">Select a package</option>
                  {globalPackages?.map((pkg) => (
                    <option key={pkg._id || pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                  <option value="custom">Custom Package</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Tell us about your dream trip — which events, how many people, dates, budget, special requests..."
                className="w-full px-5 py-4 rounded-xl border border-gray-300 
                         bg-white text-gray-900 placeholder-gray-400 resize-none
                         focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 
                         outline-none transition-all text-base"
              />
            </div>

            {/* Submit Button with Loading */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center gap-3 px-8 py-5 rounded-xl font-bold text-white text-lg
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-700 hover:to-indigo-700 
                  shadow-xl hover:shadow-2xl transform hover:scale-105 
                  transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                  active:scale-95`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Request
                    <PaperAirplaneIcon className="w-6 h-6 -rotate-12" />
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500">
                We reply within <span className="font-semibold text-blue-600">24 hours</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PlanTripForm;