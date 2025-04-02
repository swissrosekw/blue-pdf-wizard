
import React from "react";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { FileKey } from "lucide-react";

const ProtectPDF = () => {
  const features = [
    "Add password protection to your PDF files",
    "Set different passwords for opening and editing",
    "Control permissions for printing, copying, or editing",
    "256-bit AES encryption for maximum security",
    "Remove password protection (with valid password)",
    "Batch protection for multiple documents"
  ];
  
  const supportedFormats = ["PDF", "PDF/A", "PDF/X"];
  
  return (
    <ToolPageTemplate
      toolName="Protect PDF"
      toolDescription="Secure your sensitive PDF documents with password protection. Control who can view, edit, or print your PDFs with multiple security options and encryption."
      icon={<FileKey className="h-8 w-8" style={{ color: "#50E3C2" }} />}
      color="#50E3C2"
      features={features}
      supportedFormats={supportedFormats}
    />
  );
};

export default ProtectPDF;
