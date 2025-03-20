
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Laptop, PenTool, BarChart, Smartphone, Globe, MonitorSmartphone, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Services = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // In a real application, you would fetch this from your database
  const services = [
    {
      id: 1,
      icon: <Globe className="h-8 w-8" />,
      title: t('services.web.title', 'Web Development'),
      description: t('services.web.description', 'Custom websites and web applications built with modern technologies for optimal performance and user experience.'),
      color: 'from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700',
    },
    {
      id: 2,
      icon: <PenTool className="h-8 w-8" />,
      title: t('services.design.title', 'UI/UX Design'),
      description: t('services.design.description', 'User-centered design that combines aesthetics with functionality to create engaging digital experiences.'),
      color: 'from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700',
    },
    {
      id: 3,
      icon: <BarChart className="h-8 w-8" />,
      title: t('services.marketing.title', 'Digital Marketing'),
      description: t('services.marketing.description', 'Data-driven strategies to increase your online visibility, drive traffic, and convert leads into customers.'),
      color: 'from-green-600 to-green-800 dark:from-green-500 dark:to-green-700',
    },
    {
      id: 4,
      icon: <Smartphone className="h-8 w-8" />,
      title: t('services.mobile.title', 'Mobile App Development'),
      description: t('services.mobile.description', 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.'),
      color: 'from-orange-600 to-orange-800 dark:from-orange-500 dark:to-orange-700',
    },
    {
      id: 5,
      icon: <Laptop className="h-8 w-8" />,
      title: t('services.ai.title', 'AI Integration'),
      description: t('services.ai.description', 'Integrate artificial intelligence solutions into your business processes to automate tasks and gain insights.'),
      color: 'from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700',
    },
    {
      id: 6,
      icon: <MonitorSmartphone className="h-8 w-8" />,
      title: t('services.ecommerce.title', 'E-commerce Solutions'),
      description: t('services.ecommerce.description', 'Complete e-commerce development with secure payment gateways, inventory management, and customer analytics.'),
      color: 'from-pink-600 to-pink-800 dark:from-pink-500 dark:to-pink-700',
    },
  ];

  const handleServiceClick = (serviceId: number) => {
    toast({
      title: t('services.toast.title', 'Service Selected'),
      description: t('services.toast.description', 'We\'ll contact you about this service soon.'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-20 md:py-28">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('services.hero.title', 'Our Services')}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t('services.hero.subtitle', 'Comprehensive digital solutions tailored to your needs')}
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                {t('services.hero.cta', 'Get a Free Consultation')}
              </Button>
            </div>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('services.main.title', 'What We Offer')}</h2>
              <p className="text-muted-foreground">
                {t('services.main.subtitle', 'Explore our range of professional services designed to help your business thrive in the digital world')}
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
                      {t('services.learnMore', 'Learn more')}
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
              <h2 className="text-3xl font-bold mb-4">{t('services.process.title', 'Our Process')}</h2>
              <p className="text-muted-foreground">
                {t('services.process.subtitle', 'How we deliver exceptional results for every project')}
              </p>
            </div>

            <div className="relative">
              {/* Process steps */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-metal/20 dark:bg-white/10 -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-4 gap-8 relative">
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.discovery', 'Discovery')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.discoveryDesc', 'We start by understanding your business, goals, and challenges.')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.strategy', 'Strategy')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.strategyDesc', 'We develop a customized plan aligned with your objectives and budget.')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.execution', 'Execution')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.executionDesc', 'Our team brings your project to life with precision and creativity.')}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">4</div>
                  <h3 className="text-xl font-semibold mb-3">{t('services.process.optimization', 'Optimization')}</h3>
                  <p className="text-muted-foreground">
                    {t('services.process.optimizationDesc', 'We continuously refine and improve to ensure optimal performance.')}
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
                  <h2 className="text-3xl font-bold mb-4">{t('services.cta.title', 'Ready to grow your business?')}</h2>
                  <p className="mb-6 text-white/80">
                    {t('services.cta.description', 'Let\'s discuss how our services can help you achieve your business goals. Contact us today for a free consultation.')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="font-semibold"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {t('services.cta.contact', 'Contact Us')}
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => window.location.href = 'https://tidycal.com'}
                    >
                      {t('services.cta.schedule', 'Schedule a Call')}
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
