
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolutionsGrid from '@/components/solutions/SolutionsGrid';
import { Solution } from '@/components/solutions/SolutionCard';
import { fetchSolutions } from '@/utils/supabaseQueries';

const Solutions = () => {
  const { t, language } = useLanguage();
  
  // Fetch solutions from Supabase
  const { data: solutions = [], isLoading } = useQuery({
    queryKey: ['solutions', language],
    queryFn: () => fetchSolutions(language),
  });

  // Transform data to add example features for display
  const solutionsWithFeatures = solutions.map(solution => ({
    ...solution,
    features: [
      t(`solutions.industries.${solution.title.toLowerCase().replace(/\s+/g, '')}.feature1`) || 'Streamlined operations',
      t(`solutions.industries.${solution.title.toLowerCase().replace(/\s+/g, '')}.feature2`) || 'Increased efficiency',
      t(`solutions.industries.${solution.title.toLowerCase().replace(/\s+/g, '')}.feature3`) || 'Advanced security'
    ]
  })) as Solution[];

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
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <SolutionsGrid solutions={solutionsWithFeatures} />
            )}
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
