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
    'services.learnMore': 'Mehr erfahren',
    'services.web.title': 'Web Development',
    'services.web.description': 'Moderne, responsive Websites und Webanwendungen mit den neuesten Technologien',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Nutzerzentriertes Design, das intuitive, ansprechende Erlebnisse über alle Plattformen hinweg schafft',
    'services.marketing.title': 'Digital Marketing',
    'services.marketing.description': 'Datengesteuerte Marketingstrategien, die die Sichtbarkeit erhöhen und Conversions steigern',
    'services.mobile.title': 'Mobile Entwicklung',
    'services.mobile.description': 'Native und plattformübergreifende mobile Apps für iOS und Android',
    'services.ai.title': 'KI & Machine Learning',
    'services.ai.description': 'Intelligente Lösungen, die von modernster KI und maschinellem Lernen angetrieben werden',
    'services.ecommerce.title': 'E-Commerce-Lösungen',
    'services.ecommerce.description': 'End-to-End E-Commerce-Plattformen, optimiert für Conversions und Kundenbindung',
    'services.toast.title': 'Service ausgewählt',
    'services.toast.description': 'Vielen Dank für dein Interesse! Wir werden uns in Kürze mit dir in Verbindung setzen.',
    'services.hero.title': 'Unsere Dienstleistungen',
    'services.hero.subtitle': 'Maßgeschneiderte Lösungen für deine digitalen Herausforderungen',
    'services.main.title': 'Wir helfen dir, online erfolgreich zu sein',
    'services.main.subtitle': 'Unsere umfassenden Dienstleistungen unterstützen dich bei jedem Schritt deiner digitalen Reise',
    'services.process.title': 'Unser Prozess',
    'services.process.subtitle': 'Wie wir arbeiten, um deine Ziele zu erreichen',
    'services.process.discovery': 'Entdeckung',
    'services.process.discoveryDesc': 'Wir verstehen deine Bedürfnisse, Ziele und Herausforderungen',
    'services.process.strategy': 'Strategie',
    'services.process.strategyDesc': 'Wir entwickeln einen maßgeschneiderten Plan, um deine Ziele zu erreichen',
    'services.process.execution': 'Ausführung',
    'services.process.executionDesc': 'Wir setzen die Strategie mit Präzision und Qualität um',
    'services.process.optimization': 'Optimierung',
    'services.process.optimizationDesc': 'Wir optimieren kontinuierlich für beste Ergebnisse',
    'services.cta.title': 'Bereit für den nächsten Schritt?',
    'services.cta.description': 'Lass uns besprechen, wie wir dir bei deinem nächsten Projekt helfen können',
    'services.cta.contact': 'Kontakt aufnehmen',
    'services.cta.schedule': 'Termin vereinbaren',
    
    // Solutions
    'solutions.title': 'Unsere Lösungen',
    'solutions.subtitle': 'Innovative Lösungen für deine Anforderungen',
    'solutions.learnMore': 'Mehr erfahren',
    'solutions.hero.title': 'Branchenspezifische Lösungen',
    'solutions.hero.subtitle': 'Maßgeschneiderte Strategien für verschiedene Geschäftsbereiche',
    'solutions.industries.title': 'Branchen, die wir bedienen',
    'solutions.industries.subtitle': 'Spezialisierte Lösungen für verschiedene Sektoren',
    'solutions.industries.business.title': 'Business Solutions',
    'solutions.industries.business.description': 'Umfassende digitale Transformationslösungen für kleine bis mittlere Unternehmen',
    'solutions.industries.business.feature1': 'Optimierte Geschäftsprozesse',
    'solutions.industries.business.feature2': 'Skalierbare Infrastruktur',
    'solutions.industries.business.feature3': 'Kundenorientierte Systeme',
    'solutions.industries.ecommerce.title': 'E-Commerce',
    'solutions.industries.ecommerce.description': 'End-to-End-Online-Verkaufsplattformen mit Bestandsverwaltung und Zahlungsabwicklung',
    'solutions.industries.ecommerce.feature1': 'Nahtlose Checkout-Erfahrung',
    'solutions.industries.ecommerce.feature2': 'Integrierte Zahlungsabwicklung',
    'solutions.industries.ecommerce.feature3': 'Mobile Optimierung',
    'solutions.industries.corporate.title': 'Corporate Services',
    'solutions.industries.corporate.description': 'Digitale Lösungen auf Unternehmensebene für große Organisationen und Konzerne',
    'solutions.industries.corporate.feature1': 'Unternehmensweite Integration',
    'solutions.industries.corporate.feature2': 'Robuste Sicherheitsmaßnahmen',
    'solutions.industries.corporate.feature3': 'Compliance-Management',
    'solutions.industries.education.title': 'Bildung',
    'solutions.industries.education.description': 'Lernmanagementsysteme und Bildungsplattformen für Schulen und Universitäten',
    'solutions.industries.education.feature1': 'Interaktive Lernumgebungen',
    'solutions.industries.education.feature2': 'Fortschrittsverfolgung',
    'solutions.industries.education.feature3': 'Virtuelle Klassenzimmer',
    'solutions.industries.healthcare.title': 'Gesundheitswesen',
    'solutions.industries.healthcare.description': 'Digitale Gesundheitslösungen einschließlich Patientenmanagement und Telemedizin',
    'solutions.industries.healthcare.feature1': 'Sichere Patientendaten',
    'solutions.industries.healthcare.feature2': 'Telemedizin-Integration',
    'solutions.industries.healthcare.feature3': 'Compliance mit Gesundheitsvorschriften',
    'solutions.industries.startup.title': 'Startups',
    'solutions.industries.startup.description': 'Agile, skalierbare Lösungen speziell für Startups und neue Unternehmen',
    'solutions.industries.startup.feature1': 'Schnelle Markteinführung',
    'solutions.industries.startup.feature2': 'Kosteneffiziente Lösungen',
    'solutions.industries.startup.feature3': 'Skalierbare Architektur',
    'solutions.caseStudies.title': 'Fallstudien',
    'solutions.caseStudies.subtitle': 'Erfolgsgeschichten unserer Kunden',
    'solutions.caseStudies.readCase': 'Fallstudie lesen',
    'solutions.caseStudies.case1.industry': 'E-Commerce',
    'solutions.caseStudies.case1.title': 'Umsatzsteigerung um 200% für Online-Einzelhändler',
    'solutions.caseStudies.case1.description': 'Wie wir einem aufstrebenden E-Commerce-Unternehmen geholfen haben, seinen Umsatz durch eine umfassende digitale Strategie zu verdreifachen',
    'solutions.caseStudies.case2.industry': 'Gesundheitswesen',
    'solutions.caseStudies.case2.title': 'Digitale Transformation für Gesundheitsdienstleister',
    'solutions.caseStudies.case2.description': 'Eine umfassende digitale Lösung, die die Patientenversorgung verbessert und die betriebliche Effizienz steigert',
    'solutions.cta.title': 'Lass uns deine Branchenlösung entwickeln',
    'solutions.cta.description': 'Kontaktiere uns für eine maßgeschneiderte Strategie, die auf deine spezifischen Branchenanforderungen zugeschnitten ist',
    'solutions.cta.contact': 'Kontakt aufnehmen',
    'solutions.cta.schedule': 'Termin vereinbaren',
    'solutions.cta.stat': '93% Kundenzufriedenheit',
    'solutions.cta.statDesc': 'Basierend auf unseren letzten 100 Projekten',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Einige unserer Projekte',
    'portfolio.viewProject': 'Projekt ansehen',
    'portfolio.hero.title': 'Unser Portfolio',
    'portfolio.hero.subtitle': 'Entdecke unsere erfolgreichsten Projekte',
    'portfolio.projects.title': 'Ausgewählte Arbeiten',
    'portfolio.projects.subtitle': 'Eine Sammlung unserer besten Projekte aus verschiedenen Bereichen',
    'portfolio.projects.p1.title': 'E-Commerce Redesign',
    'portfolio.projects.p1.description': 'Komplettes Redesign einer E-Commerce-Plattform mit Fokus auf Benutzererfahrung und Conversion-Optimierung',
    'portfolio.projects.p2.title': 'KI-Integration',
    'portfolio.projects.p2.description': 'Integration einer KI-gestützten Empfehlungs-Engine für eine Content-Plattform zur Verbesserung des Benutzerengagements',
    'portfolio.projects.p3.title': 'Marketing-Kampagne',
    'portfolio.projects.p3.description': 'Multimedia-Marketingkampagne für eine Produkteinführung, einschließlich Web-, Social Media- und Druckmaterialien',
    'portfolio.projects.p4.title': 'Unternehmenswebsite',
    'portfolio.projects.p4.description': 'Moderne Unternehmenswebsite mit integriertem CMS für ein Finanzdienstleistungsunternehmen',
    'portfolio.projects.p5.title': 'Markenidentität',
    'portfolio.projects.p5.description': 'Komplettes Markenidentitätspaket für ein Tech-Startup, einschließlich Logo, Typografie und Markenrichtlinien',
    'portfolio.projects.p6.title': 'Mobile App',
    'portfolio.projects.p6.description': 'Funktionsreiche mobile Anwendung für eine Gesundheits- und Wellness-Plattform mit personalisierten Benutzererlebnissen',
    'portfolio.testimonials.title': 'Kundenstimmen',
    'portfolio.testimonials.subtitle': 'Was unsere Kunden über uns sagen',
    'portfolio.testimonials.t1.quote': 'Das Team hat unsere Erwartungen übertroffen. Sie haben nicht nur eine wunderschöne Website geliefert, sondern auch unser gesamtes digitales Marketingspiel verbessert.',
    'portfolio.testimonials.t2.quote': 'Die KI-Lösung, die sie für uns entwickelt haben, hat unser Benutzerengagement und unsere Conversion-Raten drastisch verbessert. Höchst empfohlen!',
    'portfolio.testimonials.t3.quote': 'Professionell, pünktlich und unglaublich talentiert. Sie haben unsere Vision verstanden und sie mit Präzision zum Leben erweckt.',
    'portfolio.cta.title': 'Bereit, an deinem Projekt zu arbeiten?',
    'portfolio.cta.description': 'Lass uns besprechen, wie wir deine Ideen zum Leben erwecken können',
    'portfolio.cta.contact': 'Kontakt aufnehmen',
    'portfolio.cta.schedule': 'Termin vereinbaren',
    
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
    'services.learnMore': 'Learn More',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern, responsive websites and web applications built with the latest technologies',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'User-centered design that creates intuitive, engaging experiences across all platforms',
    'services.marketing.title': 'Digital Marketing',
    'services.marketing.description': 'Data-driven marketing strategies that increase visibility and drive conversions',
    'services.mobile.title': 'Mobile Development',
    'services.mobile.description': 'Native and cross-platform mobile apps for iOS and Android',
    'services.ai.title': 'AI & Machine Learning',
    'services.ai.description': 'Intelligent solutions powered by cutting-edge AI and machine learning',
    'services.ecommerce.title': 'E-Commerce Solutions',
    'services.ecommerce.description': 'End-to-end e-commerce platforms optimized for conversions and customer retention',
    'services.toast.title': 'Service Selected',
    'services.toast.description': 'Thank you for your interest! We will get in touch with you shortly.',
    'services.hero.title': 'Our Services',
    'services.hero.subtitle': 'Tailored solutions for your digital challenges',
    'services.main.title': 'We Help You Succeed Online',
    'services.main.subtitle': 'Our comprehensive services support you at every step of your digital journey',
    'services.process.title': 'Our Process',
    'services.process.subtitle': 'How we work to achieve your goals',
    'services.process.discovery': 'Discovery',
    'services.process.discoveryDesc': 'We understand your needs, goals, and challenges',
    'services.process.strategy': 'Strategy',
    'services.process.strategyDesc': 'We develop a tailored plan to achieve your objectives',
    'services.process.execution': 'Execution',
    'services.process.executionDesc': 'We implement the strategy with precision and quality',
    'services.process.optimization': 'Optimization',
    'services.process.optimizationDesc': 'We continuously optimize for best results',
    'services.cta.title': 'Ready for the Next Step?',
    'services.cta.description': 'Let\'s discuss how we can help with your next project',
    'services.cta.contact': 'Get in Touch',
    'services.cta.schedule': 'Schedule a Call',
    
    // Solutions
    'solutions.title': 'Our Solutions',
    'solutions.subtitle': 'Innovative solutions for your requirements',
    'solutions.learnMore': 'Learn More',
    'solutions.hero.title': 'Industry-Specific Solutions',
    'solutions.hero.subtitle': 'Tailored strategies for different business sectors',
    'solutions.industries.title': 'Industries We Serve',
    'solutions.industries.subtitle': 'Specialized solutions for various sectors',
    'solutions.industries.business.title': 'Business Solutions',
    'solutions.industries.business.description': 'Comprehensive digital transformation solutions tailored for small to medium businesses',
    'solutions.industries.business.feature1': 'Streamlined business processes',
    'solutions.industries.business.feature2': 'Scalable infrastructure',
    'solutions.industries.business.feature3': 'Customer-focused systems',
    'solutions.industries.ecommerce.title': 'E-Commerce',
    'solutions.industries.ecommerce.description': 'End-to-end online sales platforms with inventory management and payment processing',
    'solutions.industries.ecommerce.feature1': 'Seamless checkout experience',
    'solutions.industries.ecommerce.feature2': 'Integrated payment processing',
    'solutions.industries.ecommerce.feature3': 'Mobile optimization',
    'solutions.industries.corporate.title': 'Corporate Services',
    'solutions.industries.corporate.description': 'Enterprise-grade digital solutions for large organizations and corporations',
    'solutions.industries.corporate.feature1': 'Enterprise-wide integration',
    'solutions.industries.corporate.feature2': 'Robust security measures',
    'solutions.industries.corporate.feature3': 'Compliance management',
    'solutions.industries.education.title': 'Education',
    'solutions.industries.education.description': 'Learning management systems and educational platforms for schools and universities',
    'solutions.industries.education.feature1': 'Interactive learning environments',
    'solutions.industries.education.feature2': 'Progress tracking',
    'solutions.industries.education.feature3': 'Virtual classrooms',
    'solutions.industries.healthcare.title': 'Healthcare',
    'solutions.industries.healthcare.description': 'Digital health solutions including patient management and telehealth services',
    'solutions.industries.healthcare.feature1': 'Secure patient data',
    'solutions.industries.healthcare.feature2': 'Telehealth integration',
    'solutions.industries.healthcare.feature3': 'Healthcare compliance',
    'solutions.industries.startup.title': 'Startups',
    'solutions.industries.startup.description': 'Agile, scalable solutions designed specifically for startups and new ventures',
    'solutions.industries.startup.feature1': 'Rapid time-to-market',
    'solutions.industries.startup.feature2': 'Cost-effective solutions',
    'solutions.industries.startup.feature3': 'Scalable architecture',
    'solutions.caseStudies.title': 'Case Studies',
    'solutions.caseStudies.subtitle': 'Success stories from our clients',
    'solutions.caseStudies.readCase': 'Read Case Study',
    'solutions.caseStudies.case1.industry': 'E-Commerce',
    'solutions.caseStudies.case1.title': '200% Revenue Increase for Online Retailer',
    'solutions.caseStudies.case1.description': 'How we helped an emerging e-commerce business triple their revenue through a comprehensive digital strategy',
    'solutions.caseStudies.case2.industry': 'Healthcare',
    'solutions.caseStudies.case2.title': 'Digital Transformation for Healthcare Provider',
    'solutions.caseStudies.case2.description': 'A comprehensive digital solution that improved patient care and operational efficiency',
    'solutions.cta.title': 'Let\'s Build Your Industry Solution',
    'solutions.cta.description': 'Contact us for a tailored strategy designed for your specific industry needs',
    'solutions.cta.contact': 'Get in Touch',
    'solutions.cta.schedule': 'Schedule a Call',
    'solutions.cta.stat': '93% Client Satisfaction',
    'solutions.cta.statDesc': 'Based on our last 100 projects',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Some of our projects',
    'portfolio.viewProject': 'View Project',
    'portfolio.hero.title': 'Our Portfolio',
    'portfolio.hero.subtitle': 'Discover our most successful projects',
    'portfolio.projects.title': 'Featured Work',
    'portfolio.projects.subtitle': 'A collection of our best projects across different domains',
    'portfolio.projects.p1.title': 'E-Commerce Redesign',
    'portfolio.projects.p1.description': 'Complete redesign of an e-commerce platform with focus on user experience and conversion optimization',
    'portfolio.projects.p2.title': 'AI Integration',
    'portfolio.projects.p2.description': 'Integration of AI-powered recommendation engine for a content platform to improve user engagement',
    'portfolio.projects.p3.title': 'Marketing Campaign',
    'portfolio.projects.p3.description': 'Multimedia marketing campaign for a product launch, including web, social media, and print materials',
    'portfolio.projects.p4.title': 'Corporate Website',
    'portfolio.projects.p4.description': 'Modern corporate website with integrated CMS for a financial services company',
    'portfolio.projects.p5.title': 'Brand Identity',
    'portfolio.projects.p5.description': 'Complete brand identity package for a tech startup, including logo, typography, and brand guidelines',
    'portfolio.projects.p6.title': 'Mobile App',
    'portfolio.projects.p6.description': 'Feature-rich mobile application for a health and wellness platform with personalized user experiences',
    'portfolio.testimonials.title': 'Client Testimonials',
    'portfolio.testimonials.subtitle': 'What our clients say about us',
    'portfolio.testimonials.t1.quote': 'The team exceeded our expectations. They not only delivered a beautiful website but improved our entire digital marketing game.',
    'portfolio.testimonials.t2.quote': 'The AI solution they developed for us has drastically improved our user engagement and conversion rates. Highly recommended!',
    'portfolio.testimonials.t3.quote': 'Professional, timely, and incredibly talented. They understood our vision and brought it to life with precision.',
    'portfolio.cta.title': 'Ready to Work on Your Project?',
    'portfolio.cta.description': 'Let\'s discuss how we can bring your ideas to life',
    'portfolio.cta.contact': 'Get in Touch',
    'portfolio.cta.schedule': 'Schedule a Call',
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
