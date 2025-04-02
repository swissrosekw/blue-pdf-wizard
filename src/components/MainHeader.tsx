
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MainHeader = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" 
              alt="PDF Salt Logo" 
              className="h-10 mr-2" 
            />
            <span className="text-2xl font-bold text-saltBlue">PDF Salt</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-charcoal hover:text-saltBlue transition-colors">Home</Link>
            <Link to="/pricing" className="text-charcoal hover:text-saltBlue transition-colors">Pricing</Link>
            <a href="#tools" className="text-charcoal hover:text-saltBlue transition-colors">Tools</a>
            <a href="#features" className="text-charcoal hover:text-saltBlue transition-colors">Features</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button className="bg-saltBlue hover:bg-saltBlue/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
