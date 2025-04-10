
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

const ToolCard = ({ id, name, description, longDescription, icon: Icon, color, path }: ToolCardProps) => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  
  return (
    <Card key={id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-lg" 
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon 
              className="h-6 w-6" 
              style={{ color: color }} 
            />
          </div>
          <CardTitle className="text-xl">{t(`tools.${id}`)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-charcoal min-h-24">
          {t(`tools.${id}Desc`)}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full group" asChild>
          <Link to={path}>
            {t('tools.try')} {t(`tools.${id}`)}
            <ArrowRight className={isRtl ? "mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" : "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
