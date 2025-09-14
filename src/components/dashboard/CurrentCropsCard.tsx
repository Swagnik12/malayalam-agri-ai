import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Plus, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, crops } from "@/lib/translations";

const CurrentCropsCard = () => {
  const { language } = useLanguage();
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Rice', 'Coconut']);
  const [newCrop, setNewCrop] = useState('');

  const addCrop = () => {
    if (newCrop && !selectedCrops.includes(newCrop)) {
      setSelectedCrops([...selectedCrops, newCrop]);
      setNewCrop('');
    }
  };

  const removeCrop = (cropToRemove: string) => {
    setSelectedCrops(selectedCrops.filter(crop => crop !== cropToRemove));
  };

  const getCropName = (cropEn: string) => {
    const crop = crops.find(c => c.en === cropEn);
    return crop ? crop[language] : cropEn;
  };

  return (
    <Card className="shadow-soft bg-gradient-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Leaf className="h-5 w-5" />
          {translations.currentCrops[language]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {translations.selectCrops[language]}
        </p>
        
        {/* Current Crops */}
        <div className="flex flex-wrap gap-2">
          {selectedCrops.map((crop) => (
            <Badge 
              key={crop} 
              variant="secondary" 
              className="flex items-center gap-1 px-3 py-1"
            >
              {getCropName(crop)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={() => removeCrop(crop)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        {/* Add New Crop */}
        <div className="flex gap-2">
          <Select value={newCrop} onValueChange={setNewCrop}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={language === 'en' ? 'Select crop to add' : 'ചേർക്കാൻ വിള തിരഞ്ഞെടുക്കുക'} />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {crops.filter(crop => !selectedCrops.includes(crop.en)).map((crop, index) => (
                <SelectItem key={index} value={crop.en}>
                  {crop[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={addCrop} 
            disabled={!newCrop}
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Crop Status */}
        <div className="space-y-2 pt-2 border-t border-border">
          {selectedCrops.map((crop) => (
            <div key={crop} className="flex items-center justify-between text-sm">
              <span className="font-medium">{getCropName(crop)}</span>
              <Badge variant="outline" className="text-xs">
                {language === 'en' ? 'Growing' : 'വളരുന്നു'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentCropsCard;