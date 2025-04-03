
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  BarChart, 
  FileText, 
  MessageSquare, 
  Settings, 
  CreditCard,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { 
    name: "Dashboard", 
    path: "/sco/admin", 
    icon: LayoutDashboard 
  },
  { 
    name: "Users Management", 
    path: "/sco/admin/users", 
    icon: Users 
  },
  { 
    name: "Tools Management", 
    path: "/sco/admin/tools", 
    icon: Wrench 
  },
  { 
    name: "Analytics", 
    path: "/sco/admin/analytics", 
    icon: BarChart 
  },
  { 
    name: "File Logs", 
    path: "/sco/admin/file-logs", 
    icon: FileText 
  },
  { 
    name: "Support Tickets", 
    path: "/sco/admin/support", 
    icon: MessageSquare 
  },
  { 
    name: "Settings", 
    path: "/sco/admin/settings", 
    icon: Settings 
  },
  { 
    name: "Subscriptions", 
    path: "/sco/admin/subscriptions", 
    icon: CreditCard 
  },
];

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const AdminSidebar = ({ open, setOpen, onLogout }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-30 bg-white shadow-md transition-all duration-300 ease-in-out", 
        open ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex items-center justify-between h-16 p-4 border-b">
        <div className={cn("flex items-center", !open && "hidden")}>
          <span className="text-lg font-bold text-saltBlue">Admin Panel</span>
        </div>
        <button 
          onClick={() => setOpen(!open)} 
          className="p-1 rounded-full hover:bg-lightSalt"
        >
          <ChevronRight className={cn("h-5 w-5 text-charcoal transition-transform duration-300", 
            !open && "rotate-180")} 
          />
        </button>
      </div>
      <nav className="p-2 flex flex-col h-[calc(100%-4rem)]">
        <ul className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-saltBlue/10 text-saltBlue" 
                    : "text-charcoal hover:bg-lightSalt",
                  !open && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn("ml-3 whitespace-nowrap", !open && "hidden")}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Logout button at bottom */}
        <div className="mt-auto mb-4">
          <button
            onClick={onLogout}
            className={cn(
              "flex items-center p-2 rounded-md transition-colors w-full",
              "text-charcoal hover:bg-red-100 hover:text-red-600",
              !open && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn("ml-3 whitespace-nowrap", !open && "hidden")}>
              Logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
