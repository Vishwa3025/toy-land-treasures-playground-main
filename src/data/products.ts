import teddyBear from '@/assets/teddy-bear.jpg';
import buildingBlocks from '@/assets/building-blocks.jpg';
import toyCar from '@/assets/toy-car.jpg';
import princessDoll from '@/assets/princess-doll.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  fullDescription: string;
  ageGroup: string;
  categoryId: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  count: string;
}

export const categories: Category[] = [
  {
    id: 'stuffed-animals',
    name: 'Stuffed Animals',
    icon: '🧸',
    color: 'from-primary to-primary/70',
    description: 'Cuddly companions for endless hugs',
    count: '25+ toys'
  },
  {
    id: 'educational',
    name: 'Educational Toys',
    icon: '📚',
    color: 'from-accent to-accent/70',
    description: 'Learning through play and discovery',
    count: '18+ toys'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Fun',
    icon: '⚽',
    color: 'from-secondary to-secondary/70',
    description: 'Active play for healthy adventures',
    count: '12+ toys'
  },
  {
    id: 'action-figures',
    name: 'Action Figures',
    icon: '🦸',
    color: 'from-toy-yellow to-toy-yellow/70',
    description: 'Heroes and adventures await',
    count: '30+ toys'
  },
  {
    id: 'building',
    name: 'Building & Construction',
    icon: '🔧',
    color: 'from-toy-mint to-toy-mint/70',
    description: 'Create, build, and imagine',
    count: '15+ toys'
  },
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    icon: '🎨',
    color: 'from-toy-pale-blue to-toy-pale-blue/70',
    description: 'Express creativity and make magic',
    count: '20+ toys'
  }
];

