
import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Upload } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolPageTemplateProps {
  toolName: string;
  toolDescription: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  supportedFormats?: string[];
  customContent?: React.ReactNode;
  customHero?: React.ReactNode;
  customSteps?: React.ReactNode;
}

const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
  toolName,
  toolDescription,
  icon,
  color,
  features,
  supportedFormats = [],
  customContent,
  customHero,
  customSteps
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        {customHero ? (
          customHero
        ) : (
          <section className="py-16 bg-lightSalt">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div 
                  className="mx-auto mb-6 p-4 rounded-lg inline-flex"
                  style={{ backgroundColor: `${color}20` }}
                >
                  {icon}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{toolName}</h1>
                <p className="text-lg text-charcoal/70 mb-8">
                  {toolDescription}
                </p>
                {!customContent && (
                  <Button size="lg" className="bg-saltBlue hover:bg-saltBlue/90 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload PDF File
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}
        
        {/* Custom Content Section */}
        {customContent && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
              {customContent}
            </div>
          </section>
        )}
        
        {/* How It Works Section */}
        {customSteps ? (
          customSteps
        ) : (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  Simple steps to {toolName.toLowerCase()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-saltBlue">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your PDF</h3>
                  <p className="text-charcoal/70">
                    Select your PDF file by clicking the upload button or drag and drop
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-saltBlue">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Process Your File</h3>
                  <p className="text-charcoal/70">
                    Our system will automatically process your file with optimal settings
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-saltBlue">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Download Result</h3>
                  <p className="text-charcoal/70">
                    Download your processed PDF file instantly
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-saltBlue/5 to-seaMint/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                What makes our {toolName.toLowerCase()} tool special
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 border-none shadow-sm">
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <div className="h-4 w-4" style={{ backgroundColor: color, borderRadius: "50%" }}></div>
                    </div>
                    <p className="text-lg">{feature}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {supportedFormats.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Supported Formats</h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  Our tool works with the following file formats
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="bg-lightSalt px-4 py-2 rounded-md text-charcoal">
                    {format}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="py-20 bg-saltBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to {toolName.toLowerCase()}?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get started now or check out our other PDF tools
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!customContent && (
                <Button className="bg-white text-saltBlue hover:bg-white/90 px-8 py-6 text-lg font-medium">
                  Upload PDF Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
                <Link to="/tools">
                  Explore All Tools
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPageTemplate;
