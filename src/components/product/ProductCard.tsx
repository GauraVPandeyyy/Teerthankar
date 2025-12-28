// src/components/product/ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import LoginModal from "../auth/LoginModal";

const ProductCard = ({ product }) => {
  const { addToCart, getQuantityInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const currentInCart = getQuantityInCart ? getQuantityInCart(product.id) : 0;
  const available = Number(product.quantity ?? 0);
  const canAdd = product.inStock && available > currentInCart;

  const handleWishlistToggle = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!canAdd) {
      const msg = available === 0 ? "Out of stock" : `Only ${available - currentInCart} left`;
      return; // optionally show toast, cart context already handles toast on attempt
    }

    // Add 1 by default
    await addToCart(product, 1);
  };

  return (
    <>
      <motion.div whileHover={{ y: -8 }}>
        <Link to={`/product/${product.id}`}>
          <Card className="group relative bg-white/80 rounded-3xl shadow-md hover:shadow-xl transition-all">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <motion.img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
              />

              {/* Stock badge */}
              {Number(product.quantity) <= 0 ? (
                <span className="absolute top-2 left-2 bg-slate-700 text-white px-2 py-1 text-xs rounded-full">Out of stock</span>
              ) : (
                <span className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 text-xs rounded-full">Only {Math.max(0, Number(product.quantity) - currentInCart)} left</span>
              )}

              {/* Wishlist + Cart Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Button
                  size="icon"
                  className={cn("rounded-xl", inWishlist ? "bg-rose-500/30 text-rose-600" : "bg-white/30 text-white")}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
                </Button>

                <Button
                  size="icon"
                  className={cn("rounded-xl", !canAdd ? "opacity-50 cursor-not-allowed" : "bg-white/30")}
                  onClick={handleAddToCart}
                  disabled={!canAdd}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-xs mb-3 uppercase text-muted-foreground">{product.metal_type || product.metalType}</p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">₹{(product.price || 0).toLocaleString()}</span>

                {product.originalPrice && (
                  <span className="text-sm line-through text-muted-foreground">₹{(product.originalPrice || 0).toLocaleString()}</span>
                )}
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default ProductCard;
