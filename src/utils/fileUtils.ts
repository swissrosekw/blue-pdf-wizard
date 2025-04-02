
/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes Size in bytes
 * @returns Formatted string (e.g. "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Handles the download of a file
 * @param file File to download
 */
export const downloadFile = (file: File): void => {
  try {
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error("Download error:", error);
  }
};

/**
 * Simulates PDF compression
 * @param file Original PDF file
 * @param compressionRatio Ratio to compress by (0.4 = 40% of original size)
 * @param onProgress Progress callback
 * @returns Promise that resolves to the compressed file
 */
export const simulatePdfCompression = (
  file: File, 
  compressionRatio: number = 0.4,
  onProgress: (progress: number) => void
): Promise<File> => {
  return new Promise((resolve) => {
    const steps = 20;
    let currentStep = 0;
    const intervalTime = 50;
    
    const interval = setInterval(() => {
      currentStep++;
      onProgress(currentStep * (100 / steps));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        
        // Calculate new file size based on compression ratio
        const originalSize = file.size;
        const newSize = Math.floor(originalSize * compressionRatio);
        
        // Create a smaller array buffer for the compressed content
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        
        reader.onload = () => {
          const originalBuffer = reader.result as ArrayBuffer;
          // Create a smaller buffer with the reduced size
          const compressedBuffer = originalBuffer.slice(0, newSize);
          
          const compressedBlob = new Blob([compressedBuffer], { type: 'application/pdf' });
          const newFileName = file.name.replace(/\.pdf$/i, '_compressed.pdf');
          
          const compressedFile = new File(
            [compressedBlob], 
            newFileName, 
            { type: 'application/pdf' }
          );
          
          resolve(compressedFile);
        };
      }
    }, intervalTime);
  });
};
