import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AnimatedNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6  text-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-8xl font-extrabold text-black mb-4">
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 mb-6 max-w-md">
        The page you're looking for doesn't exist. Let’s go back Home.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-black text-white rounded-full hover:scale-102 transition">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default AnimatedNotFound;
