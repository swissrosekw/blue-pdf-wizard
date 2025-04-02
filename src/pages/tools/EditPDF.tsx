
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileText } from "lucide-react";

const EditPDF = () => {
  const features = [
    "Edit text directly in your PDF documents",
    "Add, remove, or modify images",
    "Insert, delete, or reorder pages",
    "Add annotations, comments, and highlights",
    "Fill out PDF forms electronically",
    "Add or modify hyperlinks in documents"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Edit PDF"
      toolDescription="Make changes to your PDF files directly in your browser. Edit text, images, and add annotations without needing to convert to other formats first."
      icon={<FileText className="h-8 w-8" style={{ color: "#5E9EFF" }} />}
      color="#5E9EFF"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default EditPDF;
