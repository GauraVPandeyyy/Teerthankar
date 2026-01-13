import { useState } from 'react';
import { Filter, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const Shop = () => {
  const { products, filters, updateFilters, resetFilters, isLoading } = useProducts();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const metalTypes = ['Gold Plated', 'Rose Gold Plated', 'White Gold Plated', 'Oxidized Silver'];

  return (
    <div className="min-h-screen bg-background mt-[120px]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Collection</h1>
            <p className="text-slate-500 max-w-lg text-lg">
              Explore our handcrafted jewelry, designed to add a touch of timeless elegance to your everyday style.
            </p>
          </div>

          <div className="flex items-center gap-3">
             {/* Mobile Filter Toggle */}
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2 rounded-full"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>

            <Select onValueChange={(val) => updateFilters({ sortBy: val as any })}>
              <SelectTrigger className="w-[180px] rounded-full border-slate-200 bg-white shadow-sm">
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
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters (Desktop) */}
          <aside className={cn(
            "lg:w-64 space-y-8 lg:block",
            showMobileFilters ? "block" : "hidden"
          )}>
            <div className="sticky top-24 space-y-8 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none">
              <div className="flex justify-between items-center lg:hidden mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}><X className="w-5 h-5"/></Button>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-serif font-semibold text-slate-900 mb-4 flex items-center gap-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={(val) => updateFilters({ priceRange: val as [number, number] })}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}+</span>
                </div>
              </div>

              {/* Metal Type */}
              <div>
                <h3 className="font-serif font-semibold text-slate-900 mb-4">Metal Finish</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="metal" 
                      className="w-4 h-4 accent-amber-600"
                      checked={filters.metalType === null}
                      onChange={() => updateFilters({ metalType: null })}
                    />
                    <span className="text-slate-600 group-hover:text-amber-600 transition-colors">All Metals</span>
                  </label>
                  {metalTypes.map((metal) => (
                    <label key={metal} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="metal" 
                        className="w-4 h-4 accent-amber-600"
                        checked={filters.metalType === metal}
                        onChange={() => updateFilters({ metalType: metal })}
                      />
                      <span className="text-slate-600 group-hover:text-amber-600 transition-colors">{metal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full rounded-xl border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[400px] bg-slate-200/50 animate-pulse rounded-[2rem]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No matches found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={resetFilters} className="rounded-full">Clear All Filters</Button>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;