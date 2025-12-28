// src/pages/Wishlist.tsx
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useWishlist } from "../contexts/WishlistContext";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Heart className="w-20 h-20 text-muted-foreground mb-4" />
        <h2 className="text-3xl font-bold mb-3">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Save items to view them later</p>

        <Link to="/shop">
          <Button className="bg-gradient-gold">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-serif text-4xl font-bold mb-10">Your Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <Card key={item.product_id} className="p-5 rounded-2xl shadow-lg">
            <Link to={`/product/${item.product_id}`}>
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-60 rounded-xl object-cover mb-4"
              />
            </Link>

            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <p className="text-muted-foreground mb-4">₹{item.price}</p>

            <div className="flex justify-between">
              <Link to={`/product/${item.product_id}`}>
                <Button size="sm" className="bg-gradient-gold">View</Button>
              </Link>

              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-red-600"
                onClick={() => removeFromWishlist(item.product_id)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
