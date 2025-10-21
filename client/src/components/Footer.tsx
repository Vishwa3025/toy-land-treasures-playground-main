import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-toy-cream/20 border-t-2 border-toy-cream">
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 hover-bounce">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-toy-yellow rounded-2xl flex items-center justify-center animate-wiggle">
                <span className="text-xl sm:text-2xl">🧸</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-baloo font-bold text-primary">F & S</h1>
                <p className="text-xs sm:text-sm text-accent font-baloo -mt-1">Toys</p>
              </div>
            </Link>
            
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-poppins leading-relaxed">
              Bringing joy and wonder to children worldwide through magical toys that spark imagination and create unforgettable memories.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover-bounce">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover-bounce">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover-bounce">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover-bounce">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-baloo font-bold text-foreground flex items-center">
              <span className="text-lg sm:text-2xl mr-2">🎪</span>
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/products" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                All Toys
              </Link>
              <Link to="/categories" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Categories
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-baloo font-bold text-foreground flex items-center">
              <span className="text-lg sm:text-2xl mr-2">🎯</span>
              Help & Support
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping-policy" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Shipping Info
              </Link>
              <Link to="/refund-policy" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Refund Policy
              </Link>
              <Link to="/privacy-policy" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary font-poppins hover-bounce transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-baloo font-bold text-foreground flex items-center">
              <span className="text-lg sm:text-2xl mr-2">📞</span>
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary transition-colors group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-wiggle" />
                <span className="font-poppins">+91 73389 42533</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary transition-colors group">
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-wiggle" />
                <span className="font-poppins">+91 95661 58201</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary transition-colors group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce-slow" />
                <span className="font-poppins">hello@f&stoys.com</span>
              </div>
              <div className="flex items-start space-x-3 text-xs sm:text-sm md:text-base text-muted-foreground hover:text-primary transition-colors group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 group-hover:animate-bounce-slow" />
                <span className="font-poppins">
                  46, Agatheeswarar Kovil St,<br />
                  Mahalakshmi Nagar, Kolapakkam, Chennai 600122.
                </span>
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-toy-cream/30 rounded-2xl p-4 mt-6">
              <h4 className="font-baloo font-semibold text-sm sm:text-base md:text-lg text-foreground mb-2 flex items-center">
                <span className="text-lg sm:text-xl mr-2">🕐</span>
                Store Hours
              </h4>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-poppins space-y-1">
                <div>All Days: 10AM - 9PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-toy-cream bg-toy-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-muted-foreground font-poppins">
              <span>© 2025 LittledreamersToys. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base text-primary font-poppins">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-bounce-slow fill-current" />
              <span>for magical childhoods</span>
              <span className="text-lg sm:text-xl animate-wiggle">✨</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
