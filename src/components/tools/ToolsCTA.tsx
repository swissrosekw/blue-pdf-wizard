
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const ToolsCTA = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-20 bg-saltBlue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('toolsPage.cta.title')}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {t('toolsPage.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-white text-saltBlue hover:bg-white/90 px-8 py-6 text-lg font-medium">
            <Link to="/plans">
              {t('cta.getStarted')}
              <ArrowRight className={language === 'ar' ? "mr-2 h-5 w-5" : "ml-2 h-5 w-5"} />
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
            <Link to="/pricing">
              {t('cta.viewPricing')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsCTA;
