import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
  priority = false,
}) => {
  const isLarge = size === "large";

  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link to={`/category/${category.slug}`} className="block h-full">
        <Card className="relative h-full overflow-hidden rounded-3xl bg-white/80 border border-white/50 shadow-sm transition-shadow md:hover:shadow-xl">
          <div
            className={`relative overflow-hidden ${
              isLarge ? "aspect-[4/3]" : "aspect-square"
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform md:hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4 text-white">
              {category.featured && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs backdrop-blur">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    Featured
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`font-serif font-semibold leading-tight ${
                      isLarge ? "text-base md:text-2xl" : "text-sm md:text-lg"
                    }`}
                  >
                    {category.name}
                  </h3>

                  <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-white/90 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
