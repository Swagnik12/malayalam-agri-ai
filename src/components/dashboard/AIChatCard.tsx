import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Mic, Upload, Camera, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChatCard = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: language === 'en' 
        ? "Hello! I'm your AI farming assistant. Ask me about pest control, weather advice, crop care, or government schemes."
        : "ഹലോ! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. കീടനിയന്ത്രണം, കാലാവസ്ഥാ ഉപദേശം, വിള പരിചരണം, അല്ലെങ്കിൽ സർക്കാർ പദ്ധതികളെക്കുറിച്ച് എന്നോട് ചോദിക്കുക.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Mock AI response - in real app, call backend API
    setTimeout(() => {
      const aiResponses = {
        en: [
          "Based on your query, I recommend checking for common pests during this season. Use neem oil as a natural pesticide.",
          "The weather looks good for irrigation today. Make sure to water your crops early morning or late evening.",
          "For your rice crop, consider applying organic fertilizer this week. The monsoon timing is perfect.",
          "I found relevant government schemes for your area. Check the PM-KISAN scheme for direct financial assistance."
        ],
        ml: [
          "നിങ്ങളുടെ ചോദ്യത്തിന്റെ അടിസ്ഥാനത്തിൽ, ഈ സീസണിൽ സാധാരണ കീടങ്ങളെ പരിശോധിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു. പ്രകൃതിദത്ത കീടനാശിനിയായി വേപ്പെണ്ണ ഉപയോഗിക്കുക.",
          "ജലസേചനത്തിന് കാലാവസ്ഥ നല്ലതായി തോന്നുന്നു. അതിരാവിലെയോ വൈകുന്നേരമോ വിളകൾക്ക് വെള്ളം നൽകുന്നത് ഉറപ്പാക്കുക.",
          "നിങ്ങളുടെ നെൽക്കൃഷിക്ക്, ഈ ആഴ്ച ജൈവവളം പ്രയോഗിക്കുന്നത് പരിഗണിക്കുക. മൺസൂൺ സമയം തികഞ്ഞതാണ്.",
          "നിങ്ങളുടെ പ്രദേശത്തിന് അനുയോജ്യമായ സർക്കാർ പദ്ധതികൾ ഞാൻ കണ്ടെത്തി. നേരിട്ടുള്ള സാമ്പത്തിക സഹായത്തിനായി PM-KISAN പദ്ധതി പരിശോധിക്കുക."
        ]
      };

      const randomResponse = aiResponses[language][Math.floor(Math.random() * aiResponses[language].length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: language === 'en' ? "Image uploaded for analysis" : "വിശകലനത്തിനായി ചിത്രം അപ്‌ലോഡ് ചെയ്തു",
        description: language === 'en' ? "AI is analyzing the crop image..." : "AI വിള ചിത്രം വിശകലനം ചെയ്യുന്നു...",
      });
      
      // Mock image analysis
      setTimeout(() => {
        const analysisMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: language === 'en' 
            ? "I analyzed your crop image. I can see some leaf discoloration that might indicate a nutrient deficiency. I recommend applying potassium-rich fertilizer."
            : "ഞാൻ നിങ്ങളുടെ വിള ചിത്രം വിശകലനം ചെയ്തു. പോഷകാഹാര കുറവ് സൂചിപ്പിക്കുന്ന ചില ഇല നിറവ്യത്യാസം ഞാൻ കാണുന്നു. പൊട്ടാസ്യം സമ്പുഷ്ടമായ വളം പ്രയോഗിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, analysisMessage]);
      }, 2000);
    }
  };

  return (
    <Card className="shadow-soft bg-gradient-card h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <MessageCircle className="h-5 w-5" />
          {translations.aiChatbot[language]}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 space-y-4 max-h-64 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-foreground'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image Upload Hint */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            {translations.pestDetection[language]}
          </Badge>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={translations.askQuestion[language]}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1">
              <Mic className="h-4 w-4" />
              {translations.voiceInput[language]}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
              {language === 'en' ? 'Photo' : 'ഫോട്ടോ'}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatCard;