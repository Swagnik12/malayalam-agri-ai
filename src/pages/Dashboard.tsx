import { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import WeatherCard from "@/components/dashboard/WeatherCard";
import CurrentCropsCard from "@/components/dashboard/CurrentCropsCard";
import AIChatCard from "@/components/dashboard/AIChatCard";
import GovernmentSchemesCard from "@/components/dashboard/GovernmentSchemesCard";
import PersonalizedAdviceCard from "@/components/dashboard/PersonalizedAdviceCard";
import { 
  Leaf, 
  LogOut,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                {translations.appTitle[language]}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? `Welcome, ${user.username}` : `സ്വാഗതം, ${user.username}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageToggle />
            {user.role === 'admin' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              {language === 'en' ? 'Logout' : 'ലോഗൗട്ട്'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Weather Forecast - Top Left */}
          <div className="md:col-span-1">
            <WeatherCard />
          </div>

          {/* Current Crops - Top Center */}
          <div className="md:col-span-1">
            <CurrentCropsCard />
          </div>

          {/* Government Schemes - Top Right */}
          <div className="md:col-span-1">
            <GovernmentSchemesCard />
          </div>

          {/* AI Chat - Bottom Left (Spans 2 columns on larger screens) */}
          <div className="md:col-span-2 lg:col-span-2">
            <AIChatCard />
          </div>

          {/* Personalized Advice - Bottom Right */}
          <div className="md:col-span-2 lg:col-span-1">
            <PersonalizedAdviceCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;