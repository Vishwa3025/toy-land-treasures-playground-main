import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-4xl font-baloo font-bold text-foreground mb-4">
            Please Login First
          </h1>
          <p className="text-muted-foreground mb-8 font-poppins">
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4 animate-bounce-slow">🛒</div>
          <h1 className="text-4xl font-baloo font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8 font-poppins">
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
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-wiggle">🛒</span>
            <span className="text-primary font-baloo font-semibold">Your Shopping Cart</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Ready for Checkout?
          </h1>
          <p className="text-xl text-muted-foreground font-poppins">
            Review your magical toy collection before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="toy-shadow bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-2xl hover:scale-105 transition-transform"
                      />
                    </Link>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <Link 
                        to={`/product/${item.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-baloo font-semibold text-lg text-foreground hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-2xl font-baloo font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="text-lg font-baloo font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="toy-shadow bg-card/80 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-baloo font-bold text-foreground mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground font-poppins">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-poppins">
                    <span>Shipping</span>
                    <span className="text-accent">FREE</span>
                  </div>
                  <div className="border-t border-toy-cream pt-4">
                    <div className="flex justify-between text-xl font-baloo font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link to="/checkout">
                    <Button variant="hero" size="lg" className="w-full">
                      Proceed to Checkout 🎉
                    </Button>
                  </Link>
                  
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-toy-cream">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-poppins">
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