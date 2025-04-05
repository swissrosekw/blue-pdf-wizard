import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.features': 'Features',
    'footer.description': 'PDF Salt helps you manage and edit your PDFs with ease.',
    'footer.tools': 'Tools',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved',
    'tools.compress': 'Compress PDF',
    'tools.merge': 'Merge PDF',
    'tools.split': 'Split PDF',
    'tools.convert': 'Convert PDF',
    'tools.edit': 'Edit PDF',
    'footer.aboutUs': 'About Us',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookies Policy',
    'footer.gdpr': 'GDPR Compliance',
    'footer.security': 'Security',
    'hero.getStarted': 'Get Started',
    'toolsPage.hero.title': 'PDF Tools for Every Need',
    'toolsPage.hero.subtitle': 'Powerful, easy-to-use tools to manage your PDF documents efficiently.'
  },
  ar: {
    'nav.home': 'الصفحة الرئيسية',
    'nav.tools': 'الأدوات',
    'nav.pricing': 'التسعير',
    'nav.contact': 'اتصل بنا',
    'nav.features': 'الميزات',
    'footer.description': 'يساعدك PDF Salt على إدارة وتحرير ملفات PDF بسهولة.',
    'footer.tools': 'الأدوات',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.rights': 'جميع الحقوق محفوظة',
    'tools.compress': 'ضغط PDF',
    'tools.merge': 'دمج PDF',
    'tools.split': 'تقسيم PDF',
    'tools.convert': 'تحويل PDF',
    'tools.edit': 'تحرير PDF',
    'footer.aboutUs': 'من نحن',
    'footer.blog': 'المدونة',
    'footer.careers': 'وظائف',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.gdpr': 'الامتثال لـ GDPR',
    'footer.security': 'الأمان',
    'hero.getStarted': 'ابدأ الآن',
    'toolsPage.hero.title': 'أدوات PDF لكل احتياجاتك',
    'toolsPage.hero.subtitle': 'أدوات قوية وسهلة الاستخدام لإدارة مستندات PDF الخاصة بك بكفاءة.'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
