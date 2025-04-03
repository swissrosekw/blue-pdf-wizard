
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import CompressPDF from "./pages/tools/CompressPDF";
import MergePDF from "./pages/tools/MergePDF";
import SplitPDF from "./pages/tools/SplitPDF";
import ConvertPDF from "./pages/tools/ConvertPDF";
import EditPDF from "./pages/tools/EditPDF";
import ProtectPDF from "./pages/tools/ProtectPDF";
import OCRPDF from "./pages/tools/OCRPDF";
import OptimizePDF from "./pages/tools/OptimizePDF";
import RepairPDF from "./pages/tools/RepairPDF";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/sco/admin/AdminPanel";
import AdminLogin from "./pages/sco/admin/AdminLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<Tools />} />
          {/* Tool-specific routes */}
          <Route path="/tools/compress-pdf" element={<CompressPDF />} />
          <Route path="/tools/merge-pdf" element={<MergePDF />} />
          <Route path="/tools/split-pdf" element={<SplitPDF />} />
          <Route path="/tools/convert-pdf" element={<ConvertPDF />} />
          <Route path="/tools/edit-pdf" element={<EditPDF />} />
          <Route path="/tools/protect-pdf" element={<ProtectPDF />} />
          <Route path="/tools/ocr-pdf" element={<OCRPDF />} />
          <Route path="/tools/optimize-pdf" element={<OptimizePDF />} />
          <Route path="/tools/repair-pdf" element={<RepairPDF />} />
          {/* Admin routes */}
          <Route path="/sco/admin/login" element={<AdminLogin />} />
          <Route path="/sco/admin/*" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
