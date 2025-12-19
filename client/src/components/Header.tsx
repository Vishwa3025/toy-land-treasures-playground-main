import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import useCartStore from "../store/CartStore";
import logo from "../assets/logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated } = useAuth();
  const { fetchCart, cart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = cart?.length || 0;

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-primary/40">
              <img src={logo} alt="FS Toys Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-baloo font-bold text-primary">
                <span className="text-orange-600">F</span><span className="text-white">S</span> <span className="text-white">Toys</span>
              </h1>
              <p className="text-sm text-white/80 font-baloo -mt-1">
                Factory
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["Home", "Products", "Categories", "About", "Contact"].map(item => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white/85 hover:text-primary font-poppins font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Search (Desktop) */}
          <form
            className="hidden lg:flex items-center bg-black/60 border border-white/10 rounded-2xl px-4 py-2 flex-1 max-w-md mx-8"
            onSubmit={e => {
              e.preventDefault();
              if (searchValue.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchValue)}`);
              }
            }}
          >
            <Search className="w-5 h-5 text-white/60 mr-2" />
            <input
              type="text"
              placeholder="Search for toys..."
              className="bg-transparent flex-1 outline-none text-white placeholder:text-white/50"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-white hover:text-primary">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Profile / Login */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-5">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {["Home", "Toys", "Categories", "About", "Contact"].map(item => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white/85 hover:text-primary font-poppins font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
