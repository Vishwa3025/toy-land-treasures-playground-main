import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RotateCcw, Mail, Phone, Shield, Smile } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background text-center">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <RotateCcw className="w-6 h-6 text-primary mr-2 animate-bounce-slow" />
            <span className="text-primary font-baloo font-semibold">
              Refund & Cancellation Policy
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-baloo font-bold mb-6 leading-tight">
            Hassle-Free Returns & Refunds
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            At <span className="font-semibold text-primary">F & S Toys</span>, your happiness comes first!  
            If something isn’t perfect, we’ll make it right with our simple return and refund process.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main className="flex-grow py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-card rounded-3xl p-10 shadow-lg toy-shadow space-y-12">

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-baloo font-bold text-foreground">
                Easy, Transparent & Fair
              </h2>
              <p className="text-muted-foreground font-poppins mt-2 max-w-2xl">
                We aim to make every experience smooth and worry-free. Here’s how we handle returns, exchanges, and refunds.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-12 text-left">

              {/* Return Window */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-primary mb-3">🍀 Return Window</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  You have <span className="font-semibold text-foreground">3 days</span> from the delivery date to request a return or exchange.
                </p>
              </section>

              {/* Eligibility */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-accent mb-3">✅ Return Eligibility</h3>
                <ul className="list-disc list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>All tags and labels must remain intact.</li>
                  <li>
                    A <span className="font-semibold text-foreground">full unboxing video</span> is required from parcel opening to product display.
                  </li>
                </ul>
              </section>

              {/* Exchanges */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-toy-yellow-foreground mb-3">🔁 Exchanges</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  We replace items only if they are defective, damaged, or incorrect.
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>The unboxing video clearly shows the issue.</li>
                  <li>The request is made within the 3-day return window.</li>
                </ul>
              </section>

              {/* Return Shipping */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-toy-mint-foreground mb-3">💸 Return Shipping</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  A flat fee of ₹100 applies for return or exchange shipping, unless the error was on our part.
                </p>
              </section>

              {/* Cancellations */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-accent mb-3">❌ Order Cancellations</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  You can cancel your order anytime <span className="font-semibold text-foreground">before it is shipped</span>.  
                  Contact us through email or WhatsApp with your order details.
                </p>
              </section>

              {/* How to Request */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-primary mb-3">📩 How to Request a Return or Exchange</h3>
                <ol className="list-decimal list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>
                    Email us at{" "}
                    <a href="mailto:hellofstoys@gmail.com" className="underline text-primary hover:text-accent">
                      hellofstoys@gmail.com
                    </a>{" "}
                    or WhatsApp at{" "}
                    <a href="tel:+919666407676" className="underline text-primary hover:text-accent">
                      +91-9666407676
                    </a>{" "}within 3 days of delivery.
                  </li>
                  <li>Share your Name, email, reason, and unboxing video.</li>
                  <li>Once verified, we’ll guide you through the return process.</li>
                </ol>
              </section>

              {/* Refunds */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-secondary mb-3">💰 Refunds</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  Refunds are processed within <span className="font-semibold text-foreground">3–5 working days</span> after we receive and inspect your returned product.
                </p>
                <ul className="list-disc list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>Prepaid orders: refunded to the original payment method.</li>
                  <li>COD orders: refunded to your bank account after verification.</li>
                </ul>
              </section>


              {/* Contact */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-toy-mint-foreground mb-3">☎️ Contact Us</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  We’re available <span className="font-semibold text-foreground">10 AM – 9 PM</span> every day.
                </p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-primary" />
                    <a href="mailto:hellofstoys@gmail.com" className="underline hover:text-accent transition-colors">
                      hellofstoys@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    <a href="tel:+9197338942533" className="underline hover:text-accent transition-colors">
                      +91-7338942533
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 text-center">
        <div className="container mx-auto px-6">
          <Smile className="w-12 h-12 text-primary mx-auto mb-6 animate-bounce-slow" />
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6">
            Shop with Confidence 🌟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins leading-relaxed">
            We’re committed to your satisfaction and stand by our promise of safe, 
            joyful, and transparent service — every time you shop with us.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
