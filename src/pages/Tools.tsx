
import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FilePlus2, 
  FileText, 
  FileKey, 
  FileScan, 
  FileCheck, 
  FileWarning, 
  FileCog, 
  FileCog2, 
  FileDigit,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
}

const tools: Tool[] = [
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    longDescription: "Optimize your PDF files by reducing their size without compromising quality. Perfect for email attachments, web uploads, and saving storage space.",
    icon: FileCheck,
    color: "#5E9EFF"
  },
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    longDescription: "Easily combine multiple PDF files into a single document. Rearrange pages, organize content, and create comprehensive documents from multiple sources.",
    icon: FilePlus2,
    color: "#50E3C2"
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Separate one PDF into multiple files",
    longDescription: "Extract specific pages or split large PDFs into smaller documents. Perfect for sharing only relevant sections or managing large documents.",
    icon: FileDigit,
    color: "#5E9EFF"
  },
  {
    id: "convert",
    name: "Convert PDF",
    description: "Transform PDFs to different formats",
    longDescription: "Convert PDFs to other file formats like Word, Excel, PowerPoint, or images. Also convert various file types to PDF for better compatibility and sharing.",
    icon: FileCog,
    color: "#50E3C2"
  },
  {
    id: "edit",
    name: "Edit PDF",
    description: "Modify text, images, and pages in your PDF",
    longDescription: "Make changes to text, images, and page elements directly in your PDF files. Add annotations, highlight text, and customize your documents as needed.",
    icon: FileText,
    color: "#5E9EFF"
  },
  {
    id: "protect",
    name: "Protect PDF",
    description: "Add password protection to your PDF",
    longDescription: "Secure your sensitive PDF documents with password protection. Control who can view, edit, or print your PDFs with multiple security options.",
    icon: FileKey,
    color: "#50E3C2"
  },
  {
    id: "ocr",
    name: "OCR PDF",
    description: "Make scanned PDFs searchable and editable",
    longDescription: "Convert scanned documents or images to searchable and editable PDF files. Extract text from images and make your documents fully functional.",
    icon: FileScan,
    color: "#5E9EFF"
  },
  {
    id: "optimize",
    name: "Optimize PDF",
    description: "Optimize your PDF for web and mobile",
    longDescription: "Improve PDF loading speed and performance for web and mobile viewing. Balance quality and size for optimal user experience across all devices.",
    icon: FileCog2,
    color: "#50E3C2"
  },
  {
    id: "repair",
    name: "Repair PDF",
    description: "Fix corrupt or damaged PDF files",
    longDescription: "Recover and fix corrupted or damaged PDF files that won't open properly. Salvage content from broken PDFs and restore them to working condition.",
    icon: FileWarning,
    color: "#5E9EFF"
  }
];

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
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
        
        {/* Tools Grid Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <Card key={tool.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-3 rounded-lg" 
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        <tool.icon 
                          className="h-6 w-6" 
                          style={{ color: tool.color }} 
                        />
                      </div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-charcoal min-h-24">
                      {tool.longDescription}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full group">
                      Try {tool.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-saltBlue/5 to-seaMint/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Tools Are Different</h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                We focus on quality, security, and ease of use to provide the best PDF experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">100% Privacy</h3>
                <p className="text-charcoal/70">
                  Your files are processed entirely in your browser. We never store or access your files on our servers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Fast Processing</h3>
                <p className="text-charcoal/70">
                  Our tools are optimized for speed, providing instant results without long waiting times or processing delays.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">No Installation</h3>
                <p className="text-charcoal/70">
                  All tools are web-based, eliminating the need to download or install software. Access from any device, anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
