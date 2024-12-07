import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailNotConfirmed(false);
    
    try {
      await signIn(email, password);
      navigate("/");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Check if the error is due to unconfirmed email
      if (error.message?.includes('email_not_confirmed') || 
          error?.body?.includes('email_not_confirmed')) {
        setEmailNotConfirmed(true);
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please check your email and verify your account before logging in.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your email and password and try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
    toast({
      title: "Registration",
      description: "Please create your account.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute inset-0 opacity-5 bg-contain bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png')" }}>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg relative z-10">
        <img 
          src="/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png"
          alt="BSA Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center">BSA Donor Platform</h1>
          <h2 className="text-xl text-center text-muted-foreground">Login</h2>
        </div>

        {emailNotConfirmed && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please verify your email address before logging in. Check your inbox for the verification link.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>
          <div className="text-right">
            <Link 
              to="/reset-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={handleRegister}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;