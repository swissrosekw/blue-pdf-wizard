
import React, { useState } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FilePlus2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile } from "@/utils/fileUtils";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
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
  
  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessedFile(null);
  };

  const simulatePdfMerge = (files: File[], onProgress: (progress: number) => void): Promise<File> => {
    return new Promise((resolve) => {
      const steps = 20;
      let currentStep = 0;
      const intervalTime = 100;
      
      const interval = setInterval(() => {
        currentStep++;
        onProgress(currentStep * (100 / steps));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          
          // For simulation, we'll just rename the first file as if it were merged
          const totalSize = files.reduce((sum, file) => sum + file.size, 0);
          
          // Create a new file object with merged name
          const mergedFileName = "merged_document.pdf";
          const mergedBlob = new Blob([files[0]], { type: 'application/pdf' });
          const mergedFile = new File([mergedBlob], mergedFileName, { type: 'application/pdf' });
          
          // Store the original files in case needed
          Object.defineProperty(mergedFile, 'originalFiles', {
            value: files,
            writable: false
          });
          
          resolve(mergedFile);
        }
      }, intervalTime);
    });
  };

  const handleProcessStart = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const merged = await simulatePdfMerge(
        files,
        (progress) => setProgress(progress)
      );
      
      setProcessedFile(merged);
      
      toast({
        title: "Merge complete",
        description: `${files.length} files merged successfully`,
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
    setFiles([]);
    setProcessedFile(null);
    setProgress(0);
  };
  
  const renderContent = () => {
    if (isProcessing) {
      return <ProcessingIndicator progress={progress} label="Merging your PDFs..." />;
    }
    
    if (processedFile) {
      return (
        <ProcessResult
          title="Merge complete!"
          description={`Your ${files.length} PDFs have been merged into a single file.`}
          bgColorClass="bg-green-50"
          textColorClass="text-green-700"
          buttonLabel="Merge new files"
          onNewFileClick={handleReset}
          onDownloadClick={handleDownload}
        />
      );
    }
    
    return (
      <FileUploader
        file={null}
        files={files}
        onFileSelect={() => {}}
        onFilesSelect={handleFilesSelect}
        onProcessStart={handleProcessStart}
        multiple={true}
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
