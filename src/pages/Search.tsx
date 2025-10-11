import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';

const Search = () => {
  const { updateFilters, products, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-4xl font-bold text-center mb-8">Search Products</h1>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for necklaces, earrings, rings..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg"
              autoFocus
            />
          </div>
        </div>

        {searchTerm && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {isLoading ? 'Searching...' : `${products.length} results for "${searchTerm}"`}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Start searching</h2>
            <p className="text-muted-foreground">Enter keywords to find your perfect jewelry piece</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
