
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
