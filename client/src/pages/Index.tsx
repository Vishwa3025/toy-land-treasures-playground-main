import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

import { motion } from "framer-motion";

const pastelShapes = [
  { className: "bg-toy-yellow", style: { top: "10%", left: "5%", width: 80, height: 80, opacity: 0.25, filter: "blur(2px)" } },
  { className: "bg-toy-mint", style: { top: "60%", left: "80%", width: 100, height: 100, opacity: 0.22, filter: "blur(3px)" } },
  { className: "bg-toy-sky", style: { top: "80%", left: "20%", width: 120, height: 120, opacity: 0.18, filter: "blur(4px)" } },
  { className: "bg-toy-cream", style: { top: "30%", left: "60%", width: 70, height: 70, opacity: 0.2, filter: "blur(2px)" } },
];

const Index = () => {
  return (
  <div className="min-h-screen relative overflow-hidden">
      {/* Animated floating pastel shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {pastelShapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${shape.className}`}
            style={{
              ...shape.style,
              top: shape.style.top,
              left: shape.style.left,
              width: shape.style.width,
              height: shape.style.height,
              opacity: shape.style.opacity,
              filter: shape.style.filter,
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0, 10, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      {/* Main content above background */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Categories />
          <FeaturedProducts />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
