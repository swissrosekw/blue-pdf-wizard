
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data - replace with actual data from your backend
const visitorsData = [
  { name: "Jan", visitors: 1200, users: 900 },
  { name: "Feb", visitors: 1900, users: 1200 },
  { name: "Mar", visitors: 2100, users: 1400 },
  { name: "Apr", visitors: 2400, users: 1800 },
  { name: "May", visitors: 2700, users: 2100 },
  { name: "Jun", visitors: 3500, users: 2900 },
  { name: "Jul", visitors: 3200, users: 2600 },
];

const deviceData = [
  { name: "Desktop", value: 62 },
  { name: "Mobile", value: 32 },
  { name: "Tablet", value: 6 },
];

const countryData = [
  { name: "USA", value: 38 },
  { name: "Germany", value: 15 },
  { name: "UK", value: 13 },
  { name: "France", value: 9 },
  { name: "Other", value: 25 },
];

const hourlyData = [
  { hour: "12am", visitors: 420 },
  { hour: "3am", visitors: 180 },
  { hour: "6am", visitors: 320 },
  { hour: "9am", visitors: 890 },
  { hour: "12pm", visitors: 1400 },
  { hour: "3pm", visitors: 1900 },
  { hour: "6pm", visitors: 1700 },
  { hour: "9pm", visitors: 1200 },
];

const COLORS = [
  "#5E9EFF", "#50E3C2", "#FF5E93", "#FFB952", "#A389F4", 
  "#1E90FF", "#32CD32", "#FF6347", "#9370DB", "#3CB371"
];

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  const chartConfig = {
    visitors: { 
      label: "Visitors", 
      theme: { 
        light: "#5E9EFF",
        dark: "#5E9EFF" 
      } 
    },
    users: { 
      label: "Users", 
      theme: { 
        light: "#50E3C2",
        dark: "#50E3C2" 
      } 
    },
    hourly: { 
      label: "Visitors", 
      theme: { 
        light: "#5E9EFF",
        dark: "#5E9EFF" 
      } 
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">Analytics</h1>
        <Tabs defaultValue="monthly" className="w-[200px]" onValueChange={setTimeRange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Day</TabsTrigger>
            <TabsTrigger value="weekly">Week</TabsTrigger>
            <TabsTrigger value="monthly">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitors & Users</CardTitle>
            <CardDescription>Site traffic and user conversion over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    name="visitors"
                    stroke="var(--color-visitors)"
                    fill="var(--color-visitors)" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    name="users"
                    stroke="var(--color-users)" 
                    fill="var(--color-users)" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic</CardTitle>
            <CardDescription>Visitor volume throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="visitors" 
                    name="hourly"
                    fill="var(--color-hourly)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>What devices your visitors are using</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Geographic distribution of your users</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
