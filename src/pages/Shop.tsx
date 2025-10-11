import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { categories } from '../data/categories';

const Shop = () => {
  const { products, filters, updateFilters, resetFilters, isLoading } = useProducts();
  const [showFilters, setShowFilters] = useState(false);

  const metalTypes = ['Gold Plated', 'Rose Gold Plated', 'White Gold Plated', 'Oxidized Silver', 'Mixed Metals'];

  const handleCategoryChange = (categoryId) => {
    updateFilters({ category: categoryId === 'all' ? null : categoryId });
  };

  const handleMetalTypeChange = (metalType) => {
    updateFilters({ metalType: metalType === 'all' ? null : metalType });
  };

  const handleSortChange = (sortBy) => {
    updateFilters({ sortBy });
  };

  const handlePriceChange = (value) => {
    updateFilters({ priceRange: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Shop All Jewelry</h1>
          <p className="text-muted-foreground">
            Showing {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-primary"
                >
                  Reset All
                </Button>
              </div>

              {/* Category Filter - PROMINENT */}
              <div className="space-y-3">
                <h3 className="font-medium text-base bg-gradient-gold bg-clip-text text-transparent">
                  Category
                </h3>
                <div className="space-y-2">
                  <Button
                    variant={filters.category === null ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryChange('all')}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={filters.category === category.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h3 className="font-medium">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={10000}
                    step={100}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Metal Type */}
              <div className="space-y-3">
                <h3 className="font-medium">Metal Type</h3>
                <Select
                  value={filters.metalType || 'all'}
                  onValueChange={handleMetalTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Metal Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metal Types</SelectItem>
                    {metalTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </Button>

              <Select
                value={filters.sortBy}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No products found</p>
                <Button onClick={resetFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
