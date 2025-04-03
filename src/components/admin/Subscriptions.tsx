
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RevenueChart } from "./subscriptions/RevenueChart";
import { PlanDistributionChart } from "./subscriptions/PlanDistributionChart";
import { SubscriptionsFilter } from "./subscriptions/SubscriptionsFilter";
import { SubscriptionsTabContent } from "./subscriptions/SubscriptionsTabContent";

export const Subscriptions = () => {
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
        <RevenueChart />
        <PlanDistributionChart />
      </div>

      <Tabs defaultValue="active">
        <SubscriptionsFilter />
        
        <TabsContent value="active" className="m-0">
          <SubscriptionsTabContent value="active" />
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          <SubscriptionsTabContent 
            value="pending" 
            isEmpty={true} 
            emptyMessage="No pending subscriptions found."
          />
        </TabsContent>
        
        <TabsContent value="canceled" className="m-0">
          <SubscriptionsTabContent 
            value="canceled" 
            isEmpty={true} 
            emptyMessage="No canceled subscriptions found."
          />
        </TabsContent>
        
        <TabsContent value="all" className="m-0">
          <SubscriptionsTabContent value="all" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
