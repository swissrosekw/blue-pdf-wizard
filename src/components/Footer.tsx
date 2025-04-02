
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" 
                alt="PDF Salt Logo" 
                className="h-10 mr-2"
              />
              <span className="text-xl font-poppins font-semibold">PDF Salt</span>
            </a>
            <p className="text-white/70 mb-4">
              The easiest way to edit, compress, and convert PDF files online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-seaMint transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-seaMint transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-seaMint transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-seaMint transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Compress PDF</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Merge PDF</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Split PDF</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Convert PDF</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Edit PDF</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Cookies Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">GDPR Compliance</a></li>
              <li><a href="#" className="text-white/70 hover:text-seaMint transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} PDF Salt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
