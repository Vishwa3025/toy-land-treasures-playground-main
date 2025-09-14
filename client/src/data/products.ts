import bikeImage from '@/assets/bike.png';
import jeepImage from '@/assets/jeep.png';
import carImage from '@/assets/toy-car.jpg';

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
    id: 'bike',
    name: 'Bike',
    icon: '🏍️',
    color: 'from-primary to-primary/70',
    description: 'Durable and fun bikes for kids',
    count: '10+ toys'
  },
  {
    id: 'jeep',
    name: 'Jeep',
    icon: '🚘',
    color: 'from-accent to-accent/70',
    description: 'Mini jeeps for real adventure rides',
    count: '8+ toys'
  },
  {
    id: 'car',
    name: 'Car',
    icon: '🚗',
    color: 'from-secondary to-secondary/70',
    description: 'Stylish and speedy toy cars',
    count: '12+ toys'
  }
];

export const products: Product[] = [
  // Bikes
  {
    id: 'toy-bike-1',
    name: 'Speed Rider Bike',
    price: 149.99,
    originalPrice: 179.99,
    image: bikeImage,
    rating: 4.8,
    reviewCount: 98,
    isNew: true,
    isSale: true,
    description: 'Lightweight, durable bike for kids with training wheels.',
    fullDescription: 'Our Speed Rider Bike is designed for safety and fun, featuring sturdy wheels, a comfortable seat, and a sleek design perfect for young riders.',
    ageGroup: '4-12 years',
    categoryId: 'bike',
    features: ['Training wheels included', 'Lightweight frame', 'Durable tires', 'Adjustable seat']
  },
  {
    id: 'toy-bike-2',
    name: 'Mountain Explorer Bike',
    price: 199.99,
    image: bikeImage,
    rating: 4.9,
    reviewCount: 134,
    isNew: false,
    isSale: false,
    description: 'Rugged mountain bike for adventurous kids.',
    fullDescription: 'The Mountain Explorer Bike comes with strong suspension, thick tires, and a cool design. Ideal for off-road play and outdoor adventures.',
    ageGroup: '6-14 years',
    categoryId: 'bike',
    features: ['Strong suspension', 'Thick rubber tires', 'Ergonomic handlebars', 'Durable steel frame']
  },

  // Jeeps
  {
    id: 'toy-jeep-1',
    name: 'Mini Adventure Jeep',
    price: 249.99,
    originalPrice: 299.99,
    image: jeepImage,
    rating: 4.7,
    reviewCount: 110,
    isNew: true,
    isSale: true,
    description: 'Electric jeep toy with working headlights and sounds.',
    fullDescription: 'Our Mini Adventure Jeep is battery-powered, offering a real driving experience for kids with steering, pedals, headlights, and realistic engine sounds.',
    ageGroup: '3-10 years',
    categoryId: 'jeep',
    features: ['Rechargeable battery', 'Working headlights', 'Horn & sound effects', 'Durable body']
  },
  {
    id: 'toy-jeep-2',
    name: 'Desert Safari Jeep',
    price: 279.99,
    image: jeepImage,
    rating: 4.6,
    reviewCount: 87,
    isNew: false,
    isSale: false,
    description: 'Rugged jeep with safari-style design for adventures.',
    fullDescription: 'Take on wild adventures with our Desert Safari Jeep. Designed for durability and fun, it features bold wheels, open-top design, and stylish decals.',
    ageGroup: '4-12 years',
    categoryId: 'jeep',
    features: ['Safari design', 'Durable wheels', 'Open top', 'Child-safe materials']
  },

  // Cars
  {
    id: 'toy-car-1',
    name: 'Lightning Speed Car',
    price: 59.99,
    originalPrice: 79.99,
    image: carImage,
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: true,
    description: 'Fast racing toy car with realistic details.',
    fullDescription: 'Experience the thrill of racing with our Lightning Speed Car! This detailed model features working wheels, opening doors, and authentic racing decals.',
    ageGroup: '3-12 years',
    categoryId: 'car',
    features: ['Die-cast body', 'Working wheels', 'Opening doors', 'Realistic decals']
  },
  {
    id: 'toy-car-2',
    name: 'Luxury Sedan Car',
    price: 69.99,
    image: carImage,
    rating: 4.8,
    reviewCount: 142,
    isNew: true,
    isSale: false,
    description: 'Stylish toy sedan with detailed interior.',
    fullDescription: 'The Luxury Sedan Car comes with a sleek design, detailed interior, and smooth ride. Perfect for roleplay and collectors.',
    ageGroup: '3-12 years',
    categoryId: 'car',
    features: ['Detailed interior', 'Stylish body', 'Smooth wheels', 'Premium finish']
  }
];

// Helpers
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
