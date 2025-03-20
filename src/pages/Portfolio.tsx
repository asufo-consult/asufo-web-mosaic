
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

const Portfolio = () => {
  const { t } = useLanguage();

  // In a real application, you would fetch this from your database
  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.p1.title', 'E-commerce Platform'),
      description: t('portfolio.projects.p1.description', 'A comprehensive e-commerce solution with advanced product filtering, secure payments, and customer accounts.'),
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'web',
      link: '#',
    },
    {
      id: 2,
      title: t('portfolio.projects.p2.title', 'Corporate Rebrand'),
      description: t('portfolio.projects.p2.description', 'Complete brand identity redesign including logo, website, and marketing materials for a global corporation.'),
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
      category: 'branding',
      link: '#',
    },
    {
      id: 3,
      title: t('portfolio.projects.p3.title', 'Mobile Banking App'),
      description: t('portfolio.projects.p3.description', 'Secure and user-friendly mobile banking application with biometric authentication and real-time notifications.'),
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      category: 'mobile',
      link: '#',
    },
    {
      id: 4,
      title: t('portfolio.projects.p4.title', 'Healthcare Portal'),
      description: t('portfolio.projects.p4.description', 'HIPAA-compliant patient portal with appointment scheduling, medical records access, and secure messaging.'),
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      category: 'web',
      link: '#',
    },
    {
      id: 5,
      title: t('portfolio.projects.p5.title', 'Digital Marketing Campaign'),
      description: t('portfolio.projects.p5.description', 'Integrated digital marketing campaign that increased lead generation by 150% for a B2B software company.'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      category: 'marketing',
      link: '#',
    },
    {
      id: 6,
      title: t('portfolio.projects.p6.title', 'Educational Platform'),
      description: t('portfolio.projects.p6.description', 'Interactive learning platform with course management, progress tracking, and certification for online education.'),
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
      category: 'web',
      link: '#',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      quote: t('portfolio.testimonials.t1.quote', 'Working with asufo consult transformed our online presence. Their team delivered a website that exceeded our expectations and helped us increase our conversion rate by 45%.'),
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'GrowthLabs',
      quote: t('portfolio.testimonials.t2.quote', 'Their expertise in digital marketing and AI integration has been invaluable to our business. We\'ve seen a significant improvement in our online visibility and customer engagement.'),
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    },
    {
      id: 3,
      name: 'Emma Williams',
      company: 'Retail Solutions',
      quote: t('portfolio.testimonials.t3.quote', 'The e-commerce platform developed by asufo consult has revolutionized our online sales. The user-friendly interface and robust backend have made managing our store a breeze.'),
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-20 md:py-28">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('portfolio.hero.title', 'Our Portfolio')}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t('portfolio.hero.subtitle', 'Showcasing our best work across various industries and technologies')}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('portfolio.projects.title', 'Featured Projects')}</h2>
              <p className="text-muted-foreground">
                {t('portfolio.projects.subtitle', 'Browse our recent work and see how we help businesses achieve their goals')}
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
              <h2 className="text-3xl font-bold mb-4">{t('portfolio.testimonials.title', 'Client Testimonials')}</h2>
              <p className="text-muted-foreground">
                {t('portfolio.testimonials.subtitle', 'What our clients say about working with us')}
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
                <h2 className="text-3xl font-bold mb-4">{t('portfolio.cta.title', 'Ready to start your project?')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('portfolio.cta.description', 'Let\'s discuss how we can help you achieve your business goals with our expertise in digital solutions.')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {t('portfolio.cta.contact', 'Contact Us')}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => window.location.href = 'https://tidycal.com'}
                  >
                    {t('portfolio.cta.schedule', 'Schedule a Call')}
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
          {t('portfolio.viewProject', 'View Project')}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
