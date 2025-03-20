
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Menu, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-card/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold transition-all duration-300"
            >
              <span className="text-gradient">asufo</span> consult
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-sm font-medium animated-underline pb-1">{t('nav.home')}</Link>
            <Link to="/about" className="text-sm font-medium animated-underline pb-1">{t('nav.about')}</Link>
            <Link to="/services" className="text-sm font-medium animated-underline pb-1">{t('nav.services')}</Link>
            <Link to="/solutions" className="text-sm font-medium animated-underline pb-1">{t('nav.solutions')}</Link>
            <Link to="/portfolio" className="text-sm font-medium animated-underline pb-1">{t('nav.portfolio')}</Link>
            <Link to="/contact" className="text-sm font-medium animated-underline pb-1">{t('nav.contact')}</Link>
          </div>

          {/* Right side: Book appointment, Theme toggle, Language toggle */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://tidycal.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center text-sm font-medium btn-primary"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t('nav.book')}
            </a>
            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="h-10 w-10"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card m-4 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/services" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.services')}
            </Link>
            <Link 
              to="/solutions" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.solutions')}
            </Link>
            <Link 
              to="/portfolio" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.portfolio')}
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-all"
            >
              {t('nav.contact')}
            </Link>
          </div>
          <div className="px-5 py-4 border-t border-metal/10 dark:border-white/10">
            <div className="flex items-center justify-between">
              <a 
                href="https://tidycal.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('nav.book')}
              </a>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
