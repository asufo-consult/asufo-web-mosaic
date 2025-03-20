
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Imprint: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8">{language === 'de' ? 'Impressum' : 'Imprint'}</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}</h2>
              <p>Asufo Consult GmbH</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland / Germany</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? 'Kontakt' : 'Contact'}</h2>
              <p>Telefon: +49 123 456 7890</p>
              <p>E-Mail: contact@asufo-consult.com</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? 'Handelsregister' : 'Commercial Register'}</h2>
              <p>{language === 'de' ? 'Registergericht: Amtsgericht Musterstadt' : 'Register court: Local court Musterstadt'}</p>
              <p>{language === 'de' ? 'Registernummer: HRB 12345' : 'Register number: HRB 12345'}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? 'Umsatzsteuer-ID' : 'VAT ID'}</h2>
              <p>{language === 'de' ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:' : 'VAT identification number according to § 27 a of the German VAT act:'}</p>
              <p>DE123456789</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">{language === 'de' ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content according to § 55 (2) RStV'}</h2>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland / Germany</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Imprint;
