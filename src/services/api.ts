import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach Bearer token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================================
   AUTH (GOOGLE ONLY)
====================================================== */

export const googleLogin = async (googleIdToken: string) => {
  const res = await instance.post("/auth/google/callback", {
    token: googleIdToken,
  });
  return res.data; // { access_token, token_type, user }
};

export const logout = async () => {
  await instance.post("/logout");
};

export const getProfile = async () => {
  const res = await instance.get("/auth/me");
  console.log("Profile response:", res.data);
  return res.data;
};

/* ======================================================
   CART
====================================================== */

export const getCart = async () => {
  const res = await instance.get("/cart/getItems");
  return res.data?.data || res.data || [];
};

export const addToCart = async (data: {
  product_id: number;
  quantity: number;
  total_price: number;
}) => {
  await instance.post("/cart/addItem", data);
};

export const updateCartItem = async (
  productId: number,
  quantity: number
) => {
  await instance.put(`cart/updateItem/${productId}`, { quantity });
};

export const removeCartItem = async (productId: number) => {
  await instance.delete(`/cart/deleteItem/${productId}`);
};

/* ======================================================
   WISHLIST
====================================================== */

export const getWishlist = async () => {
  const res = await instance.get("/wishlist/getWishlist");
    return res.data?.data || res.data?.wishlist || res.data || [];
};

export const addToWishlist = async (productId: number) => {
  await instance.post("/wishlist/addToWishlist", { product_id: productId });
};

export const removeWishlistItem = async (productId: number) => {
  await instance.delete(`/wishlist/removeWishlist/${productId}`);
};

/* ======================================================
   ORDERS
====================================================== */

export const getOrderHistory = async () => {
  const res = await instance.get("orders/myOrders");
  return res.data;
};

export const getOrderDetails = async (order_id: string) => {
  const res = await instance.get(`/orders/details/${order_id}`);
    console.log("getOrderDetails : ", res.data);
  return res.data;
};


export const createOrder = async (payload: any) => {
  const res = await instance.post("/orders/placeOrder", payload);
  return res.data;
};

export const verifyPayment = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const res = await instance.post("/verify-payment", payload);
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


export default instance;
