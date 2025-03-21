
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconMap } from '@/utils/iconMap';

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features?: string[];
}

interface SolutionCardProps {
  solution: Solution;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  const { t } = useLanguage();
  
  // Debugging
  console.log("Rendering solution card:", solution);
  
  // Make sure we have a valid icon, fallback to Sparkles if not found
  const IconComponent = IconMap[solution.icon] || IconMap.Sparkles;
  
  return (
    <div className="metal-card group">
      <div className="p-8">
        <div className="w-16 h-16 flex items-center justify-center rounded-lg mb-6 text-white bg-gradient-to-r from-primary to-blue-600 transition-transform group-hover:scale-110">
          <IconComponent className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
        <p className="text-muted-foreground mb-6">{solution.description}</p>
        
        {solution.features && solution.features.length > 0 && (
          <div className="space-y-3 mb-6">
            {solution.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}
        
        <a className="inline-flex items-center text-primary font-medium group-hover:underline">
          {t('solutions.learnMore')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default SolutionCard;
