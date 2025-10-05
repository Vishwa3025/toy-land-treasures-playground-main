import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
              <span className="text-2xl mr-2 animate-bounce-slow">📞</span>
              <span className="text-primary font-baloo font-semibold">Get in Touch</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-foreground mb-6">
              We'd Love to Hear From You!
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
              Have questions about our toys? Need gift recommendations? Want to share your child's joy? 
              Our friendly team is here to help make your experience magical!
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <Card className="toy-shadow rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 text-center pb-8">
                  <CardTitle className="text-3xl font-baloo font-bold text-foreground flex items-center justify-center">
                    <span className="text-4xl mr-3 animate-wiggle">✉️</span>
                    Send Us a Message
                  </CardTitle>
                  <p className="text-muted-foreground font-poppins">
                    We'll get back to you within 24 hours!
                  </p>
                </CardHeader>
                
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-baloo font-semibold">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="rounded-xl border-2 focus:border-primary hover-bounce"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-baloo font-semibold">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="rounded-xl border-2 focus:border-primary hover-bounce"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-baloo font-semibold">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What can we help you with?"
                        className="rounded-xl border-2 focus:border-primary hover-bounce"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-baloo font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can make your day more magical..."
                        className="rounded-xl border-2 focus:border-primary min-h-32 hover-bounce"
                      />
                    </div>
                    
                    <Button variant="hero" size="lg" className="w-full">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send Message
                      <span className="text-xl ml-2 animate-bounce-slow">✨</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-baloo font-bold text-foreground mb-6 flex items-center">
                    <span className="text-4xl mr-3 animate-float">🏰</span>
                    Visit Our Store
                  </h2>
                  <p className="text-lg text-muted-foreground font-poppins leading-relaxed mb-8">
                    Come and experience the magic in person! Our store is filled with wonderful toys, 
                    and our team is always ready to help you find the perfect gift.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <Card className="toy-shadow rounded-2xl hover:playful-shadow transition-all duration-300 hover-bounce">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center animate-bounce-slow">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-baloo font-semibold text-lg text-foreground mb-2">Store Location</h3>
                          <p className="text-muted-foreground font-poppins">
                             46, Agatheeswarar Kovil St,<br />
                  Mahalakshmi Nagar, Kolapakkam, Chennai 600122.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="toy-shadow rounded-2xl hover:playful-shadow transition-all duration-300 hover-bounce">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center animate-bounce-slow">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-baloo font-semibold text-lg text-foreground mb-2">Phone Support</h3>
                          <p className="text-muted-foreground font-poppins">
                            +91 73389 42533<br />
                            +91 95661 58201<br />
                            Available 7 days a week
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="toy-shadow rounded-2xl hover:playful-shadow transition-all duration-300 hover-bounce">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center animate-bounce-slow">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-baloo font-semibold text-lg text-foreground mb-2">Email Support</h3>
                          <p className="text-muted-foreground font-poppins">
                            hello@f&stoys.com<br />
                            support@f&stoys.com<br />
                            We reply within 24 hours!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="toy-shadow rounded-2xl hover:playful-shadow transition-all duration-300 hover-bounce">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-toy-yellow to-toy-yellow/70 rounded-2xl flex items-center justify-center animate-bounce-slow">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-baloo font-semibold text-lg text-foreground mb-2">Store Hours</h3>
                          <div className="text-muted-foreground font-poppins space-y-1">
                            <div>All Days: 10AM - 9PM</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Special Features */}
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 toy-shadow rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-baloo font-bold text-foreground mb-4 flex items-center justify-center">
                      <span className="text-3xl mr-2 animate-wiggle">🎁</span>
                      Special Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-poppins">
                      <div className="flex items-center justify-center space-x-2 hover-bounce">
                        <span>🎀</span>
                        <span>Free Gift Wrapping</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 hover-bounce">
                        <span>🚚</span>
                        <span>Same-Day Delivery</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 hover-bounce">
                        <span>💡</span>
                        <span>Personal Toy Consultation</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 hover-bounce">
                        <span>🎪</span>
                        <span>Birthday Party Planning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-toy-cream/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins">
                Quick answers to common questions about our toys and services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  question: "Are all toys safe for children?",
                  answer: "Absolutely! All our toys meet or exceed international safety standards and are rigorously tested for quality and safety."
                },
                {
                  question: "Do you offer gift wrapping?",
                  answer: "Yes! We provide complimentary gift wrapping service with beautiful, colorful wrapping paper and ribbons."
                },
                {
                  question: "What's your return policy?",
                  answer: "We offer a 30-day return policy for unused items in original packaging. Your satisfaction is our priority!"
                },
                {
                  question: "Do you have age recommendations?",
                  answer: "Yes, each toy includes clear age recommendations and developmental benefits to help you choose the perfect toy."
                },
                {
                  question: "Can I track my order?",
                  answer: "Of course! You'll receive tracking information via email once your order ships, and you can track it online anytime."
                },
                {
                  question: "Do you offer bulk discounts?",
                  answer: "Yes, we offer special pricing for schools, daycares, and large orders. Contact us for a custom quote!"
                }
              ].map((faq, index) => (
                <Card key={index} className="toy-shadow rounded-2xl hover:playful-shadow transition-all duration-300 hover-bounce">
                  <CardContent className="p-6">
                    <h3 className="font-baloo font-semibold text-lg text-foreground mb-3 flex items-start">
                      <span className="text-2xl mr-2 animate-bounce-slow">❓</span>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground font-poppins leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6 flex items-center justify-center">
              <span className="text-5xl mr-3 animate-float">💝</span>
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins mb-8">
              Our friendly team is always here to help! Don't hesitate to reach out – 
              we love talking about toys and helping families create magical moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                Chat With Us
              </Button>
              <Button variant="outline" size="lg">
                Browse Our Toys
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;