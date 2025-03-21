
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ProjectsGrid from '@/components/portfolio/ProjectsGrid';
import TestimonialCard from '@/components/portfolio/TestimonialCard';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { fetchProjects } from '@/utils/supabaseQueries';

const Portfolio = () => {
  const { t, language } = useLanguage();
  
  // Fetch projects from Supabase
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects', language],
    queryFn: () => fetchProjects(language),
  });
  
  // Categories based on the data
  const categories = ['web', 'mobile', 'branding', 'marketing'];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      quote: t('portfolio.testimonials.t1.quote'),
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'GrowthLabs',
      quote: t('portfolio.testimonials.t2.quote'),
    },
    {
      id: 3,
      name: 'Emma Williams',
      company: 'Retail Solutions',
      quote: t('portfolio.testimonials.t3.quote'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <PageHero 
          title={t('portfolio.hero.title')}
          subtitle={t('portfolio.hero.subtitle')}
          bgImageIndex={4}
        />

        {/* Projects Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('portfolio.projects.title')}</h2>
              <p className="text-muted-foreground">
                {t('portfolio.projects.subtitle')}
              </p>
            </div>
            
            <Tabs defaultValue="all" className="mb-12">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-8">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <ProjectsGrid projects={projects} />
                )}
              </TabsContent>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <ProjectsGrid 
                      projects={projects.filter(p => p.category === category)} 
                    />
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('portfolio.testimonials.title')}</h2>
              <p className="text-muted-foreground">
                {t('portfolio.testimonials.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard 
                  key={testimonial.id}
                  name={testimonial.name}
                  company={testimonial.company}
                  quote={testimonial.quote}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="metal-card p-8 md:p-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">{t('portfolio.cta.title')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('portfolio.cta.description')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {t('portfolio.cta.contact')}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => window.location.href = 'https://tidycal.com'}
                  >
                    {t('portfolio.cta.schedule')}
                  </Button>
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

export default Portfolio;
