import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ProductProvider } from "./contexts/ProductContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetails from "./pages/OrderDetails";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsConditions from "./pages/legal/TermsConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import ShippingPolicy from "./pages/legal/ShippingPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="min-h-screen flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 pe-0">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route
                        path="/category/:slug"
                        element={<CategoryPage />}
                      />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route
                        path="/terms-conditions"
                        element={<TermsConditions />}
                      />
                      <Route path="/refund-policy" element={<RefundPolicy />} />
                      <Route
                        path="/shipping-policy"
                        element={<ShippingPolicy />}
                      />

                      {/* Protected Routes */}
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/wishlist"
                        element={
                          <ProtectedRoute>
                            <Wishlist />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/order/:order_id"
                        element={
                          <ProtectedRoute>
                            <OrderDetails />
                          </ProtectedRoute>
                        }
                      />

                      <Route path="/search" element={<Search />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
