
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileCog2 } from "lucide-react";

const OptimizePDF = () => {
  const features = [
    "Optimize for faster web and mobile viewing",
    "Reduce file size without quality loss",
    "Improve PDF loading times",
    "Optimize embedded images and resources",
    "Create PDF files optimized for specific devices",
    "Linearize PDFs for progressive loading"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Optimize PDF"
      toolDescription="Improve PDF loading speed and performance for web and mobile viewing. Balance quality and size for optimal user experience across all devices."
      icon={<FileCog2 className="h-8 w-8" style={{ color: "#50E3C2" }} />}
      color="#50E3C2"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default OptimizePDF;