export const products: Product[] = [
  // Stuffed Animals
  {
    id: 'teddy-bear-1',
    name: 'Super Soft Teddy Bear',
    price: 24.99,
    originalPrice: 34.99,
    image: teddyBear,
    rating: 5,
    reviewCount: 127,
    isNew: false,
    isSale: true,
    description: 'A wonderfully soft and cuddly teddy bear perfect for bedtime.',
    fullDescription: 'Our Super Soft Teddy Bear is made from the finest plush materials, ensuring the softest touch for your little one. This adorable companion is perfect for bedtime snuggles, playtime adventures, and providing comfort throughout the day. Machine washable and built to last through years of love.',
    ageGroup: '0-12 years',
    categoryId: 'stuffed-animals',
    features: ['Ultra-soft plush material', 'Machine washable', 'Safe for all ages', 'Hypoallergenic stuffing']
  },
  {
    id: 'bunny-rabbit-1',
    name: 'Adorable Bunny Rabbit',
    price: 19.99,
    image: teddyBear,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isSale: false,
    description: 'Cute and cuddly bunny with long, soft ears.',
    fullDescription: 'This adorable bunny rabbit features extra-long, velvety ears that are perfect for little hands to hold. Made with premium materials and attention to detail, this bunny will become your child\'s favorite companion.',
    ageGroup: '0-10 years',
    categoryId: 'stuffed-animals',
    features: ['Extra-long soft ears', 'Premium materials', 'Child-safe construction', 'Perfect size for hugging']
  },

  // Building & Construction
  {
    id: 'building-blocks-1',
    name: 'Colorful Building Blocks Set',
    price: 39.99,
    image: buildingBlocks,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isSale: false,
    description: 'Creative building blocks to spark imagination and learning.',
    fullDescription: 'This comprehensive building blocks set includes 100 colorful pieces in various shapes and sizes. Perfect for developing fine motor skills, creativity, and spatial awareness. All blocks are made from safe, non-toxic materials and are compatible with major building block brands.',
    ageGroup: '3-12 years',
    categoryId: 'building',
    features: ['100 colorful pieces', 'Compatible with major brands', 'Non-toxic materials', 'Storage container included']
  },
  {
    id: 'magnetic-tiles-1',
    name: 'Magnetic Building Tiles',
    price: 45.99,
    image: buildingBlocks,
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: false,
    description: 'Magnetic tiles for endless 3D construction possibilities.',
    fullDescription: 'These high-quality magnetic tiles feature strong magnets and vibrant colors. Create towers, houses, and fantastic structures while learning about geometry and engineering principles. Set includes 60 pieces in various shapes.',
    ageGroup: '3-10 years',
    categoryId: 'building',
    features: ['Strong magnetic connection', '60 pieces included', 'STEM learning', 'Various geometric shapes']
  },

  // Action Figures
  {
    id: 'toy-car-1',
    name: 'Lightning Speed Race Car',
    price: 19.99,
    originalPrice: 29.99,
    image: toyCar,
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: true,
    description: 'Fast racing car with realistic details and smooth wheels.',
    fullDescription: 'Experience the thrill of racing with our Lightning Speed Race Car! This detailed die-cast model features working wheels, opening doors, and authentic racing decals. Built for speed and durability, it\'s perfect for imaginative play and collecting.',
    ageGroup: '3-12 years',
    categoryId: 'action-figures',
    features: ['Die-cast metal construction', 'Working wheels', 'Opening doors', 'Realistic racing details']
  },
  {
    id: 'superhero-figure-1',
    name: 'Mighty Hero Action Figure',
    price: 24.99,
    image: toyCar,
    rating: 4.7,
    reviewCount: 203,
    isNew: true,
    isSale: false,
    description: 'Poseable superhero figure with cape and accessories.',
    fullDescription: 'Join the adventure with our Mighty Hero Action Figure! This 6-inch figure features multiple points of articulation, a removable cape, and awesome accessories. Perfect for recreating heroic scenes and creating new adventures.',
    ageGroup: '4-12 years',
    categoryId: 'action-figures',
    features: ['6-inch articulated figure', 'Removable cape', 'Action accessories', 'Multiple poses possible']
  },

  // Educational Toys
  {
    id: 'princess-doll-1',
    name: 'Magical Princess Doll',
    price: 32.99,
    image: princessDoll,
    rating: 4.7,
    reviewCount: 203,
    isNew: true,
    isSale: false,
    description: 'Beautiful princess doll with gorgeous dress and accessories.',
    fullDescription: 'Our Magical Princess Doll comes with a stunning gown, tiara, and magical wand. Her hair can be styled and she comes with additional outfit accessories. Perfect for imaginative role-play and storytelling adventures.',
    ageGroup: '3-10 years',
    categoryId: 'educational',
    features: ['Beautiful detailed dress', 'Styleable hair', 'Tiara and wand included', 'Additional accessories']
  },
  {
    id: 'learning-tablet-1',
    name: 'Interactive Learning Tablet',
    price: 49.99,
    image: princessDoll,
    rating: 4.8,
    reviewCount: 134,
    isNew: false,
    isSale: false,
    description: 'Educational tablet with games, songs, and learning activities.',
    fullDescription: 'This interactive learning tablet features over 50 educational activities covering letters, numbers, shapes, and more. With colorful graphics and engaging sounds, learning becomes fun and interactive for young minds.',
    ageGroup: '2-6 years',
    categoryId: 'educational',
    features: ['50+ learning activities', 'Interactive touchscreen', 'Educational games', 'Volume control']
  },

  // Outdoor Fun
  {
    id: 'soccer-ball-1',
    name: 'Premium Soccer Ball',
    price: 15.99,
    image: toyCar,
    rating: 4.6,
    reviewCount: 87,
    isNew: false,
    isSale: false,
    description: 'High-quality soccer ball for outdoor play and sports.',
    fullDescription: 'This premium soccer ball is perfect for backyard games and developing athletic skills. Made with durable materials and featuring a classic design, it\'s suitable for children of all skill levels.',
    ageGroup: '5-15 years',
    categoryId: 'outdoor',
    features: ['Durable construction', 'Official size and weight', 'Weather resistant', 'Classic design']
  },

  // Arts & Crafts
  {
    id: 'art-set-1',
    name: 'Ultimate Art Set',
    price: 29.99,
    originalPrice: 39.99,
    image: buildingBlocks,
    rating: 4.9,
    reviewCount: 167,
    isNew: false,
    isSale: true,
    description: 'Complete art set with crayons, markers, and drawing paper.',
    fullDescription: 'Unleash creativity with our Ultimate Art Set! This comprehensive kit includes 64 crayons, 20 markers, colored pencils, drawing paper, and a handy carrying case. Perfect for budding artists and creative expression.',
    ageGroup: '3-12 years',
    categoryId: 'arts-crafts',
    features: ['64 vibrant crayons', '20 washable markers', 'Colored pencils', 'Drawing paper included', 'Portable carrying case']
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

export const getRelatedProducts = (productId: string, categoryId: string): Product[] => {
  return products
    .filter(product => product.categoryId === categoryId && product.id !== productId)
    .slice(0, 4);
};