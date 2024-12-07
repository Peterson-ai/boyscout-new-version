import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import { publicRoutes } from "@/config/routes/publicRoutes";
import { userRoutes } from "@/config/routes/userRoutes";
import { adminRoutes } from "@/config/routes/adminRoutes";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {publicRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            {userRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            {adminRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;