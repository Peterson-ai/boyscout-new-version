import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { NetworkError, AuthenticationError } from "@/lib/supabase/errors";
import { useSupabaseConnection } from "@/lib/supabase/hooks";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isConnected } = useSupabaseConnection();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error in auth initialization:", error);
        if (error instanceof NetworkError) {
          toast.error("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isConnected) {
      toast.error("Unable to connect to the server. Please try again later.");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
      
      if (error instanceof NetworkError) {
        toast.error("Network error. Please check your connection.");
      } else if (error instanceof AuthenticationError) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      setUser(null);
      setSession(null);
      toast.error("Error during sign out");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};