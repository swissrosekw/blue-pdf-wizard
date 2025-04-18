
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { toolUsageData } from "./dashboardData";
import { chartConfig } from "./chartConfig";

export const ToolUsageChart = () => {
  return (
    <Card className="md:col-span-4 w-full">
      <CardHeader>
        <CardTitle>Tool Usage</CardTitle>
        <CardDescription>Most popular tools in the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="h-80 w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={toolUsageData} 
              margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            >
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
  );
};
