
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const ToolsHero = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-16 bg-lightSalt">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('toolsPage.hero.title')}</h1>
          <p className="text-lg text-charcoal/70 mb-8">
            {t('toolsPage.hero.subtitle')}
          </p>
          <Button size="lg" className="bg-saltBlue hover:bg-saltBlue/90">
            {t('hero.getStarted')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
