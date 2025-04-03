
import { FileCheck, FileWarning, Users, AlarmClock } from "lucide-react";

// Stats data
export const dashboardStats = [
  { 
    title: "Users Today", 
    value: 215, 
    change: "+14%", 
    positive: true,
    icon: Users,
    description: "vs. yesterday"
  },
  { 
    title: "Files Processed", 
    value: 1543, 
    change: "+28%", 
    positive: true,
    icon: FileCheck,
    description: "last 24 hours"
  },
  { 
    title: "Failures", 
    value: 12, 
    change: "-3%", 
    positive: true,
    icon: FileWarning,
    description: "last 24 hours"
  },
  { 
    title: "Average Time", 
    value: "1.2s", 
    change: "+0.1s", 
    positive: false,
    icon: AlarmClock,
    description: "processing time"
  },
];

// Tool usage data
export const toolUsageData = [
  { name: "Merge PDF", usage: 1250 },
  { name: "Compress PDF", usage: 980 },
  { name: "Convert PDF", usage: 750 },
  { name: "Split PDF", usage: 620 },
  { name: "Edit PDF", usage: 410 },
];

// Recent activity data
export const recentActivityData = [
  { time: "09:42", action: "User registration", details: "john.doe@example.com" },
  { time: "09:38", action: "File processed", details: "Compress PDF (1.2MB → 340KB)" },
  { time: "09:21", action: "Support ticket", details: "Issue with PDF merge" },
  { time: "09:15", action: "Subscription", details: "New Pro plan subscription" },
  { time: "08:58", action: "File processed", details: "Convert Word to PDF" },
];
