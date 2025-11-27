import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  TrophyIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import TeamSection from "../components/about/TeamSection";
import expertCuration from "../assets/images/expertCuration.png";
import premium from "../assets/images/premium.png";
import globalNetwork from "../assets/images/globalNetwork.png";
import passion from "../assets/images/passion.png";
import missionImg from "../assets/images/missionImg.png";
import story from "../assets/images/story.png";

export default function About() {
  const features = [
    {
      name: "Expert Curation",
      img: expertCuration,
      description:
        "Our specialists carefully design every package to deliver maximum excitement and value.",
      icon: CheckCircleIcon,
    },
    {
      name: "Premium Access",
      img: premium,
      description:
        "Access VIP zones, private lounges, and once-in-a-lifetime sporting moments.",
      icon: TrophyIcon,
    },
    {
      name: "Global Network",
      img: globalNetwork,
      description:
        "We partner with the biggest sporting organizations worldwide.",
      icon: GlobeAltIcon,
    },
    {
      name: "Passion for Sports",
      img: passion,
      description:
        "Our team lives and breathes sports — we understand what real fans want.",
      icon: HeartIcon,
    },
  ];

  return (
    <div className="bg-white">

      {/* -------------------------------- HERO -------------------------------- */}
      <section className="relative bg-gray-900">
        <img
          src={story}
          alt="Fans celebrating"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Our Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed"
          >
            Where passion meets expertise to deliver world-class sports travel
            experiences.
          </motion.p>
        </div>
      </section>

      {/* ----------------------------- MISSION -------------------------------- */}
      <section className="bg-white py-17">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              At SportVoyage, sports are more than games — they are emotional
              journeys. Our mission is to bring fans closer to the action with
              unmatched travel experiences and curated sporting adventures.
            </p>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Since 2018, we’ve connected thousands of fans to iconic global
              events — from championships to exclusive behind-the-scenes access.
            </p>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Your passion drives us. Your experience defines us.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={missionImg}
              alt="Mission"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-5 left-6 text-white text-lg font-medium">
              “Creating unforgettable moments for fans worldwide”
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- WHY CHOOSE US ---------------------------- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Why Choose SportVoyage
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We deliver experiences that go far beyond tickets and travel
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.img} 
                    alt={feature.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto -mb-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + Team */}
  
      <div className="relative py-12 bg-linear-to-b">
        <TeamSection />
      </div>

      {/* Visual separation */}
      {/* ------------------------------- CTA --------------------------------- */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjUwJSIgaGVpZ2h0PSI1MCUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-xl">
            Ready to experience the ultimate sports adventure?{' '}
            <span className="block text-white/90 mt-2">
              Start planning your journey today.
            </span>
          </h2>

          <div className="flex gap-4 mt-8 lg:mt-0">
            <a
              href="/packages"
              className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              View Packages
            </a>

            <a
              href="/contact"
              className="px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
