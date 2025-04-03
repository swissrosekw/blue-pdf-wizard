
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Search, Download, Filter } from "lucide-react";

// Sample data - replace with actual backend data
const subscriptionRevenue = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14200 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 18900 },
  { month: "May", revenue: 21500 },
  { month: "Jun", revenue: 25600 },
  { month: "Jul", revenue: 23800 },
];

const planDistribution = [
  { name: "Free", users: 7890 },
  { name: "Basic", users: 2540 },
  { name: "Pro", users: 1280 },
  { name: "Enterprise", users: 320 },
];

const subscriptionsData = [
  {
    id: "SUB-1234",
    customer: "John Smith",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    startDate: "2023-05-12",
    amount: "$19.99",
    nextBilling: "2023-08-12"
  },
  {
    id: "SUB-1235",
    customer: "Jane Cooper",
    email: "jane@acme.com",
    plan: "Enterprise",
    status: "active",
    startDate: "2023-04-18",
    amount: "$49.99",
    nextBilling: "2023-08-18"
  },
  {
    id: "SUB-1236",
    customer: "Robert Johnson",
    email: "robert@gmail.com",
    plan: "Basic",
    status: "active",
    startDate: "2023-06-05",
    amount: "$9.99",
    nextBilling: "2023-09-05"
  },
  {
    id: "SUB-1237",
    customer: "Emily Davis",
    email: "emily@company.co",
    plan: "Pro",
    status: "canceled",
    startDate: "2023-03-22",
    amount: "$19.99",
    nextBilling: "—"
  },
  {
    id: "SUB-1238",
    customer: "Michael Wilson",
    email: "michael@example.org",
    plan: "Basic",
    status: "active",
    startDate: "2023-07-10",
    amount: "$9.99",
    nextBilling: "2023-10-10"
  },
  {
    id: "SUB-1239",
    customer: "Sarah Brown",
    email: "sarah@brown.net",
    plan: "Enterprise",
    status: "pending",
    startDate: "2023-07-29",
    amount: "$49.99",
    nextBilling: "2023-10-29"
  },
  {
    id: "SUB-1240",
    customer: "David Miller",
    email: "david@millercorp.com",
    plan: "Pro",
    status: "active",
    startDate: "2023-02-15",
    amount: "$19.99",
    nextBilling: "2023-08-15"
  },
  {
    id: "SUB-1241",
    customer: "Lisa Taylor",
    email: "lisa@taylor.io",
    plan: "Basic",
    status: "expiring",
    startDate: "2023-06-28",
    amount: "$9.99",
    nextBilling: "2023-08-02"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "canceled":
      return "bg-red-50 text-red-700 border-red-200";
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "expiring":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const Subscriptions = () => {
  const chartConfig = {
    revenue: { 
      label: "Revenue", 
      theme: { 
        light: "#5E9EFF",
        dark: "#5E9EFF"
      } 
    },
    plans: { 
      label: "Users", 
      theme: { 
        light: "#50E3C2",
        dark: "#50E3C2"
      } 
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-charcoal">Subscriptions</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm">
            + Add Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly subscription revenue</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={subscriptionRevenue} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="revenue"
                    stroke="var(--color-revenue)" 
                    fill="var(--color-revenue)" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Subscribers by plan type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planDistribution} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" name="plans" fill="var(--color-plans)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-8 w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionsData.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{sub.customer}</div>
                          <div className="text-xs text-muted-foreground">{sub.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                      </TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.amount}</TableCell>
                      <TableCell>{sub.nextBilling}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          <Card>
            <CardContent className="flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-muted-foreground">No pending subscriptions found.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="canceled" className="m-0">
          <Card>
            <CardContent className="flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-muted-foreground">No canceled subscriptions found.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all" className="m-0">
          {/* Same content as active tab */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionsData.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{sub.customer}</div>
                          <div className="text-xs text-muted-foreground">{sub.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                      </TableCell>
                      <TableCell>{sub.startDate}</TableCell>
                      <TableCell>{sub.amount}</TableCell>
                      <TableCell>{sub.nextBilling}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
