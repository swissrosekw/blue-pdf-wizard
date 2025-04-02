
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
import { Link } from "react-router-dom";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

const tools: Tool[] = [
  {
    id: "compress",
    name: "Compress PDF",
    description: "Reduce file size while maintaining quality",
    icon: FileCheck,
    color: "#5E9EFF",
    path: "/tools/compress-pdf"
  },
  {
    id: "merge",
    name: "Merge PDF",
    description: "Combine multiple PDFs into one document",
    icon: FilePlus2,
    color: "#50E3C2",
    path: "/tools/merge-pdf"
  },
  {
    id: "split",
    name: "Split PDF",
    description: "Separate one PDF into multiple files",
    icon: FileDigit,
    color: "#5E9EFF",
    path: "/tools/split-pdf"
  },
  {
    id: "convert",
    name: "Convert PDF",
    description: "Transform PDFs to different formats",
    icon: FileCog,
    color: "#50E3C2",
    path: "/tools/convert-pdf"
  },
  {
    id: "edit",
    name: "Edit PDF",
    description: "Modify text, images, and pages in your PDF",
    icon: FileText,
    color: "#5E9EFF",
    path: "/tools/edit-pdf"
  },
  {
    id: "protect",
    name: "Protect PDF",
    description: "Add password protection to your PDF",
    icon: FileKey,
    color: "#50E3C2",
    path: "/tools/protect-pdf"
  },
  {
    id: "ocr",
    name: "OCR PDF",
    description: "Make scanned PDFs searchable and editable",
    icon: FileScan,
    color: "#5E9EFF",
    path: "/tools/ocr-pdf"
  },
  {
    id: "optimize",
    name: "Optimize PDF",
    description: "Optimize your PDF for web and mobile",
    icon: FileCog2,
    color: "#50E3C2",
    path: "/tools/optimize-pdf"
  },
  {
    id: "repair",
    name: "Repair PDF",
    description: "Fix corrupt or damaged PDF files",
    icon: FileWarning,
    color: "#5E9EFF",
    path: "/tools/repair-pdf"
  }
];

const ToolsGrid = () => {
  return (
    <section id="tools" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All the PDF tools you need</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Select the tool you need and transform your documents in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.id}
              to={tool.path}
              className="p-6 bg-lightSalt rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4 group"
            >
              <div 
                className="p-3 rounded-lg" 
                style={{ backgroundColor: `${tool.color}20` }}
              >
                <tool.icon 
                  className="h-6 w-6" 
                  style={{ color: tool.color }} 
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-saltBlue transition-colors">
                  {tool.name}
                </h3>
                <p className="text-charcoal/70">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
