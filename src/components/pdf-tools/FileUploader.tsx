import React from "react";
import { Upload, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatFileSize } from "@/utils/fileUtils";

interface FileUploaderProps {
  file: File | null;
  files?: File[];
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  onProcessStart: () => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
  multiple?: boolean;
}

const FileUploader = ({
  file,
  files = [],
  onFileSelect,
  onFilesSelect,
  onProcessStart,
  acceptedTypes = ["application/pdf"],
  maxSize = 5 * 1024 * 1024, // 5MB default limit
  multiple = false
}: FileUploaderProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (multiple && selectedFiles.length > 0 && onFilesSelect) {
      const validFiles: File[] = [];
      let totalSize = 0;
      let hasInvalidType = false;
      let hasSizeExceeded = false;

      // Check all files
      Array.from(selectedFiles).forEach(selectedFile => {
        // Check file type
        if (!acceptedTypes.includes(selectedFile.type)) {
          hasInvalidType = true;
          return;
        }

        // Check individual file size
        if (selectedFile.size > maxSize) {
          hasSizeExceeded = true;
          return;
        }

        totalSize += selectedFile.size;
        validFiles.push(selectedFile);
      });

      if (hasInvalidType) {
        toast({
          title: "Invalid file format",
          description: "Please upload only PDF files",
          variant: "destructive",
        });
        return;
      }

      if (hasSizeExceeded) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${formatFileSize(maxSize)} per file`,
          variant: "destructive",
        });
        return;
      }

      if (validFiles.length > 0) {
        onFilesSelect(validFiles);
        toast({
          title: "Files selected",
          description: `${validFiles.length} files selected (${formatFileSize(totalSize)})`,
        });
      }
    } else {
      // Original single file logic
      const selectedFile = selectedFiles[0];
      
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
    }
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
        multiple={multiple}
      />
      
      {(!file && (!files || files.length === 0)) && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload your PDF {multiple ? 'files' : 'file'}</h3>
          <p className="text-gray-500 mb-4">Max file size: 5MB {multiple ? 'per file' : ''}</p>
          <Button 
            onClick={handleUploadClick}
            className="bg-saltBlue hover:bg-saltBlue/90 flex items-center gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload PDF{multiple ? 's' : ''}
          </Button>
        </div>
      )}
      
      {file && !multiple && (
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
              Process File
            </Button>
          </div>
        </div>
      )}
      
      {multiple && files && files.length > 0 && (
        <div className="flex flex-col items-center justify-center p-6 w-full">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <FileIcon className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Selected Files ({files.length})</h3>
          
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
              onClick={handleUploadClick}
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
      )}
    </div>
  );
};

export default FileUploader;
