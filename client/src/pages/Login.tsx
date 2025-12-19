import { useState } from "react";
import ToyBackground from "../components/ToyBackground";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { generalApi } from "../utils/axiosInstance.js";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/";

  /* ---------- LOGIN ---------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success, user } = await login(
        loginForm.email,
        loginForm.password
      );

      if (success && user) {
        toast({
          title: "Welcome back! 🎉",
          description: `Logged in as ${user.name}`,
        });

        navigate(user.role === "admin" ? "/admin" : from);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description:
          error.response?.data?.error || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- SIGNUP ---------- */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await generalApi.post(`auth/register`, signupForm, {
        withCredentials: true,
      });

      toast({
        title: "Welcome to ToyLand! 🎊",
        description:
          res.data.message || "Account created successfully!",
      });

      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description:
          error.response?.data?.error || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <ToyBackground />
      <Header />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-slow">🎪</div>
            <h1 className="text-4xl font-baloo font-extrabold text-primary mb-2">
              Welcome to ToyLand!
            </h1>
            <p className="text-black font-poppins bg-toy-cream inline-block px-4 py-1 rounded-full shadow">
              Join our magical world of toys
            </p>
          </div>

          {/* Card */}
          <Card className="bg-toy-cream border border-primary/30 toy-shadow">
            <CardHeader className="text-center">
              <CardTitle className="font-baloo text-2xl text-black">
                Get Started
              </CardTitle>
              <CardDescription className="text-black/80">
                Login or create a new account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 bg-white border border-primary/30">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <Link
                      to="/reset"
                      className="block text-sm text-primary font-medium hover:underline text-right"
                    >
                      Forgot password?
                    </Link>

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login 🎈"}
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4 mt-4">
                    <Input
                      placeholder="Full Name"
                      value={signupForm.name}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, email: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Phone"
                      value={signupForm.phone}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, phone: e.target.value })
                      }
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupForm.password}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          password: e.target.value,
                        })
                      }
                      required
                    />

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Join ToyLand 🌟"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <Link to="/" className="text-primary font-medium hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
