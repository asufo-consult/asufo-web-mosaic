
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Create an array of background images for rotation
  const backgroundImages = [
    'https://assets.iderdex.com/newwork/new-work-1.jpg',
    'https://assets.iderdex.com/newwork/new-work-2.jpg',
    'https://assets.iderdex.com/newwork/new-work-3.jpg',
    'https://assets.iderdex.com/newwork/new-work-4.jpg',
    'https://assets.iderdex.com/newwork/new-work-5.jpg',
    'https://assets.iderdex.com/newwork/new-work-6.jpg',
    'https://assets.iderdex.com/newwork/new-work-7.jpg',
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Change background image every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(10, 10, 30, 0.7)), url(${backgroundImages[currentImageIndex]})`,
          opacity: 1
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            asufo consult
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#contact" 
              className="btn-primary group"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="https://tidycal.com/blu7/30min-video-agilecoach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {t('nav.book')}
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 5L12 19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              transform="rotate(90 12 12)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
