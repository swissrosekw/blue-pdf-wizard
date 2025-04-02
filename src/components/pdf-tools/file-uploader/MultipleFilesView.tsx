
import React from "react";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/fileUtils";
import FileUploaderHeader from "./FileUploaderHeader";

interface MultipleFilesViewProps {
  files: File[];
  onUploadClick: () => void;
  onProcessStart: () => void;
}

const MultipleFilesView = ({ files, onUploadClick, onProcessStart }: MultipleFilesViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      <FileUploaderHeader isMultiple={true} fileCount={files.length} />
      
      <div className="w-full max-h-60 overflow-y-auto mb-6 bg-gray-50 rounded-lg p-4">
        {files.map((file, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div className="flex items-center">
              <FileIcon className="h-5 w-5 text-saltBlue mr-3" />
              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            </div>
            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={onUploadClick}
          variant="outline"
        >
          Add more files
        </Button>
        <Button 
          onClick={onProcessStart}
          className="bg-saltBlue hover:bg-saltBlue/90"
        >
          Merge PDFs
        </Button>
      </div>
    </div>
  );
};

export default MultipleFilesView;
