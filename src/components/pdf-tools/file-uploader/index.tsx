
import React from "react";
import FileInput from "./FileInput";
import EmptyView from "./EmptyView";
import SingleFileView from "./SingleFileView";
import MultipleFilesView from "./MultipleFilesView";

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
  const handleUploadClick = () => {
    // This is just a placeholder - the actual click handler is in FileInput
  };
  
  // Render appropriate view based on state
  const renderContent = () => {
    if (multiple && files && files.length > 0) {
      return (
        <FileInput
          onFileSelect={onFileSelect}
          onFilesSelect={onFilesSelect}
          acceptedTypes={acceptedTypes}
          maxSize={maxSize}
          multiple={multiple}
        >
          <MultipleFilesView 
            files={files} 
            onUploadClick={handleUploadClick} 
            onProcessStart={onProcessStart} 
          />
        </FileInput>
      );
    }
    
    if (file && !multiple) {
      return (
        <FileInput
          onFileSelect={onFileSelect}
          acceptedTypes={acceptedTypes}
          maxSize={maxSize}
        >
          <SingleFileView 
            file={file} 
            onUploadClick={handleUploadClick} 
            onProcessStart={onProcessStart} 
          />
        </FileInput>
      );
    }
    
    return (
      <FileInput
        onFileSelect={onFileSelect}
        onFilesSelect={onFilesSelect}
        acceptedTypes={acceptedTypes}
        maxSize={maxSize}
        multiple={multiple}
      >
        <EmptyView 
          onUploadClick={handleUploadClick} 
          isMultiple={multiple} 
        />
      </FileInput>
    );
  };

  return renderContent();
};

export default FileUploader;
