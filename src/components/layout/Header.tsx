// src/components/layout/Header.tsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { Button } from "../ui/button";
import { useProducts } from "../../contexts/ProductContext";
import LoginModal from "../auth/LoginModal";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

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
  const { categories } = useProducts();
  const navigate = useNavigate();


// const location = useLocation();
const openLogin = () => {
  sessionStorage.setItem("postLoginRedirect", location.pathname);
  setIsLoginOpen(true);
};


  // 1. Scroll & Visibility Logic
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Show background after scrolling 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll down, show on scroll up (after 200px)
      if (currentScrollY > lastScrollY && currentScrollY > 200 && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY, isMenuOpen]);

  // 2. Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // 3. Close Menu on Route Change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location]);

  // Safe Accessors
  const cartCount = typeof getCartCount === "function" ? getCartCount() : 0;
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  // Handlers
  const handleCartClick = () => {
    if (!isAuthenticated) {
      openLogin();
      toast.info("Please login to view your cart");
      return;
    }
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openLogin();
      toast.info("Please login to view your wishlist");
      return;
    }
    navigate("/wishlist");
  };

  // Animations
  const headerVariants: Variants = {
    visible: { y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    hidden: {
      y: "-100%",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        variants={headerVariants}
        animate={isVisible ? "visible" : "hidden"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-red-900",
          // Base styles
          "border-b border-transparent",
          // Scroll State (Glassmorphism + Shadow)
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-white/20 py-2"
            : "bg-transparent pb-4 pt-2"
        )}
      >
        {/* Scrim Gradient for Contrast (Only when transparent) */}
        <div
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-500",
            isScrolled ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Premium Top Bar (Hidden on Mobile) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              className="w-full border-b border-white/10 mb-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="container mx-auto px-6 pb-2 flex justify-center items-center gap-6 text-xs font-medium text-white/90 tracking-wide">
                <span>Free Shipping on Orders Over ₹999</span>
                <span className="w-1 h-1 rounded-full bg-white/50 hidden md:flex" />
                <span className="hidden md:flex">
                  Lifetime Plating Warranty
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. LEFT: Mobile Menu & Search (Mobile Only) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "text-white hover:bg-white/20",
                  isScrolled && "text-slate-900 hover:bg-slate-100"
                )}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <Link to="/search">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("text-white", isScrolled && "text-slate-900")}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* 2. CENTER/LEFT: Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group relative z-50"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <img
                  src={Logo}
                  alt="Teerthankar Logo"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="hidden lg:block">
                <h1
                  className={cn(
                    "font-serif text-2xl font-bold tracking-tight leading-none transition-colors duration-300 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent",
                    isScrolled ? "bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent" : "bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
                  )}
                >
                  Teerthankar
                </h1>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300",
                    isScrolled ? "bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent" : "bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
                  )}
                >
                  Jewels
                </span>
              </div>
            </Link>

            {/* 3. CENTER: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {[
                { name: "Home", path: "/" },
                { name: "Shop All", path: "/shop" },
                { name: "Collections", path: "#", isDropdown: true },
                { name: "About", path: "/about" },
              ].map((item) => (
                <div key={item.name} className="relative group">
                  {item.isDropdown ? (
                    <button
                      onMouseEnter={() => setIsCategoriesOpen(true)}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors duration-300 py-2",
                        isScrolled
                          ? "text-slate-700 hover:text-amber-600"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "text-sm font-medium transition-colors duration-300 py-2 relative",
                        isScrolled
                          ? "text-slate-700 hover:text-amber-600"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 4. RIGHT: Actions */}
            <div className="flex items-center gap-1 lg:gap-3">
              {/* Desktop Search */}
              <Link to="/search" className="hidden lg:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full transition-colors",
                    isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </Link>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlistClick}
                className={cn(
                  "rounded-full transition-colors relative",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/20"
                )}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className={cn(
                  "rounded-full transition-colors relative",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/20"
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* User Profile (Desktop) */}
              <div className="hidden lg:block">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/profile")
                      : openLogin()
                  }
                  className={cn(
                    "rounded-full transition-colors",
                    isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. MEGA MENU (Desktop Collections) */}
        <AnimatePresence>
          {isCategoriesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
              className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-12"
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-5 gap-8">
                  {/* Featured Category */}
                  <div className="col-span-1 p-6 bg-amber-50 rounded-2xl">
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">
                      New Arrivals
                    </h3>
                    <p className="text-amber-800/70 text-sm mb-4">
                      Explore the latest trends in artisan jewelry.
                    </p>
                    <Link
                      to="/shop?sort=newest"
                      className="text-amber-700 font-medium text-sm hover:underline"
                    >
                      Shop Now &rarr;
                    </Link>
                  </div>

                  {/* Category List */}
                  {categories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="h-[170px] w-[170px] rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-amber-400 transition-all">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-medium text-slate-900 group-hover:text-amber-600">
                        {cat.name}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 6. MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-[60] bg-white flex flex-col overflow-hidden"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="w-8 h-8" />
                <div className="flex flex-col ml-1">
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Teerthankar
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Jewels</span>
              </div>
              </div>          
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6 text-slate-900" />
              </Button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for jewelry..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/search");
                  }}
                />
              </div>

              {/* Links */}
              <div className="space-y-6">
                {[
                  { name: "Home", path: "/" },
                  { name: "Shop All", path: "/shop" },
                  { name: "Profile", path: "/profile" },
                  // { name: "Track Order", path: "/track-order" },
                ].map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    {link.name === "Profile" && !isAuthenticated ? (
                      <Link
                        to={link.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          openLogin();
                        }}
                        className="text-3xl font-serif font-medium text-slate-900 hover:text-amber-600 transition-colors block"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-3xl font-serif font-medium text-slate-900 hover:text-amber-600 transition-colors block"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Collapsible Categories */}
                <motion.div
                  variants={linkVariants}
                  className="pt-4 border-t border-slate-100"
                >
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Collections
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-amber-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white overflow-hidden border border-slate-200">
                          <img
                            src={cat.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              {!isAuthenticated ? (
                <Button
                  className="w-full bg-slate-900 text-white py-6 text-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLogin();
                  }}
                >
                  Login / Sign Up
                </Button>
              ) : (
                <Button
                  className="w-full bg-rose-100 text-orange-300 hover:bg-rose-200 border border-rose-200 py-6 text-lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Welcome Back, User
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
