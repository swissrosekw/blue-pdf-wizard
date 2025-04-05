import React from "react";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <footer className="bg-charcoal text-white" dir={textDirection}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" 
                alt="PDF Salt Logo" 
                className="h-10 mr-2"
              />
              <span className="text-xl font-poppins font-semibold">PDF Salt</span>
            </a>
            <p className="text-white/70 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/pdfsalt" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-seaMint transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.tools')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('tools.compress')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('tools.merge')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('tools.split')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('tools.convert')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('tools.edit')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('nav.pricing')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('nav.contact')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.careers')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.cookies')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.gdpr')}</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">{t('footer.security')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} PDF Salt. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
