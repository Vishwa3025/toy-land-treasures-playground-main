import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "../utils/axiosInstance";
import { log } from "console";

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
  image2?: string;
  image3?: string;
  image4?: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  ageGroup?: string;
  features?: string[];
  category_id?: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch product by ID
    api
      .get(`/products/${id}`)
      .then((res) => {
        const prod: Product = res.data;
        setProduct(prod);

        console.log('Fetched Product:', prod.category_id);
        // Fetch related products in the same category
        if (prod.category_id) {
          api
            .get(`/categories/${prod.category_id}/products`) //    get(`/categories/${id}/products`)

            .then((relatedRes) => {
              const filtered = relatedRes.data.filter(
                (p: Product) => p.id !== prod.id
              );
              setRelatedProducts(filtered);
              console.log("Related Products:", filtered);
            })
            .catch((err) =>
              console.error("Error fetching related products:", err)
            );
        }
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: `/product/${id}` } },
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image1,
    });

    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (!product) return;

    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist! ❤️",
      description: isWishlisted
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-baloo font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The toy you're looking for doesn't exist.
          </p>
          <Link to="/products">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm font-poppins">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            {category && (
              <>
                <Link
                  to={`/category/${category.id}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {category.name}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-foreground font-semibold">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-card rounded-3xl overflow-hidden toy-shadow">
              <img
                src={product.image1}
                alt={product.name}
                className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.strikedPrice && (
                  <Badge className="bg-primary text-primary-foreground">
                    {Math.round(
                      ((parseFloat(product.strikedPrice) -
                        parseFloat(product.price)) /
                        parseFloat(product.strikedPrice)) *
                        100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-baloo">
                  <span className="text-gray-700">Ages 3-12 years</span>
                </Badge>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-baloo font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-poppins leading-relaxed">
                {product.description}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400">★★★★☆</div>
                <span className="text-muted-foreground font-poppins">
                  4.9 (156 reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-baloo font-bold text-primary">
                ₹ {parseFloat(product.price).toFixed(2)}
              </span>
              {product.strikedPrice &&
                parseFloat(product.strikedPrice) >
                  parseFloat(product.price) && (
                  <span className="text-sm sm:text-base md:text-lg text-muted-foreground line-through font-poppins">
                    MRP ₹ {parseFloat(product.strikedPrice).toFixed(2)}
                  </span>
                )}
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-baloo font-semibold text-foreground mb-3">
                ✨ Key Features
              </h3>

              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground font-poppins">
                  <span className="text-accent mr-2">•</span>Die-cast body
                </li>
                <li className="flex items-center text-muted-foreground font-poppins">
                  <span className="text-accent mr-2">•</span>Working wheels
                </li>
                <li className="flex items-center text-muted-foreground font-poppins">
                  <span className="text-accent mr-2">•</span>Opening doors
                </li>
                <li className="flex items-center text-muted-foreground font-poppins">
                  <span className="text-accent mr-2">•</span>Realistic decals
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                variant="hero"
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                onClick={handleWishlist}
                variant="outline"
                size="lg"
                className={`${
                  isWishlisted ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-toy-cream">
              <div className="text-center">
                <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-poppins">
                  Safe & Tested
                </p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-poppins">
                  Free shipping
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-poppins">
                  30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-toy-cream">
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-baloo font-bold text-foreground mb-4">
                You Might Also Love
              </h2>
              <p className="text-muted-foreground font-poppins">
                More magical toys from the same category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    {...relatedProduct}
                    id={relatedProduct.id.toString()}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Previous Page
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
