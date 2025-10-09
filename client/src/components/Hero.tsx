import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Gift } from 'lucide-react';
import heroImage from '@/assets/hero-toys.jpg';
import ToyBackground from './ToyBackground';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background min-h-[80vh] flex items-center">
      <ToyBackground />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center bg-primary/10 rounded-full px-4 py-2 hover-bounce">
                <Star className="w-5 h-5 text-toy-yellow mr-2 animate-spin-slow" />
                <span className="text-primary font-baloo font-semibold">Magical Toys Await!</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-baloo font-bold mb-6 leading-tight">
              <span className="text-primary">Welcome to</span>
              <br />
              <span className="bg-gradient-to-r from-toy-yellow via-accent to-secondary bg-clip-text text-transparent animate-float">
                F & S Toys
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl font-poppins leading-relaxed">
              Discover a magical world of toys that spark imagination and create unforgettable memories. 
              From cuddly companions to educational adventures, we have the perfect toy for every child!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                <Gift className="w-6 h-6 mr-2 group-hover:animate-wiggle" />
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="font-baloo font-semibold">
                Explore Categories
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 sm:space-x-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-baloo font-bold text-primary">10,000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Happy Kids</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-baloo font-bold text-accent">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Unique Toys</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-baloo font-bold text-secondary">5⭐</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden playful-shadow">
              <img
                src={heroImage}
                alt="Colorful toys floating in a magical scene"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Sale Badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full w-24 h-24 flex items-center justify-center animate-bounce-slow playful-shadow">
              <div className="text-center">
                <div className="font-baloo font-bold text-lg">SALE</div>
                <div className="font-baloo text-sm">30% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import { useEffect, useState } from "react";
// import { api } from "../utils/axiosInstance";

// const sliderTitles = ["banner1", "banner2", "banner3"];

// const Hero = () => {
//   const [images, setImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch images dynamically
//   useEffect(() => {
//     const fetchSliderImages = async () => {
//       try {
//         const imagePromises = sliderTitles.map(
//           (title) =>
//             api
//               .get(`/images/title/${encodeURIComponent(title)}`)
//               .then((res) => res.data.image || res.data.imageUrl)
//               .catch(() => null) // Ignore failed requests
//         );

//         const fetchedImages = await Promise.all(imagePromises);
//         const validImages = fetchedImages.filter(Boolean);

//         setImages(validImages);
//       } catch (err) {
//         console.error("Hero fetch failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSliderImages();
//   }, []);

//   // Auto-rotate slides
//   useEffect(() => {
//     if (images.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [images]);

//   if (loading || images.length === 0) return null;

//   return (
//     <section className="relative w-full overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Banner ${index + 1}`}
//             className="w-full h-full object-fit object-center"
//           />
//         </div>
//       ))}
//     </section>
//   );
// };

// export default Hero;
