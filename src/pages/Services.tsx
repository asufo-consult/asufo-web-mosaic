
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ServicesGrid from '@/components/services/ServicesGrid';
import { fetchServices } from '@/utils/supabaseQueries';

const Services = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  // Fetch services from Supabase
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services', language],
    queryFn: () => fetchServices(language),
  });

  useEffect(() => {
    console.log("Fetched services:", services); // Debugging
    
    if (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error loading services",
        description: "There was a problem loading the services. Please try again later.",
        variant: "destructive",
      });
    }
  }, [services, error, toast]);

  const handleServiceClick = (serviceId: string) => {
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
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {services && services.length > 0 ? (
                  <ServicesGrid services={services} onServiceClick={handleServiceClick} />
                ) : (
                  <div className="py-8 text-center text-muted-foreground">No services found.</div>
                )}
              </>
            )}
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
