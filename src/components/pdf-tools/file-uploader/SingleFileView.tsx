
import React from "react";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/fileUtils";
import FileUploaderHeader from "./FileUploaderHeader";

interface SingleFileViewProps {
  file: File;
  onUploadClick: () => void;
  onProcessStart: () => void;
}

const SingleFileView = ({ file, onUploadClick, onProcessStart }: SingleFileViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <FileUploaderHeader isMultiple={false} />
      <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
      <p className="text-gray-500 mb-6">{formatFileSize(file.size)}</p>
      <div className="flex gap-4">
        <Button 
          onClick={onUploadClick}
          variant="outline"
        >
          Change file
        </Button>
        <Button 
          onClick={onProcessStart}
          className="bg-saltBlue hover:bg-saltBlue/90"
        >
          Process File
        </Button>
      </div>
    </div>
  );
};

export default SingleFileView;
