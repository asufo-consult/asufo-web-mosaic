
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Code, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary mb-4" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
    },
    {
      icon: <Code className="h-8 w-8 text-primary mb-4" />,
      title: t('services.development.title'),
      description: t('services.development.description'),
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary mb-4" />,
      title: t('services.coaching.title'),
      description: t('services.coaching.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-secondary/50 dark:bg-card/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="metal-card p-8 text-center hover:scale-105"
              variants={itemVariants}
            >
              <div className="flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
