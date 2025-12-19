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
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-black via-black to-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-baloo font-bold text-white mb-6">
              We'd Love to Hear From You!
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-poppins">
              Our friendly team is here to help make your experience magical!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <Card className="bg-[#FFF3E6] text-black border border-orange-200 rounded-3xl">
                <CardHeader className="text-center text-black">
                  <CardTitle className="text-3xl font-baloo font-bold flex justify-center items-center">
                    ✉️ Send Us a Message
                  </CardTitle>
                  <p className="text-black/70">We'll get back to you within 24 hours!</p>
                </CardHeader>

                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input className="text-black placeholder:text-black/60 rounded-xl" placeholder="Your Name" />
                      <Input className="text-black placeholder:text-black/60 rounded-xl" placeholder="Email" />
                    </div>

                    <Input className="text-black placeholder:text-black/60 rounded-xl" placeholder="Subject" />
                    <Input
                      className="text-black placeholder:text-black/60 rounded-xl"
                      placeholder="Your Message"
                    />
                    

                    <Button variant="hero" className="w-full">
                      <MessageCircle className="mr-2" /> Send Message ✨
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-3xl font-baloo font-bold text-white">Visit Our Store</h2>

                {[
                  {
                    icon: <MapPin className="text-white" />,
                    title: 'Store Location',
                    text: '46, Agatheeswarar Kovil St, Kolapakkam, Chennai 600122',
                  },
                  {
                    icon: <Phone className="text-white" />,
                    title: 'Phone Support',
                    text: '+91 73389 42533 / +91 95661 58201',
                  },
                  {
                    icon: <Mail className="text-white" />,
                    title: 'Email Support',
                    text: 'hello@fstoys.com / support@fstoys.com',
                  },
                  {
                    icon: <Clock className="text-white" />,
                    title: 'Store Hours',
                    text: 'All Days: 10AM – 9PM',
                  },
                ].map((item, i) => (
                  <Card
                    key={i}
                    className="bg-[#FFF3E6] text-black border border-orange-200 rounded-2xl"
                  >
                    <CardContent className="p-6 flex space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-baloo font-semibold text-lg">
                          {item.title}
                        </h3>
                        <p className="text-black/70 font-poppins">{item.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
