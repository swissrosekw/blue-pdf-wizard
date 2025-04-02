
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FilePlus2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const MergePDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Combine multiple PDF files into one document",
    "Drag and drop interface for easy ordering",
    "Rearrange pages before merging",
    "Retain all formatting and content from original files",
    "No file number limitations",
    "Add, delete, or rotate pages before merging"
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
      // In a real application, this would be a specific merge PDF function
      const processed = await simulatePdfCompression(
        file,
        1.0, // No compression for merging
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Merge complete",
        description: `Files merged successfully`,
      });
    } catch (error) {
      toast({
        title: "Merge failed",
        description: "An error occurred during merging",
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
      return <ProcessingIndicator progress={progress} label="Merging your PDFs..." />;
    }
    
    if (processedFile && file) {
      return (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 w-full">
            <h3 className="text-xl font-semibold mb-2">Merge complete!</h3>
            <p className="mb-4">Your PDFs have been merged into a single file.</p>
          </div>
          <div className="flex gap-4 w-full">
            <button 
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Merge new files
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
      toolName="Merge PDF"
      toolDescription="Combine multiple PDF files into a single document. Easily organize and rearrange pages to create comprehensive documents from multiple sources."
      icon={<FilePlus2 className="h-8 w-8" style={{ color: "#50E3C2" }} />}
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

export default MergePDF;
