import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;
const PackageCard = ({ pkg }) => {

  const navigate = useNavigate();
 const handleAddToPlan = async (pkg) => {
    try {
      await axios.post(`${API_URL}/myPlan/addMyPlan`, {
        packageId: pkg._id,
      },{withCredentials:true});

      toast.success("Added to your plan!");
      navigate("/my-plan");
    } catch (err) {
      toast.error("Failed to add plan");
      console.error(err);
    }
  };


  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center mb-1">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{pkg.location}</span>
          </div>
          <h3 className="text-xl font-bold">{pkg.title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            ${pkg.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500"> /person</span>
          </div>
        </div>

        {/* Updated Visible Button */}
        <button
                onClick={() => handleAddToPlan(pkg)}

          className="mt-4 w-full flex items-center justify-center gap-2 
                    px-5 py-3 rounded-xl 
                    text-white text-sm font-semibold 
                    bg-gradient-to-r from-blue-600 to-blue-700 
                    hover:from-blue-700 hover:to-blue-800
                    shadow-md hover:shadow-lg 
                    transition-all duration-300"
        >
 Add to Plan
           <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
