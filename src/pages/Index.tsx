import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  TruckIcon,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/product/ProductCard";
import CategoryCard from "../components/product/CategoryCard";
import { useProducts } from "../contexts/ProductContext";
import { categories } from "../data/categories";
import { motion, AnimatePresence ,Variants } from 'framer-motion';

const Index: React.FC = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const featuredCategories = categories.filter((cat) => cat.featured);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Premium Hero Carousel Data
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80",
      title: "Elegance Redefined",
      subtitle: "Discover our exquisite collection of artificial jewelry that brings luxury within reach",
      primaryButton: "Shop Now",
      primaryLink: "/shop",
      secondaryButton: "Wedding Collection",
      secondaryLink: "/category/wedding-collection",
      overlay: "from-black/70 to-black/30"
    },
    {
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80",
      title: "Timeless Beauty",
      subtitle: "Crafted perfection for every occasion, from casual elegance to grand celebrations",
      primaryButton: "New Arrivals",
      primaryLink: "/shop?sort=newest",
      secondaryButton: "Necklaces",
      secondaryLink: "/category/necklaces-pendants",
      overlay: "from-purple-900/70 to-pink-900/30"
    },
    {
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&q=80",
      title: "Sparkling Moments",
      subtitle: "Where every piece tells a story of glamour, sophistication, and unforgettable style",
      primaryButton: "Featured Pieces",
      primaryLink: "/shop?filter=featured",
      secondaryButton: "Earrings",
      secondaryLink: "/category/earrings",
      overlay: "from-amber-900/70 to-rose-900/30"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants : Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Premium Hero Carousel Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].overlay}`} />
            
            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-300/40 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight 
                  }}
                  animate={{ 
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="font-serif text-6xl md:text-8xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to={heroSlides[currentSlide].primaryLink}>
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-6 rounded-2xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center text-lg font-semibold">
                      {heroSlides[currentSlide].primaryButton}
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                  </Button>
                </Link>
                
                <Link to={heroSlides[currentSlide].secondaryLink}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/50 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/80 text-white px-8 py-6 rounded-2xl transition-all duration-300"
                  >
                    {heroSlides[currentSlide].secondaryButton}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-6">
            {/* Play/Pause Button */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-amber-400 w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-amber-300" />
        </motion.div> */}
      </section>

      {/* Premium Categories Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 py-20">
        <div className="container mx-auto px-4">
          {/* Animated Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">Premium Collections</span>
            </motion.div>
            
            <motion.h2 
              className="font-serif text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-rose-800 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-slate-800">Your Style</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Curated jewelry collections that tell your unique story. Each piece crafted to perfection for the modern connoisseur.
            </motion.p>
          </motion.div>

          {/* Enhanced Categories Grid */}
          <motion.div
            ref={scrollContainerRef}
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-amber-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-slate-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-12">
              {featuredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CategoryCard 
                    category={category} 
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-8 py-6 rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center text-lg font-semibold">
                    Explore All Collections
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                </Button>
              </Link>
              
              <p className="text-sm text-slate-500 mt-4">
                ✨ 2000+ premium designs • 🚀 Free shipping • 💎 Lifetime warranty
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Featured Products */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 to-amber-50/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">Editor's Picks</span>
            </motion.div>
            
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-rose-800 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-slate-800"> Pieces</span>
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Handpicked selections for the discerning jewelry lover. Each piece tells a story of exceptional craftsmanship.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.slice(0, 10).map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} featured={index < 3} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/shop">
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-6 rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center text-lg font-semibold">
                  Explore All Products
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                
                <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: TruckIcon,
                title: "Free Shipping",
                description: "On orders above ₹999 across India",
                color: "from-amber-500 to-amber-600"
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "100% secure & encrypted transactions",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Always here to help you choose perfect pieces",
                color: "from-blue-500 to-blue-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="text-center group"
                whileHover={{ y: -5 }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Collection Spotlight */}
      <section className="py-20 bg-gradient-to-br from-white to-rose-50/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
                title: "Wedding Collection",
                description: "Make your special day unforgettable with our exclusive bridal jewelry",
                link: "/category/wedding-collection",
                gradient: "from-purple-900/80 to-pink-900/40"
              },
              {
                image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
                title: "Party Wear",
                description: "Statement pieces that make you the center of attention",
                link: "/category/party-wear",
                gradient: "from-amber-900/80 to-rose-900/40"
              }
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <Link to={collection.link} className="group block">
                  <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <motion.img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient}`} />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <motion.h3 
                        className="font-serif text-4xl font-bold mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {collection.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-lg mb-6 text-white/90"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {collection.description}
                      </motion.p>
                      
                      <motion.div 
                        className="inline-flex items-center gap-2 font-semibold text-lg"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </div>

                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-white/20 to-white/10 bg-clip-padding backdrop-filter backdrop-blur-sm group-hover:from-white/30 group-hover:to-white/20 transition-all duration-500"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;