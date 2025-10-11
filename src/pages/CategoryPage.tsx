import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { categories } from '../data/categories';

const CategoryPage = () => {
  const { slug } = useParams();
  const { getProductsByCategory } = useProducts();
  
  const category = categories.find(cat => cat.slug === slug);
  const products = category ? getProductsByCategory(category.id) : [];

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
    <div className="min-h-screen">
      {/* Category Hero */}
      <section 
        className="relative h-80 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <Link to="/shop">
            <Button variant="ghost" className="mb-4 text-white hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
          <h1 className="font-serif text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} in this category
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                No products available in this category yet
              </p>
              <Link to="/shop">
                <Button>Explore Other Categories</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
