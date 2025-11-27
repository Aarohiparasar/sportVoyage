import { Link } from "react-router-dom";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "FAQs", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          label: "123 Sports Ave, New York, NY 10001",
          href: "#",
          icon: <MapPinIcon className="w-4 h-4" />,
        },
        {
          label: "+1 (555) 123-4567",
          href: "tel:+15551234567",
          icon: <PhoneIcon className="w-4 h-4" />,
        },
        {
          label: "info@sportvoyage.com",
          href: "mailto:info@sportvoyage.com",
          icon: <MailIcon className="w-4 h-4" />,
        },
      ],
    },
  ];

  const socials = [
    { icon: <FacebookIcon className="w-5 h-5" />, href: "#" },
    { icon: <TwitterIcon className="w-5 h-5" />, href: "#" },
    { icon: <InstagramIcon className="w-5 h-5" />, href: "#" },
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "#" },
  ];

  return (
   <footer className="bg-gray-900 text-gray-300 pt-16 pb-10">
  <div className="max-w-7xl mx-auto px-6">

    {/* CUSTOM GRID (BRAND + COMPANY + SUPPORT in first row, CONTACT in second row) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

      {/* BRAND COLUMN */}
      <div className="space-y-5">
        <Link to="/" className="text-2xl font-bold text-white">
          SportVoyage
        </Link>
        <p className="text-gray-400 leading-relaxed">
          Unforgettable sports travel experiences crafted for fans worldwide.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 pt-2">
          {socials.map((s, i) => (
            <a key={i} href={s.href} className="hover:text-white transition">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* COMPANY */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-white">Company</h3>
        <ul className="space-y-3">
          {sections[0].items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.href}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SUPPORT */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-white">Support</h3>
        <ul className="space-y-3">
          {sections[1].items.map((item, i) => (
            <li key={i}>
              <Link
                to={item.href}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT (Entire second row) */}
      <div className="md:col-span-3 space-y-5">
        <h3 className="text-lg font-semibold text-white">Contact</h3>
        <ul className="space-y-3">
          {sections[2].items.map((item, i) => (
            <li key={i}>
              <a
                href={item.href}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>

    {/* BOTTOM BAR */}
    <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-400">
      <p>© {year} SportVoyage. All rights reserved.</p>

      <div className="flex gap-6 mt-4 sm:mt-0">
        <Link to="/privacy" className="hover:text-white">Privacy</Link>
        <Link to="/terms" className="hover:text-white">Terms</Link>
        <Link to="/cookies" className="hover:text-white">Cookies</Link>
      </div>
    </div>

  </div>
</footer>


  );
};

export default Footer;
