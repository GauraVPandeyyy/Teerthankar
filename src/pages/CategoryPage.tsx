import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { categories } from '../data/categories';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductsByCategory, getProductsBySubcategory, getSubcategories } = useProducts();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const category = categories.find(cat => cat.slug === slug);
  const subcategories = category ? getSubcategories(category.id) : [];

  // Scroll progress for header animation
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / 200;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set first subcategory as default
  useEffect(() => {
    if (subcategories.length > 0 && !selectedSubcategory) {
      setSelectedSubcategory(subcategories[0].id);
    }
  }, [subcategories, selectedSubcategory]);

  const handleSubcategoryChange = (subcategoryId: string) => {
    setIsTransitioning(true);
    setSelectedSubcategory(subcategoryId);
    
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const products = category ? (
    selectedSubcategory && subcategories.length > 0
      ? getProductsBySubcategory(category.id, selectedSubcategory)
      : getProductsByCategory(category.id)
  ) : [];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-rose-50/30">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-800">Category not found</h1>
          <Link to="/shop">
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              Back to Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const headerOpacity = 1 - scrollProgress;
  const headerScale = 1 - (scrollProgress * 0.2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Enhanced Hero Section with Parallax */}
      <section 
        className="relative h-96 md:h-[480px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 mix-blend-overlay" />
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-300/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * 400 
              }}
              animate={{ 
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Glassmorphism Navigation */}
        <motion.div 
          className="absolute top-6 left-4 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="backdrop-blur-md bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Hero Content with Scroll Animation */}
        <motion.div 
          className="relative z-10 container mx-auto px-4 text-white pb-12"
          style={{
            opacity: headerOpacity,
            scale: headerScale
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="backdrop-blur-md bg-black/30 rounded-3xl p-8 border border-white/20 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-medium text-amber-100">Premium Collection</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 leading-tight">
                {category.name}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {category.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sticky Subcategories Navigation */}
      {subcategories.length > 0 && (
        <motion.section 
          className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Subcategories Scroll */}
              <div 
                ref={scrollContainerRef}
                className="flex space-x-3 overflow-x-auto scrollbar-hide flex-1"
              >
                {subcategories.map((subcategory, index) => (
                  <motion.button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={`
                      flex items-center whitespace-nowrap px-6 py-3 rounded-2xl border-2 transition-all duration-300 font-medium
                      ${selectedSubcategory === subcategory.id
                        ? 'bg-gradient-to-r from-slate-900 to-slate-700 text-white border-slate-900 shadow-lg scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-sm font-semibold">{subcategory.name}</span>
                    {selectedSubcategory === subcategory.id && (
                      <ChevronRight className="w-4 h-4 ml-2" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Filter Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-2xl border-slate-200 hover:border-slate-300 ml-4"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Products Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced Header */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-serif">
                {selectedSubcategory 
                  ? subcategories.find(s => s.id === selectedSubcategory)?.name
                  : category.name
                }
              </h2>
              <p className="text-slate-600 mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-amber-600">{products.length}</span>
                <span>premium {products.length === 1 ? 'piece' : 'pieces'} curated for you</span>
              </p>
            </div>
          </motion.div>

          {/* Enhanced Loading Skeleton */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="animate-pulse"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="bg-gradient-to-br from-slate-200 to-slate-100 aspect-square rounded-2xl mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded-lg mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded-lg w-3/4"></div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Products Grid */}
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={selectedSubcategory || 'all'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {products.length === 0 ? (
                  <motion.div 
                    className="col-span-full text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-12 h-12 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      Coming Soon
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      We're crafting exceptional pieces for this collection. Stay tuned for our latest designs.
                    </p>
                    <Link to="/shop">
                      <Button className="bg-slate-800 hover:bg-slate-700 text-white rounded-2xl">
                        Discover Other Collections
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;