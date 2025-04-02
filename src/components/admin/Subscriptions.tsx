
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  CreditCard, 
  TrendingUp, 
  ChevronUp, 
  ChevronDown, 
  DollarSign 
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: 1,
    user: "john.doe@example.com",
    userName: "John Doe",
    plan: "Premium",
    status: "active",
    startDate: "2023-07-15T00:00:00",
    endDate: "2024-07-15T00:00:00",
    payment: "Credit Card",
    amount: 99.99,
    autoRenew: true
  },
  {
    id: 2,
    user: "jane.smith@example.com",
    userName: "Jane Smith",
    plan: "Basic",
    status: "active",
    startDate: "2023-09-10T00:00:00",
    endDate: "2024-09-10T00:00:00",
    payment: "PayPal",
    amount: 49.99,
    autoRenew: true
  },
  {
    id: 3,
    user: "alex.brown@example.com",
    userName: "Alex Brown",
    plan: "Premium",
    status: "expired",
    startDate: "2022-10-05T00:00:00",
    endDate: "2023-10-05T00:00:00",
    payment: "Credit Card",
    amount: 99.99,
    autoRenew: false
  },
  {
    id: 4,
    user: "maria.garcia@example.com",
    userName: "Maria Garcia",
    plan: "Basic",
    status: "active",
    startDate: "2023-08-22T00:00:00",
    endDate: "2024-08-22T00:00:00",
    payment: "PayPal",
    amount: 49.99,
    autoRenew: true
  },
  {
    id: 5,
    user: "sam.wilson@example.com",
    userName: "Sam Wilson",
    plan: "Premium",
    status: "cancelled",
    startDate: "2023-06-15T00:00:00",
    endDate: "2023-12-15T00:00:00",
    payment: "Credit Card",
    amount: 99.99,
    autoRenew: false
  }
];

// Mock data for revenue
const revenueData = [
  { name: "Jan", revenue: 2450 },
  { name: "Feb", revenue: 3200 },
  { name: "Mar", revenue: 4100 },
  { name: "Apr", revenue: 3800 },
  { name: "May", revenue: 5100 },
  { name: "Jun", revenue: 6200 },
  { name: "Jul", revenue: 5400 },
  { name: "Aug", revenue: 6800 },
  { name: "Sep", revenue: 7400 },
  { name: "Oct", revenue: 8100 },
  { name: "Nov", revenue: 0 },
  { name: "Dec", revenue: 0 },
];

// Mock data for plans
const planData = [
  { name: "Premium", value: 65 },
  { name: "Basic", value: 30 },
  { name: "Free", value: 5 },
];

const chartConfig = {
  revenue: {
    label: "Monthly Revenue",
    theme: {
      light: "#50E3C2",
    },
  },
  plans: {
    label: "Subscription Plans",
    theme: {
      light: "#5E9EFF",
    },
  },
};

export const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSubscriptions = mockSubscriptions.filter(sub => 
    sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Calculate stats
  const totalActive = mockSubscriptions.filter(sub => sub.status === "active").length;
  const totalRevenue = mockSubscriptions.reduce((acc, sub) => acc + sub.amount, 0);
  const premiumUsers = mockSubscriptions.filter(sub => sub.plan === "Premium").length;
  const basicUsers = mockSubscriptions.filter(sub => sub.plan === "Basic").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Subscriptions & Payments</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subscriptions..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalActive}</div>
              <CreditCard className="h-8 w-8 text-saltBlue opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${revenueData[9].revenue}</div>
              <DollarSign className="h-8 w-8 text-seaMint opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+9.4%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{premiumUsers}</div>
              <ChevronUp className="h-8 w-8 text-saltBlue opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Basic Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{basicUsers}</div>
              <ChevronDown className="h-8 w-8 text-seaMint opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-red-500">-3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent nameKey="name" labelKey="revenue" />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={planData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent nameKey="name" labelKey="value" />
                  }
                />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-plans)" 
                  barSize={60} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Subscriptions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName}</div>
                          <div className="text-sm text-muted-foreground">{sub.user}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{formatDate(sub.startDate)}</TableCell>
                      <TableCell>{formatDate(sub.endDate)}</TableCell>
                      <TableCell>${sub.amount.toFixed(2)}</TableCell>
                      <TableCell>{sub.payment}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${sub.status === 'active' ? 'bg-green-500' : 
                            sub.status === 'expired' ? 'bg-red-500' : 'bg-orange-500'}
                        `}>
                          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.autoRenew ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Similar content for other tabs (active, expired, cancelled) */}
        <TabsContent value="active" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions
                    .filter(sub => sub.status === 'active')
                    .map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName}</div>
                          <div className="text-sm text-muted-foreground">{sub.user}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{formatDate(sub.startDate)}</TableCell>
                      <TableCell>{formatDate(sub.endDate)}</TableCell>
                      <TableCell>${sub.amount.toFixed(2)}</TableCell>
                      <TableCell>{sub.payment}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.autoRenew ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expired" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions
                    .filter(sub => sub.status === 'expired')
                    .map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName}</div>
                          <div className="text-sm text-muted-foreground">{sub.user}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{formatDate(sub.startDate)}</TableCell>
                      <TableCell>{formatDate(sub.endDate)}</TableCell>
                      <TableCell>${sub.amount.toFixed(2)}</TableCell>
                      <TableCell>{sub.payment}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">
                          Expired
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.autoRenew ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions
                    .filter(sub => sub.status === 'cancelled')
                    .map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName}</div>
                          <div className="text-sm text-muted-foreground">{sub.user}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>{formatDate(sub.startDate)}</TableCell>
                      <TableCell>{formatDate(sub.endDate)}</TableCell>
                      <TableCell>${sub.amount.toFixed(2)}</TableCell>
                      <TableCell>{sub.payment}</TableCell>
                      <TableCell>
                        <Badge className="bg-orange-500">
                          Cancelled
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.autoRenew ? "Yes" : "No"}</TableCell>
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
