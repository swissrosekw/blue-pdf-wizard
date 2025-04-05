
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/custom-supabase-client";
import { toast } from "@/hooks/use-toast";

interface DocumentLimitContextType {
  dailyUploadsRemaining: number | null;
  dailyUploadsUsed: number | null;
  checkCanUpload: () => Promise<boolean>;
  incrementUsage: () => Promise<void>;
  isLoading: boolean;
  refreshLimits: () => Promise<void>;
}

const DocumentLimitContext = createContext<DocumentLimitContextType>({
  dailyUploadsRemaining: null,
  dailyUploadsUsed: null,
  checkCanUpload: async () => false,
  incrementUsage: async () => {},
  isLoading: true,
  refreshLimits: async () => {},
});

export const FREE_DAILY_UPLOAD_LIMIT = 3;

export const DocumentLimitProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [dailyUploadsUsed, setDailyUploadsUsed] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const dailyUploadsRemaining = dailyUploadsUsed !== null 
    ? Math.max(0, FREE_DAILY_UPLOAD_LIMIT - dailyUploadsUsed) 
    : null;

  const getTodayRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return { start: today.toISOString(), end: tomorrow.toISOString() };
  };

  const refreshLimits = async () => {
    if (!user) {
      setDailyUploadsUsed(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { start, end } = getTodayRange();
      
      const { data, error, count } = await supabase
        .from('user_files')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('created_at', start)
        .lt('created_at', end);
        
      if (error) throw error;
      
      setDailyUploadsUsed(count || 0);
    } catch (error) {
      console.error("Error checking document limits:", error);
      toast({
        title: "Error checking limits",
        description: "Could not verify your daily usage limits.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkCanUpload = async (): Promise<boolean> => {
    await refreshLimits();
    return dailyUploadsRemaining !== null && dailyUploadsRemaining > 0;
  };

  const incrementUsage = async () => {
    // This is just to update the UI immediately after an upload
    if (dailyUploadsUsed !== null) {
      setDailyUploadsUsed(dailyUploadsUsed + 1);
    }
  };

  useEffect(() => {
    refreshLimits();
  }, [user]);

  return (
    <DocumentLimitContext.Provider 
      value={{ 
        dailyUploadsRemaining, 
        dailyUploadsUsed, 
        checkCanUpload, 
        incrementUsage,
        isLoading,
        refreshLimits
      }}
    >
      {children}
    </DocumentLimitContext.Provider>
  );
};

export const useDocumentLimit = () => useContext(DocumentLimitContext);
