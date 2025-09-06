import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import teddyBear from '@/assets/teddy-bear.jpg';
import buildingBlocks from '@/assets/building-blocks.jpg';
import toyCar from '@/assets/toy-car.jpg';
import princessDoll from '@/assets/princess-doll.jpg';

const products = [
  {
    id: 'teddy-bear-1',
    name: 'Super Soft Teddy Bear',
    price: 24.99,
    originalPrice: 34.99,
    image: teddyBear,
    rating: 5,
    reviewCount: 127,
    isNew: false,
    isSale: true
  },
  {
    id: 'building-blocks-1',
    name: 'Colorful Building Blocks Set',
    price: 39.99,
    image: buildingBlocks,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isSale: false
  },
  {
    id: 'toy-car-1',
    name: 'Lightning Speed Race Car',
    price: 19.99,
    originalPrice: 29.99,
    image: toyCar,
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: true
  },
  {
    id: 'princess-doll-1',
    name: 'Magical Princess Doll',
    price: 32.99,
    image: princessDoll,
    rating: 4.7,
    reviewCount: 203,
    isNew: true,
    isSale: false
  },
  // Add more duplicate products for demo
  {
    id: 'teddy-bear-2',
    name: 'Giant Cuddle Teddy Bear',
    price: 49.99,
    originalPrice: 59.99,
    image: teddyBear,
    rating: 4.9,
    reviewCount: 95,
    isNew: false,
    isSale: true
  },
  {
    id: 'building-blocks-2',
    name: 'Premium Building Blocks Set',
    price: 79.99,
    image: buildingBlocks,
    rating: 5,
    reviewCount: 142,
    isNew: true,
    isSale: false
  },
  {
    id: 'toy-car-2',
    name: 'Remote Control Race Car',
    price: 89.99,
    originalPrice: 119.99,
    image: toyCar,
    rating: 4.8,
    reviewCount: 78,
    isNew: false,
    isSale: true
  },
  {
    id: 'princess-doll-2',
    name: 'Royal Princess Castle Doll',
    price: 64.99,
    image: princessDoll,
    rating: 4.6,
    reviewCount: 167,
    isNew: true,
    isSale: false
  }
];

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-semibold">All Toys</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Discover Amazing Toys
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
            Explore our complete collection of magical toys that bring joy and wonder to children of all ages!
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setFilterOpen(!filterOpen)}
              className="hover-bounce"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground font-poppins">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground font-poppins">
              Showing {products.length} toys
            </span>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="hover-bounce"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="hover-bounce"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-card rounded-3xl p-6 mb-8 toy-shadow animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-baloo font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-2">
                  {['All', 'Stuffed Animals', 'Building Toys', 'Vehicles', 'Dolls'].map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer hover-bounce">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm font-poppins">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-baloo font-semibold text-foreground mb-3">Age Group</h3>
                <div className="space-y-2">
                  {['0-2 years', '3-5 years', '6-8 years', '9-12 years', '13+ years'].map((age) => (
                    <label key={age} className="flex items-center space-x-2 cursor-pointer hover-bounce">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm font-poppins">{age}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-baloo font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-2">
                  {['Under $25', '$25 - $50', '$50 - $100', '$100+'].map((price) => (
                    <label key={price} className="flex items-center space-x-2 cursor-pointer hover-bounce">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm font-poppins">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-baloo font-semibold text-foreground mb-3">Special Offers</h3>
                <div className="space-y-2">
                  {['On Sale', 'New Arrivals', 'Free Shipping', 'Bundle Deals'].map((offer) => (
                    <label key={offer} className="flex items-center space-x-2 cursor-pointer hover-bounce">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm font-poppins">{offer}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="hover-bounce">
            Load More Toys
            <span className="text-xl ml-2 animate-bounce-slow">🎁</span>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;