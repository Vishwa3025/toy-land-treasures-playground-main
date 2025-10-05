import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollText, Mail } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background text-center">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-8 py-4 mb-8">
            <span className="text-2xl mr-3 animate-bounce-slow">📜</span>
            <span className="text-primary font-baloo font-semibold text-lg">
              Terms & Conditions
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-foreground mb-8 leading-tight">
            Our Commitment to Fair Use
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            Welcome to <span className="font-semibold text-foreground">F & S Toys</span>!  
            By shopping with us, you agree to the simple and transparent terms outlined below — built to protect both you and us.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <main className="flex-grow py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl p-12 space-y-16">
            
            <div className="flex flex-col items-center text-center mb-8">
              <ScrollText className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-baloo font-bold text-foreground">
                Simple. Transparent. Trustworthy.
              </h2>
            </div>

            <div className="px-20 space-y-12">
              {/* Use of Site */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-primary">🧭 Use of Site</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  You may browse, explore, and make purchases in accordance with these terms.  
                  You agree not to engage in activities that could disrupt or misuse our platform.
                </p>
              </section>

              {/* Payments */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-toy-yellow-foreground">💳 Payments</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  All payments are securely processed through <span className="font-semibold text-foreground">Razorpay</span>.  
                  Prices are listed in INR and include applicable taxes unless stated otherwise.
                </p>
              </section>

              {/* User Obligations */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-accent">👤 User Obligations</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  You agree to provide accurate information, respect intellectual property,  
                  and refrain from fraudulent or abusive activities while using our services.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-secondary">🧠 Intellectual Property</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  All content, including images, text, and designs on this site,  
                  belongs to <span className="font-semibold text-foreground">F & S Toys</span> and cannot be copied or reused  
                  without written permission.
                </p>
              </section>

              {/* Modifications */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-toy-mint-foreground">⚙️ Modifications</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  We may update these terms periodically to reflect improvements in our service.  
                  Continued use of our website means you accept any changes made.
                </p>
              </section>

              {/* Contact */}
              <section className="space-y-4">
                <h3 className="text-2xl font-baloo font-bold text-primary">📩 Contact Us</h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  Have questions about these terms or your rights?  
                  Reach out anytime at:
                </p>
                <div className="flex items-center mt-2">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <a
                    href="mailto:hellofstoys@gmail.com"
                    className="underline hover:text-accent transition-colors"
                  >
                    hellofstoys@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-8">
            Shop Safely. Play Joyfully. 🎈
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins leading-relaxed">
            Every toy we sell is backed by our promise of transparency, safety, and customer care.  
            Thank you for trusting F & S Toys!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
