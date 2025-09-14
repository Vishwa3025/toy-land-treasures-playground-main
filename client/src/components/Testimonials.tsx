import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    review:
      "F & S Toys has the best selection! My daughter loves her new doll. Great quality and fast shipping!",
    avatar: '👩',
    highlight: 'Amazing quality & fast shipping!',
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 5,
    review:
      "The toys are both fun and educational. My kids love the building blocks and stay engaged for hours!",
    avatar: '👨',
    highlight: 'Educational & engaging toys!',
  },
  {
    id: 3,
    name: 'Lisa Martinez',
    rating: 5,
    review:
      "I always shop here for my grandkids. Wonderful service and toys that never disappoint!",
    avatar: '👵',
    highlight: 'Exceptional customer service!',
  },
];


const Testimonials = () => {
  return (
    <section className="hidden md:block py-16 md:py-20 bg-gradient-to-b from-toy-cream/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center bg-toy-yellow/20 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl mr-2 animate-bounce-slow">💝</span>
            <span className="text-toy-yellow-foreground font-baloo font-semibold text-sm md:text-base">
              Happy Families
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-3 md:mb-4">
            What Parents Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
            Don't just take our word for it! Hear from the families who've experienced
            the magic of F & S Toys.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 toy-shadow hover:playful-shadow transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Decorative Quote */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                <Quote className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 lg:w-5 lg:h-5 text-toy-yellow fill-current animate-bounce-slow"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Highlight Badge */}
              <div className="inline-block bg-accent/10 text-accent font-baloo font-semibold text-xs lg:text-sm px-2 md:px-3 py-1 rounded-full mb-3 md:mb-4 hover-bounce">
                {testimonial.highlight}
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-xs lg:text-base text-muted-foreground font-poppins leading-relaxed mb-4 md:mb-6 group-hover:text-foreground transition-colors duration-300">
                "{testimonial.review}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-6 h-6 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xl md:text-2xl mr-3 md:mr-4 ">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-baloo font-semibold text-foreground text-base lg:text-lg">
                    {testimonial.name}
                  </h4>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden lg:block absolute bottom-3 right-3 md:bottom-4 md:right-4 text-lg md:text-2xl opacity-20 group-hover:opacity-40 group-hover:animate-spin-slow transition-all duration-500">
                ⭐
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary/10 via-toy-yellow/5 to-accent/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="group hover-bounce">
              <div className="text-2xl md:text-4xl font-baloo font-bold text-primary mb-1 md:mb-2 group-hover:animate-bounce-slow">
                10,000+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-poppins">
                Happy Children
              </div>
              <div className="text-lg md:text-2xl mt-1 md:mt-2">😊</div>
            </div>
            <div className="group hover-bounce">
              <div className="text-2xl md:text-4xl font-baloo font-bold text-accent mb-1 md:mb-2 group-hover:animate-bounce-slow">
                5,000+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-poppins">
                Five-Star Reviews
              </div>
              <div className="text-lg md:text-2xl mt-1 md:mt-2">⭐</div>
            </div>
            <div className="group hover-bounce">
              <div className="text-2xl md:text-4xl font-baloo font-bold text-secondary mb-1 md:mb-2 group-hover:animate-bounce-slow">
                500+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-poppins">
                Unique Toys
              </div>
              <div className="text-lg md:text-2xl mt-1 md:mt-2">🧸</div>
            </div>
            <div className="group hover-bounce">
              <div className="text-2xl md:text-4xl font-baloo font-bold text-toy-yellow-foreground mb-1 md:mb-2 group-hover:animate-bounce-slow">
                99%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-poppins">
                Satisfaction Rate
              </div>
              <div className="text-lg md:text-2xl mt-1 md:mt-2">💯</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
