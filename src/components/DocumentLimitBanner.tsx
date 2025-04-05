
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronRight } from "lucide-react";
import { useDocumentLimit, FREE_DAILY_UPLOAD_LIMIT } from "@/context/DocumentLimitContext";
import { useLanguage } from "@/context/LanguageContext";
import { Progress } from "@/components/ui/progress";

const DocumentLimitBanner = () => {
  const { dailyUploadsUsed, dailyUploadsRemaining, isLoading } = useDocumentLimit();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  if (isLoading || dailyUploadsUsed === null) {
    return null;
  }
  
  const usagePercentage = Math.min(100, (dailyUploadsUsed / FREE_DAILY_UPLOAD_LIMIT) * 100);
  const isLimitReached = dailyUploadsRemaining <= 0;
  
  return (
    <Alert 
      className={`mb-6 ${isLimitReached ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}
    >
      <AlertCircle className={`h-5 w-5 ${isLimitReached ? 'text-red-500' : 'text-blue-500'}`} />
      <div className="w-full">
        <AlertTitle className={isLimitReached ? 'text-red-800' : 'text-blue-800'}>
          {isLimitReached 
            ? t('limits.upgradeRequired', FREE_DAILY_UPLOAD_LIMIT)
            : t('limits.dailyUploads', dailyUploadsUsed, FREE_DAILY_UPLOAD_LIMIT)
          }
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="mb-2">
            <Progress 
              value={usagePercentage} 
              className={`h-2 ${isLimitReached ? 'bg-red-100' : 'bg-blue-100'}`} 
              indicatorClassName={isLimitReached ? 'bg-red-500' : 'bg-blue-500'} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isLimitReached ? 'text-red-700' : 'text-blue-700'}`}>
              {isLimitReached 
                ? t('limits.upgradePrompt')
                : t('limits.remainingUploads', dailyUploadsRemaining)
              }
            </span>
            <Button 
              onClick={() => navigate('/pricing')} 
              size="sm"
              className={`flex items-center gap-1.5 ${
                isLimitReached 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {t('limits.upgradeButton')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default DocumentLimitBanner;
