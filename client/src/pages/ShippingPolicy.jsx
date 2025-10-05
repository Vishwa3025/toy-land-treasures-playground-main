import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Mail, Shield } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Truck className="w-6 h-6 text-primary mr-2 animate-bounce-slow" />
            <span className="text-primary font-baloo font-semibold">
              Shipping & Delivery
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-foreground mb-6">
            Our Shipping Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            We take great care to ensure your toys reach you quickly, safely,
            and in perfect condition — ready to bring joy to your loved ones.
          </p>
        </div>
      </section>

      {/* Policy Details Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-card rounded-3xl p-10 shadow-lg toy-shadow">
            {/* Intro */}
            <p className="text-lg text-muted-foreground leading-relaxed font-poppins mb-10">
              At{" "}
              <span className="font-semibold text-primary">F & S Toys</span>,
              your satisfaction is our priority. We aim to make your shopping
              experience delightful — from browsing our collection to unboxing
              your order.
            </p>

            {/* Sections */}
            <div className="space-y-12">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    Delivery Timeline
                  </h2>
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    Orders are processed within <strong>1–2 business days</strong>.
                    Delivery typically takes <strong>3–7 business days</strong>,
                    depending on your location. In rare cases, delays may occur
                    due to weather or courier issues — we’ll keep you updated!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    Shipping Areas
                  </h2>
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    We currently deliver <strong>in and around Chennai</strong>.
                    If your location is not serviceable, our team will reach out
                    to arrange alternate delivery or a full refund.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    Shipping Charges
                  </h2>
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    Standard shipping rates apply <strong>in and around Chennai</strong>.
                    Any applicable delivery fee will be shown at checkout before
                    payment confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground font-poppins leading-relaxed">
                    Have questions about your order or shipping status? We're
                    here to help! Reach us anytime at{" "}
                    <a
                      href="mailto:hellofstoys@gmail.com"
                      className="text-blue-500 font-medium underline hover:text-blue-400"
                    >
                      hellofstoys@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6">
            Your Joy, Delivered with Care 🎁
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins mb-8">
            From our hands to your home — F & S Toys ensures every order is
            packed with love, excitement, and the promise of happiness.
          </p>
          <a
            href="/products"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            Shop Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
