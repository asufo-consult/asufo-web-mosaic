
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, ArrowRight, Building, ShoppingBag, Briefcase, GraduationCap, HeartPulse, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';

const Solutions = () => {
  const { t } = useLanguage();

  // In a real application, you would fetch this from your database
  const industries = [
    {
      id: 1,
      icon: <Building className="h-8 w-8" />,
      title: t('solutions.industries.business.title'),
      description: t('solutions.industries.business.description'),
      features: [
        t('solutions.industries.business.feature1'),
        t('solutions.industries.business.feature2'),
        t('solutions.industries.business.feature3'),
      ],
    },
    {
      id: 2,
      icon: <ShoppingBag className="h-8 w-8" />,
      title: t('solutions.industries.ecommerce.title'),
      description: t('solutions.industries.ecommerce.description'),
      features: [
        t('solutions.industries.ecommerce.feature1'),
        t('solutions.industries.ecommerce.feature2'),
        t('solutions.industries.ecommerce.feature3'),
      ],
    },
    {
      id: 3,
      icon: <Briefcase className="h-8 w-8" />,
      title: t('solutions.industries.corporate.title'),
      description: t('solutions.industries.corporate.description'),
      features: [
        t('solutions.industries.corporate.feature1'),
        t('solutions.industries.corporate.feature2'),
        t('solutions.industries.corporate.feature3'),
      ],
    },
    {
      id: 4,
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('solutions.industries.education.title'),
      description: t('solutions.industries.education.description'),
      features: [
        t('solutions.industries.education.feature1'),
        t('solutions.industries.education.feature2'),
        t('solutions.industries.education.feature3'),
      ],
    },
    {
      id: 5,
      icon: <HeartPulse className="h-8 w-8" />,
      title: t('solutions.industries.healthcare.title'),
      description: t('solutions.industries.healthcare.description'),
      features: [
        t('solutions.industries.healthcare.feature1'),
        t('solutions.industries.healthcare.feature2'),
        t('solutions.industries.healthcare.feature3'),
      ],
    },
    {
      id: 6,
      icon: <Sparkles className="h-8 w-8" />,
      title: t('solutions.industries.startup.title'),
      description: t('solutions.industries.startup.description'),
      features: [
        t('solutions.industries.startup.feature1'),
        t('solutions.industries.startup.feature2'),
        t('solutions.industries.startup.feature3'),
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <PageHero 
          title={t('solutions.hero.title')}
          subtitle={t('solutions.hero.subtitle')}
          bgImageIndex={3}
        />

        {/* Industries Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('solutions.industries.title')}</h2>
              <p className="text-muted-foreground">
                {t('solutions.industries.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <div key={industry.id} className="metal-card group">
                  <div className="p-8">
                    <div className="w-16 h-16 flex items-center justify-center rounded-lg mb-6 text-white bg-gradient-to-r from-primary to-blue-600 transition-transform group-hover:scale-110">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{industry.title}</h3>
                    <p className="text-muted-foreground mb-6">{industry.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {industry.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a className="inline-flex items-center text-primary font-medium group-hover:underline">
                      {t('solutions.learnMore')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('solutions.caseStudies.title')}</h2>
              <p className="text-muted-foreground">
                {t('solutions.caseStudies.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <div className="metal-card overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://assets.iderdex.com/newwork/new-work-2.jpg" 
                    alt="Case study" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {t('solutions.caseStudies.case1.industry')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('solutions.caseStudies.case1.title')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('solutions.caseStudies.case1.description')}
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white"
                  >
                    {t('solutions.caseStudies.readCase')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="metal-card overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://assets.iderdex.com/newwork/new-work-3.jpg" 
                    alt="Case study" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {t('solutions.caseStudies.case2.industry')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('solutions.caseStudies.case2.title')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('solutions.caseStudies.case2.description')}
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white"
                  >
                    {t('solutions.caseStudies.readCase')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4 text-white">{t('solutions.cta.title')}</h2>
                  <p className="mb-6 text-white/80">
                    {t('solutions.cta.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="font-semibold"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {t('solutions.cta.contact')}
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => window.location.href = 'https://tidycal.com'}
                    >
                      {t('solutions.cta.schedule')}
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <img 
                    src="https://assets.iderdex.com/newwork/new-work-5.jpg" 
                    alt="Mountains" 
                    className="object-cover h-full w-full brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <h3 className="text-2xl font-bold mb-2">{t('solutions.cta.stat')}</h3>
                      <p className="text-white/80">{t('solutions.cta.statDesc')}</p>
                    </div>
                  </div>
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

export default Solutions;
