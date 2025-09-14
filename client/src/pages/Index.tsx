import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
