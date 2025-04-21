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
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Filter, TrendingUp, AlertTriangle, Clock, CheckCircle } from "lucide-react";

// Mock data - would be replaced with actual data from API
const petitionsByType = [
  { name: "Road Encroachment", value: 35 },
  { name: "Footpath Encroachment", value: 28 },
  { name: "Park Encroachment", value: 17 },
  { name: "Lake Encroachment", value: 22 },
  { name: "Govt Land Encroachment", value: 30 },
  { name: "FTL Encroachment", value: 15 },
  { name: "Buffer Zone Encroachment", value: 12 },
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

// Additional mock data for tables
const topOfficers = [
  { name: "Sujeeth", petitionsHandled: 45, avgResolutionTime: "5.2 days", successRate: "92%" },
  { name: "Bachi Reddy", petitionsHandled: 38, avgResolutionTime: "6.1 days", successRate: "88%" },
  { name: "Tirumalesh", petitionsHandled: 32, avgResolutionTime: "7.3 days", successRate: "85%" },
  { name: "Aditya", petitionsHandled: 28, avgResolutionTime: "8.5 days", successRate: "82%" },
  { name: "Naresh", petitionsHandled: 25, avgResolutionTime: "9.2 days", successRate: "80%" },
];

const priorityPetitions = [
  { id: "PTN00045", type: "Road Encroachment", zone: "Hyderabad West", daysPending: 2, assignedTo: "Jane Smith" },
  { id: "PTN00032", type: "Lake Encroachment", zone: "Hyderabad East", daysPending: 3, assignedTo: "Rao Kumar" },
  { id: "PTN00067", type: "Public Land", zone: "Hyderabad Central", daysPending: 1, assignedTo: "Anjali Sharma" },
  { id: "PTN00089", type: "Buffer Zone", zone: "Cyberabad", daysPending: 4, assignedTo: "Suresh Reddy" },
  { id: "PTN00012", type: "FTL Encroachment", zone: "Rachakonda", daysPending: 2, assignedTo: "Priya Patel" },
];

const keyMetrics = [
  { title: "Total Petitions", value: "285", trend: "+15%", icon: TrendingUp, color: "text-purple-600" },
  { title: "Pending Petitions", value: "81", trend: "-8%", icon: AlertTriangle, color: "text-orange-600" },
  { title: "Avg Resolution Time", value: "8.2 days", trend: "-12%", icon: Clock, color: "text-blue-600" },
  { title: "Success Rate", value: "85%", trend: "+5%", icon: CheckCircle, color: "text-green-600" },
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
        title="Analytics Dashboard"
        description="Comprehensive analysis of petitions and decisions"
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
            <TabsTrigger value="petitions" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Petition Trends
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Decision Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Petitions by Encroachment Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={petitionsByType} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip content={customTooltip} />
                        <Legend />
                        <Bar dataKey="value" fill="#8B5CF6" name="Petitions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Petitions by Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={petitionsByZone}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {petitionsByZone.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={customTooltip} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="petitions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Petition Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPetitions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={customTooltip} />
                      <Legend />
                      <Line type="monotone" dataKey="new" stroke="#8B5CF6" activeDot={{ r: 8 }} name="New Petitions" />
                      <Line type="monotone" dataKey="closed" stroke="#10B981" name="Closed Petitions" />
                      <Line type="monotone" dataKey="pending" stroke="#F59E0B" name="Pending Petitions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decisions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Decision Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={decisionStats}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {decisionStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={customTooltip} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Findings and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <TableCell className="font-medium">{officer.name}</TableCell>
                    <TableCell>{officer.petitionsHandled}</TableCell>
                    <TableCell>{officer.avgResolutionTime}</TableCell>
                    <TableCell>{officer.successRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Petitions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Petition ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Days Pending</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priorityPetitions.map((petition, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{petition.id}</TableCell>
                    <TableCell>{petition.type}</TableCell>
                    <TableCell>{petition.zone}</TableCell>
                    <TableCell>{petition.daysPending}</TableCell>
                    <TableCell>{petition.assignedTo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Improved Resolution Times</h4>
                <p className="text-sm text-muted-foreground">
                  Average resolution time has decreased by 12% compared to last quarter, indicating improved efficiency in handling petitions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Increased Petition Volume</h4>
                <p className="text-sm text-muted-foreground">
                  Total petitions have increased by 15% this quarter, with a particular rise in Road Encroachment cases.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-orange-100">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">Pending Petitions</h4>
                <p className="text-sm text-muted-foreground">
                  While pending petitions have decreased by 8%, there are still 81 cases requiring immediate attention.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
