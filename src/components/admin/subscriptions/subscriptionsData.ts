
// Sample data - replace with actual backend data
export const subscriptionRevenue = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14200 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 18900 },
  { month: "May", revenue: 21500 },
  { month: "Jun", revenue: 25600 },
  { month: "Jul", revenue: 23800 },
];

export const planDistribution = [
  { name: "Free", users: 7890 },
  { name: "Basic", users: 2540 },
  { name: "Pro", users: 1280 },
  { name: "Enterprise", users: 320 },
];

export const subscriptionsData = [
  {
    id: "SUB-1234",
    customer: "John Smith",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    startDate: "2023-05-12",
    amount: "$19.99",
    nextBilling: "2023-08-12"
  },
  {
    id: "SUB-1235",
    customer: "Jane Cooper",
    email: "jane@acme.com",
    plan: "Enterprise",
    status: "active",
    startDate: "2023-04-18",
    amount: "$49.99",
    nextBilling: "2023-08-18"
  },
  {
    id: "SUB-1236",
    customer: "Robert Johnson",
    email: "robert@gmail.com",
    plan: "Basic",
    status: "active",
    startDate: "2023-06-05",
    amount: "$9.99",
    nextBilling: "2023-09-05"
  },
  {
    id: "SUB-1237",
    customer: "Emily Davis",
    email: "emily@company.co",
    plan: "Pro",
    status: "canceled",
    startDate: "2023-03-22",
    amount: "$19.99",
    nextBilling: "—"
  },
  {
    id: "SUB-1238",
    customer: "Michael Wilson",
    email: "michael@example.org",
    plan: "Basic",
    status: "active",
    startDate: "2023-07-10",
    amount: "$9.99",
    nextBilling: "2023-10-10"
  },
  {
    id: "SUB-1239",
    customer: "Sarah Brown",
    email: "sarah@brown.net",
    plan: "Enterprise",
    status: "pending",
    startDate: "2023-07-29",
    amount: "$49.99",
    nextBilling: "2023-10-29"
  },
  {
    id: "SUB-1240",
    customer: "David Miller",
    email: "david@millercorp.com",
    plan: "Pro",
    status: "active",
    startDate: "2023-02-15",
    amount: "$19.99",
    nextBilling: "2023-08-15"
  },
  {
    id: "SUB-1241",
    customer: "Lisa Taylor",
    email: "lisa@taylor.io",
    plan: "Basic",
    status: "expiring",
    startDate: "2023-06-28",
    amount: "$9.99",
    nextBilling: "2023-08-02"
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-700 border-green-200";
    case "canceled":
      return "bg-red-50 text-red-700 border-red-200";
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "expiring":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
