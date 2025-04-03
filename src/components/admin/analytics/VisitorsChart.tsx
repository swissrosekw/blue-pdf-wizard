
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { visitorsData } from "./analyticsData";
import { chartConfig } from "./chartConfig";

export const VisitorsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors & Users</CardTitle>
        <CardDescription>Site traffic and user conversion over time</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visitorsData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
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
  );
};
