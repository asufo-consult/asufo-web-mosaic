
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, ArrowRight, Building, ShoppingBag, Briefcase, GraduationCap, HeartPulse, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Solutions = () => {
  const { t } = useLanguage();

  // In a real application, you would fetch this from your database
  const industries = [
    {
      id: 1,
      icon: <Building className="h-8 w-8" />,
      title: t('solutions.industries.business.title', 'Small Business'),
      description: t('solutions.industries.business.description', 'Affordable digital solutions to help small businesses compete in the digital landscape.'),
      features: [
        t('solutions.industries.business.feature1', 'Custom websites with e-commerce capabilities'),
        t('solutions.industries.business.feature2', 'Local SEO and Google My Business optimization'),
        t('solutions.industries.business.feature3', 'Social media management and paid advertising'),
      ],
    },
    {
      id: 2,
      icon: <ShoppingBag className="h-8 w-8" />,
      title: t('solutions.industries.ecommerce.title', 'E-commerce'),
      description: t('solutions.industries.ecommerce.description', 'Complete e-commerce solutions to help you sell products online effectively.'),
      features: [
        t('solutions.industries.ecommerce.feature1', 'Custom online stores with secure payment processing'),
        t('solutions.industries.ecommerce.feature2', 'Inventory management and order fulfillment'),
        t('solutions.industries.ecommerce.feature3', 'Conversion rate optimization and remarketing'),
      ],
    },
    {
      id: 3,
      icon: <Briefcase className="h-8 w-8" />,
      title: t('solutions.industries.corporate.title', 'Corporate'),
      description: t('solutions.industries.corporate.description', 'Enterprise-level solutions for large organizations with complex requirements.'),
      features: [
        t('solutions.industries.corporate.feature1', 'Enterprise web applications and intranets'),
        t('solutions.industries.corporate.feature2', 'Custom CRM and ERP integrations'),
        t('solutions.industries.corporate.feature3', 'Data analytics and business intelligence'),
      ],
    },
    {
      id: 4,
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('solutions.industries.education.title', 'Education'),
      description: t('solutions.industries.education.description', 'Digital solutions for educational institutions to enhance learning experiences.'),
      features: [
        t('solutions.industries.education.feature1', 'Learning management systems and online courses'),
        t('solutions.industries.education.feature2', 'Student portals and administrative tools'),
        t('solutions.industries.education.feature3', 'Educational content development and gamification'),
      ],
    },
    {
      id: 5,
      icon: <HeartPulse className="h-8 w-8" />,
      title: t('solutions.industries.healthcare.title', 'Healthcare'),
      description: t('solutions.industries.healthcare.description', 'Secure and compliant solutions for healthcare providers and institutions.'),
      features: [
        t('solutions.industries.healthcare.feature1', 'HIPAA-compliant web and mobile applications'),
        t('solutions.industries.healthcare.feature2', 'Patient portals and telemedicine platforms'),
        t('solutions.industries.healthcare.feature3', 'Healthcare data management and analytics'),
      ],
    },
    {
      id: 6,
      icon: <Sparkles className="h-8 w-8" />,
      title: t('solutions.industries.startup.title', 'Startups'),
      description: t('solutions.industries.startup.description', 'Agile solutions for startups looking to establish their digital presence quickly.'),
      features: [
        t('solutions.industries.startup.feature1', 'MVP development and rapid prototyping'),
        t('solutions.industries.startup.feature2', 'Growth hacking and user acquisition strategies'),
        t('solutions.industries.startup.feature3', 'Pitch deck design and investor presentations'),
      ],
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
                {t('solutions.hero.title', 'Industry Solutions')}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t('solutions.hero.subtitle', 'Tailored digital solutions for your industry challenges')}
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                {t('solutions.hero.cta', 'Find Your Solution')}
              </Button>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('solutions.industries.title', 'Solutions by Industry')}</h2>
              <p className="text-muted-foreground">
                {t('solutions.industries.subtitle', 'We provide specialized solutions for various industries to address their unique challenges')}
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
                      {t('solutions.learnMore', 'Learn more')}
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
              <h2 className="text-3xl font-bold mb-4">{t('solutions.caseStudies.title', 'Success Stories')}</h2>
              <p className="text-muted-foreground">
                {t('solutions.caseStudies.subtitle', 'See how we\'ve helped organizations across different industries')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <div className="metal-card overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                    alt="Case study" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {t('solutions.caseStudies.case1.industry', 'Corporate')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('solutions.caseStudies.case1.title', 'Enterprise Portal for Global Corporation')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('solutions.caseStudies.case1.description', 'We developed a comprehensive digital workplace solution that improved employee productivity by 32%.')}
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white"
                  >
                    {t('solutions.caseStudies.readCase', 'Read Case Study')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="metal-card overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                    alt="Case study" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {t('solutions.caseStudies.case2.industry', 'E-commerce')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('solutions.caseStudies.case2.title', 'Online Marketplace Transformation')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('solutions.caseStudies.case2.description', 'Our e-commerce solution helped this retailer increase online sales by 215% within the first six months.')}
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white"
                  >
                    {t('solutions.caseStudies.readCase', 'Read Case Study')}
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
                  <h2 className="text-3xl font-bold mb-4 text-white">{t('solutions.cta.title', 'Let\'s solve your industry challenges together')}</h2>
                  <p className="mb-6 text-white/80">
                    {t('solutions.cta.description', 'Schedule a consultation with our industry experts to discuss your specific needs and discover how we can help you achieve your goals.')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="font-semibold"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {t('solutions.cta.contact', 'Contact Our Team')}
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => window.location.href = 'https://tidycal.com'}
                    >
                      {t('solutions.cta.schedule', 'Schedule a Call')}
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <img 
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                    alt="Mountains" 
                    className="object-cover h-full w-full brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <h3 className="text-2xl font-bold mb-2">{t('solutions.cta.stat', 'Over 200+')}</h3>
                      <p className="text-white/80">{t('solutions.cta.statDesc', 'Successful projects delivered across industries')}</p>
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
