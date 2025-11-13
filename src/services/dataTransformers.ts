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
  // Fix the images array - handle both string and array formats
  let images: string[] = [];
  
  if (typeof apiProduct.images === 'string') {
    try {
      // Try to parse the string as JSON
      images = JSON.parse(apiProduct.images);
    } catch (error) {
      console.warn('Failed to parse images JSON:', apiProduct.images);
      // If parsing fails, use the string as a single image array
      images = [apiProduct.images];
    }
  } else if (Array.isArray(apiProduct.images)) {
    // If it's already an array, use it directly
    images = apiProduct.images;
  } else if (apiProduct.image) {
    // Fallback to single image field
    images = [apiProduct.image];
  } else {
    // Final fallback
    images = ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'];
  }

  // Ensure all images are strings and valid
  images = images
    .filter(img => img && typeof img === 'string')
    .map(img => img.trim())
    .filter(img => img.length > 0);

  // If no valid images, use a fallback
  if (images.length === 0) {
    images = ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'];
  }

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    category: apiProduct.category_id?.toString() || apiProduct.category,
    subcategory: apiProduct.subcategory_id?.toString(),
    collections: apiProduct.collections || [],
    price: parseFloat(apiProduct.price) || 0,
    originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : undefined,
    description: apiProduct.description,
    images: images, // Use the fixed images array
    metalType: apiProduct.metal_type || 'Gold Plated',
    inStock: Boolean(apiProduct.in_stock ?? true),
    featured: Boolean(apiProduct.featured),
    rating: parseFloat(apiProduct.rating) || 4.5,
    reviews: parseInt(apiProduct.reviews) || 0
  };
}