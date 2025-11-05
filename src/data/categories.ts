export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subcategories?: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  collections: string[];
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  metalType: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

// Keep your existing categories array as fallback
export const categories: Category[] = []; // Now empty since we're using API

export const products: Product[] = []; // Now empty since we're using API