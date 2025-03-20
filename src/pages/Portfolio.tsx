
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PageHero from '@/components/PageHero';

const Portfolio = () => {
  const { t } = useLanguage();

  // In a real application, you would fetch this from your database
  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.p1.title'),
      description: t('portfolio.projects.p1.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-1.jpg',
      category: 'web',
      link: '#',
    },
    {
      id: 2,
      title: t('portfolio.projects.p2.title'),
      description: t('portfolio.projects.p2.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-2.jpg',
      category: 'branding',
      link: '#',
    },
    {
      id: 3,
      title: t('portfolio.projects.p3.title'),
      description: t('portfolio.projects.p3.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-3.jpg',
      category: 'mobile',
      link: '#',
    },
    {
      id: 4,
      title: t('portfolio.projects.p4.title'),
      description: t('portfolio.projects.p4.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-4.jpg',
      category: 'web',
      link: '#',
    },
    {
      id: 5,
      title: t('portfolio.projects.p5.title'),
      description: t('portfolio.projects.p5.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-5.jpg',
      category: 'marketing',
      link: '#',
    },
    {
      id: 6,
      title: t('portfolio.projects.p6.title'),
      description: t('portfolio.projects.p6.description'),
      image: 'https://assets.iderdex.com/newwork/new-work-6.jpg',
      category: 'web',
      link: '#',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      quote: t('portfolio.testimonials.t1.quote'),
      image: 'https://assets.iderdex.com/newwork/new-work-7.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'GrowthLabs',
      quote: t('portfolio.testimonials.t2.quote'),
      image: 'https://assets.iderdex.com/newwork/new-work-1.jpg',
    },
    {
      id: 3,
      name: 'Emma Williams',
      company: 'Retail Solutions',
      quote: t('portfolio.testimonials.t3.quote'),
      image: 'https://assets.iderdex.com/newwork/new-work-2.jpg',
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
                  <TabsTrigger value="web">Web Development</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="web" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'web').map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mobile" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'mobile').map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="branding" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'branding').map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="marketing" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.filter(p => p.category === 'marketing').map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
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
                <div key={testimonial.id} className="metal-card p-8">
                  <div className="flex items-center mb-6">
                    <svg className="text-primary h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
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

const ProjectCard = ({ project }) => {
  const { t } = useLanguage();
  
  return (
    <div className="metal-card overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        <a 
          href={project.link} 
          className="inline-flex items-center text-primary font-medium group-hover:underline"
        >
          {t('portfolio.viewProject')}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
