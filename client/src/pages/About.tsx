import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Users, Award, Truck, Shield, Gift } from 'lucide-react';
import ToyBackground from '@/components/ToyBackground';

const About = () => {
  return (
    <div className="min-h-screen relative">
      <ToyBackground />
      <Header />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
              <span className="text-2xl mr-2 animate-bounce-slow">🏰</span>
              <span className="text-primary font-baloo font-semibold">Our Story</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-foreground mb-6">
              Welcome to LittledreamersToys
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
              Where magical childhood memories are born! We've been bringing joy to families 
              worldwide with our carefully curated collection of premium toys that spark imagination 
              and create lasting happiness.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-baloo font-bold text-foreground mb-6 flex items-center">
                  <span className="text-5xl mr-4 animate-wiggle">🎯</span>
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground font-poppins leading-relaxed mb-6">
                  At LittledreamersToys, we believe that play is the foundation of learning, creativity, 
                  and happiness. Our mission is to provide children with high-quality, safe, and 
                  engaging toys that nurture their development while bringing families together.
                </p>
                <p className="text-lg text-muted-foreground font-poppins leading-relaxed mb-8">
                  Every toy in our collection is carefully selected for its educational value, 
                  safety standards, and ability to inspire wonder. We're not just selling toys – 
                  we're creating magical moments that last a lifetime.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/products" tabIndex={-1} className="inline-block">
                    <Button variant="hero" size="lg">
                      <Gift className="w-5 h-5 mr-2" />
                      Shop Our Collection
                    </Button>
                  </a>
                  
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 toy-shadow">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="bg-card rounded-2xl p-6 hover-bounce">
                      <div className="text-4xl mb-2 animate-bounce-slow">🎊</div>
                      <div className="text-2xl font-baloo font-bold text-primary">15+</div>
                      <div className="text-sm text-muted-foreground font-poppins">Years Experience</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 hover-bounce">
                      <div className="text-4xl mb-2 animate-bounce-slow">🌟</div>
                      <div className="text-2xl font-baloo font-bold text-accent">10K+</div>
                      <div className="text-sm text-muted-foreground font-poppins">Happy Families</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 hover-bounce">
                      <div className="text-4xl mb-2 animate-bounce-slow">🏆</div>
                      <div className="text-2xl font-baloo font-bold text-secondary">500+</div>
                      <div className="text-sm text-muted-foreground font-poppins">Premium Toys</div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 hover-bounce">
                      <div className="text-4xl mb-2 animate-bounce-slow">💝</div>
                      <div className="text-2xl font-baloo font-bold text-toy-yellow-foreground">99%</div>
                      <div className="text-sm text-muted-foreground font-poppins">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-toy-cream/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
                What Makes Us Special
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
                Our core values guide everything we do, ensuring every child receives 
                the best possible play experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Safety First',
                  description: 'All our toys meet or exceed international safety standards. Every product is rigorously tested for quality and durability.',
                  color: 'from-primary to-primary/70'
                },
                {
                  icon: Heart,
                  title: 'Educational Value',
                  description: 'We select toys that promote learning, creativity, and development while ensuring maximum fun and engagement.',
                  color: 'from-accent to-accent/70'
                },
                {
                  icon: Users,
                  title: 'Family Bonding',
                  description: 'Our toys are designed to bring families together, creating shared experiences and precious memories.',
                  color: 'from-secondary to-secondary/70'
                },
                {
                  icon: Award,
                  title: 'Premium Quality',
                  description: 'We partner with trusted manufacturers to ensure every toy meets our high standards for quality and craftsmanship.',
                  color: 'from-toy-yellow to-toy-yellow/70'
                },
                {
                  icon: Truck,
                  title: 'Fast Delivery',
                  description: 'Quick and secure shipping ensures your magical toys arrive safely and on time, ready to create smiles.',
                  color: 'from-toy-mint to-toy-mint/70'
                },
                {
                  icon: Gift,
                  title: 'Perfect Gifts',
                  description: 'Expert curation and gift-wrapping services make us your go-to destination for special occasions.',
                  color: 'from-toy-pale-blue to-toy-pale-blue/70'
                }
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card rounded-3xl p-8 toy-shadow hover:playful-shadow transition-all duration-500 hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce-slow transition-all duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-baloo font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-3 mb-6">
                <span className="text-2xl mr-2 animate-bounce-slow">👥</span>
                <span className="text-accent font-baloo font-semibold">Meet the Team</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
                The Magic Makers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
                Our passionate team of toy experts, parents, and child development specialists 
                work together to bring you the very best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Williams',
                  role: 'Founder & CEO',
                  avatar: '👩‍💼',
                  description: 'Former teacher turned toy entrepreneur with a passion for childhood development.'
                },
                {
                  name: 'Mike Johnson',
                  role: 'Head of Product',
                  avatar: '👨‍🔬',
                  description: 'Child safety expert ensuring every toy meets the highest quality standards.'
                },
                {
                  name: 'Emma Chen',
                  role: 'Customer Experience',
                  avatar: '👩‍💻',
                  description: 'Dedicated to making every family\'s experience magical and memorable.'
                }
              ].map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card rounded-3xl p-8 toy-shadow hover:playful-shadow transition-all duration-500 hover:-translate-y-2 text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-4xl mx-auto mb-6 group-hover:animate-float">
                    {member.avatar}
                  </div>
                  
                  <h3 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  
                  <div className="text-primary font-baloo font-semibold mb-4">
                    {member.role}
                  </div>
                  
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins mb-8">
              Join thousands of happy families who trust LittledreamersToys for their 
              children's playtime adventures. Start your magical journey today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Gift className="w-5 h-5 mr-2" />
                Explore Our Toys
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;