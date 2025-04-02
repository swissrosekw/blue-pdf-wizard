
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const EditPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Edit text directly in your PDF documents",
    "Add, remove, or modify images",
    "Insert, delete, or reorder pages",
    "Add annotations, comments, and highlights",
    "Fill out PDF forms electronically",
    "Add or modify hyperlinks in documents"
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
      // In a real application, this would be a specific edit PDF function
      const processed = await simulatePdfCompression(
        file,
        1.0, // No compression for editing
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Editing complete",
        description: `File processed successfully`,
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "An error occurred during editing",
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
      return <ProcessingIndicator progress={progress} label="Editing your PDF..." />;
    }
    
    if (processedFile && file) {
      return (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 w-full">
            <h3 className="text-xl font-semibold mb-2">Editing complete!</h3>
            <p className="mb-4">Your PDF has been processed and is ready to download.</p>
          </div>
          <div className="flex gap-4 w-full">
            <button 
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Edit new file
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
      toolName="Edit PDF"
      toolDescription="Make changes to your PDF files directly in your browser. Edit text, images, and add annotations without needing to convert to other formats first."
      icon={<FileText className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
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

export default EditPDF;
