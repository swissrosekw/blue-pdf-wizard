
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for support tickets
const mockTickets = [
  {
    id: 1,
    subject: "Issue with PDF merging",
    user: "john.doe@example.com",
    status: "new",
    priority: "high",
    category: "technical",
    message: "I'm trying to merge two PDFs but I'm getting an error saying 'Operation failed'. Can you help?",
    created: "2023-10-15T10:30:00",
    updated: "2023-10-15T10:30:00"
  },
  {
    id: 2,
    subject: "Billing question",
    user: "jane.smith@example.com",
    status: "in-progress",
    priority: "medium",
    category: "billing",
    message: "I was charged twice for my monthly subscription. Can you please check and refund one of the charges?",
    created: "2023-10-14T15:45:00",
    updated: "2023-10-15T09:20:00"
  },
  {
    id: 3,
    subject: "Feature request",
    user: "alex.brown@example.com",
    status: "closed",
    priority: "low",
    category: "feature",
    message: "Would it be possible to add a feature that allows batch processing of PDFs? This would save me a lot of time.",
    created: "2023-10-12T11:30:00",
    updated: "2023-10-14T14:15:00"
  },
  {
    id: 4,
    subject: "Account access problem",
    user: "maria.garcia@example.com",
    status: "new",
    priority: "high",
    category: "account",
    message: "I can't log into my account even though I'm using the correct password. Is there an issue with the login system?",
    created: "2023-10-15T08:10:00",
    updated: "2023-10-15T08:10:00"
  },
  {
    id: 5,
    subject: "PDF conversion quality",
    user: "sam.wilson@example.com",
    status: "in-progress",
    priority: "medium",
    category: "technical",
    message: "The quality of my converted PDFs seems low. Images are pixelated and text is blurry. Can this be improved?",
    created: "2023-10-13T16:25:00",
    updated: "2023-10-14T11:40:00"
  }
];

export const SupportTickets = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [currentTab, setCurrentTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filterTickets = () => {
    let filtered = tickets;
    
    // Apply status filter
    if (currentTab !== "all") {
      filtered = filtered.filter(ticket => ticket.status === currentTab);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="all">
            All Tickets
            <Badge className="ml-2 bg-gray-500">{tickets.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="new">
            New
            <Badge className="ml-2 bg-red-500">{tickets.filter(t => t.status === "new").length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress
            <Badge className="ml-2 bg-yellow-500">{tickets.filter(t => t.status === "in-progress").length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed
            <Badge className="ml-2 bg-green-500">{tickets.filter(t => t.status === "closed").length}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filterTickets().map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        {ticket.subject}
                      </CardTitle>
                      <CardDescription>
                        From: {ticket.user} • {formatDate(ticket.created)}
                      </CardDescription>
                    </div>
                    <Badge className={`
                      ${ticket.priority === 'high' ? 'bg-red-500' : 
                        ticket.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}
                    `}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{ticket.message}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="text-xs text-muted-foreground">
                    Category: {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                    <Button size="sm" className="gap-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new" className="mt-6">
          <div className="grid gap-4">
            {filterTickets().map((ticket) => (
              <Card key={ticket.id}>
                {/* Same card content structure as above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        {ticket.subject}
                      </CardTitle>
                      <CardDescription>
                        From: {ticket.user} • {formatDate(ticket.created)}
                      </CardDescription>
                    </div>
                    <Badge className={`
                      ${ticket.priority === 'high' ? 'bg-red-500' : 
                        ticket.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}
                    `}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{ticket.message}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="text-xs text-muted-foreground">
                    Category: {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                    <Button size="sm" className="gap-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          {/* Similar content structure for in-progress tickets */}
          <div className="grid gap-4">
            {filterTickets().map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        {ticket.subject}
                      </CardTitle>
                      <CardDescription>
                        From: {ticket.user} • {formatDate(ticket.created)}
                      </CardDescription>
                    </div>
                    <Badge className={`
                      ${ticket.priority === 'high' ? 'bg-red-500' : 
                        ticket.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}
                    `}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{ticket.message}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="text-xs text-muted-foreground">
                    Category: {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                    <Button size="sm" className="gap-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="closed" className="mt-6">
          {/* Similar content structure for closed tickets */}
          <div className="grid gap-4">
            {filterTickets().map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        {ticket.subject}
                      </CardTitle>
                      <CardDescription>
                        From: {ticket.user} • {formatDate(ticket.created)}
                      </CardDescription>
                    </div>
                    <Badge className={`
                      ${ticket.priority === 'high' ? 'bg-red-500' : 
                        ticket.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}
                    `}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{ticket.message}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="text-xs text-muted-foreground">
                    Category: {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                    <Button size="sm" className="gap-1">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
