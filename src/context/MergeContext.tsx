
import React, { createContext, useContext, useState } from "react";

interface MergeContextProps {
  files: File[];
  processedFile: File | null;
  resetKey: number;
  setFiles: (files: File[]) => void;
  setProcessedFile: (file: File | null) => void;
  handleReset: () => void;
}

const MergeContext = createContext<MergeContextProps | undefined>(undefined);

export const MergeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [resetKey, setResetKey] = useState(0);
  
  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };
  
  return (
    <MergeContext.Provider value={{
      files,
      processedFile,
      resetKey,
      setFiles,
      setProcessedFile,
      handleReset
    }}>
      {children}
    </MergeContext.Provider>
  );
};

export const useMergeContext = () => {
  const context = useContext(MergeContext);
  if (context === undefined) {
    throw new Error("useMergeContext must be used within a MergeProvider");
  }
  return context;
};
