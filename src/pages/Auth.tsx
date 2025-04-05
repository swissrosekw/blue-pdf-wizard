
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { supabase } from "@/integrations/custom-supabase-client";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // Check if there's a hash parameter for email verification
    const handleEmailVerification = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');

      if (accessToken && type === 'signup') {
        setVerifying(true);
        try {
          // Set the session with the tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          
          if (error) throw error;
          
          toast({
            title: "Email Verified",
            description: "Your email has been verified successfully. You are now signed in.",
          });
          
          // Redirect to dashboard after verification
          navigate('/dashboard');
        } catch (error) {
          console.error("Error during email verification:", error);
          toast({
            title: "Verification Failed",
            description: "There was an issue verifying your email. Please try signing in.",
            variant: "destructive",
          });
        } finally {
          setVerifying(false);
        }
      }
    };
    
    handleEmailVerification();

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

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col" dir={textDirection}>
        <MainHeader />
        <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
            <p>Please wait while we complete the verification process.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
