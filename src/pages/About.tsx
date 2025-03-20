
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, Award, BarChart3, Clock, Target, LineChart, Check, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <PageHero 
          title={t('about.hero.title')}
          subtitle={t('about.hero.subtitle')}
          bgImageIndex={1}
        />

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('about.story.title')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('about.story.p1')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('about.story.p2')}
                </p>
                <p className="text-muted-foreground">
                  {t('about.story.p3')}
                </p>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://assets.iderdex.com/newwork/new-work-4.jpg" 
                    alt="Our team" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-24">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">{t('about.values.title')}</h2>
              <p className="text-muted-foreground">
                {t('about.values.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v1.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v1.description')}
                </p>
              </div>
              
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v2.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v2.description')}
                </p>
              </div>
              
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v3.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v3.description')}
                </p>
              </div>
              
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v4.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v4.description')}
                </p>
              </div>
              
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v5.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v5.description')}
                </p>
              </div>
              
              <div className="metal-card p-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('about.values.v6.title')}</h3>
                <p className="text-muted-foreground">
                  {t('about.values.v6.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">{t('about.cta.title')}</h2>
                <p className="mb-8 text-white/80">
                  {t('about.cta.description')}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="font-semibold"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {t('about.cta.contact')}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    onClick={() => window.location.href = '/portfolio'}
                  >
                    {t('about.cta.portfolio')}
                    <ExternalLink className="ml-2 h-4 w-4" />
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

export default About;
