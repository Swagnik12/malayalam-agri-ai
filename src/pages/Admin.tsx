import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { ArrowLeft, CheckCircle, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface EscalatedQuery {
  id: string;
  farmerName: string;
  question: string;
  location: string;
  cropType: string;
  language: 'en' | 'ml';
  status: 'pending' | 'resolved';
  createdAt: string;
}

const Admin = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [escalatedQueries, setEscalatedQueries] = useState<EscalatedQuery[]>([
    {
      id: '1',
      farmerName: 'രാജൻ കുമാർ',
      question: 'എന്റെ നെല്ലിന് ഇലപ്പുള്ളി രോഗം വന്നിട്ടുണ്ട്. എന്ത് ചെയ്യണം?',
      location: 'Kottayam',
      cropType: 'Rice',
      language: 'ml',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      farmerName: 'Suresh Kumar',
      question: 'My coconut trees are not producing well this season. What could be the reason?',
      location: 'Thrissur',
      cropType: 'Coconut',
      language: 'en',
      status: 'pending',
      createdAt: '2024-01-14T14:20:00Z'
    }
  ]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user.role, navigate]);

  const handleResolveQuery = (queryId: string) => {
    setEscalatedQueries(prev => 
      prev.map(query => 
        query.id === queryId 
          ? { ...query, status: 'resolved' as const }
          : query
      )
    );
    
    toast({
      title: language === 'en' ? "Query marked as resolved" : "ചോദ്യം പരിഹരിച്ചതായി അടയാളപ്പെടുത്തി",
      description: language === 'en' ? "The farmer will be notified." : "കർഷകനെ അറിയിക്കും.",
    });
  };

  const pendingQueries = escalatedQueries.filter(q => q.status === 'pending');
  const resolvedQueries = escalatedQueries.filter(q => q.status === 'resolved');

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === 'en' ? 'Back' : 'തിരികെ'}
            </Button>
            <h1 className="text-xl font-bold text-primary">
              {translations.adminPanel[language]}
            </h1>
          </div>
          
          <LanguageToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{pendingQueries.length}</p>
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'Pending Queries' : 'ബാക്കിയുള്ള ചോദ്യങ്ങൾ'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-leaf-green/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-leaf-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{resolvedQueries.length}</p>
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'Resolved Queries' : 'പരിഹരിച്ച ചോദ്യങ്ങൾ'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-blue/10 rounded-full">
                  <User className="h-6 w-6 text-sky-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{escalatedQueries.length}</p>
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'Total Escalations' : 'മൊത്തം എസ്കലേഷനുകൾ'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Queries */}
        <Card className="shadow-soft bg-gradient-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">
              {language === 'en' ? 'Pending Escalated Queries' : 'ബാക്കിയുള്ള എസ്കലേറ്റഡ് ചോദ്യങ്ങൾ'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingQueries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {language === 'en' ? 'No pending queries at the moment.' : 'ഇപ്പോൾ ബാക്കിയുള്ള ചോദ്യങ്ങളൊന്നുമില്ല.'}
              </p>
            ) : (
              pendingQueries.map((query) => (
                <Card key={query.id} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-primary">{query.farmerName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {query.location} • {query.cropType}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {query.language === 'en' ? 'English' : 'മലയാളം'}
                        </Badge>
                        <Badge variant="destructive">
                          {language === 'en' ? 'Pending' : 'ബാക്കി'}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                      {query.question}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {new Date(query.createdAt).toLocaleDateString()}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleResolveQuery(query.id)}
                        className="bg-leaf-green hover:bg-leaf-green/90"
                      >
                        {language === 'en' ? 'Mark as Resolved' : 'പരിഹരിച്ചതായി അടയാളപ്പെടുത്തുക'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Resolved Queries */}
        {resolvedQueries.length > 0 && (
          <Card className="shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-primary">
                {language === 'en' ? 'Recently Resolved' : 'സമീപകാലത്ത് പരിഹരിച്ചവ'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resolvedQueries.map((query) => (
                <Card key={query.id} className="border border-border/50 opacity-75">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-primary">{query.farmerName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {query.location} • {query.cropType}
                        </p>
                      </div>
                      <Badge className="bg-leaf-green">
                        {language === 'en' ? 'Resolved' : 'പരിഹരിച്ചു'}
                      </Badge>
                    </div>
                    
                    <p className="text-foreground p-3 bg-muted/30 rounded-lg">
                      {query.question}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;