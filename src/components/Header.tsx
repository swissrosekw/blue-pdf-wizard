
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" alt="PDF Salt Logo" className="h-10" />
          <span className="text-xl font-poppins font-semibold hidden sm:inline">PDF Salt</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#tools" className="text-charcoal hover:text-saltBlue transition-colors">Tools</a>
          <a href="#about" className="text-charcoal hover:text-saltBlue transition-colors">About</a>
          <a href="#pricing" className="text-charcoal hover:text-saltBlue transition-colors">Pricing</a>
          <a href="#contact" className="text-charcoal hover:text-saltBlue transition-colors">Contact</a>
          <Button className="bg-saltBlue hover:bg-saltBlue/90 text-white">Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-charcoal" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-md absolute top-16 left-0 right-0 z-50">
          <nav className="flex flex-col space-y-4">
            <a href="#tools" onClick={() => setIsMenuOpen(false)} className="text-charcoal hover:text-saltBlue transition-colors">Tools</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-charcoal hover:text-saltBlue transition-colors">About</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-charcoal hover:text-saltBlue transition-colors">Pricing</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-charcoal hover:text-saltBlue transition-colors">Contact</a>
            <Button className="bg-saltBlue hover:bg-saltBlue/90 text-white w-full">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
