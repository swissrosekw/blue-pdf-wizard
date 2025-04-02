
import React from "react";

const ToolsFeaturesSection = () => {
  return (
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
  );
};

export default ToolsFeaturesSection;
