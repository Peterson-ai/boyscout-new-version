import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { LogOut, Search } from "lucide-react";
import { navigationItems } from "@/config/navigation";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user);

  if (!user) return null;

  const displayName = profile ? 
    `${profile.first_name} ${profile.last_name}` : 
    user?.email?.split('@')[0] || "Guest";

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col md:flex-row">
      {/* Navigation Sidebar */}
      <nav className="w-full md:w-64 bg-[#0D1425] border-r border-gray-800 p-4 md:fixed md:h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="/lovable-uploads/d73c5a4d-124a-4e2e-b3e8-4af49f90719d.png"
            alt="BSA Logo" 
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">Donor Portal</span>
        </div>

        <div className="flex-1 space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#1A2235] transition-colors"
              >
                <Icon className="h-5 w-5 text-[#6366F1]" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
        
        <Button
          variant="ghost"
          className="w-full flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-[#1A2235]"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </nav>

      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#0D1425] border-b border-gray-800">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full pl-10 bg-[#1A2235] border-gray-700 text-white placeholder:text-gray-400 focus:ring-[#6366F1]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;