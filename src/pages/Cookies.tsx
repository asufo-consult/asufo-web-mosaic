
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Cookie, Lock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/PageHero';

const Cookies = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-secondary/30 dark:bg-card/30 py-16 md:py-20">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('cookies.title')}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t('cookies.subtitle')}
              </p>
              <div className="flex justify-center space-x-3 mt-6">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  {t('cookies.lastUpdated')}: {new Date().toLocaleDateString()}
                </p>
                
                <h2>{t('cookies.whatAre.title')}</h2>
                <p>
                  {t('cookies.whatAre.p1')}
                </p>
                
                <h2>{t('cookies.howWeUse.title')}</h2>
                <p>
                  {t('cookies.howWeUse.p1')}
                </p>
                
                <h2>{t('cookies.types.title')}</h2>
                
                <h3>{t('cookies.types.account.title')}</h3>
                <p>
                  {t('cookies.types.account.p1')}
                </p>
                
                <h3>{t('cookies.types.login.title')}</h3>
                <p>
                  {t('cookies.types.login.p1')}
                </p>
                
                <h3>{t('cookies.types.forms.title')}</h3>
                <p>
                  {t('cookies.types.forms.p1')}
                </p>
                
                <h3>{t('cookies.types.site.title')}</h3>
                <p>
                  {t('cookies.types.site.p1')}
                </p>
                
                <h2>{t('cookies.thirdParty.title')}</h2>
                <p>
                  {t('cookies.thirdParty.p1')}
                </p>
                <ul>
                  <li>
                    {t('cookies.thirdParty.analytics')}
                  </li>
                  <li>
                    {t('cookies.thirdParty.social')}
                  </li>
                </ul>
                
                <h2>{t('cookies.disabling.title')}</h2>
                <p>
                  {t('cookies.disabling.p1')}
                </p>
                
                <h2>{t('cookies.more.title')}</h2>
                <p>
                  {t('cookies.more.p1')}
                </p>
                <p>
                  {t('cookies.more.p2')}
                </p>
                <ul>
                  <li>{t('cookies.more.email')}: <a href="mailto:privacy@asufoconsult.com" className="text-primary">privacy@asufoconsult.com</a></li>
                  <li>{t('cookies.more.phone')}: +49 123 456 7890</li>
                </ul>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button 
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('cookies.backButton')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
