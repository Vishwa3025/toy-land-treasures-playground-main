import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Mail, Shield } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-black to-primary/80">
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

          <p className="text-xl text-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            We take great care to ensure your toys reach you quickly, safely,
            and in perfect condition — ready to bring joy to your loved ones.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-3xl p-10 toy-shadow">
            <p className="text-lg text-foreground leading-relaxed font-poppins mb-10">
              At{" "}
              <span className="font-semibold text-primary">
                FS Toys Factory
              </span>
              , your satisfaction is our priority. We aim to make your shopping
              experience delightful — from browsing to unboxing.
            </p>

            <div className="space-y-12">
              {/* Delivery */}
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-primary mb-2">
                    Delivery Timeline
                  </h2>
                  <p className="text-foreground font-poppins leading-relaxed">
                    Orders are processed within{" "}
                    <strong>1–2 business days</strong>. Delivery usually takes{" "}
                    <strong>3–7 business days</strong>.
                  </p>
                </div>
              </div>

              {/* Areas */}
              <div className="flex items-start py-4 gap-4">
                <MapPin className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-primary mb-2">
                    Shipping Areas
                  </h2>
                  <p className="text-foreground font-poppins leading-relaxed">
                    We currently deliver <strong>in and around Chennai</strong>.
                  </p>
                </div>
              </div>

              {/* Charges */}
              <div className="flex items-start py-4 gap-4">
                <Shield className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-primary mb-2">
                    Shipping Charges
                  </h2>
                  <p className="text-foreground font-poppins leading-relaxed">
                    Delivery charges (if any) are shown clearly at checkout.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-baloo font-bold text-primary mb-2">
                    Contact Us
                  </h2>
                  <p className="text-foreground font-poppins leading-relaxed">
                    Reach us at{" "}
                    <a
                      href="mailto:support@fstoysfactory.com"
                      className="text-primary underline font-medium"
                    >
                      support@fstoysfactory.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-black via-black to-black text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6">
            Your Joy, Delivered with Care 🎁
          </h2>

          <p className="text-lg text-foreground max-w-2xl mx-auto font-poppins mb-8">
            From our hands to your home — packed with love and happiness.
          </p>

          <a
            href="/products"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:-translate-y-1"
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
