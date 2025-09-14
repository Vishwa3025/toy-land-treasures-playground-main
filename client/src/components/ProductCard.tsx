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
  price: number;
  originalPrice?: number;
  image: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
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

    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart! 🛒",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden toy-shadow transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative overflow-hidden h-28 sm:h-40 md:h-40">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

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
      <div className="p-3 sm:p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-baloo font-medium text-sm sm:text-base line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-base sm:text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs sm:text-sm line-through text-muted-foreground">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button (always visible on mobile) */}
        <Button
          variant="lego"
          size="sm"
          className="w-full mt-3"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
