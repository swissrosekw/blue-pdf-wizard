import React from "react";
import MainHeader from "@/components/MainHeader";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import ToolsGrid from "@/components/ToolsGrid";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      {/* Add AdBanner just before Hero */}
      <AdBanner />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Upload Section */}
        <section className="py-16 bg-lightSalt" id="tools">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform your PDF files in seconds</h2>
              <p className="text-lg text-charcoal/70">
                Upload your file and select a tool to get started
              </p>
            </div>
            
            <FileUpload />
          </div>
        </section>
        
        <ToolsGrid />
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-saltBlue/5 to-seaMint/5" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose PDF Salt?</h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                We provide the best tools to manage your PDF documents
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-saltBlue/10 flex items-center justify-center mb-6">
                  <Check className="h-6 w-6 text-saltBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Simple and Fast</h3>
                <p className="text-charcoal/70">
                  Our tools are designed to be intuitive and efficient, saving you time and effort.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-seaMint/10 flex items-center justify-center mb-6">
                  <Check className="h-6 w-6 text-seaMint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Secure</h3>
                <p className="text-charcoal/70">
                  Your files are encrypted and automatically deleted after processing, ensuring your data stays private.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-saltBlue/10 flex items-center justify-center mb-6">
                  <Check className="h-6 w-6 text-saltBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">High Quality</h3>
                <p className="text-charcoal/70">
                  We maintain the highest quality of your documents while optimizing for size and performance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with Pricing Button */}
        <section className="py-20 bg-saltBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your PDF files?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get started with our affordable plans starting at just 3 KD per month.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-saltBlue hover:bg-white/90 px-8 py-6 text-lg font-medium">
                <Link to="/plans">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
                <Link to="/pricing">
                  View Pricing
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

export default Index;
