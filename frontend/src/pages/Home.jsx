import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../components/packages/PackageCard';
import Testimonials from '../components/testimonials/Testimonials';
import bgImg2 from '../assets/images/bgImg2.png';
import { toast } from 'react-hot-toast';
import PlanTripForm from './PlanTripForm';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
   const { isAuthenticated } = useAuth();
     const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [featuredPackage, setFeaturedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visiblePackages, setVisiblePackages] = useState(4); // Start with 4 packages
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Update currentIndex when scrolling manually
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[data-card]');

    let closestCard = 0;
    let minDistance = Infinity;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + (containerRect.width / 2);

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + (cardRect.width / 2);
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCard = index;
      }
    });

    if (closestCard !== currentIndex) {
      setCurrentIndex(closestCard);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [visiblePackages]);

  // Fetch packages data
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // In a real app, you would fetch this from your API
        // const response = await axios.get('/api/packages');
        // setPackages(response.data);
        // setFeaturedPackage(response.data.find(pkg => pkg.id === 1));

        // Mock data for now
        const mockPackages = [
          {
            id: 1,
            title: "Premier League Experience",
            location: "London, UK",
            price: 1299,
            image: "https://t3.ftcdn.net/jpg/02/87/04/00/360_F_287040077_U2ckmhpzeyqDHiybj0dfCfX6NRCEKdoe.jpg",

            date: "Nov 15, 2023"
          },
          {
            id: 2,
            title: "NBA All-Star Weekend",
            location: "Salt Lake City, USA",
            price: 2499,
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1490&q=80",
            description: "Be part of the most exciting basketball weekend of the year.",
            date: "Feb 18, 2024"
          },
          {
            id: 3,
            title: "F1 Monaco Grand Prix",
            location: "Monte Carlo, Monaco",
            price: 3499,
            image: "https://www.shutterstock.com/image-photo/mix-all-sports-elements-vibrant-260nw-2527418843.jpg",

            description: "Luxury experience at the most prestigious F1 race of the season.",
            date: "May 26, 2024"
          },
          {
            id: 4,
            title: "Wimbledon Championships",
            location: "London, UK",
            price: 1899,
            image: "https://media.istockphoto.com/id/637332860/photo/multi-sports-proud-players-collage-on-grand-arena.jpg?s=612x612&w=0&k=20&c=mb1qZHDluXcDAp2_hFVHidFbfvCQetRu8Dbs3jPv4mA=",
            description: "Experience the tradition and excitement of the world's most famous tennis tournament.",
            date: "Jul 1-14, 2024"
          },
          {
            id: 5,
            title: "Super Bowl LVIII",
            location: "Las Vegas, USA",
            price: 4999,
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
            description: "The biggest event in American sports with premium seating and exclusive access.",
            date: "Feb 11, 2024"
          },
          {
            id: 6,
            title: "Tour de France Finale",
            location: "Paris, France",
            price: 2299,
            image: "https://images.unsplash.com/photo-1507035892040-7a984847be49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description: "Witness the thrilling final stage on the Champs-Élysées.",
            date: "Jul 21, 2024"
          },
          {
            id: 7,
            title: "Australian Open",
            location: "Melbourne, Australia",
            price: 2899,
            image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description: "Start the year with Grand Slam tennis under the Australian sun.",
            date: "Jan 14-28, 2024"
          },
          {
            id: 8,
            title: "ICC T20 World Cup",
            location: "West Indies & USA",
            price: 1999,
            image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
            description: "Experience the excitement of cricket's fastest format in the Caribbean.",
            date: "Jun 4-30, 2024"
          }
        ];

        setPackages(mockPackages);
        setFeaturedPackage(mockPackages[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/packages");
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0"></div>
          <img
            src={bgImg2}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Experience Sports Like Never Before
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Your ultimate destination for unforgettable sports travel experiences.
              Watch your favorite teams and athletes live with exclusive packages tailored just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleClick}
                className="btn w-md bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Plan My Trip
              </button>

              <button
                onClick={() =>
                  document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
                }
                className="btn btn-outline text-white bg-white w-2xs"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Package */}
      {featuredPackage && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Experience</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:shrink-0 md:w-1/2">
                  <img
                    className="h-64 w-full object-cover md:h-full"
                    src={featuredPackage.image}
                    alt={featuredPackage.title}
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                    Featured Package
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">{featuredPackage.title}</h3>
                  <p className="mt-3 text-gray-600">{featuredPackage.description}</p>

                  <div className="mt-6 flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <MapPinIcon className="h-5 w-5 mr-1" />
                      <span>{featuredPackage.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-1" />
                      <span>{featuredPackage.duration}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">${featuredPackage.price}</span>
                      <span className="text-gray-500">/person</span>
                    </div>
                    <button
                      onClick={() => navigate(`/packages/${featuredPackage.id}`)}
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Packages */}
      <section id="packages" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-2">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top Sports Travel Packages</h2>
              <p className="text-gray-600">
                Discover our handpicked selection of the best sports events
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Navigation Arrows */}
              {/* View All Button */}
              <button
                onClick={() => navigate('/packages')}
                className="px-4 py-2.5 bg-primary
                 text-white rounded-full bg-black 
               flex items-center space-x-2 shadow-md "
              >
                <span>View All Packages</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <motion.div
              ref={scrollContainerRef}
              className="flex pb-6 overflow-x-hidden gap-6 px-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE and Edge
                scrollBehavior: 'smooth'
              }}
            >
              {packages.slice(0, visiblePackages).map((pkg) => (
                <motion.div
                  key={pkg.id}
                  data-card
                  ref={el => cardRefs.current[pkg.id] = el}
                  variants={item}
                  className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      ${pkg.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{pkg.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                      <span className="truncate">{pkg.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{pkg.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient fade effect on the right side */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT SIDE — 2x2 GRID LIKE IMAGE */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-10">WHY CHOOSE US</h2>

            <div className="grid grid-cols-2 gap-y-10 gap-x-12">

              {/* 1 */}
              <div>
                <p className="text-amber-500 text-3xl font-semibold">12,000+</p>
                <p className="text-gray-600 text-lg">Fine Travelers</p>
              </div>

              {/* 2 */}
              <div>
                <p className="text-amber-500 text-3xl font-semibold">68%</p>
                <p className="text-gray-600 text-lg">Repeat Travelers</p>
              </div>

              {/* 3 */}
              <div>
                <p className="text-gray-900 text-lg font-medium">Official Partners</p>
              </div>

              {/* 4 */}
              <div>
                <p className="text-amber-500 text-3xl font-semibold">4.0/5</p>
                <p className="text-gray-600 text-lg">Rated Experiences</p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — STEPS */}
          <div className="space-y-10">

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-full border border-amber-400 text-amber-500 font-semibold">
                1
              </div>
              <p className="text-gray-800 text-lg">Choose your event</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-full border border-amber-400 text-amber-500 font-semibold">
                2
              </div>
              <p className="text-gray-800 text-lg">We arrange your travel + tickets</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-full border border-amber-400 text-amber-500 font-semibold">
                3
              </div>
              <p className="text-gray-800 text-lg">Enjoy a seamless sports experience</p>
            </div>

          </div>

        </div>
      </section>


      {/* Testimonials */}
      <Testimonials />

      {/* Contact Form */}
      <section id="contact" className="py-14 bg-white">
        <PlanTripForm />
      </section>


      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/8789783100" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat with us on WhatsApp"
        style={{ width: '56px', height: '56px' }}
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>
    </div>
  );
};

export default Home;
