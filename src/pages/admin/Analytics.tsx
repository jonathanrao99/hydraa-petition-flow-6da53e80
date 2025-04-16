import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/common/PageHeader";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, 
  Filter, TrendingUp, AlertTriangle, Clock, CheckCircle, Users, 
  FileText, Shield, Activity, Building2, UserCheck, Calendar
} from "lucide-react";

// Mock data - would be replaced with actual data from API
const petitionsByType = [
  { name: "Park Encroachment", value: 35 },
  { name: "Nala Encroachment", value: 28 },
  { name: "Lake Encroachment", value: 17 },
  { name: "Government Land Encroachment", value: 22 },
  { name: "Open Space Encroachment", value: 30 },
  { name: "FTL Encroachment", value: 15 },
  { name: "Buffer Zone Encroachment", value: 12 },
  { name: "Road Encroachment", value: 25 },
  { name: "Unauthorized Construction", value: 20 },
  { name: "Layout Violation", value: 18 },
  { name: "Footpath Encroachment", value: 23 },
  { name: "Other", value: 10 },
];

const petitionsByZone = [
  { name: "Hyderabad North", value: 45 },
  { name: "Hyderabad South", value: 38 },
  { name: "Hyderabad East", value: 27 },
  { name: "Hyderabad West", value: 35 },
  { name: "Hyderabad Central", value: 42 },
  { name: "Cyberabad", value: 50 },
  { name: "Rachakonda", value: 33 },
];

const monthlyPetitions = [
  { name: "Jan", new: 15, closed: 10, pending: 5 },
  { name: "Feb", new: 20, closed: 12, pending: 8 },
  { name: "Mar", new: 25, closed: 18, pending: 7 },
  { name: "Apr", new: 18, closed: 15, pending: 3 },
  { name: "May", new: 22, closed: 19, pending: 3 },
  { name: "Jun", new: 30, closed: 22, pending: 8 },
  { name: "Jul", new: 35, closed: 28, pending: 7 },
  { name: "Aug", new: 28, closed: 23, pending: 5 },
  { name: "Sep", new: 25, closed: 20, pending: 5 },
  { name: "Oct", new: 32, closed: 26, pending: 6 },
  { name: "Nov", new: 22, closed: 18, pending: 4 },
  { name: "Dec", new: 18, closed: 15, pending: 3 },
];

const decisionStats = [
  { name: "Approved", value: 55 },
  { name: "Partially Approved", value: 25 },
  { name: "Denied", value: 20 },
];

const COLORS = [
  "#8B5CF6", // Purple
  "#0EA5E9", // Blue
  "#F97316", // Orange
  "#D946EF", // Pink
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
];

// Additional mock data for admin-specific metrics
const userActivity = [
  { name: "Reception", activeUsers: 8, totalActions: 120, avgResponseTime: "2.5h" },
  { name: "Enquiry Officers", activeUsers: 15, totalActions: 250, avgResponseTime: "4.2h" },
  { name: "HODs", activeUsers: 5, totalActions: 80, avgResponseTime: "6.1h" },
  { name: "Commissioners", activeUsers: 3, totalActions: 45, avgResponseTime: "8.3h" },
];

const systemMetrics = [
  { name: "System Uptime", value: "99.9%", trend: "+0.1%", icon: Activity, color: "text-green-600" },
  { name: "API Response Time", value: "120ms", trend: "-15%", icon: Clock, color: "text-blue-600" },
  { name: "Storage Usage", value: "65%", trend: "+5%", icon: FileText, color: "text-orange-600" },
  { name: "Active Sessions", value: "42", trend: "+8%", icon: Users, color: "text-purple-600" },
];

const keyMetrics = [
  { title: "Total Petitions", value: "285", trend: "+15%", icon: FileText, color: "text-purple-600" },
  { title: "Active Users", value: "31", trend: "+8%", icon: Users, color: "text-blue-600" },
  { title: "System Health", value: "99.9%", trend: "+0.1%", icon: Activity, color: "text-green-600" },
  { title: "Avg Resolution Time", value: "8.2 days", trend: "-12%", icon: Clock, color: "text-orange-600" },
];

const topOfficers = [
  { name: "Jane Smith", petitionsHandled: 45, avgResolutionTime: "5.2 days", successRate: "92%" },
  { name: "Rao Kumar", petitionsHandled: 38, avgResolutionTime: "6.1 days", successRate: "88%" },
  { name: "Anjali Sharma", petitionsHandled: 32, avgResolutionTime: "7.3 days", successRate: "85%" },
  { name: "Suresh Reddy", petitionsHandled: 28, avgResolutionTime: "8.5 days", successRate: "82%" },
  { name: "Priya Patel", petitionsHandled: 25, avgResolutionTime: "9.2 days", successRate: "80%" },
];

const priorityPetitions = [
  { id: "PTN00045", type: "Road Encroachment", zone: "Hyderabad West", daysPending: 2, assignedTo: "Jane Smith" },
  { id: "PTN00032", type: "Lake Encroachment", zone: "Hyderabad East", daysPending: 3, assignedTo: "Rao Kumar" },
  { id: "PTN00067", type: "Public Land", zone: "Hyderabad Central", daysPending: 1, assignedTo: "Anjali Sharma" },
  { id: "PTN00089", type: "Buffer Zone", zone: "Cyberabad", daysPending: 4, assignedTo: "Suresh Reddy" },
  { id: "PTN00012", type: "FTL Encroachment", zone: "Rachakonda", daysPending: 2, assignedTo: "Priya Patel" },
];

const Analytics = () => {
  const [period, setPeriod] = useState("year");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Custom tooltip formatting
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white shadow-lg rounded-md border">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Analytics Dashboard"
        description="Comprehensive system analytics and performance metrics"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className={`text-sm font-medium ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${metric.color.replace('text-', 'bg-')}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Activity
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Health
            </TabsTrigger>
            <TabsTrigger value="petitions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Petition Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity by Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userActivity} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip content={customTooltip} />
                        <Legend />
                        <Bar dataKey="activeUsers" fill="#8B5CF6" name="Active Users" />
                        <Bar dataKey="totalActions" fill="#0EA5E9" name="Total Actions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <metric.icon className={`h-4 w-4 ${metric.color}`} />
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{metric.value}</span>
                          <span className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>Total Actions</TableHead>
                      <TableHead>Avg Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{activity.activeUsers}</TableCell>
                        <TableCell>{activity.totalActions}</TableCell>
                        <TableCell>{activity.avgResponseTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <metric.icon className={`h-4 w-4 ${metric.color}`} />
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{metric.value}</span>
                          <span className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Usage Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyPetitions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={customTooltip} />
                        <Legend />
                        <Line type="monotone" dataKey="new" stroke="#8B5CF6" name="New Petitions" />
                        <Line type="monotone" dataKey="closed" stroke="#10B981" name="Closed Petitions" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="petitions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Petitions by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={petitionsByType}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {petitionsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={customTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Officers</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Officer</TableHead>
                        <TableHead>Petitions Handled</TableHead>
                        <TableHead>Avg Resolution Time</TableHead>
                        <TableHead>Success Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topOfficers.map((officer, index) => (
                        <TableRow key={index}>
                          <TableCell>{officer.name}</TableCell>
                          <TableCell>{officer.petitionsHandled}</TableCell>
                          <TableCell>{officer.avgResolutionTime}</TableCell>
                          <TableCell>{officer.successRate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics; 