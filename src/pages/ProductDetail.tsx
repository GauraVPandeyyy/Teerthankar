// src/pages/ProductDetail.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, TruckIcon, Shield, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { cn } from '../lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, allProducts } = useProducts();
  const { addToCart, getQuantityInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const initialQty = 1;
  const [quantity, setQuantity] = useState(initialQty);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = allProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0,4);

  const stockAvailable = Number(product.quantity ?? 0);
  const currentInCart = getQuantityInCart ? getQuantityInCart(product.id) : 0;
  const maxSelectable = Math.max(0, stockAvailable - currentInCart);

  const handleAddToCart = async () => {
    if (quantity < 1) return;
    if (quantity > maxSelectable) {
      // show a message
      return;
    }
    await addToCart(product, quantity);
    // optional: reset quantity to 1
    setQuantity(1);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-background mt-[80px]">
      <div className="container mx-auto px-2 py-6">
        <Link to="/shop"><Button variant="ghost" className="mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Shop</Button></Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="w-full h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-border">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover object-center" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button key={index} onClick={() => setSelectedImage(index)} className={cn("aspect-square rounded-lg overflow-hidden border-2 transition-all", selectedImage === index ? "border-primary" : "border-border")}>
                    <img src={image} alt={`${product.name} ${index+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.metal_type || product.metalType}</p>
            </div>

            {product.rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted")} />)}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">₹{(product.price || 0).toLocaleString()}</span>
              {product.originalPrice && <span className="text-xl text-muted-foreground line-through">₹{(product.originalPrice || 0).toLocaleString()}</span>}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <span className="px-6">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(q => Math.min(maxSelectable || 1, q + 1))}>+</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                {stockAvailable <= 0 ? <span className="text-destructive">Out of stock</span> : <span>{maxSelectable} available</span>}
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-gradient-gold hover:opacity-90" onClick={handleAddToCart} disabled={stockAvailable <= 0 || maxSelectable <= 0}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                {stockAvailable ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
                <Heart className={cn("w-5 h-5", inWishlist && "fill-current text-destructive")} />
              </Button>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {relatedProducts.map((p: any) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
