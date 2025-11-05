// API base configuration
const API_BASE_URL = 'https://teerthankarjewels.openlancer.in/api';

// Generic API fetch function
async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data.data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Specific API functions
export const api = {
  // Categories
  getCategories: () => fetchAPI('/categories'),
  
  // Products
  getProducts: () => fetchAPI('/products'),
  
  // Single product by ID
  getProductById: (id: string) => fetchAPI(`/products/${id}`),
  
  // Products by category
  getProductsByCategory: (categoryId: string) => fetchAPI(`/categories/${categoryId}/products`),
};