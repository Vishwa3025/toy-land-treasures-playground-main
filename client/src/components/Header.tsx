import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UseUser from "../hooks/UseUser";
import { ShoppingCart, Search, Menu, X, Heart, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b-2 border-toy-cream sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-bounce">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-toy-yellow rounded-2xl flex items-center justify-center animate-wiggle">
              <span className="text-2xl">🧸</span>
            </div>
            <div>
              <h1 className="text-2xl font-baloo font-bold text-primary">
                F & S
              </h1>
              <p className="text-sm text-accent font-baloo -mt-1">Toys</p>
            </div>
          </Link>

          {/* Desktop Navigation (only visible on large screens) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary font-poppins font-medium hover-bounce"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-foreground hover:text-primary font-poppins font-medium hover-bounce"
            >
              Toys
            </Link>
            <Link
              to="/categories"
              className="text-foreground hover:text-primary font-poppins font-medium hover-bounce"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary font-poppins font-medium hover-bounce"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary font-poppins font-medium hover-bounce"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar - only desktop (large screens) */}
          <div className="hidden lg:flex items-center bg-toy-cream/50 rounded-2xl px-4 py-2 flex-1 max-w-md mx-8">
            <Search className="w-5 h-5 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search for magical toys..."
              className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist - desktop only */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover-bounce hidden lg:flex"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart - all screens */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover-bounce"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce-slow">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hover-bounce">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Hamburger menu - visible on tablet & mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover-bounce"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-toy-cream/50 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary font-poppins font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-primary font-poppins font-medium py-2"
              >
                Toys
              </Link>
              <Link
                to="/categories"
                className="text-foreground hover:text-primary font-poppins font-medium py-2"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary font-poppins font-medium py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary font-poppins font-medium py-2"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
