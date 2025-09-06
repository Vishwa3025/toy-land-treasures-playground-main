import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { categories, getProductsByCategory } from '@/data/products';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find(cat => cat.id === categoryId);
  const products = categoryId ? getProductsByCategory(categoryId) : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-baloo font-bold text-foreground mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm font-poppins">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">{category.name}</span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-card/50 rounded-full px-6 py-3 mb-6 toy-shadow">
            <span className="text-4xl mr-3 animate-bounce-slow">{category.icon}</span>
            <span className="text-primary font-baloo font-semibold text-lg">
              {category.name}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-poppins mb-4">
            {category.description}
          </p>
          <div className="inline-flex items-center bg-accent/10 rounded-full px-4 py-2">
            <span className="text-accent font-baloo font-semibold">
              {category.count} available
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <h3 className="text-2xl font-baloo font-bold text-foreground mb-2">
              No toys found in this category
            </h3>
            <p className="text-muted-foreground">
              We're working on adding more magical toys to this category!
            </p>
          </div>
        )}

        {/* Back to Categories */}
        <div className="text-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Categories
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;