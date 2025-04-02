
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsCTA = () => {
  return (
    <section className="py-20 bg-saltBlue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your PDF files?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Get started with our affordable plans starting at just 3 KD per month.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-saltBlue hover:bg-white/90 px-8 py-6 text-lg font-medium">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium">
            <Link to="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsCTA;
