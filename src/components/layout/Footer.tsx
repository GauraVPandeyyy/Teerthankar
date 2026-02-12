import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Heart,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Logo from "../../assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "../auth/LoginModal";
import { useState } from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Social media links with proper keys
  const socialLinks = [
    {
      Icon: Instagram,
      href: "#",
      color: "hover:text-pink-400",
      key: "instagram",
    },
    {
      Icon: Facebook,
      href: "#",
      color: "hover:text-blue-400",
      key: "facebook",
    },
    { Icon: Twitter, href: "#", color: "hover:text-sky-400", key: "twitter" },
  ];

  // Quick links with proper keys
  const exploreLinks = [
    { name: "About Us", path: "/about", key: "about" },
    { name: "Shop All", path: "/shop", key: "shop-all" },
    { name: "New Arrivals", path: "/shop?filter=new", key: "new-arrivals" },
    {
      name: "Best Sellers",
      path: "/shop?filter=bestsellers",
      key: "best-sellers",
    },
    {
      name: "Wedding Collection",
      path: "/category/wedding-collection",
      key: "wedding",
    },
  ];

  const supportLinks = [
    { name: "Shipping Info", path: "/shipping-policy", key: "shipping" },
    { name: "Returns & Exchange", path: "/refund-policy", key: "returns" },
    { name: "Track Order", path: "/profile", key: "track-order" },
    { name: "Privacy Policy", path: "/privacy-policy", key: "privacy-policy" },
    {
      name: "Terms Conditions",
      path: "/terms-conditions",
      key: "terms-conditions",
    },
  ];

  const policyLinks = [
    { name: "Privacy Policy", path: "/privacy-policy", key: "privacy" },
    { name: "Terms of Service", path: "/terms", key: "terms" },
    { name: "Sitemap", path: "/sitemap", key: "sitemap" },
  ];

  return (
    <>
      <motion.footer
        className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        {/* Newsletter Section */}
        {/*
      <div className="border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium">Stay Updated</span>
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">Premium Club</span>
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Get exclusive access to new collections, special offers, and styling tips from our jewelry experts.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </div>
*/}
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg"> */}
                {/* <span className="font-serif text-white font-bold text-xl">
                  TJ
                </span> */}
                <img
                  src={Logo}
                  alt="Teerthankar Logo"
                  className="w-10 h-10 object-contain"
                />
                {/* </div> */}
                <div>
                  <h3 className="font-serif text-2xl font-bold">
                    <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                      Teerthankar
                    </span>
                  </h3>
                  <p className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent text-sm -mt-1">Jewels</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Crafting timeless elegance with artificial jewelry that
                celebrates your unique style. Luxury that speaks your language.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.key}
                    href={social.href}
                    className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-slate-300 transition-all duration-300 ${social.color} hover:scale-110 hover:bg-white/20`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-serif text-xl font-semibold mb-6 text-white">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.path}
                      className="text-slate-300 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div variants={itemVariants}>
              <h4 className="font-serif text-xl font-semibold mb-6 text-white">
                Support
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.key}>
                    {link.name === "Track Order" && !isAuthenticated ? (
                      <Link
                        to={link.path}
                        onClick={() => {
                          setIsLoginOpen(true);
                        }}
                        className="text-slate-300 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-slate-300 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Info */}
            <motion.div variants={itemVariants}>
              <h4 className="font-serif text-xl font-semibold mb-6 text-white">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/8YSgJhtiyZzfbnz1A"
                    className="underline-offset-1 hover:underline"
                  >
                    <span className="text-slate-300 text-sm leading-relaxed">
                      Khun - Khun ji Road near Chowk Post Office Opposite Burger
                      King Chowk
                      <br />
                      Lucknow, India
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    hello@teerthankarjewels.com
                  </span>
                </li>
              </ul>

              {/* Trust Badges */}
              {/* <div className="mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span>100% Secure</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span>Premium Quality</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div> */}
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Teerthankar Jewels. Crafted with{" "}
              <span className="text-rose-400">♥</span> for elegant souls by{" "}
              {
                <a href="https://www.openlancer.in" className="underline">
                  OpenLancer Team
                </a>
              }
              .
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              {policyLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className="hover:text-amber-300 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.footer>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Footer;
