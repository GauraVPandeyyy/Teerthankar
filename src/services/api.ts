// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "https://teerthankarjewels.openlancer.in/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============ TOKEN HANDLER =============
let onLogout = () => {};

export const registerLogoutHandler = (fn: () => void) => {
  onLogout = fn;
};

function getToken() {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

// ============ INTERCEPTORS =============
instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token && config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});


instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      onLogout();
    }
    return Promise.reject(err);
  }
);

// ============ AUTH =============
export const login = async (email: string, password: string) => {
  const res = await instance.post("/login", { email, password });
  return res.data;
};

export const logout = async () => {
  try {
    await instance.post("/api/logout");
  } catch {}
  localStorage.removeItem("token");
};

export const getProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data;
};

// ============ CART (Your Backend) =============

// GET all cart items
export const getCart = async () => {
  const res = await instance.get("/cart/getItems");
  return res.data?.data || [];
};

// ADD item
export const addToCart = async ({
  product_id,
  quantity,
  total_price,
}: {
  product_id: number;
  quantity: number;
  total_price: number;
}) => {
  const res = await instance.post("/cart/addItem", {
    product_id,
    quantity,
    total_price,
  });
  return res.data;
};

// UPDATE item (uses PRODUCT ID)
export const updateCartItem = async (productId: number, quantity: number) => {
  const res = await instance.put(`/cart/updateItem/${productId}`, {
    quantity,
  });
  return res.data;
};

// DELETE item (uses PRODUCT ID)
export const removeCartItem = async (productId: number) => {
  const res = await instance.delete(`/cart/deleteItem/${productId}`);
  return res.data;
};

// =================== WISHLIST (Your Backend) ===================

// GET wishlist items
export const getWishlist = async () => {
  const res = await instance.get("/wishlist/getWishlist");
  return res.data?.data || [];
};

// ADD item
export const addToWishlist = async (product_id: number) => {
  const res = await instance.post("/wishlist/addToWishlist", { product_id });
  return res.data;
};

// REMOVE item (remove by product_id)
export const removeWishlistItem = async (product_id: number) => {
  const res = await instance.delete(`/wishlist/removeWishlist/${product_id}`);
  return res.data;
};

export const clearWishlist = async () => {
  const res = await instance.delete(`/wishlist/items`);
  return res.data;
};

// =================== PUBLIC APIs ===================
export const getProducts = async () => {
  // backend public URL: /public/api/products
  const res = await instance.get("/products");
  const payload = res.data;
  const raw = payload?.data ?? [];

  // normalize each product: price:number, quantity:number, images: string[], inStock:boolean
  const normalized = raw.map((p: any) => {
    const images = (() => {
      try {
        if (!p.images) return [];
        if (Array.isArray(p.images)) return p.images;
        return JSON.parse(p.images);
      } catch {
        return typeof p.images === "string" ? [p.images] : [];
      }
    })();

    const price =
      Number(p.price ?? p.price?.toString().replace(/[^0-9.-]+/g, "")) || 0;
    const originalPrice =
      Number(p.original_price ?? p.originalPrice ?? p.original_price) ||
      undefined;
    const quantity = Number(p.quantity ?? 0);
    const inStock = p.in_stock === 1 || p.in_stock === "1" || quantity > 0;

    return {
      ...p,
      price,
      originalPrice,
      images,
      quantity,
      inStock,
    };
  });

  return normalized;
};

export const getProduct = async (id: string | number) => {
  const products = await getProducts();
  return products.find((p: any) => String(p.id) === String(id));
};

export const getCategories = async () => {
  // backend categories endpoint (you provided): /api/categories
  const res = await instance.get("/categories");
  const payload = res.data;
  const raw = payload?.data ?? [];

  // ensure subcategories array exists
  const normalized = raw.map((c: any) => ({
    ...c,
    subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
  }));

  return normalized;
};

// ==============================
// ORDER APIs
// ==============================
export const createOrder = async (body: any) => {
  const res = await instance.post("/orders/placeOrder", body);
  console.log("placeOrder body : ", body);
  console.log("placeOrder res.data : ", res.data);
  return res.data;
};

export const getOrderHistory = async () => {
  const res = await instance.get("/orders/myOrders");
    console.log("myOrders data : ", res.data);
  return res.data;
};

export const getOrderDetails = async (order_id: string) => {
  const res = await instance.get(`/orders/details/${order_id}`);
    console.log("getOrderDetails : ", res.data);
  return res.data;
};

export default instance;
