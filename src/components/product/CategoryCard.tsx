import React from 'react';
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
}

interface CategoryCardProps {
  category: Category;
  size?: "default" | "large";
  priority?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  size = "default", 
  priority = false 
}) => {
  const isLarge = size === "large";

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={`/category/${category.slug}`} className="block group">
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl h-full">
          <div className={`relative overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-square"} rounded-3xl`}>
            {/* Background Image with Enhanced Overlay */}
            <motion.img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading={priority ? "eager" : "lazy"}
            />

            {/* Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 mix-blend-overlay" />
            
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              {/* Top Badge */}
              {category.featured && (
                <div className="flex justify-end">
                  <motion.div 
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span className="text-xs font-medium">Featured</span>
                  </motion.div>
                </div>
              )}

              {/* Bottom Content */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <h3 className={`font-serif font-bold leading-tight ${isLarge ? "text-2xl" : "text-lg"} pr-2`}>
                    {category.name}
                  </h3>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="flex-shrink-0 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 45,
                      backgroundColor: "rgba(255,255,255,0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Description */}
                <p className={`text-white/90 leading-relaxed ${isLarge ? "text-sm" : "text-xs"} line-clamp-2`}>
                  {category.description}
                </p>

                {/* Explore Button */}
                <motion.div 
                  className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 4 }}
                >
                  <span>Explore</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>

            {/* Glassmorphism Border Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-br from-white/30 to-white/10 bg-clip-padding backdrop-filter backdrop-blur-sm"></div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;