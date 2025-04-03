
import { DashboardStats } from "./dashboard/DashboardStats";
import { ToolUsageChart } from "./dashboard/ToolUsageChart";
import { RecentActivity } from "./dashboard/RecentActivity";

export const Dashboard = () => {
  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
      
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 w-full">
        <ToolUsageChart />
        <RecentActivity />
      </div>
    </div>
  );
};
