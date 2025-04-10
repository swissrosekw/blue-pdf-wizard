
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
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access the admin panel",
        variant: "destructive",
      });
      navigate("/sco/admin/login");
      return;
    }

    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/sco/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-lightSalt">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />
      <div className={`
        flex-1 flex flex-col 
        transition-all duration-300 
        ${sidebarOpen ? 'md:ml-64' : 'md:ml-[70px]'}
      `}>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
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
