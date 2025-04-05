
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ToolsFeaturesSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-saltBlue/5 to-seaMint/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('toolsPage.features.title')}</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t('toolsPage.features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{t('features.secure.title')}</h3>
            <p className="text-charcoal/70">
              {t('features.secure.desc')}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{t('features.simple.title')}</h3>
            <p className="text-charcoal/70">
              {t('features.simple.desc')}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{t('features.quality.title')}</h3>
            <p className="text-charcoal/70">
              {t('features.quality.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsFeaturesSection;
