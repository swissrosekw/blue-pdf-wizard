
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { MergeProvider } from "@/context/MergeContext";
import MergeContent from "@/components/pdf-tools/merge/MergeContent";
import MergeHero from "@/components/pdf-tools/merge/MergeHero";
import MergeSteps from "@/components/pdf-tools/merge/MergeSteps";

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
  
  const toolName = "Merge PDF";
  const toolDescription = "Combine multiple PDF files into a single document. Easily organize and rearrange pages to create comprehensive documents from multiple sources.";
  
  return (
    <MergeProvider>
      <ToolPageTemplate
        toolName={toolName}
        toolDescription={toolDescription}
        icon={<></>} // This will be handled by MergeHero
        color="#50E3C2"
        features={features}
        supportedFormats={supportedFormats}
        customContent={<MergeContent />}
        customHero={<MergeHero toolName={toolName} toolDescription={toolDescription} />}
        customSteps={<MergeSteps />}
      />
    </MergeProvider>
  );
};

export default MergePDF;
