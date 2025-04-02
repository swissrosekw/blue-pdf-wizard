
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for file logs
const mockLogs = [
  {
    id: 1,
    fileName: "business-proposal.pdf",
    operation: "Merge",
    originalSize: "2.4 MB",
    resultSize: "2.1 MB",
    user: "john.doe@example.com",
    timestamp: "2023-10-15T14:30:00",
    status: "success"
  },
  {
    id: 2,
    fileName: "financial-report.pdf",
    operation: "Compress",
    originalSize: "8.7 MB",
    resultSize: "3.2 MB",
    user: "jane.smith@example.com",
    timestamp: "2023-10-15T12:45:00",
    status: "success"
  },
  {
    id: 3,
    fileName: "contract-draft.pdf",
    operation: "Convert",
    originalSize: "1.2 MB",
    resultSize: "1.1 MB",
    user: "alex.brown@example.com",
    timestamp: "2023-10-15T10:20:00",
    status: "failed"
  },
  {
    id: 4,
    fileName: "presentation.pdf",
    operation: "Split",
    originalSize: "5.8 MB",
    resultSize: "5.8 MB",
    user: "maria.garcia@example.com",
    timestamp: "2023-10-14T16:15:00",
    status: "success"
  },
  {
    id: 5,
    fileName: "invoice-october.pdf",
    operation: "OCR",
    originalSize: "0.7 MB",
    resultSize: "0.9 MB",
    user: "sam.wilson@example.com",
    timestamp: "2023-10-14T14:30:00",
    status: "success"
  },
  {
    id: 6,
    fileName: "legal-document.pdf",
    operation: "Protect",
    originalSize: "3.2 MB",
    resultSize: "3.2 MB",
    user: "john.doe@example.com",
    timestamp: "2023-10-14T11:10:00",
    status: "success"
  },
  {
    id: 7,
    fileName: "research-paper.pdf",
    operation: "Edit",
    originalSize: "4.5 MB",
    resultSize: "4.7 MB",
    user: "jane.smith@example.com",
    timestamp: "2023-10-13T15:40:00",
    status: "failed"
  }
];

export const FileLogs = () => {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLogs = logs.filter(log => 
    log.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.operation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">File Operation Logs</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search file logs..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Operation</TableHead>
                <TableHead>Original Size</TableHead>
                <TableHead>Result Size</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.fileName}</TableCell>
                  <TableCell>{log.operation}</TableCell>
                  <TableCell>{log.originalSize}</TableCell>
                  <TableCell>{log.resultSize}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
