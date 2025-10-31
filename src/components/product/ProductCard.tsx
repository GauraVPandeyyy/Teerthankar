import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: any;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  featured = false,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card
          className={cn(
            "group relative overflow-hidden z-10 bg-white/80 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-2xl transition-all duration-500 rounded-3xl h-full",
            // featured && "border-2 border-amber-200 shadow-lg"
          )}
        >
          {/* Premium Background Effect */}
          {featured && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-rose-50/30 rounded-3xl -z-10" />
          )}

          {/* Image Container */}
          <div className="relative overflow-hidden z-10 aspect-square rounded-3xl">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Premium Badges */}
            <div className="absolute top-2 left-2 z-50 flex flex-col gap-2">
              {discount > 0 && (
                <motion.span
                  className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {discount}% OFF
                </motion.span>
              )}
              {/* {product.featured && (
                <motion.span 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-3 h-3" />
                  Featured
                </motion.span>
              )} */}
              {/* {product.rating >= 4.5 && (
                <motion.span 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Zap className="w-3 h-3" />
                  Top Rated
                </motion.span>
              )} */}
            </div>

            {/* Enhanced Quick Actions */}
            <motion.div
              className="absolute top-3 right-3 flex flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="icon"
                className={cn(
                  "rounded-2xl w-10 h-10 backdrop-blur-md border transition-all duration-300",
                  inWishlist
                    ? "bg-rose-500/20 border-rose-500/30 text-rose-500 hover:bg-rose-500/30"
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                )}
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={cn("w-4 h-4", inWishlist && "fill-current")}
                />
              </Button>

              <Button
                size="icon"
                className="rounded-2xl w-10 h-10 backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-white font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Coming Soon
                </span>
              </motion.div>
            )}
          </div>

          {/* Enhanced Content */}
          <div className="p-4">
            <motion.h3
              className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 mb-2 leading-tight"
              whileHover={{ color: "#4f46e5" }}
            >
              {product.name}
            </motion.h3>

            <p className="text-xs text-slate-600 mb-3 font-medium uppercase tracking-wide">
              {product.metalType}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating */}
              {/* {product.rating && (
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>★</span>
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  </div>
                </div>
              )} */}
            </div>

            {/* Quick View CTA */}
            <motion.div
              className="hidden xl:flex mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 4 }}
            >
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span>Quick view</span>
                <span>→</span>
              </div>
            </motion.div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-slate-200/50 transition-all duration-500 pointer-events-none"></div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
