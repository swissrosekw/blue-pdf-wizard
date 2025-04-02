
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  User, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  AlertTriangle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Mock data for the charts
const usageData = [
  { name: 'Merge', value: 340 },
  { name: 'Compress', value: 280 },
  { name: 'Convert', value: 190 },
  { name: 'Split', value: 140 },
  { name: 'OCR', value: 90 },
  { name: 'Edit', value: 70 },
];

const chartConfig = {
  usage: {
    label: "Tool Usage",
    theme: {
      light: "#5E9EFF",
    },
  },
};

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            <TabsTrigger value="thisMonth">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4,856</div>
              <User className="h-8 w-8 text-saltBlue opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processed Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12,482</div>
              <FileText className="h-8 w-8 text-seaMint opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+24%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8.2%</div>
              <TrendingUp className="h-8 w-8 text-saltBlue opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-red-500">-1.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">96.4%</div>
              <CheckCircle2 className="h-8 w-8 text-seaMint opacity-80" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">+0.8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most Used Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={usageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-usage)"
                  radius={[4, 4, 0, 0]} 
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent nameKey="name" labelKey="value" />
                  }
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-md p-3 bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Storage Usage at 85%</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consider cleaning up old files or upgrading storage plan.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-md p-3 bg-yellow-50">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">3 Unresolved Support Tickets</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    There are 3 tickets waiting for over 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-md p-3 bg-blue-50">
                <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">System Update Available</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    New features available. Schedule update during off-peak hours.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
