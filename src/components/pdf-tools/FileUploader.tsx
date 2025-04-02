
import React, { useRef } from "react";
import { Upload, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatFileSize } from "@/utils/fileUtils";

interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onProcessStart: () => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
}

const FileUploader = ({
  file,
  onFileSelect,
  onProcessStart,
  acceptedTypes = ["application/pdf"],
  maxSize = 3 * 1024 * 1024 // 3MB default limit
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${formatFileSize(maxSize)}`,
        variant: "destructive",
      });
      return;
    }

    onFileSelect(selectedFile);
    toast({
      title: "File selected",
      description: `${selectedFile.name} (${formatFileSize(selectedFile.size)})`,
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
      />
      
      {!file && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload your PDF file</h3>
          <p className="text-gray-500 mb-4">Max file size: 3MB</p>
          <Button 
            onClick={handleUploadClick}
            className="bg-saltBlue hover:bg-saltBlue/90 flex items-center gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload PDF
          </Button>
        </div>
      )}
      
      {file && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <FileIcon className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
          <p className="text-gray-500 mb-6">{formatFileSize(file.size)}</p>
          <div className="flex gap-4">
            <Button 
              onClick={handleUploadClick}
              variant="outline"
            >
              Change file
            </Button>
            <Button 
              onClick={onProcessStart}
              className="bg-saltBlue hover:bg-saltBlue/90"
            >
              Compress PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
