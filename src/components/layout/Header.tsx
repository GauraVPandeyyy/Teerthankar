import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Button } from '../ui/button';
import { categories } from '../../data/categories';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        {/* Top Bar */}
        <div className="bg-secondary text-secondary-foreground py-2">
          <div className="container mx-auto px-4 text-center text-sm">
            Free Shipping on Orders Above ₹999 | Easy Returns
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Theerthankar 
              </span>
              <span className="text-foreground">{" "}Jewels</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              
              {/* Categories Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="text-foreground hover:text-primary transition-colors font-medium">
                  Categories
                </button>
                
                {isCategoriesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl bg-card border border-border shadow-lg rounded-lg p-8 animate-fade-in">
                    <div className="grid grid-cols-3 gap-6">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-border group-hover:border-primary transition-colors">
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/shop" className="text-foreground hover:text-primary transition-colors">
                Shop All
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
              </Link>

              <Link to="/wishlist" className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </Link>

              {isAuthenticated ? (
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <User className="w-5 h-5" />
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="text-sm text-foreground hover:text-primary transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/shop" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop All
                </Link>
                <Link 
                  to="/about" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
