import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../utils/axiosInstance";
import Header from "./Header";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // get current route

  useEffect(() => {
    // Fetch categories from backend
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  // Emoji pool for floating background
  const bgEmojis = ["🧸", "🚗", "🎲", "🪁", "🦖", "🎯", "🛴", "🪀"];

  return (
    <section className="py-3 relative bg-gradient-to-b from-toy-cream/40 to-background">
      {/* Floating animated emojis in background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bgEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-5xl lg:text-6xl select-none"
            style={{
              top: `${10 + i * 10}%`,
              left: `${(i % 2 === 0 ? 5 : 80) + i * 2}%`,
              opacity: 0.13 + (i % 3) * 0.07,
              filter: "blur(0.5px)",
            }}
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, -20, 0, 10, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Show Header only if route is not home */}
      {location.pathname !== "/" && <Header />}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Playful, improved design */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100 rounded-full px-6 py-2 mb-4 shadow-lg">
            <span className="text-3xl mr-3 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-extrabold text-base md:text-xl ">
              Explore Our Categories
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-baloo font-extrabold text-foreground mb-2 flex items-center justify-center gap-2">
            <span className="drop-shadow-sm">Find the Perfect Toy</span>
            <span className="ml-1 animate-bounce">🧸</span>
          </h2>
          <div className="mx-auto w-24 h-2 bg-gradient-to-r from-pink-300 via-yellow-300 to-blue-300 rounded-full mt-2 mb-2 opacity-80"></div>
        </div>

        {/* Horizontal Scroll Categories */}
        <div
          className="flex space-x-3 sm:space-x-8 overflow-x-auto lg:overflow-x-visible pb-4 snap-x snap-mandatory scrollbar-hide px-2 sm:px-0 lg:justify-center"
          style={{ overflowY: "hidden" }}
        >
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px] lg:min-w-[260px] rounded-2xl toy-shadow hover:playful-shadow flex-shrink-0 snap-start p-3 sm:p-5 md:p-6 text-center transition-transform duration-300 hover:-translate-y-2 bg-card/90"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 30px hsl(var(--toy-yellow) / 0.3)",
              }}
            >
              {/* Image */}
              <motion.div
                className="mb-2 sm:mb-3"
                whileHover={{ rotate: [0, 8, -8, 0], scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[90px] sm:h-[120px] md:h-[150px] object-cover rounded-xl"
                />
              </motion.div>

              {/* Name with emoji */}
              <h3 className="text-base sm:text-lg font-baloo font-bold text-foreground mb-2 sm:mb-3 flex items-center justify-center gap-1">
                {category.name} {idx % 2 === 0 ? "🚗" : "🏍️"}
              </h3>

              {/* CTA */}
              <Link to={`/categories/${category.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {location.pathname == "/" && (
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="hero" size="lg">
                View All Categories <span className="ml-1">🎲</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
