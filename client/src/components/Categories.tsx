import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'bike',
    name: 'Bike',
    icon: '🏍️',
  },
  {
    id: 'jeep',
    name: 'Jeep',
    icon: '🚘',
  },
  {
    id: 'car',
    name: 'Car',
    icon: '🚗',
  },
];

const Categories = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-background to-toy-cream/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-4">
            <span className="text-2xl mr-2 animate-bounce-slow">🎪</span>
            <span className="text-primary font-baloo font-semibold">
              Explore Our Categories
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-baloo font-bold text-foreground">
            Find the Perfect Toy
          </h2>
        </div>

        {/* Horizontal Scroll Categories */}
        <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[180px] sm:min-w-[200px] bg-card rounded-2xl toy-shadow hover:playful-shadow flex-shrink-0 snap-start p-6 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl mb-3">{category.icon}</div>

              {/* Name */}
              <h3 className="text-lg font-baloo font-bold text-foreground mb-3">
                {category.name}
              </h3>

              {/* CTA */}
              <Link to={`/category/${category.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
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
