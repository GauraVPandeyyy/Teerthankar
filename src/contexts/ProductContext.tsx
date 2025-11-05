import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { transformCategory, transformProduct } from '../services/dataTransformers';
import { Category, Subcategory, Product } from '../data/categories';

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
  isError: boolean;
  updateFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getProductsBySubcategory: (categoryId: string, subcategoryId: string) => Product[];
  getSubcategories: (categoryId: string) => Subcategory[];
  getFeaturedProducts: () => Product[];
  allProducts: Product[];
  refetchData: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    priceRange: [0, 10000],
    metalType: null,
    search: '',
    sortBy: 'featured'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

 // Fetch data from API
const fetchData = async () => {
  try {
    setIsLoading(true);
    setIsError(false);

    console.log('Fetching data from API...');

    // Fetch categories and products in parallel
    const [categoriesData, productsData] = await Promise.all([
      api.getCategories(),
      api.getProducts()
    ]);

    console.log('Categories data:', categoriesData);
    console.log('Products data:', productsData);

    // Transform API data to match frontend interfaces
    const transformedCategories = categoriesData.map(transformCategory);
    const transformedProducts = productsData.map(transformProduct);

    console.log('Transformed categories:', transformedCategories);
    console.log('Transformed products:', transformedProducts);

    setAllCategories(transformedCategories);
    setAllProducts(transformedProducts);
    setProducts(transformedProducts); // Initially show all products

  } catch (error) {
    console.error('Failed to fetch data:', error);
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
};

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Get subcategories for a category
  const getSubcategories = (categoryId: string): Subcategory[] => {
    const category = allCategories.find(cat => cat.id === categoryId);
    return category?.subcategories || [];
  };

  // Get products by subcategory
  const getProductsBySubcategory = (categoryId: string, subcategoryId: string): Product[] => {
    return allProducts.filter(product => 
      product.category === categoryId && product.subcategory === subcategoryId
    );
  };

  // Get products by category
  const getProductsByCategory = (categoryId: string): Product[] => {
    return allProducts.filter(
      (product) =>
        product.category === categoryId ||
        product.collections?.includes(categoryId)
    );
  };

  // Filter and sort products based on current filters
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

  // Update filtered products when filters change
  useEffect(() => {
    if (allProducts.length > 0) {
      setIsLoading(true);
      
      // Simulate API delay for smooth UX
      const timer = setTimeout(() => {
        setProducts(getFilteredProducts());
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [filters, allProducts]);

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

  const refetchData = async (): Promise<void> => {
    await fetchData();
  };

  const value: ProductContextType = {
    products,
    categories: allCategories,
    filters,
    isLoading,
    isError,
    updateFilters,
    resetFilters,
    getProductById,
    getProductsByCategory,
    getProductsBySubcategory,
    getSubcategories,
    getFeaturedProducts,
    allProducts,
    refetchData
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