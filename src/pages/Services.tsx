
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Laptop, PenTool, BarChart, Smartphone, Globe, MonitorSmartphone, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHero from '@/components/PageHero';

const Services = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // In a real application, you would fetch this from your database
  const services = [
    {
      id: 1,
      icon: <Globe className="h-8 w-8" />,
      title: t('services.web.title'),
      description: t('services.web.description'),
      color: 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700',
    },
    {
      id: 2,
      icon: <PenTool className="h-8 w-8" />,
      title: t('services.design.title'),
      description: t('services.design.description'),
      color: 'from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700',
    },
    {
      id: 3,
      icon: <BarChart className="h-8 w-8" />,
      title: t('services.marketing.title'),
      description: t('services.marketing.description'),
      color: 'from-green-600 to-green-800 dark:from-green-500 dark:to-green-700',
    },
    {
      id: 4,
      icon: <Smartphone className="h-8 w-8" />,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      color: 'from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700',
    },
    {
      id: 5,
      icon: <Laptop className="h-8 w-8" />,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      color: 'from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700',
    },
    {
      id: 6,
      icon: <MonitorSmartphone className="h-8 w-8" />,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
      color: 'from-pink-600 to-pink-800 dark:from-pink-500 dark:to-pink-700',
    },
  ];

  const handleServiceClick = (serviceId: number) => {
    toast({
      title: t('services.toast.title'),
      description: t('services.toast.description'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <PageHero 
          title={t('services.hero.title')}
          subtitle={t('services.hero.subtitle')}
          bgImageIndex={2}
        />

        {/* Main Services Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('services.main.title')}</h2>
              <p className="text-muted-foreground">
                {t('services.main.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="metal-card group cursor-pointer" onClick={() => handleServiceClick(service.id)}>
                  <div className="p-8">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-6 text-white bg-gradient-to-r ${service.color} transition-transform group-hover:scale-110`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <a className="inline-flex items-center text-primary font-medium group-hover:underline">
                      {t('services.learnMore')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('services.process.title')}</h2>
              <p className="text-muted-foreground">
                {t('services.process.subtitle')}
              </p>
            </div>

            <div className="relative">
              {/* Process steps */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-metal/20 dark:bg-white/10 -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-4 gap-8 relative">
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.discovery')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.discoveryDesc')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.strategy')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.strategyDesc')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.execution')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.executionDesc')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">4</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.optimization')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.optimizationDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t('services.cta.title')}</h2>
                  <p className="mb-6 text-white/80">
                    {t('services.cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="font-semibold"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {t('services.cta.contact')}
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => window.location.href = 'https://tidycal.com'}
                    >
                      {t('services.cta.schedule')}
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <Lightbulb className="h-48 w-48 text-white/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
