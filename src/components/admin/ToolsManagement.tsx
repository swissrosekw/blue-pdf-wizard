
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List, Pencil, Plus, Trash2 } from "lucide-react";

// Mock tools data
const initialTools = [
  { id: 1, name: "Merge PDF", enabled: true, priority: 1, category: "pdf" },
  { id: 2, name: "Compress PDF", enabled: true, priority: 2, category: "pdf" },
  { id: 3, name: "Split PDF", enabled: true, priority: 3, category: "pdf" },
  { id: 4, name: "Convert PDF", enabled: true, priority: 4, category: "pdf" },
  { id: 5, name: "Edit PDF", enabled: false, priority: 5, category: "pdf" },
  { id: 6, name: "Protect PDF", enabled: true, priority: 6, category: "pdf" },
  { id: 7, name: "OCR PDF", enabled: true, priority: 7, category: "pdf" },
  { id: 8, name: "Optimize PDF", enabled: true, priority: 8, category: "pdf" },
  { id: 9, name: "Repair PDF", enabled: false, priority: 9, category: "pdf" },
];

export const ToolsManagement = () => {
  const [tools, setTools] = useState(initialTools);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleToolStatus = (toolId: number) => {
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        return { ...tool, enabled: !tool.enabled };
      }
      return tool;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Tools Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Input
              placeholder="Search tools..."
              className="w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className={tool.enabled ? "" : "opacity-70"}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <Switch 
                    checked={tool.enabled} 
                    onCheckedChange={() => toggleToolStatus(tool.id)}
                  />
                </div>
                <CardDescription>Priority: {tool.priority}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add new tool card */}
          <Card className="border-dashed border-2 flex items-center justify-center h-[140px] cursor-pointer hover:bg-lightSalt/50 transition-colors">
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Add New Tool</p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTools.map((tool) => (
                <tr key={tool.id} className={tool.enabled ? "" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tool.priority}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Switch 
                        checked={tool.enabled} 
                        onCheckedChange={() => toggleToolStatus(tool.id)}
                        className="mr-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {tool.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="mr-1">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
