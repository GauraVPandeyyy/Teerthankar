// src/components/product/ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Card} from "../ui/card";
import { cn } from "../../lib/utils";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../auth/LoginModal";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

const ProductCard = ({ product }) => {
  const { addToCart, getQuantityInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const currentInCart = getQuantityInCart(product.id);
  const available = Number(product.quantity ?? 0);
  // Allow adding if in stock and we haven't hit the limit (unless limit is 0 which usually means OOS)
  const canAdd = product.inStock && (available === 0 || available > currentInCart);

  const guarded = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return setShowLoginModal(true);
    fn();
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };
function capitalizeEachWord(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full"
      >
        <Link to={`/product/${product.id}`} className="group block h-full">
          <Card
            className={cn(
              "relative h-full overflow-hidden rounded-lg md:rounded-[1.5rem] border-0 bg-white",
              "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
              "transition-all duration-500",
              "hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            )}
          >
            {/* IMAGE CONTAINER */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover",
                  "transition-transform duration-700 ease-out",
                  "group-hover:scale-110"
                )}
              />

              {/* OVERLAY GRADIENT (Subtle) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* BADGES */}
              <div className="absolute top-1 left-1 md:top-3 md:left-3 flex flex-col gap-2 z-10">
                {/* {product.featured && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm">
                    Featured
                  </span>
                )} */}
                {product.featured ? (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm">
                    Featured
                  </span>
                ): ""}
                {!product.inStock && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-rose-500/90 backdrop-blur-md rounded-full shadow-sm">
                    Sold Out
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              {/* Mobile: Always visible. Desktop: Visible on hover */}
              <div className="absolute -top-1 right-1 md:top-3 md:right-3 flex flex-col gap-3 z-20 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:flex hidden">
                 {/* Wishlist Button */}
                 <ActionButton 
                    onClick={guarded(inWishlist ? () => removeFromWishlist(product.id) : () => addToWishlist(product))}
                    active={inWishlist}
                    icon={Heart}
                    label="Wishlist"
                    activeColor="text-rose-500 fill-rose-500"
                 />
                 
                 
              </div>

              {/* Mobile Actions (Always Visible on Touch) */}
              <div className="absolute top-3 right-3 md:hidden z-20">
                <button
                   onClick={guarded(inWishlist ? () => removeFromWishlist(product.id) : () => addToWishlist(product))}
                   className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 text-slate-700"
                >
                  <Heart className={cn("w-5 h-5", inWishlist && "fill-rose-500 text-rose-500")} />
                </button>
              </div>

              {/* ADD TO CART - Floating Bottom Button */}
              <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
                 <Button
                    disabled={!canAdd || isAdding}
                    onClick={guarded(handleAddToCart)}
                    variant="ghost"
                    className={cn(
                      "w-full rounded-xl bg-white/90 backdrop-blur-xl text-slate-900 hover:bg-white hover:text-amber-600",
                      "shadow-lg border border-white/50 transition-all duration-300 font-medium",
                      isAdding && "scale-95 bg-green-50"
                    )}
                 >
                    {isAdding ? "Added to Cart" : (!canAdd ? "Out of Stock" : "Add to Cart")}
                 </Button>
              </div>
            </div>

            {/* CONTENT DETAILS */}
            <div className="p-1 md:p-5 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <div>
                   <p className="text-[10px] md:text-xs font-medium tracking-wider text-amber-600 uppercase mb-1">
                     {product.metal_type || product.category || "Jewelry"}
                   </p>
                   <h3 className="font-serif text-[14px] md:text-lg font-medium leading-snug text-slate-800 line-clamp-1 group-hover:text-amber-700 transition-colors">
                     {capitalizeEachWord(product.name)}
                   </h3>
                </div>
                {/* Rating Stub */}
                <div className="hidden md:flex items-center gap-1 text-slate-400">
                   <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                   <span className="text-xs font-medium text-slate-600">{product.rating}</span>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-baseline gap-1 md:gap-2">
                  <span className="text-[14px] md:text-lg font-semibold text-slate-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through decoration-slate-300">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Mobile Add Cart (Icon Only) */}
                <button 
                  disabled={!canAdd}
                  onClick={guarded(handleAddToCart)}
                  className="md:hidden w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                   <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

// Helper Component for Desktop Action Buttons
const ActionButton = ({ onClick, active, icon: Icon, label, activeColor = "" }) => (
  <motion.button
    whileHover={{ scale: 1.1, x: -2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={cn(
      "h-10 w-10 rounded-full bg-white text-slate-700 shadow-md flex items-center justify-center",
      "hover:text-amber-600 hover:shadow-lg transition-colors border border-slate-100",
      active && activeColor
    )}
    title={label}
  >
    <Icon className={cn("w-5 h-5", active && "fill-current")} />
  </motion.button>
);

export default ProductCard;