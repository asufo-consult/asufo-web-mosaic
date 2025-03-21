
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-1 items-center">
      <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
      <Button
        variant={language === 'de' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('de')}
        className="h-8 px-2 text-xs font-medium"
      >
        DE
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-8 px-2 text-xs font-medium"
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageToggle;
