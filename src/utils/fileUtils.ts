
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
  const downloadUrl = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};

/**
 * Simulates PDF compression
 * @param file Original PDF file
 * @param compressionRatio Ratio to compress by (0.7 = 70% of original size)
 * @param onProgress Progress callback
 * @returns Promise that resolves to the compressed file
 */
export const simulatePdfCompression = (
  file: File, 
  compressionRatio: number = 0.7,
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
        
        // Create the compressed file
        const compressedBlob = new Blob([file], { type: 'application/pdf' });
        const newFileName = file.name.replace('.pdf', '_compressed.pdf');
        
        const compressedFile = new File(
          [compressedBlob], 
          newFileName, 
          { type: 'application/pdf' }
        );
        
        resolve(compressedFile);
      }
    }, intervalTime);
  });
};
