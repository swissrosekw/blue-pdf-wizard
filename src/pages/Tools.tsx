
import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsGrid from "@/components/tools/ToolsGrid";
import ToolsFeaturesSection from "@/components/tools/ToolsFeaturesSection";
import ToolsCTA from "@/components/tools/ToolsCTA";
import { useLanguage } from "@/context/LanguageContext";

const Tools = () => {
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen flex flex-col" dir={textDirection}>
      <MainHeader />
      
      <main className="flex-grow">
        <ToolsHero />
        <ToolsGrid />
        <ToolsFeaturesSection />
        <ToolsCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
