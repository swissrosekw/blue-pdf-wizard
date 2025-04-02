
import { 
  FilePlus2, 
  FileText, 
  FileKey, 
  FileScan, 
  FileCheck, 
  FileWarning, 
  FileCog, 
  FileCog2, 
  FileDigit
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

export const tools: Tool[] = [
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    longDescription: "Optimize your PDF files by reducing their size without compromising quality. Perfect for email attachments, web uploads, and saving storage space.",
    icon: FileCheck,
    color: "#5E9EFF",
    path: "/tools/compress-pdf"
  },
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    longDescription: "Easily combine multiple PDF files into a single document. Rearrange pages, organize content, and create comprehensive documents from multiple sources.",
    icon: FilePlus2,
    color: "#50E3C2",
    path: "/tools/merge-pdf"
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Separate one PDF into multiple files",
    longDescription: "Extract specific pages or split large PDFs into smaller documents. Perfect for sharing only relevant sections or managing large documents.",
    icon: FileDigit,
    color: "#5E9EFF",
    path: "/tools/split-pdf"
  },
  {
    id: "convert",
    name: "Convert PDF",
    description: "Transform PDFs to different formats",
    longDescription: "Convert PDFs to other file formats like Word, Excel, PowerPoint, or images. Also convert various file types to PDF for better compatibility and sharing.",
    icon: FileCog,
    color: "#50E3C2",
    path: "/tools/convert-pdf"
  },
  {
    id: "edit",
    name: "Edit PDF",
    description: "Modify text, images, and pages in your PDF",
    longDescription: "Make changes to text, images, and page elements directly in your PDF files. Add annotations, highlight text, and customize your documents as needed.",
    icon: FileText,
    color: "#5E9EFF",
    path: "/tools/edit-pdf"
  },
  {
    id: "protect",
    name: "Protect PDF",
    description: "Add password protection to your PDF",
    longDescription: "Secure your sensitive PDF documents with password protection. Control who can view, edit, or print your PDFs with multiple security options.",
    icon: FileKey,
    color: "#50E3C2",
    path: "/tools/protect-pdf"
  },
  {
    id: "ocr",
    name: "OCR PDF",
    description: "Make scanned PDFs searchable and editable",
    longDescription: "Convert scanned documents or images to searchable and editable PDF files. Extract text from images and make your documents fully functional.",
    icon: FileScan,
    color: "#5E9EFF",
    path: "/tools/ocr-pdf"
  },
  {
    id: "optimize",
    name: "Optimize PDF",
    description: "Optimize your PDF for web and mobile",
    longDescription: "Improve PDF loading speed and performance for web and mobile viewing. Balance quality and size for optimal user experience across all devices.",
    icon: FileCog2,
    color: "#50E3C2",
    path: "/tools/optimize-pdf"
  },
  {
    id: "repair",
    name: "Repair PDF",
    description: "Fix corrupt or damaged PDF files",
    longDescription: "Recover and fix corrupted or damaged PDF files that won't open properly. Salvage content from broken PDFs and restore them to working condition.",
    icon: FileWarning,
    color: "#5E9EFF",
    path: "/tools/repair-pdf"
  }
];
