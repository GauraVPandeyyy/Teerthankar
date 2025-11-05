import { Category, Subcategory, Product } from '../data/categories';

// Transform API category data to match your frontend interface
export function transformCategory(apiCategory: any): Category {
  return {
    id: apiCategory.id.toString(),
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    image: apiCategory.image,
    featured: Boolean(apiCategory.featured),
    subcategories: apiCategory.subcategories?.map(transformSubcategory) || []
  };
}

export function transformSubcategory(apiSubcategory: any): Subcategory {
  return {
    id: apiSubcategory.id.toString(),
    name: apiSubcategory.name,
    slug: apiSubcategory.slug,
    description: apiSubcategory.description
  };
}

// Transform API product data to match your frontend interface
export function transformProduct(apiProduct: any): Product {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    category: apiProduct.category_id?.toString() || apiProduct.category,
    subcategory: apiProduct.subcategory_id?.toString(),
    collections: apiProduct.collections || [],
    price: parseFloat(apiProduct.price) || 0,
    originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : undefined,
    description: apiProduct.description,
    images: Array.isArray(apiProduct.images) ? apiProduct.images : [apiProduct.image],
    metalType: apiProduct.metal_type || 'Gold Plated',
    inStock: Boolean(apiProduct.in_stock ?? true),
    featured: Boolean(apiProduct.featured),
    rating: parseFloat(apiProduct.rating) || 4.5,
    reviews: parseInt(apiProduct.reviews) || 0
  };
}