
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className="font-medium flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
