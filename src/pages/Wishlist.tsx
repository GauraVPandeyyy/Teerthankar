import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';

const Wishlist = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite items for later
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-gold hover:opacity-90">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
