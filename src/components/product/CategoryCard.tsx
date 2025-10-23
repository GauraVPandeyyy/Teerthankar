import React from 'react';
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

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
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, size = "default" }) => {
  const isLarge = size === "large";

  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/50">
        <div
          className={`relative overflow-hidden ${
            isLarge ? "aspect-[4/3]" : "aspect-square"
          }`}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <div className="transform transition-transform duration-300 group-hover:translate-y-[-5px]">
              <p
                className={`font-serif font-bold mb-2 ${
                  isLarge ? "text-2xl" : "text-base"
                }`}
              >
                {category.name}
              </p>
              <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mr-1">Explore</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;