
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from "recharts";

// Mock data for analytics
const trafficData = [
  { name: "Jan", visitors: 1200, users: 800 },
  { name: "Feb", visitors: 1900, users: 1200 },
  { name: "Mar", visitors: 2400, users: 1600 },
  { name: "Apr", visitors: 1500, users: 1000 },
  { name: "May", visitors: 2800, users: 1800 },
  { name: "Jun", visitors: 3100, users: 2200 },
  { name: "Jul", visitors: 2500, users: 1900 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 34 },
  { name: "Tablet", value: 8 },
];

const DEVICE_COLORS = ["#5E9EFF", "#50E3C2", "#F97316"];

const countryData = [
  { name: "United States", value: 34 },
  { name: "United Kingdom", value: 18 },
  { name: "Germany", value: 12 },
  { name: "France", value: 9 },
  { name: "Canada", value: 8 },
  { name: "Others", value: 19 },
];

const hourlyData = [
  { name: "00:00", value: 120 },
  { name: "02:00", value: 80 },
  { name: "04:00", value: 60 },
  { name: "06:00", value: 100 },
  { name: "08:00", value: 250 },
  { name: "10:00", value: 380 },
  { name: "12:00", value: 420 },
  { name: "14:00", value: 450 },
  { name: "16:00", value: 380 },
  { name: "18:00", value: 300 },
  { name: "20:00", value: 220 },
  { name: "22:00", value: 150 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    theme: {
      light: "#5E9EFF",
    },
  },
  users: {
    label: "Registered Users",
    theme: {
      light: "#50E3C2",
    },
  },
  hourly: {
    label: "Hourly Activity",
    theme: {
      light: "#5E9EFF",
    },
  },
};

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={trafficData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="var(--color-visitors)" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="var(--color-users)" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart
                layout="vertical"
                data={countryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#5E9EFF" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={hourlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent nameKey="name" labelKey="value" />
                  }
                />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-hourly)" 
                  barSize={20} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
