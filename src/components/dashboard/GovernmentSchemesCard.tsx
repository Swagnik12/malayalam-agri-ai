import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink, Calendar, IndianRupee } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface Scheme {
  id: string;
  title: { en: string; ml: string };
  description: { en: string; ml: string };
  amount: string;
  deadline: string;
  status: 'active' | 'ending-soon' | 'new';
}

const GovernmentSchemesCard = () => {
  const { language } = useLanguage();

  // Mock scheme data - in real app, fetch from government API or database
  const schemes: Scheme[] = [
    {
      id: '1',
      title: {
        en: 'PM-KISAN Scheme',
        ml: 'PM-KISAN പദ്ധതി'
      },
      description: {
        en: 'Direct income support to farmers',
        ml: 'കർഷകർക്കുള്ള നേരിട്ടുള്ള വരുമാന പിന്തുണ'
      },
      amount: '₹6,000/year',
      deadline: '2024-03-31',
      status: 'active'
    },
    {
      id: '2',
      title: {
        en: 'Kisan Credit Card',
        ml: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ്'
      },
      description: {
        en: 'Low-interest agricultural loans',
        ml: 'കുറഞ്ഞ പലിശയിൽ കാർഷിക വായ്പ'
      },
      amount: 'Up to ₹3 Lakh',
      deadline: '2024-12-31',
      status: 'active'
    },
    {
      id: '3',
      title: {
        en: 'Organic Farming Subsidy',
        ml: 'ജൈവകൃഷി സബ്സിഡി'
      },
      description: {
        en: 'Support for organic certification',
        ml: 'ജൈവ സർട്ടിഫിക്കേഷനുള്ള പിന്തുണ'
      },
      amount: '₹25,000',
      deadline: '2024-02-15',
      status: 'ending-soon'
    },
    {
      id: '4',
      title: {
        en: 'Drip Irrigation Scheme',
        ml: 'ഡ്രിപ് ജലസേചന പദ്ധതി'
      },
      description: {
        en: 'Water conservation technology support',
        ml: 'ജല സംരക്ഷണ സാങ്കേതികവിദ്യ പിന്തുണ'
      },
      amount: '50% subsidy',
      deadline: '2024-06-30',
      status: 'new'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="text-xs">{language === 'en' ? 'Active' : 'സജീവം'}</Badge>;
      case 'ending-soon':
        return <Badge variant="destructive" className="text-xs">{language === 'en' ? 'Ending Soon' : 'ഉടൻ അവസാനിക്കുന്നു'}</Badge>;
      case 'new':
        return <Badge className="text-xs bg-harvest-gold text-primary-foreground">{language === 'en' ? 'New' : 'പുതിയത്'}</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-soft bg-gradient-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Building2 className="h-5 w-5" />
          {translations.governmentSchemes[language]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{scheme.title[language]}</h4>
                {getStatusBadge(scheme.status)}
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {scheme.description[language]}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs">
                    <IndianRupee className="h-3 w-3 text-harvest-gold" />
                    <span className="font-medium">{scheme.amount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{language === 'en' ? 'Deadline:' : 'അവസാന തീയതി:'} {scheme.deadline}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-3 w-3" />
                  {translations.viewScheme[language]}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full gap-2">
            <Building2 className="h-4 w-4" />
            {language === 'en' ? 'View All Schemes' : 'എല്ലാ പദ്ധതികളും കാണുക'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernmentSchemesCard;