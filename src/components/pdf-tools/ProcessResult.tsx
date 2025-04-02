
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProcessResultProps {
  title: string;
  description: string;
  bgColorClass: string;
  textColorClass: string;
  buttonLabel: string;
  onNewFileClick: () => void;
  onDownloadClick: () => void;
}

const ProcessResult = ({
  title,
  description,
  bgColorClass,
  textColorClass,
  buttonLabel,
  onNewFileClick,
  onDownloadClick
}: ProcessResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className={`mb-6 p-4 rounded-lg ${bgColorClass} ${textColorClass} w-full`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
      </div>
      <div className="flex gap-4 w-full">
        <Button 
          onClick={onNewFileClick}
          variant="outline"
          className="flex-1"
        >
          {buttonLabel}
        </Button>
        <Button 
          onClick={onDownloadClick}
          className="bg-saltBlue hover:bg-saltBlue/90 flex-1 flex items-center justify-center gap-2"
          type="button"
        >
          <Download className="h-5 w-5" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ProcessResult;
