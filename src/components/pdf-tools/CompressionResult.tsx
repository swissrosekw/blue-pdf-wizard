
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/fileUtils";

interface CompressionResultProps {
  originalFile: File;
  compressedFile: File;
  onNewFileClick: () => void;
  onDownloadClick: () => void;
}

const CompressionResult = ({
  originalFile,
  compressedFile,
  onNewFileClick,
  onDownloadClick
}: CompressionResultProps) => {
  // Calculate reduction percentage
  const reductionPercentage = Math.round(
    (1 - compressedFile.size / originalFile.size) * 100
  );
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 w-full">
        <h3 className="text-xl font-semibold mb-2">Compression complete!</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Original size:</span>
          <span className="font-medium">{formatFileSize(originalFile.size)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Compressed size:</span>
          <span className="font-medium">{formatFileSize(compressedFile.size)}</span>
        </div>
        <div className="bg-green-100 p-2 rounded text-center">
          <span className="font-semibold">
            {reductionPercentage}% smaller
          </span>
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <Button 
          onClick={onNewFileClick}
          variant="outline"
          className="flex-1"
        >
          Upload new file
        </Button>
        <Button 
          onClick={onDownloadClick}
          className="bg-saltBlue hover:bg-saltBlue/90 flex-1 flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default CompressionResult;
