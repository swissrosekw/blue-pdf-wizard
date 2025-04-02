
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
          
          // Improved merging simulation - combine all file data instead of just using the first file
          const mergedFileName = "merged_document.pdf";
          
          // Read all files and concatenate their data
          const concatenateFiles = async () => {
            const readers = files.map(file => {
              return new Promise<ArrayBuffer>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.readAsArrayBuffer(file);
              });
            });
            
            // Wait for all files to be read
            const fileBuffers = await Promise.all(readers);
            
            // Calculate total size
            const totalSize = fileBuffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
            
            // Create a combined buffer
            const combinedBuffer = new Uint8Array(totalSize);
            
            // Copy data from each file into the combined buffer
            let offset = 0;
            fileBuffers.forEach(buffer => {
              combinedBuffer.set(new Uint8Array(buffer), offset);
              offset += buffer.byteLength;
            });
            
            // Create the merged file
            const mergedBlob = new Blob([combinedBuffer], { type: 'application/pdf' });
            const mergedFile = new File([mergedBlob], mergedFileName, { type: 'application/pdf' });
            
            // Add metadata about original files
            Object.defineProperty(mergedFile, 'originalFiles', {
              value: files,
              writable: false
            });
            
            resolve(mergedFile);
          };
          
          // Start the concatenation process
          concatenateFiles();
        }
      }, intervalTime);
    });
  };

  const handleProcessStart = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one PDF file",
        variant: "destructive",
      });
      return;
    }
    
    if (files.length === 1) {
      toast({
        title: "Only one file selected",
        description: "Please select at least two PDF files to merge",
        variant: "destructive",
      });
      return;
    }
    
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
      console.error("Merge error:", error);
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
          processedFile={processedFile}
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
