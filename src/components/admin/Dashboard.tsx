
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, FileCheck, FileWarning, Users, AlarmClock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Dummy data - replace with your actual data fetching logic
const stats = [
  { 
    title: "Users Today", 
    value: 215, 
    change: "+14%", 
    positive: true,
    icon: Users,
    description: "vs. yesterday"
  },
  { 
    title: "Files Processed", 
    value: 1543, 
    change: "+28%", 
    positive: true,
    icon: FileCheck,
    description: "last 24 hours"
  },
  { 
    title: "Failures", 
    value: 12, 
    change: "-3%", 
    positive: true,
    icon: FileWarning,
    description: "last 24 hours"
  },
  { 
    title: "Average Time", 
    value: "1.2s", 
    change: "+0.1s", 
    positive: false,
    icon: AlarmClock,
    description: "processing time"
  },
];

const toolUsageData = [
  { name: "Merge PDF", usage: 1250 },
  { name: "Compress PDF", usage: 980 },
  { name: "Convert PDF", usage: 750 },
  { name: "Split PDF", usage: 620 },
  { name: "Edit PDF", usage: 410 },
];

const recentActivityData = [
  { time: "09:42", action: "User registration", details: "john.doe@example.com" },
  { time: "09:38", action: "File processed", details: "Compress PDF (1.2MB → 340KB)" },
  { time: "09:21", action: "Support ticket", details: "Issue with PDF merge" },
  { time: "09:15", action: "Subscription", details: "New Pro plan subscription" },
  { time: "08:58", action: "File processed", details: "Convert Word to PDF" },
];

const COLORS = ["#5E9EFF", "#50E3C2", "#FF5E93", "#FFB952", "#A389F4"];

export const Dashboard = () => {
  const chartConfig = {
    usage: { 
      label: "Tool Usage", 
      theme: { 
        light: "#5E9EFF",
        dark: "#5E9EFF"
      } 
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center">
                {stat.positive ? 
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" /> : 
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                }
                <span className={stat.positive ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Tool Usage</CardTitle>
            <CardDescription>Most popular tools in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={toolUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="usage" name="usage" fill="var(--color-usage)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivityData.map((item, index) => (
                <div key={index} className="flex justify-between pb-4 border-b border-slate-100 last:border-none last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Activity</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
