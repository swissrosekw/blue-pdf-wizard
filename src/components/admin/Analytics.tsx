
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitorsChart } from "./analytics/VisitorsChart";
import { HourlyTrafficChart } from "./analytics/HourlyTrafficChart";
import { DevicesChart } from "./analytics/DevicesChart";
import { CountriesChart } from "./analytics/CountriesChart";

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");

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
        <VisitorsChart />
        <HourlyTrafficChart />
        <DevicesChart />
        <CountriesChart />
      </div>
    </div>
  );
};
