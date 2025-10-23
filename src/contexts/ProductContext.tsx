import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as allProducts, Product } from '../data/products';
import { categories as allCategories, Category, Subcategory } from '../data/categories';

// Define TypeScript interfaces
interface Filters {
  category: string | null;
  priceRange: [number, number];
  metalType: string | null;
  search: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  filters: Filters;
  isLoading: boolean;
  updateFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getProductsBySubcategory: (categoryId: string, subcategoryId: string) => Product[];
  getSubcategories: (categoryId: string) => Subcategory[];
  getFeaturedProducts: () => Product[];
  allProducts: Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [categories] = useState<Category[]>(allCategories);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    priceRange: [0, 10000],
    metalType: null,
    search: '',
    sortBy: 'featured'
  });
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Get subcategories for a category
  const getSubcategories = (categoryId: string): Subcategory[] => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.subcategories || [];
  };

  // NEW: Get products by subcategory
  const getProductsBySubcategory = (categoryId: string, subcategoryId: string): Product[] => {
    return allProducts.filter(product => 
      product.category === categoryId && product.subcategory === subcategoryId
    );
  };

  // UPDATED: Enhanced getProductsByCategory to work with or without subcategories
  const getProductsByCategory = (categoryId: string): Product[] => {
    return allProducts.filter(
      (product) =>
        product.category === categoryId ||
        product.collections?.includes(categoryId)
    );
  };

  // Keep all your existing filtering logic (unchanged)
  const getFilteredProducts = (): Product[] => {
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

  const updateFilters = (newFilters: Partial<Filters>): void => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = (): void => {
    setFilters({
      category: null,
      priceRange: [0, 10000],
      metalType: null,
      search: '',
      sortBy: 'featured'
    });
  };

  const getProductById = (id: string): Product | undefined => {
    return allProducts.find((product) => product.id === id);
  };

  const getFeaturedProducts = (): Product[] => {
    return allProducts.filter((product) => product.featured);
  };

  const value: ProductContextType = {
    products,
    categories,
    filters,
    isLoading,
    updateFilters,
    resetFilters,
    getProductById,
    getProductsByCategory,
    getProductsBySubcategory, // NEW
    getSubcategories, // NEW
    getFeaturedProducts,
    allProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};