import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/product/ProductCard";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { items } = useWishlist();

  if (!items.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center shadow-sm mb-6"
        >
          <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
        </motion.div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Your Wishlist is Empty</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          Save items you love to your wishlist and revisit them later.
        </p>
        <Link to="/shop">
          <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  // Transform Wishlist items back to Product format for ProductCard
  // Note: Ensure your WishlistContext items have enough data, or adjust ProductCard to be flexible.
  // Assuming wishlist items have: product_id, name, price, images[]
  const productizedItems = items.map(item => ({
    id: item.product_id,
    name: item.name,
    price: item.price,
    images: item.images,
    inStock: true, // Wishlist usually doesn't track stock deeply unless joined
    category: "Saved Item"
  }));

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">My Wishlist</h1>
            <p className="text-slate-500">{items.length} items saved for later</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {productizedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;