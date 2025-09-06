import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'stuffed-animals',
    name: 'Stuffed Animals',
    icon: '🧸',
    color: 'from-primary to-primary/70',
    description: 'Cuddly companions for endless hugs',
    count: '150+ toys'
  },
  {
    id: 'educational',
    name: 'Educational Toys',
    icon: '📚',
    color: 'from-accent to-accent/70',
    description: 'Learning through play and discovery',
    count: '120+ toys'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Fun',
    icon: '⚽',
    color: 'from-secondary to-secondary/70',
    description: 'Active play for healthy adventures',
    count: '80+ toys'
  },
  {
    id: 'action-figures',
    name: 'Action Figures',
    icon: '🦸',
    color: 'from-toy-yellow to-toy-yellow/70',
    description: 'Heroes and adventures await',
    count: '200+ toys'
  },
  {
    id: 'building',
    name: 'Building & Construction',
    icon: '🔧',
    color: 'from-toy-mint to-toy-mint/70',
    description: 'Create, build, and imagine',
    count: '90+ toys'
  },
  {
    id: 'arts-crafts',
    name: 'Arts & Crafts',
    icon: '🎨',
    color: 'from-toy-pale-blue to-toy-pale-blue/70',
    description: 'Express creativity and make magic',
    count: '110+ toys'
  }
];

const Categories = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-background to-toy-cream/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-5 md:mb-10">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-semibold">Explore Our Categories</span>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-2 md:mb-4">
            Find the Perfect Toy
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
            Discover magical toys organized by age, interest, and play style. 
            Every category is filled with wonder and excitement!
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-card rounded-3xl overflow-hidden toy-shadow hover:playful-shadow transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:animate-bounce-slow transition-all duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
                
                {/* Category Info */}
                <h3 className="text-2xl font-baloo font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground font-poppins mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-baloo font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-toy-yellow text-sm">⭐</span>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <Link to={`/category/${category.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Explore Category
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 group-hover:animate-spin-slow transition-all duration-500">
                ✨
              </div>
              <div className="absolute bottom-4 left-4 text-lg opacity-20 group-hover:opacity-40 group-hover:animate-float transition-all duration-500">
                🌟
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Categories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;