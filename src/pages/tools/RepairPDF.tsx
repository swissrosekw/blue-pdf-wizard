
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileWarning } from "lucide-react";

const RepairPDF = () => {
  const features = [
    "Fix corrupted or damaged PDF files",
    "Repair PDFs that won't open properly",
    "Recover content from broken files",
    "Fix issues with fonts and images",
    "Restore damaged page structure",
    "Repair files with broken internal links"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Repair PDF"
      toolDescription="Fix corrupted or damaged PDF files that won't open properly. Recover content and restore functionality to broken documents with our repair tool."
      icon={<FileWarning className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default RepairPDF;
