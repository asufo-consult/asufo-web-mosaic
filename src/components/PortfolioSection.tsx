
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();

  // Sample portfolio projects
  const projects = [
    {
      title: 'E-Commerce Redesign',
      image: '/portfolio-1.jpg',
      description: 'Complete redesign of an e-commerce platform with focus on user experience and conversion optimization.',
      link: '#',
      facts: [
        'Conversion rate increased by 35%',
        'Page load time reduced by 40%',
        'Mobile-first approach'
      ]
    },
    {
      title: 'AI Integration',
      image: '/portfolio-2.jpg',
      description: 'Integration of AI-powered recommendation engine for a content platform to improve user engagement.',
      link: '#',
      facts: [
        'User engagement up by 42%',
        'Custom ML algorithm',
        'Realtime analytics dashboard'
      ]
    },
    {
      title: 'Marketing Campaign',
      image: '/portfolio-3.jpg',
      description: 'Multimedia marketing campaign for a product launch, including web, social media, and print materials.',
      link: '#',
      facts: [
        '250,000+ impressions',
        'Cross-platform integration',
        'Award-winning design'
      ]
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-secondary/50 dark:bg-card/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('portfolio.title')}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="metal-card overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">Key Facts</h4>
                  <ul className="space-y-2">
                    {project.facts.map((fact, factIndex) => (
                      <li key={factIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {t('portfolio.viewProject')}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
