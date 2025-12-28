// src/contexts/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import * as api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext<any | null>(null);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) loadWishlist();
    else setItems([]);
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const data = await api.getWishlist();

      const transformed = data.map((w: any) => ({
        wishlist_id: w.id,
        product_id: w.product_id,
        name: w.product?.name || "",
        images: safeParseImages(w.product?.images),
        price: Number(w.product?.price || 0),
      }));

      setItems(transformed);
    } catch (err) {
      console.error("Wishlist load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const safeParseImages = (images: any) => {
    if (!images) return [];
    try {
      return JSON.parse(images);
    } catch {
      return typeof images === "string" ? [images] : [];
    }
  };

  const addToWishlist = async (product: any) => {
    if (!isAuthenticated) {
      toast.error("Please login to save items");
      return;
    }

    try {
      await api.addToWishlist(product.id);
      toast.success("Added to wishlist");
      loadWishlist();
    } catch {
      toast.error("Failed to add");
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await api.removeWishlistItem(productId);
      toast.success("Removed from wishlist");
      loadWishlist();
    } catch {
      toast.error("Failed to remove");
    }
  };

  const isInWishlist = (productId: number) =>
    items.some((i) => i.product_id === productId);

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist: loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
