import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { categories } from '../data/categories';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductsByCategory, getProductsBySubcategory, getSubcategories } = useProducts();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const category = categories.find(cat => cat.slug === slug);
  const subcategories = category ? getSubcategories(category.id) : [];

  // Set first subcategory as default if category has subcategories
  useEffect(() => {
    if (subcategories.length > 0 && !selectedSubcategory) {
      setSelectedSubcategory(subcategories[0].id);
    }
  }, [subcategories, selectedSubcategory]);

  const handleSubcategoryChange = (subcategoryId: string) => {
    setIsTransitioning(true);
    setSelectedSubcategory(subcategoryId);
    
    // Smooth transition effect
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Get products based on selection
  const products = category ? (
    selectedSubcategory && subcategories.length > 0
      ? getProductsBySubcategory(category.id, selectedSubcategory)
      : getProductsByCategory(category.id)
  ) : [];

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Enhanced Category Hero with Glassmorphism */}
      <section 
        className="relative h-60 md:h-80 flex items-end pb-8 overflow-hidden"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Glassmorphism Navigation */}
        <div className="absolute top-4 left-4 z-20">
          <Link to="/shop">
            <Button 
              variant="secondary" 
              size="sm"
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-white/10 max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">
              {category.name}
            </h1>
            <p className="text-lg opacity-90">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategories Navigation - Horizontal Scroll */}
      {subcategories.length > 0 && (
        <section className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
              {subcategories.map((subcategory, index) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className={`
                    flex items-center whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-300
                    ${selectedSubcategory === subcategory.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                      : 'bg-secondary/50 text-foreground border-border hover:bg-secondary'
                    }
                    transform hover:scale-105 active:scale-95
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-medium text-sm">{subcategory.name}</span>
                  {selectedSubcategory === subcategory.id && (
                    <ChevronRight className="w-4 h-4 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section with Smooth Transitions */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header with Count */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {selectedSubcategory 
                  ? subcategories.find(s => s.id === selectedSubcategory)?.name
                  : category.name
                }
              </h2>
              <p className="text-muted-foreground mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isTransitioning && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-square rounded-lg mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid with Animation */}
          {!isTransitioning && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💎</span>
                  </div>
                  <p className="text-xl text-muted-foreground mb-4">
                    No products available in this {selectedSubcategory ? 'subcategory' : 'category'} yet
                  </p>
                  <Link to="/shop">
                    <Button variant="outline">Explore Other Categories</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;