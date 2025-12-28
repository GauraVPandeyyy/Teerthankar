// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import * as api from "../services/api";
import { useAuth } from "./AuthContext";
import { useProducts } from "./ProductContext";

const CartContext = createContext<any | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { allProducts, getProductById } = useProducts();

  useEffect(() => {
    if (isAuthenticated) loadCartData();
    else setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const loadCartData = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCart();
      const transformed = (data || []).map((item: any) => {
        const product = item.product || {};
        const images = (() => {
          try {
            if (!product.images) return [];
            return typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
          } catch { return typeof product.images === "string" ? [product.images] : []; }
        })();

        const quantity = Number(item.quantity || 0);
        const total_price = Number(item.total_price || 0);
        const unitPrice = quantity > 0 ? total_price / quantity : 0;

        return {
          cart_item_id: item.id,
          product_id: item.product_id,
          id: item.product_id,
          name: product.name || "",
          images,
          quantity,
          unitPrice,
          total_price,
        };
      });
      setItems(transformed);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  const getQuantityInCart = (productId: number) => {
    const item = items.find(i => Number(i.product_id) === Number(productId));
    return item ? Number(item.quantity) : 0;
  };

  const addToCart = async (product: any, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items");
      return false;
    }

    const storeProduct = getProductById ? getProductById(product.id) : allProducts.find(p => String(p.id) === String(product.id));
    const available = Number(storeProduct?.quantity ?? product.quantity ?? 0);

    const currentInCart = getQuantityInCart(product.id);
    const requestedTotal = currentInCart + quantity;

    if (requestedTotal > available) {
      toast.error(`Only ${available} item(s) available. You've already added ${currentInCart}.`);
      return false;
    }

    try {
      setIsLoading(true);
      const total_price = Number(product.price || 0) * quantity;
      await api.addToCart({ product_id: product.id, quantity, total_price });
      toast.success("Added to cart");
      await loadCartData();
      return true;
    } catch (err: any) {
      console.error("Add to cart failed", err);
      const msg = err?.response?.data?.message || "Failed to add to cart";
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    const storeProduct = getProductById ? getProductById(productId) : allProducts.find(p => String(p.id) === String(productId));
    const available = Number(storeProduct?.quantity ?? 0);
    if (quantity > available) {
      toast.error(`Only ${available} item(s) available`);
      return;
    }

    try {
      setIsLoading(true);
      await api.updateCartItem(productId, quantity);
      toast.success("Quantity updated");
      await loadCartData();
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setIsLoading(true);
      await api.removeCartItem(productId);
      toast.success("Item removed");
      await loadCartData();
    } catch (e) {
      console.error("Remove failed", e);
      toast.error("Failed to remove");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      const promises = items.map(i => api.removeCartItem(i.product_id));
      await Promise.allSettled(promises);
      await loadCartData();
    } catch (e) {
      console.warn("clearCart failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCartTotal = () => items.reduce((t, i) => t + (Number(i.total_price || (i.unitPrice * i.quantity)) || 0), 0);
  const getCartCount = () => items.reduce((t, i) => t + (i.quantity || 0), 0);

  return (
    <CartContext.Provider value={{
      items,
      isLoading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      getQuantityInCart,
      refreshCart: loadCartData
    }}>
      {children}
    </CartContext.Provider>
  );
};
