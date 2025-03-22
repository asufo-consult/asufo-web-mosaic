
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import SolutionsSection from '@/components/SolutionsSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <Newsletter />
        <SolutionsSection />
        <PortfolioSection />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
