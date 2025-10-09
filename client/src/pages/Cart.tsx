import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToyBackground from "@/components/ToyBackground";
import useCartStore from "../store/CartStore";
import { useAuth } from "@/contexts/AuthContext";

const Cart = () => {
  const cart = useCartStore((state) => state.cart || []);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const subtractFromCart = useCartStore((state) => state.subtractFromCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const deliveryFee = 0;

  const subtotal = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      const basePrice = item.Product?.price ? Number(item.Product.price) : 0;
      return total + basePrice * item.quantity;
    }, 0);
  }, [cart]);

  const total = subtotal + deliveryFee;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-4xl md:text-6xl mb-4">🔒</div>
          <h1 className="text-2xl md:text-3xl font-baloo font-bold text-foreground mb-4">
            Please Login First
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-8 font-poppins">
            You need to be logged in to view your cart.
          </p>
          <Link to="/login">
            <Button variant="hero" size="lg">
              Login to ToyLand
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-4xl md:text-6xl mb-4 animate-bounce-slow">
            🛒
          </div>
          <h1 className="text-2xl md:text-3xl font-baloo font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-8 font-poppins">
            Looks like you haven't added any magical toys yet!
          </p>
          <Link to="/products">
            <Button variant="hero" size="lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30 relative">
      <ToyBackground />
      <Header />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-xl md:text-2xl mr-2 animate-wiggle">🛒</span>
            <span className="text-primary font-baloo font-semibold">
              Your Shopping Cart
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Ready for Checkout?
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-poppins">
            Review your magical toy collection before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card
                key={item.id}
                className="toy-shadow bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Product Image */}
                    <img
                      src={item.Product?.image1}
                      alt={item.Product?.name}
                      className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-2xl hover:scale-105 transition-transform mx-auto sm:mx-0"
                    />

                    {/* Product Details */}
                    <div className="flex-1 w-full text-center sm:text-left">
                      <Link
                        to={`/product/${item.Product?.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-baloo font-semibold text-base md:text-lg text-foreground hover:text-primary">
                          {item.Product?.name || "Unknown Product"}
                        </h3>
                        <h6 className="font-poppins text-xs md:text-sm text-muted-foreground">
                          {item.color}
                        </h6>
                      </Link>
                      <p className="text-lg md:text-xl font-baloo font-bold text-primary mt-2">
                        ₹{" "}
                        {item.Product?.price
                          ? Number(item.Product.price).toFixed(2)
                          : "0.00"}
                      </p>
                    </div>

                    {/* Controls (stack nicely on mobile) */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => subtractFromCart(item.Product)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <span className="text-sm md:text-base font-baloo font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addToCart(item.Product, item.color)}
                          className="h-8 w-8 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="toy-shadow bg-card/80 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-baloo font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm md:text-base text-muted-foreground font-poppins">
                    <span>
                      Subtotal (
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-muted-foreground font-poppins">
                    <span>Shipping</span>
                    <span className="text-accent">FREE</span>
                  </div>
                  <div className="border-t border-toy-cream pt-4">
                    <div className="flex justify-between text-lg md:text-xl font-baloo font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">₹ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 lg:flex-col space-y-3 w-full">
                  <Link to="/checkout" className="flex-1">
                    <Button variant="hero" size="lg" className="w-full my-3">
                      Proceed to Checkout 🎉
                    </Button>
                  </Link>

                  <Link to="/products" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-toy-cream">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground font-poppins">
                    <div className="flex items-center">
                      <span className="text-accent mr-1">🔒</span>
                      Secure checkout
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-1">🚚</span>
                      Free shipping
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
