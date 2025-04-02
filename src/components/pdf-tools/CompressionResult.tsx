
import React, { useState } from "react";
import { Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize, downloadFile } from "@/utils/fileUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [showDialog, setShowDialog] = useState(false);
  
  // Calculate reduction percentage
  const reductionPercentage = Math.round(
    (1 - compressedFile.size / originalFile.size) * 100
  );
  
  // Handle download with fallback option
  const handleDownload = () => {
    // Use normal download flow
    onDownloadClick();
  };
  
  // Handle download of original file if compressed one doesn't work
  const handleDownloadOriginal = () => {
    const originalFile = (compressedFile as any).originalFile;
    if (originalFile) {
      downloadFile(originalFile);
    }
    setShowDialog(false);
  };
  
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
        
        {reductionPercentage < 5 && (
          <div className="mt-4 p-2 bg-yellow-50 text-yellow-700 rounded flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">This file couldn't be compressed much further</span>
          </div>
        )}
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
          onClick={handleDownload}
          className="bg-saltBlue hover:bg-saltBlue/90 flex-1 flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download
        </Button>
      </div>
      
      {/* Fallback dialog in case the compressed file doesn't work */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issue with compressed file</DialogTitle>
            <DialogDescription>
              The compressed file may not open correctly. You can try downloading the original file instead.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownloadOriginal}>
              Download original
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompressionResult;
