import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_URL;

const MyPlan = () => {
  const [plans, setPlans] = useState([]);

  const fetchMyPlan = async () => {
    try {
      const res = await axios.get(`${API_URL}/myPlan`);
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your saved plans");
    }
  };

  useEffect(() => {
    fetchMyPlan();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">My Plans</h1>

      {plans.length === 0 ? (
        <p className="text-center text-white text-lg">You have no saved plans yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Package Image */}
              {p.package?.image && (
                <img
                  src={p.package.image}
                  alt={p.package.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              )}

              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{p.package?.title}</h2>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPinIcon className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{p.package?.location}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center text-gray-600 mb-2">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm">{p.package?.duration}</span>
                </div>

                {/* Price */}
                <div className="flex items-center text-gray-700 mb-3">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-semibold">${p.package?.price}</span>
                </div>

                {/* User Message */}
                {p.message && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Message:</span> {p.message}
                  </p>
                )}

                <p className="text-gray-500 text-sm mt-4">
                  Added On: {new Date(p.createdAt).toLocaleDateString()}
                </p>

                {/* Optional: View Details Button */}
                <button
                  onClick={() => alert("Coming soon: view details!")}
                  className="mt-4 w-full text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlan;
