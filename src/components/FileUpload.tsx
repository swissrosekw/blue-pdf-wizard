
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, File, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setUploadedFile(file);
        simulateUpload();
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    // Simulate processing time
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessed(true);
      toast({
        title: "File processed successfully",
        description: "Your PDF is ready to be edited",
      });
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".pdf"
        className="hidden"
      />

      {!uploadedFile ? (
        <div
          className={`file-drop-area ${isDragging ? "active" : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="text-center">
            <FileUp 
              className="mx-auto h-16 w-16 text-saltBlue mb-4" 
              strokeWidth={1.5} 
            />
            <h3 className="text-2xl font-semibold mb-2">Drop your PDF here</h3>
            <p className="text-charcoal/70 mb-6">
              or click to browse from your computer
            </p>
            <Button 
              className="bg-saltBlue hover:bg-saltBlue/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Select PDF
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-md">
          {isUploading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-saltBlue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Processing...</h3>
              <p className="text-charcoal/70">Please wait while we process your file</p>
            </div>
          ) : isProcessed ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-seaMint/20 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-seaMint" />
              </div>
              <h3 className="text-xl font-semibold mb-2">File processed successfully!</h3>
              <p className="text-charcoal/70 mb-6">
                {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={resetUpload}>
                  Upload another file
                </Button>
                <Button className="bg-seaMint hover:bg-seaMint/90 text-white">
                  Download result
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <File className="mx-auto h-16 w-16 text-saltBlue mb-4" />
              <h3 className="text-xl font-semibold mb-2">{uploadedFile.name}</h3>
              <p className="text-charcoal/70 mb-6">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={resetUpload}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-saltBlue hover:bg-saltBlue/90 text-white"
                  onClick={simulateUpload}
                >
                  Process File
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
