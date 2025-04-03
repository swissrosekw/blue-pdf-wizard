
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { dashboardStats } from "./dashboardData";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((stat, index) => (
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
  );
};
