import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PackageCard from '../components/packages/PackageCard';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

const Packages = () => {
    const {  globalPackages, loadingPackages} = useAuth();
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 10000],
    sportType: '',
    sortBy: 'featured',
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="pt-6 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sports Travel Packages</h1>
          <p className="text-xl text-gray-600">Find your dream sports travel experience</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Main content */}
        <div className="flex flex-col ">
          {loadingPackages ? (
            <div className="flex justify-center items-center col-span-2 h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : globalPackages.length > 0 ? (
            globalPackages.map((pkg) => (
              <motion.div
                key={pkg._id} // use MongoDB _id
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PackageCard pkg={pkg} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 col-span-2">
              <h3 className="mt-2 text-lg font-medium text-gray-900">No packages found</h3>
              <p className="mt-1 text-sm text-gray-500">
                We couldn't find any packages. Please try again later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
