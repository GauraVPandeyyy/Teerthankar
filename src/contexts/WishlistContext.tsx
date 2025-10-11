import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        toast.info('Already in wishlist');
        return prevItems;
      }
      toast.success('Added to wishlist');
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    localStorage.removeItem('wishlist');
  };

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
