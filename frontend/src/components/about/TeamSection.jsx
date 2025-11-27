import { motion } from 'framer-motion';
import { TwitterIcon, LinkedinIcon, MailIcon } from 'lucide-react';

const team = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    image: 'https://placehold.co/400x300/3b82f6/ffffff?text=Alex+Johnson',
    bio: 'Former professional athlete turned entrepreneur, Alex founded SportVoyage to share his passion for sports and travel.',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'alex@sportvoyage.com'
    }
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Operations',
    image: 'https://placehold.co/400x300/3b82f6/ffffff?text=Sarah+Chen',
    bio: 'With 10+ years in the travel industry, Sarah ensures every trip runs smoothly from start to finish.',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'sarah@sportvoyage.com'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Sports Partnerships',
    image: 'https://placehold.co/400x300/3b82f6/ffffff?text=Marcus+Rodriguez',
    bio: 'Marcus leverages his extensive network to secure exclusive access to the most sought-after sports events.',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'marcus@sportvoyage.com'
    }
  },
  {
    name: 'Emily Park',
    role: 'Customer Experience',
    image: 'https://placehold.co/400x300/3b82f6/ffffff?text=Emily+Park',
    bio: 'Emily and her team are dedicated to making every customer feel like a VIP from the first inquiry to their return home.',
    social: {
      twitter: '#',
      linkedin: '#',
      email: 'emily@sportvoyage.com'
    }
  },
];

export default function TeamSection() {
  return (
    <div className="bg-gray-50 py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            The passionate people behind SportVoyage
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person, index) => (
            <motion.div
              key={person.name}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={person.image}
                  alt={person.name}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                <p className="text-primary-600">{person.role}</p>
                <p className="mt-3 text-sm text-gray-500">{person.bio}</p>
                <div className="mt-4 flex space-x-4">
                  <a href={person.social.twitter} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a href={person.social.linkedin} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${person.social.email}`} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Email</span>
                    <MailIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Want to join our team? We're always looking for passionate individuals who love sports and travel as much as we do.
          </p>
          <div className="mt-6">
           
          </div>
        </div>
      </div>
    </div>
  );
}
