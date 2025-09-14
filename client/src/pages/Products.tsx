import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import bikeImage from '@/assets/bike.png';
import jeepImage from '@/assets/jeep.png';
import carImage from '@/assets/toy-car.jpg';
const products = [
  // 🚗 Car Toys
  {
    id: "toy-car-1",
    name: "Lightning Speed Race Car",
    price: 19.99,
    originalPrice: 29.99,
    image: carImage, // import toyCar image
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: true,
  },
  {
    id: "toy-car-2",
    name: "Remote Control Race Car",
    price: 89.99,
    originalPrice: 119.99,
    image: carImage,
    rating: 4.8,
    reviewCount: 78,
    isNew: false,
    isSale: true,
  },

  // 🚘 Jeep Toys
  {
    id: "toy-jeep-1",
    name: "Adventure Off-Road Jeep",
    price: 34.99,
    image: jeepImage, // import toyJeep image
    rating: 4.7,
    reviewCount: 95,
    isNew: true,
    isSale: false,
  },
  {
    id: "toy-jeep-2",
    name: "Remote Control Jeep Wrangler",
    price: 59.99,
    originalPrice: 79.99,
    image: jeepImage,
    rating: 4.9,
    reviewCount: 120,
    isNew: false,
    isSale: true,
  },

  // 🏍️ Bike Toys
  {
    id: "toy-bike-1",
    name: "Speedster Toy Bike",
    price: 29.99,
    originalPrice: 39.99,
    image: bikeImage, // import toyBike image
    rating: 4.8,
    reviewCount: 112,
    isNew: true,
    isSale: true,
  },
  {
    id: "toy-bike-2",
    name: "Racing Stunt Motorbike",
    price: 49.99,
    image: bikeImage,
    rating: 4.7,
    reviewCount: 84,
    isNew: true,
    isSale: false,
  },
];


const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-semibold">
              All Toys
            </span>
          </div>

          <h1 className="text:2xl md:text-3xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Discover Amazing Toys
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto font-poppins">
            Explore our complete collection of magical toys that bring joy and
            wonder to children of all ages!
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
              <span className="text-sm text-muted-foreground font-poppins">
                Sort by:
              </span>
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
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-card rounded-3xl p-6 mb-8 toy-shadow animate-fade-in">
            {/* Filter content (unchanged) */}
          </div>
        )}

        {/* Products Grid */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === "grid"
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card wrapper with reduced size for mobile & tab */}
              <div className="h-64 sm:h-72 md:h-80 lg:h-96">
                <ProductCard {...product} />
              </div>
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
