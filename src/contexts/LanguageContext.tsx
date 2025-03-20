
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.services': 'Leistungen',
    'nav.solutions': 'Lösungen',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Kontakt',
    'nav.book': 'Termin buchen',
    
    // Hero
    'hero.title': 'Dein Partner für digitale Transformation',
    'hero.subtitle': 'Marketing, Multimedia, Web Development, Webdesign & KI Consulting',
    'hero.cta': 'Jetzt Kontakt aufnehmen',
    
    // Services
    'services.title': 'Unsere Leistungen',
    'services.subtitle': 'Was wir für dich tun können',
    'services.consulting.title': 'Consulting',
    'services.consulting.description': 'Professionelle Beratung für deine digitalen Herausforderungen',
    'services.development.title': 'Development',
    'services.development.description': 'Maßgeschneiderte Softwarelösungen für dein Unternehmen',
    'services.coaching.title': 'Coaching',
    'services.coaching.description': 'Individuelle Schulungen und Workshops für dein Team',
    
    // Solutions
    'solutions.title': 'Unsere Lösungen',
    'solutions.subtitle': 'Innovative Lösungen für deine Anforderungen',
    'solutions.consulting.title': 'Beratung',
    'solutions.consulting.description': 'Strategische Beratung für deine digitale Zukunft',
    'solutions.products.title': 'Produkte',
    'solutions.products.description': 'Innovative Produkte für deine Herausforderungen',
    'solutions.services.title': 'Services',
    'solutions.services.description': 'Professionelle Dienstleistungen für dein Unternehmen',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Einige unserer Projekte',
    'portfolio.viewProject': 'Projekt ansehen',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Nimm Kontakt mit uns auf',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.success': 'Deine Nachricht wurde erfolgreich gesendet!',
    'contact.error': 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
    
    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',
    'footer.cookies': 'Cookies',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.solutions': 'Solutions',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.book': 'Book Appointment',
    
    // Hero
    'hero.title': 'Your Partner for Digital Transformation',
    'hero.subtitle': 'Marketing, Multimedia, Web Development, Web Design & AI Consulting',
    'hero.cta': 'Get in Touch',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'What we can do for you',
    'services.consulting.title': 'Consulting',
    'services.consulting.description': 'Professional advice for your digital challenges',
    'services.development.title': 'Development',
    'services.development.description': 'Tailored software solutions for your business',
    'services.coaching.title': 'Coaching',
    'services.coaching.description': 'Individual training and workshops for your team',
    
    // Solutions
    'solutions.title': 'Our Solutions',
    'solutions.subtitle': 'Innovative solutions for your requirements',
    'solutions.consulting.title': 'Consulting',
    'solutions.consulting.description': 'Strategic consulting for your digital future',
    'solutions.products.title': 'Products',
    'solutions.products.description': 'Innovative products for your challenges',
    'solutions.services.title': 'Services',
    'solutions.services.description': 'Professional services for your business',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Some of our projects',
    'portfolio.viewProject': 'View Project',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Your message has been sent successfully!',
    'contact.error': 'An error occurred. Please try again later.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.imprint': 'Imprint',
    'footer.cookies': 'Cookies',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from local storage or use browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
      return savedLanguage;
    }
    return navigator.language.startsWith('de') ? 'de' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
