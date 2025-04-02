
import React from "react";
import FileUploader from "@/components/pdf-tools/FileUploader";
import ProcessingIndicator from "@/components/pdf-tools/ProcessingIndicator";
import ProcessResult from "@/components/pdf-tools/ProcessResult";
import { downloadFile } from "@/utils/fileUtils";
import { mergePdfFiles } from "@/utils/pdfUtils";
import { toast } from "@/hooks/use-toast";

interface MergeFormProps {
  onReset: () => void;
}

const MergeForm = ({ onReset }: MergeFormProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [processedFile, setProcessedFile] = React.useState<File | null>(null);
  
  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessedFile(null);
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
      const merged = await mergePdfFiles(
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
    onReset();
  };
  
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

export default MergeForm;
