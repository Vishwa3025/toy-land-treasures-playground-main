import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import teddyBear from "@/assets/teddy-bear.jpg";
import buildingBlocks from "@/assets/building-blocks.jpg";
import toyCar from "@/assets/toy-car.jpg";
import princessDoll from "@/assets/princess-doll.jpg";

const featuredProducts = [
  {
    id: "teddy-bear-1",
    name: "Super Soft Teddy Bear",
    price: 24.99,
    originalPrice: 34.99,
    image: teddyBear,
    rating: 5,
    reviewCount: 127,
    isNew: false,
    isSale: true,
  },
  {
    id: "building-blocks-1",
    name: "Colorful Building Blocks Set",
    price: 39.99,
    image: buildingBlocks,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isSale: false,
  },
  {
    id: "toy-car-1",
    name: "Lightning Speed Race Car",
    price: 19.99,
    originalPrice: 29.99,
    image: toyCar,
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isSale: true,
  },
  {
    id: "princess-doll-1",
    name: "Magical Princess Doll",
    price: 32.99,
    image: princessDoll,
    rating: 4.7,
    reviewCount: 203,
    isNew: true,
    isSale: false,
  },
];

const FeaturedProducts = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 rounded-3xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-2 animate-bounce-slow">🎁</span>
            <h3 className="text-3xl font-baloo font-bold text-foreground">
              Special Offers
            </h3>
            <span className="text-4xl ml-2 animate-bounce-slow">🎁</span>
          </div>

          <p className="text-lg text-muted-foreground mb-6 font-poppins max-w-2xl mx-auto">
            Get amazing deals on our featured toys! Limited time offers that
            make every purchase extra special.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-baloo font-bold text-lg animate-wiggle">
              🔥 Buy 2 Get 1 FREE
            </div>
            <div className="bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-baloo font-bold text-lg animate-wiggle">
              ✨ Free Shipping Over $50
            </div>
            <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl font-baloo font-bold text-lg animate-wiggle">
              🎊 30-Day Returns
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
