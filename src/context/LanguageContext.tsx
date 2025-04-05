
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header navigation
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.features': 'Features',
    
    // Hero section
    'hero.title': 'The easiest way to edit, compress, and convert PDF files',
    'hero.description': 'PDF Salt provides fast, reliable tools to transform your documents instantly. No installation, no registration required.',
    'hero.getStarted': 'Get Started',
    'hero.exploreTools': 'Explore Tools',
    
    // Tools section
    'tools.title': 'All the PDF tools you need',
    'tools.subtitle': 'Select the tool you need and transform your documents in seconds',
    'tools.compress': 'Compress PDF',
    'tools.compressDesc': 'Reduce file size while maintaining quality',
    'tools.merge': 'Merge PDF',
    'tools.mergeDesc': 'Combine multiple PDFs into one document',
    'tools.split': 'Split PDF',
    'tools.splitDesc': 'Separate one PDF into multiple files',
    'tools.convert': 'Convert PDF',
    'tools.convertDesc': 'Transform PDFs to different formats',
    'tools.edit': 'Edit PDF',
    'tools.editDesc': 'Modify text, images, and pages in your PDF',
    'tools.protect': 'Protect PDF',
    'tools.protectDesc': 'Add password protection to your PDF',
    'tools.ocr': 'OCR PDF',
    'tools.ocrDesc': 'Make scanned PDFs searchable and editable',
    'tools.optimize': 'Optimize PDF',
    'tools.optimizeDesc': 'Optimize your PDF for web and mobile',
    'tools.repair': 'Repair PDF',
    'tools.repairDesc': 'Fix corrupt or damaged PDF files',
    
    // Features section
    'features.title': 'Why choose PDF Salt?',
    'features.subtitle': 'We provide the best tools to manage your PDF documents',
    'features.simple.title': 'Simple and Fast',
    'features.simple.desc': 'Our tools are designed to be intuitive and efficient, saving you time and effort.',
    'features.secure.title': '100% Secure',
    'features.secure.desc': 'Your files are encrypted and automatically deleted after processing, ensuring your data stays private.',
    'features.quality.title': 'High Quality',
    'features.quality.desc': 'We maintain the highest quality of your documents while optimizing for size and performance.',
    
    // CTA section
    'cta.title': 'Ready to transform your PDF files?',
    'cta.description': 'Get started with our affordable plans starting at just 3 KD per month.',
    'cta.getStarted': 'Get Started Now',
    'cta.dashboard': 'Go to Dashboard',
    'cta.viewPricing': 'View Pricing',
    
    // Footer
    'footer.description': 'The easiest way to edit, compress, and convert PDF files online.',
    'footer.tools': 'Tools',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.aboutUs': 'About Us',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookies Policy',
    'footer.gdpr': 'GDPR Compliance',
    'footer.security': 'Security',
    'footer.rights': 'All rights reserved.',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    
    // Tools page
    'toolsPage.hero.title': 'PDF Tools Suite',
    'toolsPage.hero.subtitle': 'Everything you need to manage your PDF files',
    'toolsPage.features.title': 'Powerful Features',
    'toolsPage.features.subtitle': 'Our comprehensive tool set helps you handle any PDF task',
    'toolsPage.cta.title': 'Start Using Our Tools Today',
    'toolsPage.cta.subtitle': 'Join thousands of satisfied users who trust PDF Salt',
  },
  ar: {
    // Header navigation
    'nav.home': 'الرئيسية',
    'nav.tools': 'الأدوات',
    'nav.pricing': 'التسعير',
    'nav.contact': 'اتصل بنا',
    'nav.features': 'المميزات',
    
    // Hero section
    'hero.title': 'الطريقة الأسهل لتحرير وضغط وتحويل ملفات PDF',
    'hero.description': 'يوفر PDF Salt أدوات سريعة وموثوقة لتحويل مستنداتك على الفور. لا تحتاج إلى تثبيت أو تسجيل.',
    'hero.getStarted': 'ابدأ الآن',
    'hero.exploreTools': 'استكشف الأدوات',
    
    // Tools section
    'tools.title': 'جميع أدوات PDF التي تحتاجها',
    'tools.subtitle': 'اختر الأداة التي تحتاجها وقم بتحويل مستنداتك في ثوانٍ',
    'tools.compress': 'ضغط PDF',
    'tools.compressDesc': 'تقليل حجم الملف مع الحفاظ على الجودة',
    'tools.merge': 'دمج PDF',
    'tools.mergeDesc': 'دمج عدة ملفات PDF في مستند واحد',
    'tools.split': 'تقسيم PDF',
    'tools.splitDesc': 'فصل ملف PDF واحد إلى عدة ملفات',
    'tools.convert': 'تحويل PDF',
    'tools.convertDesc': 'تحويل ملفات PDF إلى تنسيقات مختلفة',
    'tools.edit': 'تحرير PDF',
    'tools.editDesc': 'تعديل النص والصور والصفحات في ملف PDF',
    'tools.protect': 'حماية PDF',
    'tools.protectDesc': 'إضافة حماية بكلمة مرور لملف PDF',
    'tools.ocr': 'التعرف على النص في PDF',
    'tools.ocrDesc': 'جعل ملفات PDF الممسوحة ضوئيًا قابلة للبحث والتحرير',
    'tools.optimize': 'تحسين PDF',
    'tools.optimizeDesc': 'تحسين ملف PDF للويب والجوال',
    'tools.repair': 'إصلاح PDF',
    'tools.repairDesc': 'إصلاح ملفات PDF التالفة أو المعطوبة',
    
    // Features section
    'features.title': 'لماذا تختار PDF Salt؟',
    'features.subtitle': 'نحن نقدم أفضل الأدوات لإدارة مستندات PDF',
    'features.simple.title': 'بسيط وسريع',
    'features.simple.desc': 'تم تصميم أدواتنا لتكون بديهية وفعالة، مما يوفر وقتك وجهدك.',
    'features.secure.title': 'آمن 100%',
    'features.secure.desc': 'يتم تشفير ملفاتك وحذفها تلقائيًا بعد المعالجة، مما يضمن خصوصية بياناتك.',
    'features.quality.title': 'جودة عالية',
    'features.quality.desc': 'نحافظ على أعلى جودة لمستنداتك مع تحسين الحجم والأداء.',
    
    // CTA section
    'cta.title': 'هل أنت مستعد لتحويل ملفات PDF؟',
    'cta.description': 'ابدأ مع خططنا بأسعار معقولة تبدأ من 3 دينار كويتي شهريًا.',
    'cta.getStarted': 'ابدأ الآن',
    'cta.dashboard': 'الذهاب إلى لوحة التحكم',
    'cta.viewPricing': 'عرض الأسعار',
    
    // Footer
    'footer.description': 'الطريقة الأسهل لتحرير وضغط وتحويل ملفات PDF عبر الإنترنت.',
    'footer.tools': 'الأدوات',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.aboutUs': 'من نحن',
    'footer.blog': 'المدونة',
    'footer.careers': 'وظائف',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.gdpr': 'الامتثال للائحة العامة لحماية البيانات',
    'footer.security': 'الأمان',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    
    // Tools page
    'toolsPage.hero.title': 'مجموعة أدوات PDF',
    'toolsPage.hero.subtitle': 'كل ما تحتاجه لإدارة ملفات PDF',
    'toolsPage.features.title': 'ميزات قوية',
    'toolsPage.features.subtitle': 'تساعدك مجموعة أدواتنا الشاملة على التعامل مع أي مهمة PDF',
    'toolsPage.cta.title': 'ابدأ استخدام أدواتنا اليوم',
    'toolsPage.cta.subtitle': 'انضم إلى آلاف المستخدمين الراضين الذين يثقون بـ PDF Salt',
  }
};

// Create provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get stored language preference
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'ar' || savedLanguage === 'en' ? savedLanguage : 'en') as Language;
  });

  // Update language in localStorage when it changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
