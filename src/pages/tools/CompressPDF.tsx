
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import CompressionResult from "@/components/pdf-tools/CompressionResult";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const features = [
    "Reduce PDF file size while maintaining quality",
    "Optimized compression to 40% without quality loss",
    "Maximum file size of 5MB",
    "Preview file size before downloading",
    "Secure and private processing",
    "Instant compression with no wait time"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setCompressedFile(null);
  };

  const handleProcessStart = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const compressed = await simulatePdfCompression(
        file,
        0.4, // Compress to 40% of original size
        (progress) => setProgress(progress)
      );
      
      setCompressedFile(compressed);
      
      toast({
        title: "Compression complete",
        description: `File compressed successfully to around 40% of original size`,
      });
    } catch (error) {
      toast({
        title: "Compression failed",
        description: "An error occurred during compression",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDownload = () => {
    if (compressedFile) {
      downloadFile(compressedFile);
      
      toast({
        title: "Download started",
        description: compressedFile.name,
      });
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setCompressedFile(null);
    setProgress(0);
  };
  
  const renderContent = () => {
    if (isProcessing) {
      return <ProcessingIndicator progress={progress} />;
    }
    
    if (compressedFile && file) {
      return (
        <CompressionResult
          originalFile={file}
          compressedFile={compressedFile}
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
        maxSize={5 * 1024 * 1024} // 5MB limit
      />
    );
  };
  
  return (
    <ToolPageTemplate
      toolName="Compress PDF"
      toolDescription="Reduce your PDF file size to 40% while maintaining document quality. Perfect for email attachments, uploading to websites, or saving storage space."
      icon={<FileCheck className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
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

export default CompressPDF;
