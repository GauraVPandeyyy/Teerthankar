import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Crown,
  Gem,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { Button } from "../ui/button";
import { categories } from "../../data/categories";
import LoginModal from "../auth/LoginModal";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  // Enhanced scroll behavior
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location]);

  const cartCount = getCartCount();
  const wishlistCount = wishlistItems.length;

  const headerVariants: Variants = {
    visible: {
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hidden: {
      y: -120,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        variants={headerVariants}
        animate={isVisible ? "visible" : "hidden"}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-slate-200/40"
            : "backdrop-blur-2xl bg-yellow-700/30"
        }`}
      >
        {/* Premium Top Bar */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              className="w-full border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-amber-900/30 to-rose-900/30 backdrop-blur-md py-2.5">
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-center gap-8 text-white/90 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Free Shipping Over ₹999</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>Premium Quality</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                      <Gem className="w-4 h-4 text-amber-300" />
                      <span>Lifetime Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation Bar */}
        <div className="container mx-auto px-3 lg:px-4 relative">
          <div className="flex items-center justify-between h-20">
            {/* Premium Logo Section */}
            <Link to="/" className="flex items-center gap-3 z-50 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                {/* Luxury Logo Mark */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-rose-500 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <Gem className="w-6 h-6 text-white" />
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Brand Text */}
                <div className="hidden lg:block">
                  <motion.h1
                    className="font-serif text-2xl font-bold leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span
                      className={`bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent ${
                        isScrolled ? "" : "text-white"
                      }`}
                    >
                      Teerthankar
                    </span>
                    <span
                      className={`block text-sm font-sans font-normal ${
                        isScrolled ? "text-slate-600" : "text-amber-100"
                      } -mt-1`}
                    >
                      Artisan Jewels
                    </span>
                  </motion.h1>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden xl:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/"
                className={`relative font-medium text-lg transition-all duration-300 group ${
                  isScrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Enhanced Categories Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button
                  className={`flex items-center gap-2 font-medium text-lg transition-all duration-300 group ${
                    isScrolled
                      ? "text-slate-700 hover:text-slate-900"
                      : "text-white hover:text-amber-200"
                  }`}
                >
                  Collections
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 right-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                                
                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      // className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-screen max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-3xl rounded-3xl p-8"
                      className="absolute top-[100%] right-[0%] -left-[300%] mt-6 w-screen max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-3xl rounded-3xl p-8"
                    >
                      <div className="grid grid-cols-5 gap-4">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-rose-50/50 transition-all duration-500 border border-transparent hover:border-amber-200/50"
                          >
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 border-2 border-slate-200 group-hover:border-amber-300 group-hover:scale-110 transition-all duration-500 shadow-lg">
                              <img 
                                src={category.image} 
                                alt={category.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors text-sm mb-2">
                              {category.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {category.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/shop"
                className={`relative font-medium text-lg transition-all duration-300 group ${
                  isScrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Shop All
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/about"
                className={`relative font-medium text-lg transition-all duration-300 group ${
                  isScrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Our Story
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/contact"
                className={`relative font-medium text-lg transition-all duration-300 group ${
                  isScrolled
                    ? "text-slate-700 hover:text-slate-900"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Action Buttons - Right Side */}
            <div className="flex items-center lg:space-x-4">
              {/* Search */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/search">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isScrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        : "text-white hover:text-amber-200 hover:bg-white/10"
                    }`}
                  >
                    <Search className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </Link>
              </motion.div>

              {/* Wishlist */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/wishlist" className="relative">
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`rounded-2xl bg-red-500 py-0 m-0 text-4xl font-extrabold text-yellow-700 transition-all duration-300 group relative overflow-hidden ${
                      isScrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        : "text-white hover:text-amber-200 hover:bg-white/10"
                    }`}
                  >
                    <Heart className="w-24 h-24" />
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" /> */}
                  </Button>
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/cart" className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isScrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        : "text-white hover:text-amber-200 hover:bg-white/10"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg border border-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </Link>
              </motion.div>

              {/* User Account */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? (
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                        isScrolled
                          ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                          : "text-white hover:text-amber-200 hover:bg-white/10"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLoginOpen(true)}
                    className={`rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isScrolled
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        : "text-white hover:text-amber-200 hover:bg-white/10"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                )}
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`xl:hidden rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isScrolled
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      : "text-white hover:text-amber-200 hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* <div>
            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  // className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-screen max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-3xl rounded-3xl p-8"
                  className="absolute top-[50%] right-[0%] left-[0%] mt-6 w-screen max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 shadow-3xl rounded-3xl p-8"
                >
                  <div className="grid grid-cols-5 gap-4">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-rose-50/50 transition-all duration-500 border border-transparent hover:border-amber-200/50"
                      >
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 border-2 border-slate-200 group-hover:border-amber-300 group-hover:scale-110 transition-all duration-500 shadow-lg">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors text-sm mb-2">
                          {category.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="xl:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-amber-100 to-rose-100 backdrop-blur-2xl border-b border-slate-200/60 shadow-3xl overflow-hidden"
            >
              <div className="container mx-auto px-6 py-8">
                <nav className="flex flex-col space-y-6">
                  <Link
                    to="/"
                    className="flex items-center gap-4 text-slate-800 hover:text-amber-600 transition-colors py-3 font-semibold text-xl border-b border-slate-100 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    Home
                  </Link>

                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="font-semibold text-slate-700 mb-4 text-lg flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Collections
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.slice(0, 6).map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="flex items-center gap-3 text-slate-600 hover:text-amber-600 transition-colors py-3 px-4 rounded-2xl hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-rose-50/50 group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 group-hover:border-amber-300 transition-colors duration-300 shadow-sm">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {["Shop All", "Our Story", "Contact"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="flex items-center gap-4 text-slate-800 hover:text-amber-600 transition-colors py-3 font-semibold text-xl border-b border-slate-100 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {item}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
