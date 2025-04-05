
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/auth/AuthButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const MainHeader = () => {
  const { t, language } = useLanguage();
  
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <header className="bg-white shadow-sm py-4" dir={textDirection}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" 
              alt="PDF Salt Logo" 
              className="h-10 mr-2" 
            />
            <span className="text-2xl font-bold text-saltBlue">PDF Salt</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-charcoal hover:text-saltBlue transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/tools" className="text-charcoal hover:text-saltBlue transition-colors">
              {t('nav.tools')}
            </Link>
            <Link to="/pricing" className="text-charcoal hover:text-saltBlue transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link to="/contact" className="text-charcoal hover:text-saltBlue transition-colors">
              {t('nav.contact')}
            </Link>
            <a href="#features" className="text-charcoal hover:text-saltBlue transition-colors">
              {t('nav.features')}
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
