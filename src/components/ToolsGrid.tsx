
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
import { useLanguage } from "@/context/LanguageContext";

interface Tool {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  color: string;
  path: string;
}

const tools: Tool[] = [
  {
    id: "compress",
    nameKey: "tools.compress",
    descriptionKey: "tools.compressDesc",
    icon: FileCheck,
    color: "#5E9EFF",
    path: "/tools/compress-pdf"
  },
  {
    id: "merge",
    nameKey: "tools.merge",
    descriptionKey: "tools.mergeDesc",
    icon: FilePlus2,
    color: "#50E3C2",
    path: "/tools/merge-pdf"
  },
  {
    id: "split",
    nameKey: "tools.split",
    descriptionKey: "tools.splitDesc",
    icon: FileDigit,
    color: "#5E9EFF",
    path: "/tools/split-pdf"
  },
  {
    id: "convert",
    nameKey: "tools.convert",
    descriptionKey: "tools.convertDesc",
    icon: FileCog,
    color: "#50E3C2",
    path: "/tools/convert-pdf"
  },
  {
    id: "edit",
    nameKey: "tools.edit",
    descriptionKey: "tools.editDesc",
    icon: FileText,
    color: "#5E9EFF",
    path: "/tools/edit-pdf"
  },
  {
    id: "protect",
    nameKey: "tools.protect",
    descriptionKey: "tools.protectDesc",
    icon: FileKey,
    color: "#50E3C2",
    path: "/tools/protect-pdf"
  },
  {
    id: "ocr",
    nameKey: "tools.ocr",
    descriptionKey: "tools.ocrDesc",
    icon: FileScan,
    color: "#5E9EFF",
    path: "/tools/ocr-pdf"
  },
  {
    id: "optimize",
    nameKey: "tools.optimize",
    descriptionKey: "tools.optimizeDesc",
    icon: FileCog2,
    color: "#50E3C2",
    path: "/tools/optimize-pdf"
  },
  {
    id: "repair",
    nameKey: "tools.repair",
    descriptionKey: "tools.repairDesc",
    icon: FileWarning,
    color: "#5E9EFF",
    path: "/tools/repair-pdf"
  }
];

const ToolsGrid = () => {
  const { t, language } = useLanguage();
  const textDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <section id="tools" className="py-20 bg-white" dir={textDirection}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('tools.title')}</h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t('tools.subtitle')}
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
                  {t(tool.nameKey)}
                </h3>
                <p className="text-charcoal/70">
                  {t(tool.descriptionKey)}
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
