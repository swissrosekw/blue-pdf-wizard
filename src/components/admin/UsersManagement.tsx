
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, UserPlus, Download } from "lucide-react";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    email: "john.doe@example.com",
    name: "John Doe",
    country: "United States",
    subscription: "Premium",
    files: 45,
    lastLogin: "2023-10-15T14:30:00",
    status: "active"
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    name: "Jane Smith",
    country: "Canada",
    subscription: "Basic",
    files: 12,
    lastLogin: "2023-10-12T09:45:00",
    status: "active"
  },
  {
    id: 3,
    email: "alex.brown@example.com",
    name: "Alex Brown",
    country: "United Kingdom",
    subscription: "Premium",
    files: 76,
    lastLogin: "2023-10-14T16:20:00",
    status: "inactive"
  },
  {
    id: 4,
    email: "maria.garcia@example.com",
    name: "Maria Garcia",
    country: "Spain",
    subscription: "Free",
    files: 8,
    lastLogin: "2023-10-10T11:15:00",
    status: "active"
  },
  {
    id: 5,
    email: "sam.wilson@example.com",
    name: "Sam Wilson",
    country: "Australia",
    subscription: "Basic",
    files: 23,
    lastLogin: "2023-10-13T08:30:00",
    status: "active"
  }
];

export const UsersManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name / Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead className="text-center">Files</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.subscription === 'Premium' 
                      ? 'bg-green-100 text-green-800' 
                      : user.subscription === 'Basic' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.subscription}
                  </span>
                </TableCell>
                <TableCell className="text-center">{user.files}</TableCell>
                <TableCell>{formatDate(user.lastLogin)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={user.status === 'active'} 
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
