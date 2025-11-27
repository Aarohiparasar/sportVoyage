import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import contactUs from '../assets/images/contactUs.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your backend
      // await axios.post('/api/contact', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Your message has been sent! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="h-8 w-8 text-primary" />,
      title: 'Our Office',
      description: '123 Sports Avenue, New York, NY 10001',
      link: 'https://maps.google.com',
      linkText: 'View on map'
    },
    {
      icon: <PhoneIcon className="h-8 w-8 text-primary" />,
      title: 'Phone',
      description: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Call us'
    },
    {
      icon: <EnvelopeIcon className="h-8 w-8 text-primary" />,
      title: 'Email',
      description: 'info@sportvoyage.com',
      link: 'mailto:info@sportvoyage.com',
      linkText: 'Send us an email'
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-primary" />,
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM (EST)',
      link: '#',
      linkText: 'Book a call'
    },
  ];

  const faqs = [
    {
      question: 'How do I book a sports travel package?',
      answer: 'You can browse our available packages on our website and book directly online. For custom packages, please contact our travel specialists.'
    },
    {
      question: 'What is included in the travel packages?',
      answer: 'Our packages typically include event tickets, accommodation, and some meals. Each package has detailed information about what\'s included.'
    },
    {
      question: 'Can I customize my travel package?',
      answer: 'Yes, we offer customizable packages. Contact our team to discuss your specific requirements and we\'ll create a tailored experience for you.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy varies by package. Please refer to the specific terms and conditions when booking or contact us for more information.'
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src={contactUs}
            alt="Stadium with fans"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Have questions about our sports travel packages? We're here to help you plan your dream sports experience.
          </p>
        </div>
      </div>

      {/* Contact Info & Form */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white ">Contact Information</h2>
                <p className="mt-2 text-white">
                  Fill out the form and our team will get back to you within 24 hours. 
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary">
                        {item.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="text-base text-gray-500">{item.description}</p>
                      <a 
                        href={item.link} 
                        className="text-sm font-medium text-primary hover:text-primary-dark"
                      >
                        {item.linkText}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium  text-white mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Facebook', href: '#', icon: 'facebook' },
                    { name: 'Twitter', href: '#', icon: 'twitter' },
                    { name: 'Instagram', href: '#', icon: 'instagram' },
                    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href={social.href} 
                      className="text-gray-400 hover:text-gray-500"
                      aria-label={social.name}
                    >
                      <span className="sr-only">{social.name}</span>
                      <i className={`fab fa-${social.icon} h-6 w-6`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                  <p className="mt-2 text-gray-600">
                    Have questions about our packages or need help with a booking? Send us a message and we'll respond as soon as possible.
                  </p>
                </div>
                
               <form onSubmit={handleSubmit} className="space-y-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Full Name */}
    <div className="flex flex-col gap-1">
      <label htmlFor="name" className="text-sm font-medium text-gray-700">
        Full Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="John Doe"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                   bg-white text-gray-900 placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                   outline-none transition-all"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-sm font-medium text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="you@example.com"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                 bg-white text-gray-900 placeholder-gray-400
                 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                 outline-none transition-all"
      />
    </div>

    {/* Phone Number */}
    <div className="flex flex-col gap-1">
      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+91 98765 43210"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                   bg-white text-gray-900 placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                   outline-none transition-all"
      />
    </div>

    {/* Subject */}
    <div className="flex flex-col gap-1">
      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
        Subject
      </label>
      <select
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                   bg-white text-gray-900
                   focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                   outline-none transition-all cursor-pointer"
      >
        <option value="">Select a subject</option>
        <option value="booking">Booking Inquiry</option>
        <option value="custom">Custom Package</option>
        <option value="partnership">Partnership</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Message */}
    <div className="sm:col-span-2 flex flex-col gap-1">
      <label htmlFor="message" className="text-sm font-medium text-gray-700">
        Message <span className="text-red-500">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Tell us how we can help you..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                   bg-white text-gray-900 placeholder-gray-400 resize-none
                   focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                   outline-none transition-all"
      />
    </div>

  </div>

  {/* Submit Button with Spinner */}
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        relative px-8 py-3.5 text-white font-semibold text-base rounded-lg shadow-lg
        bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
        focus:outline-none focus:ring-4 focus:ring-blue-300
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-all duration-200 transform hover:scale-105
      `}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
      ) : (
        "Send Message"
      )}
    </button>
  </div>
</form>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
     <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-gray-900"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
      >
        Everything you need to know about booking your dream sports trip with SportVoyage
      </motion.p>
    </div>

    {/* FAQ Grid */}
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Gradient Accent Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600 group-hover:w-2 transition-all" />

          <div className="p-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl ring-4 ring-transparent group-hover:ring-blue-200/50 transition-all pointer-events-none" />
        </motion.div>
      ))}
    </div>

    {/* CTA Section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-20 text-center"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 shadow-2xl">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Still Have Questions?
        </h3>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Our sports travel experts are standing by to help you plan the perfect trip
        </p>
        <button
          onClick={() => {
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
        >
          <span>Talk to an Expert</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>

  </div>
</div>
      {/* Map */}
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2152564106354!2d-73.99684468459374!3d40.75514397932752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
