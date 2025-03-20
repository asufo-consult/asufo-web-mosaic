
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImageIndex?: number;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, bgImageIndex = 0 }) => {
  const { t } = useLanguage();
  
  const backgroundImages = [
    'https://assets.iderdex.com/newwork/new-work-1.jpg',
    'https://assets.iderdex.com/newwork/new-work-2.jpg',
    'https://assets.iderdex.com/newwork/new-work-3.jpg',
    'https://assets.iderdex.com/newwork/new-work-4.jpg',
    'https://assets.iderdex.com/newwork/new-work-5.jpg',
    'https://assets.iderdex.com/newwork/new-work-6.jpg',
    'https://assets.iderdex.com/newwork/new-work-7.jpg',
  ];

  // Use modulo to ensure the index is within bounds
  const imageIndex = bgImageIndex % backgroundImages.length;

  return (
    <section className="relative bg-secondary/30 dark:bg-card/30 py-20 md:py-28">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(10, 10, 30, 0.7)), url(${backgroundImages[imageIndex]})`,
          opacity: 0.3
        }}
      />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
