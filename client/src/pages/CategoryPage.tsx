import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToyBackground from "@/components/ToyBackground";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { api } from "../utils/axiosInstance";

interface Product {
  id: number;
  name: string;
  image1: string;
  strikedPrice: number;
  price: number;
  stock: number;
  color?: string;
  description?: string;
  discount?: string;
  categoryId: number;
  [key: string]: any;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
  count?: number;
}

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`/categories/${id}/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-toy-cream/30">
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30 relative">
      <ToyBackground />
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Category Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-baloo font-bold text-foreground">
            Category Products
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Explore products in this category.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <ProductCard
                  {...product}
                  id={product.id.toString()}
                  strikedPrice={product.strikedPrice.toString()}
                  price={product.price.toString()}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-50">
              📦
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-baloo font-bold text-foreground mb-2">
              No toys found in this category
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              We're working on adding more magical toys to this category!
            </p>
          </div>
        )}

        {/* Back to Categories */}
        <div className="text-center">
          <Link to="/">
            <Button size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Categories
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
