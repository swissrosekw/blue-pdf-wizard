
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileKey } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const ProtectPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Add password protection to your PDF files",
    "Set different passwords for opening and editing",
    "Control permissions for printing, copying, or editing",
    "256-bit AES encryption for maximum security",
    "Remove password protection (with valid password)",
    "Batch protection for multiple documents"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProcessedFile(null);
  };

  const handleProcessStart = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // For simulation purposes, we're using the same function
      const processed = await simulatePdfCompression(
        file,
        1.0,
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Protection complete",
        description: `File protected successfully`,
      });
    } catch (error) {
      toast({
        title: "Protection failed",
        description: "An error occurred during protection",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDownload = () => {
    if (processedFile) {
      downloadFile(processedFile);
      
      toast({
        title: "Download started",
        description: processedFile.name,
      });
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setProgress(0);
  };
  
  const renderContent = () => {
    if (isProcessing) {
      return <ProcessingIndicator progress={progress} label="Protecting your PDF..." />;
    }
    
    if (processedFile && file) {
      return (
        <ProcessResult
          title="Protection complete!"
          description="Your PDF has been protected with a password."
          bgColorClass="bg-blue-50"
          textColorClass="text-blue-700"
          buttonLabel="Protect new file"
          onNewFileClick={handleReset}
          onDownloadClick={handleDownload}
        />
      );
    }
    
    return (
      <FileUploader
        file={file}
        onFileSelect={handleFileSelect}
        onProcessStart={handleProcessStart}
      />
    );
  };
  
  return (
    <ToolPageTemplate
      toolName="Protect PDF"
      toolDescription="Secure your sensitive PDF documents with password protection. Control who can view, edit, or print your PDFs with multiple security options and encryption."
      icon={<FileKey className="h-8 w-8" style={{ color: "#50E3C2" }} />}
      color="#50E3C2"
      features={features}
      supportedFormats={supportedFormats}
      customContent={
        <div className="bg-white rounded-lg shadow-sm border p-8 mt-8 max-w-xl mx-auto text-center">
          {renderContent()}
        </div>
      }
    />
  );
};

export default ProtectPDF;
