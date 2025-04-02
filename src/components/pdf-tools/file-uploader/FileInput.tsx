
import React, { useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { formatFileSize } from "@/utils/fileUtils";

interface FileInputProps {
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
  children: React.ReactNode;
}

const FileInput = ({
  onFileSelect,
  onFilesSelect,
  acceptedTypes = ["application/pdf"],
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  children
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
        multiple={multiple}
      />
      <div onClick={handleUploadClick}>
        {children}
      </div>
    </>
  );
};

export default FileInput;
