
import React from "react";
import MergeForm from "@/components/pdf-tools/merge/MergeForm";
import { useMergeContext } from "@/context/MergeContext";

const MergeContent = () => {
  const { resetKey, handleReset } = useMergeContext();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 mt-8 max-w-xl mx-auto text-center">
      <MergeForm key={resetKey} onReset={handleReset} />
    </div>
  );
};

export default MergeContent;
