
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionsData, getStatusColor } from "./subscriptionsData";

export const SubscriptionsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Next Billing</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptionsData.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell className="font-medium">{sub.id}</TableCell>
            <TableCell>
              <div>
                <div>{sub.customer}</div>
                <div className="text-xs text-muted-foreground">{sub.email}</div>
              </div>
            </TableCell>
            <TableCell>{sub.plan}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
            </TableCell>
            <TableCell>{sub.startDate}</TableCell>
            <TableCell>{sub.amount}</TableCell>
            <TableCell>{sub.nextBilling}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Manage</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
