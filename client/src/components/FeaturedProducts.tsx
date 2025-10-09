import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
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
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        // Take only first 4 products
        setProducts(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-10 flex justify-center items-center">
        <p className="text-muted-foreground text-lg">
          Loading featured products...
        </p>
      </div>
    );
  }

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-accent mr-2 animate-spin-slow" />
            <span className="text-accent font-baloo font-semibold">
              Featured Collection
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Most Loved Toys
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
            Discover our most popular toys that bring smiles to children's faces
            every day. These magical treasures are loved by kids and trusted by
            parents!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                {...product}
                id={product.id}
                strikedPrice={product.strikedPrice}
                price={product.price}
              />
            </div>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="mt-10 sm:mt-12 md:mt-16 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl md:text-4xl mr-1 sm:mr-2 animate-bounce-slow">
              🎁
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-baloo font-bold text-foreground">
              Special Offers
            </h3>
            <span className="text-2xl sm:text-3xl md:text-4xl ml-1 sm:ml-2 animate-bounce-slow">
              🎁
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 font-poppins max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Get amazing deals on our featured toys! Limited time offers that
            make every purchase extra special.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <div className="bg-accent text-accent-foreground px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-baloo font-bold text-sm sm:text-base md:text-lg animate-wiggle">
              ✨ Free Shipping Over 10,000 INR
            </div>
            <div className="bg-secondary text-secondary-foreground px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-baloo font-bold text-sm sm:text-base md:text-lg animate-wiggle">
              🎊 3-Day Returns
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
