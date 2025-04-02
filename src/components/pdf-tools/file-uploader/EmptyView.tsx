
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploaderHeader from "./FileUploaderHeader";

interface EmptyViewProps {
  onUploadClick: () => void;
  isMultiple: boolean;
}

const EmptyView = ({ onUploadClick, isMultiple }: EmptyViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FileUploaderHeader isMultiple={isMultiple} />
      <Button 
        onClick={onUploadClick}
        className="bg-saltBlue hover:bg-saltBlue/90 flex items-center gap-2"
      >
        <Upload className="h-5 w-5" />
        Upload PDF{isMultiple ? 's' : ''}
      </Button>
    </div>
  );
};

export default EmptyView;
