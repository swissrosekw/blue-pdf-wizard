
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, File, Check, AlertCircle, FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/custom-supabase-client";
import { Link } from "react-router-dom";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [filePath, setFilePath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

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

  const simulateUpload = async () => {
    setIsUploading(true);
    
    try {
      // For authenticated users, we'll save the file
      if (user && uploadedFile) {
        // Create a unique file path with the user ID as a folder
        const filePath = `${user.id}/${Date.now()}-${uploadedFile.name}`;
        
        // Upload file to storage
        const { error: storageError } = await supabase.storage
          .from('user_files')
          .upload(filePath, uploadedFile);
          
        if (storageError) throw storageError;
        
        // Save file metadata to database
        const { error: dbError } = await supabase
          .from('user_files')
          .insert({
            user_id: user.id,
            filename: uploadedFile.name.replace(/\.[^/.]+$/, ""), // Remove extension
            file_path: filePath,
            file_size: uploadedFile.size,
            file_type: uploadedFile.type,
            original_name: uploadedFile.name,
          });
          
        if (dbError) throw dbError;
        
        // Store file path for later use
        setFilePath(filePath);
      }
      
      // Simulate processing time
      setTimeout(() => {
        setIsUploading(false);
        setIsProcessed(true);
        toast({
          title: "File processed successfully",
          description: user 
            ? "Your PDF has been saved to your account and is ready to be edited" 
            : "Your PDF is ready to be edited",
        });
      }, 2000);
    } catch (error: any) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      console.error("Upload error:", error);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessed(false);
    setFilePath(null);
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
          className={`file-drop-area ${isDragging ? "active" : ""} 
            border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer
            ${isDragging ? "bg-gray-50 border-saltBlue" : "hover:bg-gray-50 hover:border-gray-400"}`}
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
            
            {!user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  Want to save your files for later?
                </p>
                <Button 
                  variant="outline" 
                  asChild 
                  className="text-saltBlue border-saltBlue hover:bg-saltBlue/10"
                >
                  <Link to="/auth">Sign in to your account</Link>
                </Button>
              </div>
            )}
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
              <p className="text-charcoal/70 mb-2">
                {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              
              {user && filePath && (
                <p className="text-sm text-saltBlue mb-6">
                  This file has been saved to your account
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={resetUpload}>
                  Upload another file
                </Button>
                <Button className="bg-seaMint hover:bg-seaMint/90 text-white">
                  Download result
                </Button>
                
                {user && (
                  <Button 
                    variant="outline"
                    asChild
                    className="border-saltBlue text-saltBlue hover:bg-saltBlue/10"
                  >
                    <Link to="/dashboard">View all files</Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FileIcon className="mx-auto h-16 w-16 text-saltBlue mb-4" />
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
