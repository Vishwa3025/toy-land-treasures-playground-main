import { useEffect, useState } from "react";
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
import { api } from "../utils/axiosInstance";

interface Product {
  id: string;
  name: string;
  description?: string;
  strikedPrice?: string;
  price: string;
  discount?: string;
  color?: string;
  stock: number;
  image1: string;
  createdAt?: string;
  rating?: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Optional: apply sorting
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return (b.rating || 0) - (a.rating || 0); // if rating exists
      case "newest":
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">Loading products...</p>
      </div>
    );
  }

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

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
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
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-card rounded-3xl p-6 mb-8 toy-shadow animate-fade-in">
            {/* Filter content (unchanged) */}
          </div>
        )}

        {/* Products Grid/List */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === "grid"
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 sm:h-72 md:h-80 lg:h-96">
                <ProductCard {...product} id={product.id.toString()} />
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
