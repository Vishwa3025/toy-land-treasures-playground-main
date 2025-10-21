import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-toy-cream via-toy-pale-blue to-background text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">🛡️</span>
            <span className="text-primary font-baloo font-semibold">
              Privacy & Trust
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-foreground mb-6">
            Our Privacy Policy
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins leading-relaxed">
            Your privacy matters to us. At <span className="font-semibold">LittledreamersToys</span>, 
            we’re committed to protecting your personal data and being transparent 
            about how we use it.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main className="flex-grow py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl p-10 toy-shadow">
            <div className="flex items-center justify-center mb-10">
              <Shield className="w-10 h-10 text-primary mr-3" />
              <h2 className="text-3xl font-baloo font-bold text-foreground">
                Our Commitment to Your Privacy
              </h2>
            </div>

            <div className="space-y-12 text-left">
              {/* Section 1 */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-primary mb-4">
                  🔍 What We Collect
                </h3>
                <ul className="list-disc list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>Name, contact details, and email address</li>
                  <li>
                    Payment and billing information (handled securely via Razorpay)
                  </li>
                  <li>Browser and usage data for analytics and improvements</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-accent mb-4">
                  🎯 Why We Collect It
                </h3>
                <ul className="list-disc list-inside text-muted-foreground font-poppins leading-relaxed space-y-2">
                  <li>To process your orders and manage payments</li>
                  <li>To provide excellent customer support</li>
                  <li>To improve your shopping experience and personalize services</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-secondary mb-4">
                  🧩 Data Security
                </h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  We follow strict technical and organizational measures to safeguard 
                  your information. Payments are securely handled through PCI-DSS compliant 
                  platforms like Razorpay, ensuring your financial data is always protected.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-toy-yellow-foreground mb-4">
                  💡 Your Consent
                </h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  By using our website, you consent to the collection and use of 
                  your personal information as described in this Privacy Policy. 
                  You can withdraw your consent at any time by contacting us.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h3 className="text-2xl font-baloo font-bold text-toy-mint-foreground mb-4">
                  📬 Contact Us
                </h3>
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  If you have any questions or concerns regarding our privacy policy, 
                  feel free to reach out to us at:
                </p>

                <div className="mt-4 flex items-center text-primary font-poppins">
                  <Mail className="w-5 h-5 mr-2" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-toy-yellow/10 to-accent/10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-6">
            Your Trust, Our Promise 💫
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins mb-8">
            We’re dedicated to protecting your data and ensuring a safe, joyful 
            shopping experience for every family.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
