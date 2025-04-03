
import { Card, CardContent } from "@/components/ui/card";
import { SubscriptionsTable } from "./SubscriptionsTable";
import { EmptyState } from "./EmptyState";

interface SubscriptionsTabContentProps {
  value: string;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const SubscriptionsTabContent = ({ 
  value, 
  isEmpty = false, 
  emptyMessage = "No subscriptions found." 
}: SubscriptionsTabContentProps) => {
  if (isEmpty) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <SubscriptionsTable />
      </CardContent>
    </Card>
  );
};
