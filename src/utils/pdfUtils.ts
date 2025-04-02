
import { toast } from "@/hooks/use-toast";

/**
 * Simulates merging PDF files by combining their content
 * @param files Array of PDF files to merge
 * @param onProgress Callback function to report progress
 * @returns Promise that resolves to the merged file
 */
export const mergePdfFiles = (
  files: File[],
  onProgress: (progress: number) => void
): Promise<File> => {
  return new Promise((resolve) => {
    // Validate that we have files to merge
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one PDF file",
        variant: "destructive",
      });
      throw new Error("No files selected");
    }
    
    if (files.length === 1) {
      toast({
        title: "Only one file selected",
        description: "Please select at least two PDF files to merge",
        variant: "destructive",
      });
      throw new Error("Only one file selected");
    }

    const steps = 20;
    let currentStep = 0;
    const intervalTime = 100;
    
    const interval = setInterval(() => {
      currentStep++;
      onProgress(currentStep * (100 / steps));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        
        // Create merged file name
        const mergedFileName = "merged_document.pdf";
        
        // Create a function to read and concatenate all files
        const concatenateFiles = async () => {
          // Create an array to store our promises
          const fileReaders = files.map(file => {
            return new Promise<ArrayBuffer>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as ArrayBuffer);
              reader.readAsArrayBuffer(file);
            });
          });
          
          try {
            // Wait for all files to be read
            const fileBuffers = await Promise.all(fileReaders);
            
            // Calculate total size
            const totalSize = fileBuffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
            
            // Create a new buffer to hold all the data
            const combinedBuffer = new Uint8Array(totalSize);
            
            // Copy each file's data into our combined buffer
            let offset = 0;
            fileBuffers.forEach((buffer, index) => {
              const data = new Uint8Array(buffer);
              combinedBuffer.set(data, offset);
              offset += buffer.byteLength;
              console.log(`Added file ${index + 1} (${files[index].name}) at offset ${offset - buffer.byteLength}, size: ${buffer.byteLength}`);
            });
            
            // Create the merged file blob from our buffer
            const mergedBlob = new Blob([combinedBuffer], { type: 'application/pdf' });
            const mergedFile = new File([mergedBlob], mergedFileName, { type: 'application/pdf' });
            
            // Store info about merged files for display purposes
            const fileInfos = files.map(f => ({
              name: f.name,
              size: f.size
            }));
            
            // Add custom property for file info
            Object.defineProperty(mergedFile, 'mergedFiles', {
              value: fileInfos,
              writable: false,
              enumerable: true
            });
            
            // Store file count for display purposes
            Object.defineProperty(mergedFile, 'fileCount', {
              value: files.length,
              writable: false,
              enumerable: true
            });
            
            console.log(`Created merged file with ${files.length} files, total size: ${mergedFile.size} bytes`);
            resolve(mergedFile);
          } catch (error) {
            console.error("Error merging files:", error);
            // Fallback to just using a placeholder merged file
            const fallbackBlob = new Blob([`Error merging files: ${error}`], { type: 'application/pdf' });
            resolve(new File([fallbackBlob], "merge_error.pdf", { type: 'application/pdf' }));
          }
        };
        
        // Start the concatenation process
        concatenateFiles();
      }
    }, intervalTime);
  });
};
