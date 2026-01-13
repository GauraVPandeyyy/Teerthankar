import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// Define the shape of a subcategory based on your API structure
// Assuming it has at least id and name.
interface Subcategory {
  id: number | string;
  name: string;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { 
    categories, 
    getProductsByCategory, 
    getProductsBySubcategory, 
    getSubcategories,
    isLoading
  } = useProducts();
  
  // State now stores the ID of the selected subcategory, not the string/object
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | number | null>(null);

  const category = categories.find(cat => cat.slug === slug);
  
  // Ensure subcategories are typed properly
  const subcategories = category ? getSubcategories(category.id) : [];

  // Filter Logic:
  // If a subcategory is selected, use its ID. Otherwise, fetch all for the category.
  const products = category 
    ? (selectedSubcategoryId 
        ? getProductsBySubcategory(category.id, selectedSubcategoryId)
        : getProductsByCategory(category.id))
    : [];

  if (!category) return <div className="h-screen flex items-center justify-center">Category not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-12">
          <Link to="/" className="text-white/80 hover:text-white flex items-center gap-2 mb-4 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-2"
          >
            {category.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-lg max-w-2xl font-light"
          >
            {category.description}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4  relative z-10">
        
        {/* 2. FILTERS (Subcategories) */}
        {subcategories.length > 0 && (
          <div className="bg-white p-2 -mt-8 rounded-2xl shadow-lg border border-slate-100 flex flex-wrap items-center justify-center gap-1 md:gap-2 mb-12 w-fit mx-auto">
            <button
              onClick={() => setSelectedSubcategoryId(null)}
              className={cn(
                "px-2 md:px-6 py-1 md:py-2 rounded-xl text-[12px] md:text-sm md:font-medium transition-all duration-300",
                selectedSubcategoryId === null 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-transparent text-slate-500 hover:bg-slate-50"
              )}
            >
              View All
            </button>
            {subcategories.map((sub: any) => (
              <button
                key={sub.id} // ✅ FIX: Use unique ID as key
                onClick={() => setSelectedSubcategoryId(sub.id)} // ✅ FIX: Pass ID to state
                className={cn(
                  "px-2 md:px-6 py-1 md:py-2 rounded-xl text-[12px] md:text-sm md:font-medium transition-all duration-300",
                  selectedSubcategoryId === sub.id 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-transparent text-slate-500 hover:bg-slate-50"
                )}
              >
                {/* ✅ FIX: Render the NAME string, not the object */}
                {sub.name} 
              </button>
            ))}
          </div>
        )}

        {/* 3. PRODUCT GRID */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-white rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-8"
          >
            <AnimatePresence mode='popLayout'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-2xl font-serif text-slate-900">Coming Soon</h3>
            <p className="text-slate-500">We are curating new pieces for this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;