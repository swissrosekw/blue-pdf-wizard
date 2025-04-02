import React, { useState, useRef } from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCheck, Upload, Download, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const features = [
    "Reduce PDF file size while maintaining quality",
    "Optimized compression algorithms for different types of content",
    "Batch compression for multiple files",
    "Various compression levels to choose from",
    "Preview file size before downloading",
    "Secure and private processing"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setCompressedFile(null);
        toast({
          title: "File selected",
          description: `${selectedFile.name} (${formatFileSize(selectedFile.size)})`,
        });
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const simulateCompression = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const intervalTime = 50;
    const steps = 20;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setProgress(currentStep * (100 / steps));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setIsProcessing(false);
        
        if (file) {
          const compressedSize = Math.floor(file.size * 0.7);
          const compressedBlob = new Blob([file], { type: 'application/pdf' });
          const newFileName = file.name.replace('.pdf', '_compressed.pdf');
          
          const compressedFile = new File(
            [compressedBlob], 
            newFileName, 
            { type: 'application/pdf' }
          );
          
          setCompressedFile(compressedFile);
          
          toast({
            title: "Compression complete",
            description: `Reduced from ${formatFileSize(file.size)} to ${formatFileSize(compressedFile.size)}`,
          });
        }
      }
    }, intervalTime);
  };
  
  const handleDownload = () => {
    if (compressedFile) {
      const downloadUrl = URL.createObjectURL(compressedFile);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = compressedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Download started",
        description: compressedFile.name,
      });
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  
  const UploadSection = () => (
    <div className="bg-white rounded-lg shadow-sm border p-8 mt-8 max-w-xl mx-auto text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
      />
      
      {!file && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload your PDF file</h3>
          <p className="text-gray-500 mb-4">Max file size: 100MB</p>
          <Button 
            onClick={handleUploadClick}
            className="bg-saltBlue hover:bg-saltBlue/90 flex items-center gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload PDF
          </Button>
        </div>
      )}
      
      {file && !compressedFile && !isProcessing && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
            <FileIcon className="w-10 h-10 text-saltBlue" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
          <p className="text-gray-500 mb-6">{formatFileSize(file.size)}</p>
          <div className="flex gap-4">
            <Button 
              onClick={handleUploadClick}
              variant="outline"
            >
              Change file
            </Button>
            <Button 
              onClick={simulateCompression}
              className="bg-saltBlue hover:bg-saltBlue/90"
            >
              Compress PDF
            </Button>
          </div>
        </div>
      )}
      
      {isProcessing && (
        <div className="flex flex-col items-center justify-center p-6">
          <h3 className="text-xl font-semibold mb-4">Processing your file...</h3>
          <Progress value={progress} className="w-full mb-4" />
          <p className="text-gray-500">{Math.round(progress)}% complete</p>
        </div>
      )}
      
      {compressedFile && (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 w-full">
            <h3 className="text-xl font-semibold mb-2">Compression complete!</h3>
            <div className="flex justify-between items-center mb-2">
              <span>Original size:</span>
              <span className="font-medium">{formatFileSize(file?.size || 0)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Compressed size:</span>
              <span className="font-medium">{formatFileSize(compressedFile.size)}</span>
            </div>
            <div className="bg-green-100 p-2 rounded text-center">
              <span className="font-semibold">
                {Math.round((1 - compressedFile.size / (file?.size || 1)) * 100)}% smaller
              </span>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <Button 
              onClick={handleUploadClick}
              variant="outline"
              className="flex-1"
            >
              Upload new file
            </Button>
            <Button 
              onClick={handleDownload}
              className="bg-saltBlue hover:bg-saltBlue/90 flex-1 flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <ToolPageTemplate
      toolName="Compress PDF"
      toolDescription="Reduce your PDF file size while maintaining document quality and formatting. Perfect for email attachments, uploading to websites, or saving storage space."
      icon={<FileCheck className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
      customContent={<UploadSection />}
    />
  );
};

export default CompressPDF;
