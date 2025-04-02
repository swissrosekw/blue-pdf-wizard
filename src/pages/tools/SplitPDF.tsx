
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileDigit } from "lucide-react";

const SplitPDF = () => {
  const features = [
    "Extract specific pages from your PDF files",
    "Split large documents into smaller files",
    "Create multiple PDFs from a single document",
    "Select custom page ranges to extract",
    "Extract pages by odd/even, or specific ranges",
    "Preview pages before splitting"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Split PDF"
      toolDescription="Separate one PDF document into multiple files by pages or page ranges. Extract only the sections you need or break large files into manageable parts."
      icon={<FileDigit className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default SplitPDF;
