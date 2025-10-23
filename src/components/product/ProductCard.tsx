import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { cn } from '../../lib/utils';

const ProductCard = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={cn(
        "group overflow-hidden hover:shadow-lg transition-all duration-300 h-full",
        featured && "border-2 border-primary"
      )}>
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground px-[6px] py-[3px] rounded text-[0.65rem] font-medium">
                {discount}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-gradient-gold text-white px-[6px] py-[3px] rounded text-[0.65rem] font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-9 h-9"
              onClick={handleWishlistToggle}
            >
              <Heart
                className={cn("w-4 h-4", inWishlist && "fill-current text-destructive")}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-9 h-9"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-2 py-1">
          <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <p className="text-xs text-muted-foreground mb-2">{product.metalType}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* {product.rating && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <div className="flex items-center gap-1 text-primary">
                <span>★</span>
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          )} */}
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
