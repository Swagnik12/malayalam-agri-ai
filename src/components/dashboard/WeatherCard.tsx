import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface WeatherData {
  day: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  humidity: number;
  windSpeed: number;
}

const WeatherCard = () => {
  const { language } = useLanguage();

  // Mock weather data - in real app, fetch from OpenWeatherMap API
  const weatherData: WeatherData[] = [
    { day: language === 'en' ? 'Today' : 'ഇന്ന്', temp: 28, condition: 'sunny', humidity: 65, windSpeed: 12 },
    { day: language === 'en' ? 'Tomorrow' : 'നാളെ', temp: 26, condition: 'cloudy', humidity: 70, windSpeed: 15 },
    { day: language === 'en' ? 'Day 3' : '3-ആം ദിവസം', temp: 24, condition: 'rainy', humidity: 85, windSpeed: 18 },
    { day: language === 'en' ? 'Day 4' : '4-ആം ദിവസം', temp: 25, condition: 'cloudy', humidity: 75, windSpeed: 14 }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-8 w-8 text-harvest-gold" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-sky-blue" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-sky-blue" />;
      default: return <Sun className="h-8 w-8 text-harvest-gold" />;
    }
  };

  const getConditionText = (condition: string) => {
    const conditions = {
      sunny: { en: 'Sunny', ml: 'വെയിൽ' },
      cloudy: { en: 'Cloudy', ml: 'മേഘാവൃതം' },
      rainy: { en: 'Rainy', ml: 'മഴ' }
    };
    return conditions[condition as keyof typeof conditions]?.[language] || condition;
  };

  return (
    <Card className="shadow-soft bg-gradient-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Cloud className="h-5 w-5" />
          {translations.weatherForecast[language]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weatherData.map((weather, index) => (
            <div key={index} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{weather.day}</span>
                {getWeatherIcon(weather.condition)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-semibold">{weather.temp}°C</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getConditionText(weather.condition)}
                </Badge>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    {weather.humidity}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    {weather.windSpeed}km/h
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;