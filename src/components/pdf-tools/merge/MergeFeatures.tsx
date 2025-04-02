
import React from "react";

interface MergeFeaturesProps {
  features: string[];
  supportedFormats: string[];
}

const MergeFeatures = ({ features, supportedFormats }: MergeFeaturesProps) => {
  return (
    <>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="text-charcoal/80">{feature}</li>
        ))}
      </ul>
      
      {supportedFormats.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Supported Formats:</h3>
          <div className="flex flex-wrap gap-2">
            {supportedFormats.map((format, index) => (
              <span 
                key={index} 
                className="bg-lightSalt px-3 py-1 rounded-md text-sm text-charcoal/90"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MergeFeatures;
