
import React from "react";
import { Button } from "@/components/ui/button";

const ToolsHero = () => {
  return (
    <section className="py-16 bg-lightSalt">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our PDF Tools</h1>
          <p className="text-lg text-charcoal/70 mb-8">
            Powerful tools to help you work with PDF files efficiently. All tools are designed to be fast, secure, and easy to use.
          </p>
          <Button size="lg" className="bg-saltBlue hover:bg-saltBlue/90">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
