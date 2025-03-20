
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Cookie, Lock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                {t('cookies.title', 'Cookie Policy')}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t('cookies.subtitle', 'Understanding how we use cookies on our website')}
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
                  {t('cookies.lastUpdated', 'Last updated')}: {new Date().toLocaleDateString()}
                </p>
                
                <h2>{t('cookies.whatAre.title', 'What Are Cookies')}</h2>
                <p>
                  {t('cookies.whatAre.p1', 'As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or \'break\' certain elements of the site\'s functionality.')}
                </p>
                
                <h2>{t('cookies.howWeUse.title', 'How We Use Cookies')}</h2>
                <p>
                  {t('cookies.howWeUse.p1', 'We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.')}
                </p>
                
                <h2>{t('cookies.types.title', 'The Cookies We Set')}</h2>
                
                <h3>{t('cookies.types.account.title', 'Account related cookies')}</h3>
                <p>
                  {t('cookies.types.account.p1', 'If you create an account with us, we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, however, in some cases, they may remain afterward to remember your site preferences when logged out.')}
                </p>
                
                <h3>{t('cookies.types.login.title', 'Login related cookies')}</h3>
                <p>
                  {t('cookies.types.login.p1', 'We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.')}
                </p>
                
                <h3>{t('cookies.types.forms.title', 'Forms related cookies')}</h3>
                <p>
                  {t('cookies.types.forms.p1', 'When you submit data to through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence.')}
                </p>
                
                <h3>{t('cookies.types.site.title', 'Site preferences cookies')}</h3>
                <p>
                  {t('cookies.types.site.p1', 'In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.')}
                </p>
                
                <h2>{t('cookies.thirdParty.title', 'Third-Party Cookies')}</h2>
                <p>
                  {t('cookies.thirdParty.p1', 'In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.')}
                </p>
                <ul>
                  <li>
                    {t('cookies.thirdParty.analytics', 'This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.')}
                  </li>
                  <li>
                    {t('cookies.thirdParty.social', 'We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites including Facebook, Twitter, Instagram, and LinkedIn, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.')}
                  </li>
                </ul>
                
                <h2>{t('cookies.disabling.title', 'Disabling Cookies')}</h2>
                <p>
                  {t('cookies.disabling.p1', 'You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.')}
                </p>
                
                <h2>{t('cookies.more.title', 'More Information')}</h2>
                <p>
                  {t('cookies.more.p1', 'Hopefully, that has clarified things for you. As was previously mentioned, if there is something that you aren\'t sure whether you need or not, it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.')}
                </p>
                <p>
                  {t('cookies.more.p2', 'If you are still looking for more information, you can contact us through one of our preferred contact methods:')}
                </p>
                <ul>
                  <li>{t('cookies.more.email', 'Email')}: <a href="mailto:privacy@asufoconsult.com" className="text-primary">privacy@asufoconsult.com</a></li>
                  <li>{t('cookies.more.phone', 'Phone')}: +49 123 456 7890</li>
                </ul>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button 
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="flex items-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('cookies.backButton', 'Return to Previous Page')}
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
