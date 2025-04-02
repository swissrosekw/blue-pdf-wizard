
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCog2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const OptimizePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Optimize for faster web and mobile viewing",
    "Reduce file size without quality loss",
    "Improve PDF loading times",
    "Optimize embedded images and resources",
    "Create PDF files optimized for specific devices",
    "Linearize PDFs for progressive loading"
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
        0.8,
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Optimization complete",
        description: `File optimized successfully`,
      });
    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "An error occurred during optimization",
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
      return <ProcessingIndicator progress={progress} label="Optimizing your PDF..." />;
    }
    
    if (processedFile && file) {
      return (
        <ProcessResult
          title="Optimization complete!"
          description="Your PDF has been optimized for better performance."
          bgColorClass="bg-green-50"
          textColorClass="text-green-700"
          buttonLabel="Optimize new file"
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
      toolName="Optimize PDF"
      toolDescription="Improve PDF loading speed and performance for web and mobile viewing. Balance quality and size for optimal user experience across all devices."
      icon={<FileCog2 className="h-8 w-8" style={{ color: "#50E3C2" }} />}
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

export default OptimizePDF;
