
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileDigit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Extract specific pages from your PDF files",
    "Split large documents into smaller files",
    "Create multiple PDFs from a single document",
    "Select custom page ranges to extract",
    "Extract pages by odd/even, or specific ranges",
    "Preview pages before splitting"
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
      // For simulation purposes, we're using the same function as compression
      // In a real application, this would be a specific split PDF function
      const processed = await simulatePdfCompression(
        file,
        1.0, // No compression for splitting
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Split complete",
        description: `PDF split successfully`,
      });
    } catch (error) {
      toast({
        title: "Split failed",
        description: "An error occurred during splitting",
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
      return <ProcessingIndicator progress={progress} label="Splitting your PDF..." />;
    }
    
    if (processedFile && file) {
      return (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 w-full">
            <h3 className="text-xl font-semibold mb-2">Split complete!</h3>
            <p className="mb-4">Your PDF has been split successfully.</p>
          </div>
          <div className="flex gap-4 w-full">
            <button 
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Split new file
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 px-4 py-2 bg-saltBlue text-white rounded hover:bg-saltBlue/90 flex items-center justify-center gap-2"
            >
              Download
            </button>
          </div>
        </div>
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
      toolName="Split PDF"
      toolDescription="Separate one PDF document into multiple files by pages or page ranges. Extract only the sections you need or break large files into manageable parts."
      icon={<FileDigit className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
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

export default SplitPDF;
