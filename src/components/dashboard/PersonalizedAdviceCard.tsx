import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface AdviceItem {
  id: string;
  type: 'general' | 'urgent' | 'opportunity' | 'success';
  title: { en: string; ml: string };
  description: { en: string; ml: string };
  action: { en: string; ml: string };
}

const PersonalizedAdviceCard = () => {
  const { language } = useLanguage();

  // Mock personalized advice - in real app, generate based on user's crops, location, season, weather
  const adviceItems: AdviceItem[] = [
    {
      id: '1',
      type: 'urgent',
      title: {
        en: 'Weather Alert',
        ml: 'കാലാവസ്ഥാ മുന്നറിയിപ്പ്'
      },
      description: {
        en: 'Heavy rainfall expected in 2 days. Prepare drainage for rice fields.',
        ml: '2 ദിവസത്തിനുള്ളിൽ കനത്ത മഴയ്ക്ക് സാധ്യത. നെൽവയലുകളിൽ നീർവാർച്ച തയ്യാറാക്കുക.'
      },
      action: {
        en: 'Check drainage',
        ml: 'നീർവാർച്ച പരിശോധിക്കുക'
      }
    },
    {
      id: '2',
      type: 'opportunity',
      title: {
        en: 'Market Price Alert',
        ml: 'വിപണി വില മുന്നറിയിപ്പ്'
      },
      description: {
        en: 'Coconut prices are 15% higher this week. Good time to sell.',
        ml: 'ഈ ആഴ്ച തേങ്ങയുടെ വില 15% കൂടുതലാണ്. വിൽക്കാൻ നല്ല സമയം.'
      },
      action: {
        en: 'View markets',
        ml: 'വിപണികൾ കാണുക'
      }
    },
    {
      id: '3',
      type: 'general',
      title: {
        en: 'Seasonal Care',
        ml: 'സീസണൽ പരിചരണം'
      },
      description: {
        en: 'Apply organic fertilizer to pepper vines before monsoon season.',
        ml: 'മൺസൂൺ സീസണിന് മുമ്പ് കുരുമുളക് വള്ളികൾക്ക് ജൈവവളം നൽകുക.'
      },
      action: {
        en: 'Learn more',
        ml: 'കൂടുതൽ അറിയുക'
      }
    },
    {
      id: '4',
      type: 'success',
      title: {
        en: 'Achievement',
        ml: 'നേട്ടം'
      },
      description: {
        en: 'Your rice crop is growing 20% better than average for this season!',
        ml: 'നിങ്ങളുടെ നെൽവിള ഈ സീസണിലെ ശരാശരിയേക്കാൾ 20% മികച്ച് വളരുന്നു!'
      },
      action: {
        en: 'View report',
        ml: 'റിപ്പോർട്ട് കാണുക'
      }
    }
  ];

  const getAdviceIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'opportunity':
        return <TrendingUp className="h-4 w-4 text-harvest-gold" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-leaf-green" />;
      default:
        return <Lightbulb className="h-4 w-4 text-sky-blue" />;
    }
  };

  const getAdviceBadge = (type: string) => {
    const badges = {
      urgent: { en: 'Urgent', ml: 'അടിയന്തിരം', variant: 'destructive' as const },
      opportunity: { en: 'Opportunity', ml: 'അവസരം', variant: 'default' as const },
      success: { en: 'Success', ml: 'വിജയം', variant: 'secondary' as const },
      general: { en: 'General', ml: 'പൊതുവായ', variant: 'outline' as const }
    };
    
    const badge = badges[type as keyof typeof badges];
    return (
      <Badge variant={badge?.variant || 'outline'} className="text-xs">
        {badge?.[language] || type}
      </Badge>
    );
  };

  return (
    <Card className="shadow-soft bg-gradient-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Lightbulb className="h-5 w-5" />
          {translations.personalizedAdvice[language]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <div className="text-sm font-medium text-primary border-b border-border pb-2">
            {translations.todaysAdvice[language]}
          </div>
          
          {adviceItems.map((advice) => (
            <div key={advice.id} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getAdviceIcon(advice.type)}
                  <h4 className="font-medium text-sm">{advice.title[language]}</h4>
                </div>
                {getAdviceBadge(advice.type)}
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {advice.description[language]}
              </p>
              
              <Button variant="outline" size="sm" className="w-full">
                {advice.action[language]}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full gap-2">
            <Lightbulb className="h-4 w-4" />
            {language === 'en' ? 'View All Advice' : 'എല്ലാ ഉപദേശങ്ങളും കാണുക'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedAdviceCard;