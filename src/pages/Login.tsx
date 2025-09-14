import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Leaf, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    localStorage.setItem('user', JSON.stringify({ 
      id: '1', 
      username, 
      role: username === 'admin' ? 'admin' : 'farmer' 
    }));
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    localStorage.setItem('user', JSON.stringify({ 
      id: 'guest', 
      username: 'Guest', 
      role: 'farmer' 
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-emphasis bg-gradient-card border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <Sprout className="h-6 w-6 text-leaf-green" />
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              {translations.appTitle[language]}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {translations.appDescription[language]}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{translations.username[language]}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{translations.password[language]}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 transition-smooth">
              {translations.login[language]}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleGuestLogin}
            className="w-full border-harvest-gold/30 hover:bg-harvest-gold/10 hover:border-harvest-gold/50 transition-smooth"
          >
            {translations.continueAsGuest[language]}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;