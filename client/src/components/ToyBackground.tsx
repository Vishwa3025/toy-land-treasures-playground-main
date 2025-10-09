import { motion } from "framer-motion";

const bgEmojis = ["🧸", "🚗", "🎲", "🪁", "🦖", "🎯", "🛴", "🪀"];

const ToyBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
    {bgEmojis.map((emoji, i) => (
      <motion.div
        key={i}
        className="absolute text-4xl md:text-5xl lg:text-6xl select-none"
        style={{
          top: `${10 + i * 10}%`,
          left: `${(i % 2 === 0 ? 5 : 80) + (i * 2)}%`,
          opacity: 0.13 + (i % 3) * 0.07,
          filter: "blur(0.5px)",
        }}
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [0, -20, 0, 10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {emoji}
      </motion.div>
    ))}
  </div>
);

export default ToyBackground;
