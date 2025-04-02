
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FilePlus2 } from "lucide-react";

const MergePDF = () => {
  const features = [
    "Combine multiple PDF files into one document",
    "Drag and drop interface for easy ordering",
    "Rearrange pages before merging",
    "Retain all formatting and content from original files",
    "No file number limitations",
    "Add, delete, or rotate pages before merging"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Merge PDF"
      toolDescription="Combine multiple PDF files into a single document. Easily organize and rearrange pages to create comprehensive documents from multiple sources."
      icon={<FilePlus2 className="h-8 w-8" style={{ color: "#50E3C2" }} />}
      color="#50E3C2"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default MergePDF;
