
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="py-20 bg-gradient-to-b from-white to-lightSalt" dir={textDirection}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-charcoal">
              {t('hero.title')}
            </h1>
            <p className="text-lg mb-8 text-charcoal/80 max-w-lg mx-auto lg:mx-0">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button asChild className="bg-saltBlue hover:bg-saltBlue/90 text-white px-8 py-6 text-lg">
                <Link to="/plans">
                  {t('hero.getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-saltBlue text-saltBlue hover:bg-saltBlue/10 px-8 py-6 text-lg">
                <Link to="/tools">
                  {t('hero.exploreTools')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png"
              alt="PDF Salt"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
