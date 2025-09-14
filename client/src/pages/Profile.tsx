import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Package, Heart, LogOut, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: string;
}

const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchParams] = useSearchParams();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const defaultTab = searchParams.get('tab') || 'profile';

  useEffect(() => {

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('toylandOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully! 👋",
      description: "Come back soon for more magical toys!",
    });
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-toy-yellow text-toy-yellow-foreground';
      case 'Shipped': return 'bg-secondary text-secondary-foreground';
      case 'Delivered': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">👋</span>
            <span className="text-primary font-baloo font-semibold">Welcome back, {user.name}!</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Your Profile
          </h1>
          <p className="text-xl text-muted-foreground font-poppins">
            Manage your account and view your magical toy adventures
          </p>
        </div>

        {/* Profile Tabs */}
        <Card className="toy-shadow bg-card/80 backdrop-blur-sm">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-toy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👤</span>
                  </div>
                  <h2 className="text-2xl font-baloo font-bold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground font-poppins">{user.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center p-6">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-2xl font-baloo font-bold text-primary">{orders.length}</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                  </Card>
                  
                  <Card className="text-center p-6">
                    <div className="text-3xl mb-2">💝</div>
                    <div className="text-2xl font-baloo font-bold text-primary">
                      ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                  </Card>
                  
                  <Card className="text-center p-6">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-baloo font-bold text-primary">VIP</div>
                    <div className="text-sm text-muted-foreground">Member Status</div>
                  </Card>
                </div>

                <div className="text-center pt-6">
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">📦</div>
                  <h3 className="text-2xl font-baloo font-bold text-foreground mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping for magical toys!
                  </p>
                  <Button variant="hero" onClick={() => navigate('/products')}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-toy-cream">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="font-baloo text-lg">
                              Order #{order.id}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground font-poppins">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <p className="font-semibold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                          
                          <div className="border-t border-toy-cream pt-3 flex justify-between items-center">
                            <span className="font-baloo font-semibold">Total</span>
                            <span className="text-xl font-baloo font-bold text-primary">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">💝</div>
                <h3 className="text-2xl font-baloo font-bold text-foreground mb-2">
                  Wishlist Coming Soon!
                </h3>
                <p className="text-muted-foreground">
                  We're working on bringing you a magical wishlist feature.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;