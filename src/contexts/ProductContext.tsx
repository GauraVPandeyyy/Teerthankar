import { createContext, useContext, useState, useEffect } from 'react';
import { products as allProducts } from '../data/products';
import { categories as allCategories } from '../data/categories';

const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(allProducts);
  const [categories] = useState(allCategories);
  const [filters, setFilters] = useState({
    category: null,
    priceRange: [0, 10000],
    metalType: null,
    search: '',
    sortBy: 'featured' // featured, price-asc, price-desc, newest
  });
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products based on current filters
  const getFilteredProducts = () => {
    let filtered = [...allProducts];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) =>
          product.category === filters.category ||
          product.collections?.includes(filters.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Metal type filter
    if (filters.metalType) {
      filtered = filtered.filter(
        (product) => product.metalType === filters.metalType
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setProducts(getFilteredProducts());
      setIsLoading(false);
    }, 300);
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      category: null,
      priceRange: [0, 10000],
      metalType: null,
      search: '',
      sortBy: 'featured'
    });
  };

  const getProductById = (id) => {
    return allProducts.find((product) => product.id === id);
  };

  const getProductsByCategory = (categoryId) => {
    return allProducts.filter(
      (product) =>
        product.category === categoryId ||
        product.collections?.includes(categoryId)
    );
  };

  const getFeaturedProducts = () => {
    return allProducts.filter((product) => product.featured);
  };

  const value = {
    products,
    categories,
    filters,
    isLoading,
    updateFilters,
    resetFilters,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    allProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
