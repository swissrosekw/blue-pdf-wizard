
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCog } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const ConvertPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Convert PDFs to various formats (Word, Excel, PowerPoint)",
    "Convert images to PDF and PDF to images",
    "Preserve all formatting during conversion",
    "Batch conversion for multiple files",
    "OCR technology for scanned documents",
    "High-quality output for all converted files"
  ];
  
  const supportedFormats = [
    "PDF", "DOCX", "DOC", "XLSX", "XLS", "PPTX", "PPT", 
    "JPG", "PNG", "TIFF", "BMP", "GIF", "HTML", "TXT"
  ];
  
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
      // In a real application, this would be a specific convert PDF function
      const processed = await simulatePdfCompression(
        file,
        1.0,
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(processed);
      
      toast({
        title: "Conversion complete",
        description: `File converted successfully`,
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion",
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
      return <ProcessingIndicator progress={progress} label="Converting your PDF..." />;
    }
    
    if (processedFile && file) {
      return (
        <ProcessResult
          title="Conversion complete!"
          description="Your file has been converted and is ready to download."
          bgColorClass="bg-green-50"
          textColorClass="text-green-700"
          buttonLabel="Convert new file"
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
      toolName="Convert PDF"
      toolDescription="Transform your PDFs to and from various file formats while maintaining content, layout, and formatting. Convert to Word, Excel, PowerPoint, images, and more."
      icon={<FileCog className="h-8 w-8" style={{ color: "#50E3C2" }} />}
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

export default ConvertPDF;
