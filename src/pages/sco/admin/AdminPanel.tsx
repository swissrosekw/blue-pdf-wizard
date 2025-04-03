
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Dashboard } from "@/components/admin/Dashboard";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { ToolsManagement } from "@/components/admin/ToolsManagement";
import { Analytics } from "@/components/admin/Analytics";
import { FileLogs } from "@/components/admin/FileLogs";
import { SupportTickets } from "@/components/admin/SupportTickets";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { Subscriptions } from "@/components/admin/Subscriptions";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-lightSalt">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/tools" element={<ToolsManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/file-logs" element={<FileLogs />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
