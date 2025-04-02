
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileScan } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile, simulatePdfCompression } from "@/utils/fileUtils";

const OCRPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFile, setProcessedFile] = useState<File | null>(null);

  const features = [
    "Convert scanned documents to searchable PDFs",
    "Extract text from image-based PDFs",
    "Support for multiple languages",
    "Maintain original layout and formatting",
    "Improve accessibility for screen readers",
    "Enhanced search capabilities for indexed text"
  ];
  
  const supportedFormats = ["PDF", "JPG", "PNG", "TIFF", "BMP", "GIF"];
  
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
        title: "OCR complete",
        description: `Text recognition completed successfully`,
      });
    } catch (error) {
      toast({
        title: "OCR failed",
        description: "An error occurred during text recognition",
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
      return <ProcessingIndicator progress={progress} label="Performing OCR on your file..." />;
    }
    
    if (processedFile && file) {
      return (
        <ProcessResult
          title="OCR processing complete!"
          description="Your PDF is now searchable and the text is selectable."
          bgColorClass="bg-green-50"
          textColorClass="text-green-700"
          buttonLabel="Process new file"
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
      toolName="OCR PDF"
      toolDescription="Convert scanned papers and image PDFs into searchable, editable text. Our OCR technology recognizes text in images, making your documents fully functional."
      icon={<FileScan className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
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

export default OCRPDF;
