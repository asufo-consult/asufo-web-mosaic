
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconMap } from '@/utils/iconMap';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color?: string;
}

interface ServiceCardProps {
  service: Service;
  onServiceClick?: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onServiceClick }) => {
  const { t } = useLanguage();
  
  // Debugging
  console.log("Rendering service card:", service);
  
  // Make sure we have a valid icon, fallback to Sparkles if not found
  const IconComponent = IconMap[service.icon] || IconMap.Sparkles;
  const color = service.color || 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700';
  
  return (
    <div 
      key={service.id} 
      className="metal-card group cursor-pointer" 
      onClick={() => onServiceClick && onServiceClick(service.id)}
    >
      <div className="p-8">
        <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-6 text-white bg-gradient-to-r ${color} transition-transform group-hover:scale-110`}>
          <IconComponent className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
        <p className="text-muted-foreground mb-6">{service.description}</p>
        <a className="inline-flex items-center text-primary font-medium group-hover:underline">
          {t('services.learnMore')}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
