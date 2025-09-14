import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, districts, crops, seasons } from "@/lib/translations";
import { 
  Mic, 
  Upload, 
  ThumbsUp, 
  ThumbsDown, 
  Volume2, 
  Leaf, 
  LogOut,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Mock AI response - in real app, call API
    setTimeout(() => {
      const mockAnswers = {
        en: "Based on your query about farming in Kerala, here's some advice: Ensure proper drainage during monsoon season and use organic fertilizers for better soil health. Consider crop rotation to maintain soil fertility.",
        ml: "കേരളത്തിലെ കൃഷിയെക്കുറിച്ചുള്ള നിങ്ങളുടെ ചോദ്യത്തിന്റെ അടിസ്ഥാനത്തിൽ, ഇവിടെ ചില ഉപദേശങ്ങൾ: മൺസൂൺ കാലത്ത് ശരിയായ നീർവാർച്ച ഉറപ്പാക്കുകയും മെച്ചപ്പെട്ട മണ്ണിന്റെ ആരോഗ്യത്തിനായി ജൈവ വളങ്ങൾ ഉപയോഗിക്കുകയും ചെയ്യുക."
      };
      
      setAnswer(mockAnswers[language]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    if (type === 'negative') {
      toast({
        title: translations.escalationMessage[language],
        description: language === 'en' ? "An agricultural officer will contact you soon." : "ഒരു കാർഷിക ഓഫീസർ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.",
      });
    } else {
      toast({
        title: language === 'en' ? "Thank you for your feedback!" : "നിങ്ങളുടെ ഫീഡ്‌ബാക്കിന് നന്ദി!",
        description: language === 'en' ? "Your feedback helps us improve." : "നിങ്ങളുടെ ഫീഡ്‌ബാക്ക് ഞങ്ങളെ മെച്ചപ്പെടുത്താൻ സഹായിക്കുന്നു.",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast({
        title: language === 'en' ? "Image uploaded successfully" : "ചിത്രം വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു",
      });
    }
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

      <div className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-3">
        {/* Query Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Leaf className="h-5 w-5" />
                {language === 'en' ? 'Ask Your Question' : 'നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question">
                  {language === 'en' ? 'Describe your farming issue' : 'നിങ്ങളുടെ കൃഷി പ്രശ്നം വിവരിക്കുക'}
                </Label>
                <Textarea
                  id="question"
                  placeholder={translations.askQuestion[language]}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="mt-2 min-h-[100px] transition-smooth focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mic className="h-4 w-4" />
                  {translations.voiceInput[language]}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {translations.uploadImage[language]}
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              {uploadedImage && (
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Image uploaded:' : 'ചിത്രം അപ്‌ലോഡ് ചെയ്തു:'} {uploadedImage.name}
                </div>
              )}
              
              <Button 
                onClick={handleSubmitQuestion}
                disabled={!question.trim() || isLoading}
                className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
              >
                {isLoading ? (
                  language === 'en' ? 'Processing...' : 'പ്രോസസ്സിംഗ്...'
                ) : (
                  translations.submit[language]
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Answer Section */}
          {answer && (
            <Card className="shadow-soft bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-primary">
                  {language === 'en' ? 'AI Response' : 'AI പ്രതികരണം'}
                  <Button variant="outline" size="sm" className="gap-2">
                    <Volume2 className="h-4 w-4" />
                    {language === 'en' ? 'Play Answer' : 'ഉത്തരം പ്ലേ ചെയ്യുക'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{answer}</p>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback('positive')}
                    className="gap-2 hover:bg-leaf-green/10 hover:border-leaf-green"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {translations.helpful[language]}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback('negative')}
                    className="gap-2 hover:bg-destructive/10 hover:border-destructive"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    {translations.notHelpful[language]}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Context Panel */}
        <div className="space-y-6">
          <Card className="shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-primary">
                {language === 'en' ? 'Context Information' : 'സന്ദർഭ വിവരങ്ങൾ'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{translations.location[language]}</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === 'en' ? 'Select district' : 'ജില്ല തിരഞ്ഞെടുക്കുക'} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {districts.map((district, index) => (
                      <SelectItem key={index} value={district.en}>
                        {district[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>{translations.cropType[language]}</Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === 'en' ? 'Select crop' : 'വിള തിരഞ്ഞെടുക്കുക'} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {crops.map((crop, index) => (
                      <SelectItem key={index} value={crop.en}>
                        {crop[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>{translations.season[language]}</Label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === 'en' ? 'Select season' : 'സീസൺ തിരഞ്ഞെടുക്കുക'} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {seasons.map((season, index) => (
                      <SelectItem key={index} value={season.en}>
                        {season[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;