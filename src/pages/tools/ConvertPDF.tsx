
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCog } from "lucide-react";

const ConvertPDF = () => {
  const features = [
    "Convert PDFs to various formats (Word, Excel, PowerPoint)",
    "Convert images to PDF and PDF to images",
    "Preserve all formatting during conversion",
    "Batch conversion for multiple files",
    "OCR technology for scanned documents",
    "High-quality output for all converted files"
  ];
  
  const supportedFormats = [
    "PDF", "DOCX", "DOC", "XLSX", "XLS", "PPTX", "PPT", 
    "JPG", "PNG", "TIFF", "BMP", "GIF", "HTML", "TXT"
  ];
  
  return (
    <ToolPageTemplate
      toolName="Convert PDF"
      toolDescription="Transform your PDFs to and from various file formats while maintaining content, layout, and formatting. Convert to Word, Excel, PowerPoint, images, and more."
      icon={<FileCog className="h-8 w-8" style={{ color: "#50E3C2" }} />}
      color="#50E3C2"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default ConvertPDF;
