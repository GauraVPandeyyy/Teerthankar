import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  TruckIcon,
  Shield,
  Headphones,
} from "lucide-react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/product/ProductCard";
import CategoryCard from "../components/product/CategoryCard";
import { useProducts } from "../contexts/ProductContext";
import { categories } from "../data/categories";

const Index = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const featuredCategories = categories.filter((cat) => cat.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Elegance Redefined
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover our exquisite collection of artificial jewelry that
              brings luxury within reach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-gradient-gold hover:opacity-90 text-white px-8"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/category/wedding-collection">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white/80 hover:text-secondary"
                >
                  Wedding Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Sparkles className="w-6 h-6 text-white" />
        </div> */}
      </section>

      {/* Categories Section - PROMINENT PLACEMENT */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Shop by{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse collection of jewelry designed for every
              occasion and style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {featuredCategories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Pieces
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked selections for the discerning jewelry lover
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-gold hover:opacity-90">
                Explore All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TruckIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-secondary-foreground">
                Free Shipping
              </h3>
              <p className="text-secondary-foreground/80">
                On orders above ₹999
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-secondary-foreground">
                Secure Payments
              </h3>
              <p className="text-secondary-foreground/80">
                100% secure transactions
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-secondary-foreground">
                24/7 Support
              </h3>
              <p className="text-secondary-foreground/80">
                Always here to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Spotlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link to="/category/wedding-collection" className="group">
              <div className="relative h-72 md:h-80 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
                  alt="Wedding Collection"
                  className="w-full h-full object-cover object-[60%] group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">
                    Wedding Collection
                  </h3>
                  <p className="text-lg mb-4">
                    Make your special day unforgettable
                  </p>
                  <div className="inline-flex items-center gap-2 font-medium">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/category/party-wear" className="group">
              <div className="relative h-72 md:h-80 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80"
                  alt="Party Wear"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-3xl font-bold mb-2">
                    Party Wear
                  </h3>
                  <p className="text-lg mb-4">
                    Statement pieces for celebrations
                  </p>
                  <div className="inline-flex items-center gap-2 font-medium">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
