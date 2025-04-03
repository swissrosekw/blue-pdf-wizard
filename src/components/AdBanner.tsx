
import React from 'react';

const AdBanner = () => {
  return (
    <div className="w-full flex justify-center my-4">
      <div 
        className="w-[728px] h-[90px] bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600"
      >
        <span>Rent this space for your ad (728x90)</span>
      </div>
    </div>
  );
};

export default AdBanner;
