
import React from "react";
import { Upload, FileIcon } from "lucide-react";

interface FileUploaderHeaderProps {
  isMultiple: boolean;
  fileCount?: number;
}

const FileUploaderHeader = ({ isMultiple, fileCount = 0 }: FileUploaderHeaderProps) => {
  return (
    <>
      <div className="w-20 h-20 bg-lightSalt rounded-full flex items-center justify-center mb-6">
        {fileCount > 0 ? (
          <FileIcon className="w-10 h-10 text-saltBlue" />
        ) : (
          <Upload className="w-10 h-10 text-saltBlue" />
        )}
      </div>
      {fileCount > 0 ? (
        <h3 className="text-xl font-semibold mb-2">Selected Files ({fileCount})</h3>
      ) : (
        <h3 className="text-xl font-semibold mb-2">
          Upload your PDF {isMultiple ? 'files' : 'file'}
        </h3>
      )}
      {fileCount === 0 && (
        <p className="text-gray-500 mb-4">Max file size: 5MB {isMultiple ? 'per file' : ''}</p>
      )}
    </>
  );
};

export default FileUploaderHeader;
