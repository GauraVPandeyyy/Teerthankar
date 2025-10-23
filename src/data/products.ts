export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  collections: string[];
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  metalType: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // Necklaces & Pendants - Layered Necklaces
  {
    id: 'NK001',
    name: 'Golden Cascade Necklace',
    category: 'necklaces',
    subcategory: 'layered-necklaces',
    collections: ['fashion', 'party-wear'],
    price: 2499,
    originalPrice: 3999,
    description: 'Stunning multi-layered gold-plated necklace with delicate chain work',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 'NK002',
    name: 'Silver Layer Delight',
    category: 'necklaces',
    subcategory: 'layered-necklaces',
    collections: ['office-wear'],
    price: 1899,
    originalPrice: 2999,
    description: 'Elegant silver layered necklace perfect for daily wear',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80'
    ],
    metalType: 'Silver Plated',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 89
  },

  // Necklaces & Pendants - Pendant Necklaces
  {
    id: 'NK003',
    name: 'Pearl Drop Pendant',
    category: 'necklaces',
    subcategory: 'pendant-necklaces',
    collections: ['office-wear', 'fashion'],
    price: 1799,
    originalPrice: 2499,
    description: 'Elegant pearl pendant with rose gold chain, perfect for daily wear',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'NK004',
    name: 'Heart Locket Necklace',
    category: 'necklaces',
    subcategory: 'pendant-necklaces',
    collections: ['fashion'],
    price: 1299,
    originalPrice: 1999,
    description: 'Romantic heart-shaped locket with intricate detailing',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 156
  },

  // Necklaces & Pendants - Statement Necklaces
  {
    id: 'NK005',
    name: 'Royal Diamond Necklace',
    category: 'necklaces',
    subcategory: 'statement-necklaces',
    collections: ['diamond-sets', 'wedding'],
    price: 5999,
    originalPrice: 8999,
    description: 'Luxurious artificial diamond necklace with intricate design',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 156
  },

  // Necklaces & Pendants - Choker Necklaces
  {
    id: 'NK006',
    name: 'Velvet Choker Set',
    category: 'necklaces',
    subcategory: 'choker-necklaces',
    collections: ['party-wear'],
    price: 899,
    originalPrice: 1499,
    description: 'Trendy velvet choker with pendant attachment',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 67
  },

  // Earrings - Stud Earrings
  {
    id: 'ER001',
    name: 'Crystal Stud Earrings',
    category: 'earrings',
    subcategory: 'stud-earrings',
    collections: ['office-wear', 'fashion'],
    price: 899,
    originalPrice: 1499,
    description: 'Simple yet elegant crystal studs for everyday elegance',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 203
  },

  // Earrings - Hoop Earrings
  {
    id: 'ER002',
    name: 'Golden Hoops Medium',
    category: 'earrings',
    subcategory: 'hoop-earrings',
    collections: ['fashion'],
    price: 1299,
    originalPrice: 1999,
    description: 'Classic golden hoop earrings in medium size',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 98
  },

  // Earrings - Drop Earrings
  {
    id: 'ER003',
    name: 'Pearl Drop Elegance',
    category: 'earrings',
    subcategory: 'drop-earrings',
    collections: ['office-wear', 'wedding'],
    price: 1999,
    originalPrice: 2999,
    description: 'Elegant pearl drop earrings with gold accents',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 142
  },

  // Earrings - Chandelier Earrings
  {
    id: 'ER004',
    name: 'Chandelier Drops',
    category: 'earrings',
    subcategory: 'chandelier-earrings',
    collections: ['party-wear', 'wedding'],
    price: 3299,
    originalPrice: 4999,
    description: 'Exquisite chandelier earrings with multi-tier design',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 142
  },

  // Rings - Solitaire Rings
  {
    id: 'RG001',
    name: 'Diamond Solitaire Ring',
    category: 'rings',
    subcategory: 'solitaire-rings',
    collections: ['wedding', 'diamond-sets'],
    price: 3499,
    originalPrice: 4999,
    description: 'Beautiful solitaire ring with artificial diamond',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 201
  },

  // Rings - Stackable Rings
  {
    id: 'RG002',
    name: 'Stackable Wave Set',
    category: 'rings',
    subcategory: 'stackable-rings',
    collections: ['fashion'],
    price: 1599,
    originalPrice: 2499,
    description: 'Set of three stackable wave-designed rings',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 87
  },

  // Bracelets - Chain Bracelets
  {
    id: 'BR001',
    name: 'Delicate Chain Bracelet',
    category: 'bracelets',
    subcategory: 'chain-bracelets',
    collections: ['office-wear', 'fashion'],
    price: 1199,
    originalPrice: 1899,
    description: 'Thin gold chain bracelet with small charm',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 134
  },

  // Bracelets - Tennis Bracelets
  {
    id: 'BR002',
    name: 'Diamond Tennis Bracelet',
    category: 'bracelets',
    subcategory: 'tennis-bracelets',
    collections: ['diamond-sets', 'party-wear'],
    price: 4599,
    originalPrice: 6999,
    description: 'Elegant tennis bracelet with artificial diamonds',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 92
  },

  // Add more products for other categories as needed...
  {
    id: 'RG003',
    name: 'Vintage Cocktail Ring',
    category: 'rings',
    subcategory: 'cocktail-rings',
    collections: ['party-wear'],
    price: 2899,
    originalPrice: 3999,
    description: 'Large vintage-inspired cocktail ring',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 78
  },

  {
    id: 'BR003',
    name: 'Charm Friendship Bracelet',
    category: 'bracelets',
    subcategory: 'charm-bracelets',
    collections: ['fashion'],
    price: 1399,
    originalPrice: 2199,
    description: 'Personalizable charm bracelet for special memories',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Silver Plated',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 56
  }
];