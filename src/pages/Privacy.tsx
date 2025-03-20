
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">{language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? '1. Datenschutz auf einen Blick' : '1. Privacy at a glance'}</h2>
              <h3 className="text-lg font-medium mt-4 mb-2">{language === 'de' ? 'Allgemeine Hinweise' : 'General information'}</h3>
              <p className="mb-4">
                {language === 'de' 
                  ? 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.'
                  : 'The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data that can be used to personally identify you.'}
              </p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">{language === 'de' ? 'Datenerfassung auf unserer Website' : 'Data collection on our website'}</h3>
              <p className="mb-4">
                {language === 'de'
                  ? 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.'
                  : 'Data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.'}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? '2. Allgemeine Hinweise und Pflichtinformationen' : '2. General information and mandatory information'}</h2>
              <h3 className="text-lg font-medium mt-4 mb-2">{language === 'de' ? 'Datenschutz' : 'Data protection'}</h3>
              <p className="mb-4">
                {language === 'de'
                  ? 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.'
                  : 'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.'}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? '3. Datenerfassung auf unserer Website' : '3. Data collection on our website'}</h2>
              <h3 className="text-lg font-medium mt-4 mb-2">{language === 'de' ? 'Cookies' : 'Cookies'}</h3>
              <p className="mb-4">
                {language === 'de'
                  ? 'Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.'
                  : 'Some of our web pages use cookies. Cookies do not harm your computer and do not contain any viruses. Cookies help make our website more user-friendly, efficient, and secure.'}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? '4. Newsletter' : '4. Newsletter'}</h2>
              <p className="mb-4">
                {language === 'de'
                  ? 'Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.'
                  : 'If you would like to receive the newsletter offered on the website, we require an e-mail address from you as well as information that allows us to verify that you are the owner of the specified e-mail address and agree to receive the newsletter.'}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? '5. Plugins und Tools' : '5. Plugins and tools'}</h2>
              <p className="mb-4">
                {language === 'de'
                  ? 'Google Analytics wird nicht verwendet.'
                  : 'Google Analytics is not used.'}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
