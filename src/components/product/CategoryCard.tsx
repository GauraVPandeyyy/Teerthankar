import { Link } from 'react-router-dom';
import { Card } from '../ui/card';

const CategoryCard = ({ category, size = 'default' }) => {
  const isLarge = size === 'large';

  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-square'}`}>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <h3 className={`font-serif font-bold mb-2 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
              {category.name}
            </h3>
            <p className={`${isLarge ? 'text-base' : 'text-sm'} opacity-90 line-clamp-2`}>
              {category.description}
            </p>
            
            <div className="mt-4 inline-flex items-center text-sm font-medium group-hover:gap-2 transition-all">
              <span>Explore Collection</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
