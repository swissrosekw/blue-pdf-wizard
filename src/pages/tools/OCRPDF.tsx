
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileScan } from "lucide-react";

const OCRPDF = () => {
  const features = [
    "Convert scanned documents to searchable PDFs",
    "Extract text from image-based PDFs",
    "Support for multiple languages",
    "Maintain original layout and formatting",
    "Improve accessibility for screen readers",
    "Enhanced search capabilities for indexed text"
  ];
  
  const supportedFormats = ["PDF", "JPG", "PNG", "TIFF", "BMP", "GIF"];
  
  return (
    <ToolPageTemplate
      toolName="OCR PDF"
      toolDescription="Convert scanned papers and image PDFs into searchable, editable text. Our OCR technology recognizes text in images, making your documents fully functional."
      icon={<FileScan className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default OCRPDF;
