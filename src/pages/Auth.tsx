
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { supabase } from "@/integrations/custom-supabase-client";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const Auth = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Check if user is already signed in, if yes, redirect to dashboard
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate('/dashboard');
      }
    };
    
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" dir={textDirection}>
      <MainHeader />
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <AuthForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
