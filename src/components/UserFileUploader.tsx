
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/custom-supabase-client";
import { useAuth } from "@/context/AuthContext";
import { Upload, FileIcon, AlertCircle } from "lucide-react";
import { formatFileSize } from "@/utils/fileUtils";

interface UserFileUploaderProps {
  onSuccess?: (filePath: string) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

const UserFileUploader = ({ 
  onSuccess, 
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ["application/pdf"] 
}: UserFileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Check file type
    if (!acceptedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${formatFileSize(maxSize)}`,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    
    try {
      // Create a unique file path with the user ID as a folder
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      
      // Upload file to storage
      const { error: storageError } = await supabase.storage
        .from('user_files')
        .upload(filePath, file);
        
      if (storageError) throw storageError;
      
      // Get file URL
      const { data: urlData } = supabase.storage
        .from('user_files')
        .getPublicUrl(filePath);
      
      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('user_files')
        .insert({
          user_id: user.id,
          filename: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          original_name: file.name,
        });
        
      if (dbError) throw dbError;
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been saved to your account`,
      });
      
      // Reset state
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(filePath);
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
      />
      
      {!file ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleUploadClick}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-lightSalt rounded-full flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-saltBlue" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload your PDF</h3>
            <p className="text-sm text-gray-500 mb-4">Click to browse or drag and drop</p>
            <Button 
              type="button"
              className="bg-saltBlue hover:bg-saltBlue/90 text-white"
              onClick={e => {
                e.stopPropagation();
                handleUploadClick();
              }}
            >
              Select PDF
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-md">
              <FileIcon className="h-8 w-8 text-saltBlue" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium truncate">{file.name}</h3>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                Change
              </Button>
              <Button 
                className="bg-saltBlue hover:bg-saltBlue/90" 
                size="sm"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {!user && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800">Authentication required</h4>
            <p className="text-xs text-amber-700">Please sign in to save files to your account.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFileUploader;
