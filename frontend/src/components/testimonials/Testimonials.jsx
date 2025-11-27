import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import test1 from "../../assets/images/test1.png";
import test2 from "../../assets/images/test2.png";


const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Soccer Fan",
    content:
      "The Premier League package was absolutely incredible! From the VIP seats to the luxury hotel, everything was perfect.",
    rating: 5,
    image: test1,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Basketball Enthusiast",
    content:
      "Attending the NBA All-Star weekend was a dream come true. The organization was flawless and worth every penny.",
    rating: 5,
    image: test2,
  },
  {
    id: 3,
    name: "David Chen",
    role: "F1 Fanatic",
    content:
      "The Monaco Grand Prix package exceeded all expectations. Trackside seats and exclusive paddock access made it unforgettable.",
    rating: 5,
    image: test1,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[index];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Real stories from fans who booked their dream sports experiences.
        </p>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-10"
            >
              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  className="h-28 w-28 rounded-full object-cover border-4 border-primary/30 mb-4"
                />

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-lg italic mb-4 max-w-xl">
                  "{t.content}"
                </p>

                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full ${
                  i === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
