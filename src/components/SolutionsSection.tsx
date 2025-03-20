
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Package, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const SolutionsSection: React.FC = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Users className="h-12 w-12 text-white mb-6" />,
      title: t('solutions.consulting.title'),
      description: t('solutions.consulting.description'),
      color: 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700',
    },
    {
      icon: <Package className="h-12 w-12 text-white mb-6" />,
      title: t('solutions.products.title'),
      description: t('solutions.products.description'),
      color: 'from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700',
    },
    {
      icon: <Briefcase className="h-12 w-12 text-white mb-6" />,
      title: t('solutions.services.title'),
      description: t('solutions.services.description'),
      color: 'from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700',
    },
  ];

  return (
    <section id="solutions" className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('solutions.title')}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('solutions.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              className={`rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${solution.color} h-full flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-8 flex flex-col items-center text-center flex-grow">
                <div className="rounded-full bg-white/10 p-4 mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{solution.title}</h3>
                <p className="text-white/80">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
