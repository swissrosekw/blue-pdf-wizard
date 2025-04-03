
import { Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onMenuClick: () => void;
  onLogout: () => void;
}

export const AdminHeader = ({ onMenuClick, onLogout }: AdminHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="rounded-full"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
