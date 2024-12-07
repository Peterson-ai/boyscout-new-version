import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset password email. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-3xl font-bold text-center">Reset Password</h1>
          <p className="text-center text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
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
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;