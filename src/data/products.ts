// Mock product data for the jewelry store (30+ products across categories)
export const products = [
  // Necklaces & Pendants
  {
    id: 'NK001',
    name: 'Golden Cascade Necklace',
    category: 'necklaces',
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
    name: 'Pearl Drop Pendant',
    category: 'necklaces',
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
    id: 'NK003',
    name: 'Royal Diamond Necklace',
    category: 'necklaces',
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
  {
    id: 'NK004',
    name: 'Vintage Charm Necklace',
    category: 'necklaces',
    collections: ['fashion'],
    price: 2199,
    originalPrice: 3499,
    description: 'Antique-style necklace with traditional motifs',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80'
    ],
    metalType: 'Oxidized Silver',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 67
  },

  // Earrings
  {
    id: 'ER001',
    name: 'Crystal Stud Earrings',
    category: 'earrings',
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
  {
    id: 'ER002',
    name: 'Chandelier Drops',
    category: 'earrings',
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
  {
    id: 'ER003',
    name: 'Pearl Hoop Earrings',
    category: 'earrings',
    collections: ['fashion', 'office-wear'],
    price: 1599,
    originalPrice: 2299,
    description: 'Modern hoops adorned with pearls',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c0c97b8b0b4f?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 98
  },
  {
    id: 'ER004',
    name: 'Diamond Cluster Earrings',
    category: 'earrings',
    collections: ['diamond-sets', 'wedding'],
    price: 4299,
    originalPrice: 6499,
    description: 'Sparkling artificial diamond cluster earrings',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 187
  },
  {
    id: 'ER005',
    name: 'Bohemian Danglers',
    category: 'earrings',
    collections: ['fashion'],
    price: 1299,
    originalPrice: 1999,
    description: 'Colorful bohemian-style dangling earrings',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80'
    ],
    metalType: 'Oxidized Silver',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 76
  },

  // Rings
  {
    id: 'RG001',
    name: 'Solitaire Ring',
    category: 'rings',
    collections: ['diamond-sets', 'wedding'],
    price: 3499,
    originalPrice: 5499,
    description: 'Classic solitaire ring with artificial diamond',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 'RG002',
    name: 'Floral Band Ring',
    category: 'rings',
    collections: ['fashion', 'office-wear'],
    price: 1199,
    originalPrice: 1899,
    description: 'Delicate floral design gold band',
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 112
  },
  {
    id: 'RG003',
    name: 'Statement Cocktail Ring',
    category: 'rings',
    collections: ['party-wear'],
    price: 2299,
    originalPrice: 3499,
    description: 'Bold cocktail ring with colorful stones',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 'RG004',
    name: 'Minimalist Band Set',
    category: 'rings',
    collections: ['office-wear', 'fashion'],
    price: 999,
    originalPrice: 1499,
    description: 'Set of 3 minimalist stackable bands',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 145
  },
  {
    id: 'RG005',
    name: 'Vintage Gemstone Ring',
    category: 'rings',
    collections: ['wedding', 'fashion'],
    price: 2899,
    originalPrice: 4299,
    description: 'Antique-inspired ring with colorful gemstones',
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80'
    ],
    metalType: 'Oxidized Silver',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 98
  },

  // Bracelets & Bangles
  {
    id: 'BR001',
    name: 'Gold Chain Bracelet',
    category: 'bracelets',
    collections: ['fashion', 'office-wear'],
    price: 1599,
    originalPrice: 2499,
    description: 'Elegant gold chain bracelet with adjustable clasp',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 167
  },
  {
    id: 'BR002',
    name: 'Pearl Bangle Set',
    category: 'bracelets',
    collections: ['wedding', 'party-wear'],
    price: 2799,
    originalPrice: 3999,
    description: 'Set of 4 pearl-studded bangles',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 134
  },
  {
    id: 'BR003',
    name: 'Charm Bracelet',
    category: 'bracelets',
    collections: ['fashion'],
    price: 1299,
    originalPrice: 1999,
    description: 'Customizable charm bracelet with 5 charms',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 92
  },
  {
    id: 'BR004',
    name: 'Diamond Tennis Bracelet',
    category: 'bracelets',
    collections: ['diamond-sets', 'party-wear'],
    price: 4599,
    originalPrice: 6999,
    description: 'Luxurious tennis bracelet with artificial diamonds',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'White Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 176
  },
  {
    id: 'BR005',
    name: 'Traditional Kada Set',
    category: 'bracelets',
    collections: ['wedding', 'fashion'],
    price: 3299,
    originalPrice: 4999,
    description: 'Pair of traditional carved kadas',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 87
  },

  // Additional products for variety
  {
    id: 'NK005',
    name: 'Layered Chain Necklace',
    category: 'necklaces',
    collections: ['fashion', 'office-wear'],
    price: 1899,
    originalPrice: 2799,
    description: 'Trendy layered necklace with three delicate chains',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 102
  },
  {
    id: 'ER006',
    name: 'Teardrop Gemstone Earrings',
    category: 'earrings',
    collections: ['party-wear', 'fashion'],
    price: 2199,
    originalPrice: 3299,
    description: 'Colorful teardrop earrings with artificial gemstones',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 118
  },
  {
    id: 'RG006',
    name: 'Infinity Band Ring',
    category: 'rings',
    collections: ['office-wear', 'fashion'],
    price: 1499,
    originalPrice: 2199,
    description: 'Elegant infinity symbol ring with tiny crystals',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'BR006',
    name: 'Beaded Bracelet Stack',
    category: 'bracelets',
    collections: ['fashion'],
    price: 899,
    originalPrice: 1499,
    description: 'Set of 5 colorful beaded bracelets',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Mixed Metals',
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 134
  },
  {
    id: 'NK006',
    name: 'Choker Necklace Set',
    category: 'necklaces',
    collections: ['wedding', 'party-wear'],
    price: 4599,
    originalPrice: 6999,
    description: 'Bridal choker set with matching earrings',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: 'ER007',
    name: 'Minimalist Bar Studs',
    category: 'earrings',
    collections: ['office-wear', 'fashion'],
    price: 699,
    originalPrice: 999,
    description: 'Sleek bar stud earrings for modern look',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 201
  },
  {
    id: 'RG007',
    name: 'Crown Ring',
    category: 'rings',
    collections: ['party-wear', 'fashion'],
    price: 1799,
    originalPrice: 2699,
    description: 'Regal crown-shaped ring with crystals',
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 87
  },
  {
    id: 'BR007',
    name: 'Cuff Bracelet',
    category: 'bracelets',
    collections: ['party-wear', 'fashion'],
    price: 2499,
    originalPrice: 3799,
    description: 'Bold statement cuff with intricate patterns',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 93
  },
  {
    id: 'NK007',
    name: 'Locket Pendant',
    category: 'necklaces',
    collections: ['fashion', 'office-wear'],
    price: 1299,
    originalPrice: 1899,
    description: 'Heart-shaped locket with photo insert',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'ER008',
    name: 'Feather Earrings',
    category: 'earrings',
    collections: ['fashion', 'party-wear'],
    price: 1599,
    originalPrice: 2399,
    description: 'Lightweight feather design drop earrings',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c0c97b8b0b4f?w=800&q=80'
    ],
    metalType: 'Rose Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 112
  },
  {
    id: 'RG008',
    name: 'Tri-Color Band Set',
    category: 'rings',
    collections: ['fashion'],
    price: 1899,
    originalPrice: 2899,
    description: 'Set of 3 interlocking bands in mixed metals',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    metalType: 'Mixed Metals',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 129
  },
  {
    id: 'BR008',
    name: 'Link Chain Bracelet',
    category: 'bracelets',
    collections: ['office-wear', 'fashion'],
    price: 1199,
    originalPrice: 1799,
    description: 'Classic link chain bracelet with secure clasp',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    metalType: 'Gold Plated',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 143
  }
];
