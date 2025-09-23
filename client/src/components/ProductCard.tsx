import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  strikedPrice?: string; // from API → "1000.00"
  price: string; // from API → "800.00"
  discount?: string; // "20.00"
  color?: string;
  stock: number;
  image1: string;
}

const ProductCard = ({
  id,
  name,
  description,
  strikedPrice,
  price,
  discount,
  color,
  stock,
  image1,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: { pathname: window.location.pathname } },
      });
      return;
    }

    addToCart({
      id,
      name,
      price: parseFloat(price),
      image: image1,
    });

    toast({
      title: "Added to cart! 🛒",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden toy-shadow transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div
        className="relative overflow-hidden h-36 sm:h-48 md:h-56"
        onClick={() => navigate(`/product/${id}`)}
      >
        {/* <Link to={`/product/${id}`}> */}
        <img
          src={image1}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* </Link> */}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full ${
            isWishlisted
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-white/80 text-foreground hover:bg-white"
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>

      {/* Product Info */}
      <div
        className="p-3 sm:p-4"
        onClick={() => navigate(`/product/${id}`)}
      >
        {/* <Link to={`/product/${id}`}> */}
        <h3 className="font-baloo font-medium text-sm sm:text-base line-clamp-2">
          {name}
        </h3>
        {/* </Link> */}
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        )}

        {/* Price & Discount */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-primary">
              ₹{parseFloat(price).toFixed(2)}
            </span>
            {strikedPrice && (
              <span className="text-xs sm:text-sm line-through text-muted-foreground">
                ₹{parseFloat(strikedPrice).toFixed(2)}
              </span>
            )}
          </div>
          {discount && (
            <span className="text-xs sm:text-sm font-semibold text-green-600">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Stock / Color */}
        <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-muted-foreground">
          <span>{stock > 0 ? `In stock: ${stock}` : "Out of stock"}</span>
          {color && <span className="capitalize">Color: {color}</span>}
        </div>

        {/* Add to Cart Button */}
        {/* <Button
          variant="lego"
          size="sm"
          className="w-full mt-3"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button> */}
      </div>
    </div>
  );
};

export default ProductCard;
