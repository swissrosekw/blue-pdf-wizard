
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/custom-supabase-client";
import { FileIcon, Trash2, Download, Search, LogOut } from "lucide-react";
import { formatFileSize } from "@/utils/fileUtils";
import { toast } from "@/hooks/use-toast";
import UserFileUploader from "@/components/UserFileUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserFile {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [files, setFiles] = useState<UserFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchUserFiles();
    }
  }, [user, loading, navigate]);

  const fetchUserFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_files')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error loading files",
        description: "Failed to load your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    try {
      setDeletingId(id);
      
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('user_files')
        .remove([filePath]);
        
      if (storageError) throw storageError;
      
      // Delete metadata from database
      const { error: dbError } = await supabase
        .from('user_files')
        .delete()
        .eq('id', id);
        
      if (dbError) throw dbError;
      
      // Update UI
      setFiles(files.filter(file => file.id !== id));
      
      toast({
        title: "File deleted",
        description: "The file has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (file: UserFile) => {
    try {
      // Get file from storage
      const { data, error } = await supabase.storage
        .from('user_files')
        .download(file.file_path);
        
      if (error) throw error;
      
      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.original_name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
      console.error("Download error:", error);
    }
  };

  const filteredFiles = files.filter(file => 
    file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.original_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-saltBlue border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Files</h1>
              <p className="text-gray-600">Manage your uploaded PDF documents</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button
                onClick={() => setUploadModalOpen(true)}
                className="bg-saltBlue hover:bg-saltBlue/90"
              >
                Upload PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-saltBlue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-saltBlue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              {searchQuery ? (
                <div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No matching files</h3>
                  <p className="text-gray-500">Try a different search term</p>
                </div>
              ) : (
                <div>
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No files yet</h3>
                  <p className="text-gray-500 mb-6">Start by uploading your first PDF file</p>
                  <Button
                    onClick={() => setUploadModalOpen(true)}
                    className="bg-saltBlue hover:bg-saltBlue/90"
                  >
                    Upload PDF
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded On
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                              <FileIcon className="h-5 w-5 text-saltBlue" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 max-w-sm truncate">
                                {file.original_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(file.file_size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(file.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(file)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(file.id, file.file_path)}
                              disabled={deletingId === file.id}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              {deletingId === file.id ? (
                                <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload PDF File</DialogTitle>
          </DialogHeader>
          <UserFileUploader 
            onSuccess={() => {
              setUploadModalOpen(false);
              fetchUserFiles();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
