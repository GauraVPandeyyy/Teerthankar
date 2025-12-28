// src/contexts/ProductContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as api from "../services/api";

type FilterSort = "featured" | "price-asc" | "price-desc" | "newest";

interface Filters {
  category: string | null;
  priceRange: [number, number];
  metalType: string | null;
  search: string;
  sortBy: FilterSort;
}

interface ProductContextType {
  products: any[];
  allProducts: any[];
  categories: any[];
  filters: Filters;
  isLoading: boolean;
  isError: boolean;
  updateFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  getProductById: (id: string | number) => any | undefined;
  getProductsByCategory: (categoryId: string | number) => any[];
  getProductsBySubcategory: (categoryId: string | number, subcategoryId: string | number) => any[];
  getSubcategories: (categoryId: string | number) => any[];
  getFeaturedProducts: () => any[];
  refetchData: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: null,
    priceRange: [0, 1000000],
    metalType: null,
    search: "",
    sortBy: "featured",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      // fetch products and categories in parallel
      const [productsData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);

      setAllProducts(productsData || []);
      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error("ProductContext fetch error", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper: get product by id
  const getProductById = (id: string | number) => {
    return allProducts.find((p) => String(p.id) === String(id));
  };

  const getProductsByCategory = (categoryId: string | number) => {
    return allProducts.filter(
      (p) =>
        String(p.category_id) === String(categoryId) ||
        (Array.isArray(p.collections) && p.collections.includes(String(categoryId))) ||
        (p.collections && typeof p.collections === "string" && p.collections.includes(String(categoryId)))
    );
  };

  const getProductsBySubcategory = (categoryId: string | number, subcategoryId: string | number) => {
    return allProducts.filter(
      (p) => String(p.category_id) === String(categoryId) && String(p.subcategory_id) === String(subcategoryId)
    );
  };

  const getSubcategories = (categoryId: string | number) => {
    const cat = categories.find((c) => String(c.id) === String(categoryId));
    return cat?.subcategories ?? [];
  };

  const getFeaturedProducts = () => {
    return allProducts.filter((p) => p.featured === 1 || p.featured === "1" || p.featured === true);
  };

  // Filtering + sorting (client-side)
  useEffect(() => {
    let filtered = [...allProducts];

    // search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          String(p.name || "").toLowerCase().includes(q) ||
          String(p.description || "").toLowerCase().includes(q)
      );
    }

    // category
    if (filters.category) {
      filtered = filtered.filter(
        (p) =>
          String(p.category_id) === String(filters.category) ||
          (Array.isArray(p.collections) && p.collections.includes(filters.category))
      );
    }

    // price range
    filtered = filtered.filter((p) => (p.price ?? 0) >= filters.priceRange[0] && (p.price ?? 0) <= filters.priceRange[1]);

    // metal type
    if (filters.metalType) {
      filtered = filtered.filter((p) => String(p.metal_type || p.metalType) === String(filters.metalType));
    }

    // sort
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
        break;
      case "featured":
      default:
        filtered.sort((a, b) => ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
        break;
    }

    setProducts(filtered);
  }, [filters, allProducts, categories]);

  const updateFilters = (newFilters: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...newFilters }));
  const resetFilters = () => setFilters({ category: null, priceRange: [0, 1000000], metalType: null, search: "", sortBy: "featured" });

  return (
    <ProductContext.Provider
      value={{
        products,
        allProducts,
        categories,
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
        refetchData: fetchData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
};
