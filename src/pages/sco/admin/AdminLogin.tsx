
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, UserCircle } from "lucide-react";

// In a real application, these would be authenticated against a backend
// For demo purposes only - in production, never hardcode credentials
const DEMO_ADMIN_CREDENTIALS = [
  {
    username: "admin",
    password: "admin123"
  },
  {
    username: "nasir",
    password: "Nara@123123",
    email: "nasiralwahib@outlook.com"
  }
];

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // Demo authentication logic - check against array of credentials
      const validCredential = DEMO_ADMIN_CREDENTIALS.find(
        cred => cred.username === username && cred.password === password
      );
      
      if (validCredential) {
        // Store admin session in localStorage (use secure auth tokens in production)
        localStorage.setItem("adminAuthenticated", "true");
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
          variant: "default",
        });
        
        navigate("/sco/admin");
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightSalt p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex justify-center -mt-12 mb-2">
          <img 
            src="/lovable-uploads/287fa00a-e652-4b33-b87d-ad719c0deb5b.png" 
            alt="PDF Salt Logo" 
            className="h-24 w-24 rounded-full bg-white p-2 shadow-md border" 
          />
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-saltBlue">Admin Access</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-saltBlue hover:bg-saltBlue/90" 
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-muted-foreground">
            This is a secure area. Unauthorized access is prohibited.
          </p>
        </CardFooter>
      </Card>
      
      <div className="fixed bottom-0 left-0 w-full bg-charcoal text-white py-4 text-center">
        <p className="text-xs">
          &copy; 2025 PDFSalt.com. All Rights Reserved. 
          For any inquiries, please contact <a href="mailto:support@pdfsalt.com" className="underline hover:text-seaMint">support@pdfsalt.com</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
