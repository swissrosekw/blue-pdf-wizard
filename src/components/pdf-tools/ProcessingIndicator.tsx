
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  progress: number;
  label?: string;
}

const ProcessingIndicator = ({ 
  progress, 
  label = "Processing your file..." 
}: ProcessingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h3 className="text-xl font-semibold mb-4">{label}</h3>
      <Progress value={progress} className="w-full mb-4" />
      <p className="text-gray-500">{Math.round(progress)}% complete</p>
    </div>
  );
};

export default ProcessingIndicator;
