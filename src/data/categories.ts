export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subcategories?: Subcategory[];
}

export const categories: Category[] = [
  {
    id: 'necklaces',
    name: 'Necklaces & Pendants',
    slug: 'necklaces-pendants',
    description: 'Elegant necklaces and pendants for every occasion',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    featured: true,
    subcategories: [
      {
        id: 'choker-necklaces',
        name: 'Choker Necklaces',
        slug: 'choker-necklaces',
        description: 'Short, elegant necklaces that sit at the base of the neck'
      },
      {
        id: 'pendant-necklaces',
        name: 'Pendant Necklaces',
        slug: 'pendant-necklaces',
        description: 'Necklaces featuring beautiful pendant centerpieces'
      },
      {
        id: 'layered-necklaces',
        name: 'Layered Necklaces',
        slug: 'layered-necklaces',
        description: 'Multiple chains for a stylish, stacked look'
      },
      {
        id: 'statement-necklaces',
        name: 'Statement Necklaces',
        slug: 'statement-necklaces',
        description: 'Bold pieces that make a fashion statement'
      }
    ]
  },
  {
    id: 'earrings',
    name: 'Earrings',
    slug: 'earrings',
    description: 'Beautiful earrings from studs to chandeliers',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    featured: true,
    subcategories: [
      {
        id: 'stud-earrings',
        name: 'Stud Earrings',
        slug: 'stud-earrings',
        description: 'Simple, elegant earrings that sit close to the earlobe'
      },
      {
        id: 'hoop-earrings',
        name: 'Hoop Earrings',
        slug: 'hoop-earrings',
        description: 'Circular earrings in various sizes and designs'
      },
      {
        id: 'drop-earrings',
        name: 'Drop Earrings',
        slug: 'drop-earrings',
        description: 'Earrings that dangle below the earlobe'
      },
      {
        id: 'chandelier-earrings',
        name: 'Chandelier Earrings',
        slug: 'chandelier-earrings',
        description: 'Elaborate, multi-tiered earrings for special occasions'
      }
    ]
  },
  {
    id: 'rings',
    name: 'Rings',
    slug: 'rings',
    description: 'Stunning rings for fingers and toes',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    featured: true,
    subcategories: [
      {
        id: 'solitaire-rings',
        name: 'Solitaire Rings',
        slug: 'solitaire-rings',
        description: 'Single stone rings for elegant simplicity'
      },
      {
        id: 'stackable-rings',
        name: 'Stackable Rings',
        slug: 'stackable-rings',
        description: 'Mix and match rings for personalized style'
      },
      {
        id: 'cocktail-rings',
        name: 'Cocktail Rings',
        slug: 'cocktail-rings',
        description: 'Bold statement rings for special occasions'
      },
      {
        id: 'wedding-rings',
        name: 'Wedding Rings',
        slug: 'wedding-rings',
        description: 'Classic bands for eternal commitment'
      }
    ]
  },
  {
    id: 'bracelets',
    name: 'Bracelets & Bangles',
    slug: 'bracelets-bangles',
    description: 'Graceful bracelets and bangles',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    featured: true,
    subcategories: [
      {
        id: 'chain-bracelets',
        name: 'Chain Bracelets',
        slug: 'chain-bracelets',
        description: 'Delicate chain bracelets for everyday wear'
      },
      {
        id: 'cuff-bracelets',
        name: 'Cuff Bracelets',
        slug: 'cuff-bracelets',
        description: 'Bold cuff designs that make a statement'
      },
      {
        id: 'charm-bracelets',
        name: 'Charm Bracelets',
        slug: 'charm-bracelets',
        description: 'Personalized bracelets with meaningful charms'
      },
      {
        id: 'tennis-bracelets',
        name: 'Tennis Bracelets',
        slug: 'tennis-bracelets',
        description: 'Elegant line of stones for timeless beauty'
      }
    ]
  },
  {
    id: 'diamond-sets',
    name: 'Artificial Diamond Sets',
    slug: 'diamond-sets',
    description: 'Complete jewelry sets with artificial diamonds',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    featured: false,
    subcategories: [
      {
        id: 'necklace-sets',
        name: 'Necklace Sets',
        slug: 'necklace-sets',
        description: 'Complete necklace and earring combinations'
      },
      {
        id: 'bridal-sets',
        name: 'Bridal Sets',
        slug: 'bridal-sets',
        description: 'Complete sets for the perfect wedding day'
      },
      {
        id: 'party-sets',
        name: 'Party Wear Sets',
        slug: 'party-sets',
        description: 'Coordinated sets for special celebrations'
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion Jewelry',
    slug: 'fashion-jewelry',
    description: 'Trendy and contemporary jewelry pieces',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
    featured: true
    // No subcategories - this will show all products directly
  },
  {
    id: 'wedding',
    name: 'Wedding Collection',
    slug: 'wedding-collection',
    description: 'Special pieces for your big day',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    featured: true,
    subcategories: [
      {
        id: 'bridal-necklaces',
        name: 'Bridal Necklaces',
        slug: 'bridal-necklaces',
        description: 'Traditional necklaces for the bride'
      },
      {
        id: 'bridal-earrings',
        name: 'Bridal Earrings',
        slug: 'bridal-earrings',
        description: 'Elegant earrings to complete the bridal look'
      },
      {
        id: 'mangalsutra',
        name: 'Mangalsutra',
        slug: 'mangalsutra',
        description: 'Sacred necklace symbolizing marital status'
      }
    ]
  },
  {
    id: 'office-wear',
    name: 'Office Wear Jewelry',
    slug: 'office-wear',
    description: 'Subtle elegance for professional settings',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
    featured: false
    // No subcategories
  },
  {
    id: 'party-wear',
    name: 'Party Wear Collection',
    slug: 'party-wear',
    description: 'Statement pieces for celebrations',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80',
    featured: false,
    subcategories: [
      {
        id: 'evening-necklaces',
        name: 'Evening Necklaces',
        slug: 'evening-necklaces',
        description: 'Dramatic necklaces for evening events'
      },
      {
        id: 'statement-earrings',
        name: 'Statement Earrings',
        slug: 'statement-earrings',
        description: 'Bold earrings that command attention'
      },
      {
        id: 'cocktail-rings',
        name: 'Cocktail Rings',
        slug: 'cocktail-rings',
        description: 'Large, eye-catching rings for parties'
      }
    ]
  }
];