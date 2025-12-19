import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../utils/axiosInstance";
import Header from "./Header";
import { motion } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
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

  const bgEmojis = ["🧸", "🚗", "🎲", "🪁", "🦖", "🎯", "🛴", "🪀"];

  return (
    <section className="relative py-6 bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
      {/* Floating background emojis */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bgEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-5xl lg:text-6xl select-none"
            style={{
              top: `${10 + i * 10}%`,
              left: `${(i % 2 === 0 ? 5 : 80) + i * 2}%`,
              opacity: 0.12,
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

      {/* Header (not on home) */}
      {location.pathname !== "/" && <Header />}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/15 border border-primary/30 rounded-full px-6 py-2 mb-4 shadow-lg">
            <span className="text-3xl mr-3 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-extrabold text-base md:text-xl">
              Explore Our Categories
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-baloo font-extrabold text-foreground mb-2 flex items-center justify-center gap-2">
            Find the Perfect Toy <span className="animate-bounce">🧸</span>
          </h2>

          <div className="mx-auto w-24 h-2 bg-gradient-to-r from-primary via-toy-yellow to-accent rounded-full mt-2 opacity-80"></div>
        </div>

        {/* Categories Scroll */}
        <div
          className="flex space-x-4 sm:space-x-8 overflow-x-auto lg:overflow-x-visible pb-4 snap-x snap-mandatory scrollbar-hide px-2 sm:px-0 lg:justify-center"
          style={{ overflowY: "hidden" }}
        >
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[260px] bg-card text-muted-foreground border border-border rounded-2xl toy-shadow hover:playful-shadow flex-shrink-0 snap-start p-4 sm:p-5 md:p-6 text-center transition-all duration-300"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 30px hsl(var(--toy-yellow) / 0.35)",
              }}
            >
              {/* Image */}
              <motion.div
                className="mb-3"
                whileHover={{ rotate: [0, 8, -8, 0], scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[100px] sm:h-[130px] md:h-[150px] object-cover rounded-xl"
                />
              </motion.div>

              {/* Name */}
              <h3 className="text-base sm:text-lg font-baloo font-bold mb-3 flex items-center justify-center gap-1">
                {category.name} {idx % 2 === 0 ? "🚗" : "🏍️"}
              </h3>

              {/* Button */}
              <Link to={`/categories/${category.id}`}>
                <Button
                  size="sm"
                  className="w-full border border-primary text-muted-foreground hover:bg-primary hover:text-white transition-all"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        {location.pathname === "/" && (
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="hero" size="lg">
                View All Categories 🎲
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
