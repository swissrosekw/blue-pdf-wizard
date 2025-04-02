
import React from "react";

const MergeSteps = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Simple steps to merge pdf
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-saltBlue">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Your PDF</h3>
            <p className="text-charcoal/70">
              Select your PDF files by clicking the upload button or drag and drop
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-saltBlue">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Process Your Files</h3>
            <p className="text-charcoal/70">
              Our system will automatically merge your files with optimal settings
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-lightSalt h-16 w-16 rounded-full inline-flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-saltBlue">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download Result</h3>
            <p className="text-charcoal/70">
              Download your merged PDF file instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MergeSteps;
