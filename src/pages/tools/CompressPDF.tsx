
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCheck } from "lucide-react";

const CompressPDF = () => {
  const features = [
    "Reduce PDF file size while maintaining quality",
    "Optimized compression algorithms for different types of content",
    "Batch compression for multiple files",
    "Various compression levels to choose from",
    "Preview file size before downloading",
    "Secure and private processing"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Compress PDF"
      toolDescription="Reduce your PDF file size while maintaining document quality and formatting. Perfect for email attachments, uploading to websites, or saving storage space."
      icon={<FileCheck className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default CompressPDF;
