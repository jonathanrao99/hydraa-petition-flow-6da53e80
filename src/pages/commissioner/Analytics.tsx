
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Filter } from "lucide-react";

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
                  <Line type="monotone" dataKey="pending" stroke="#F97316" name="Pending Petitions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-purple-50">
            <CardHeader>
              <CardTitle className="text-center text-purple-800">Total Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-center text-purple-700">285</div>
              <div className="text-center text-purple-600 mt-2">+15% from last period</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Resolved Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-center text-green-700">204</div>
              <div className="text-center text-green-600 mt-2">71.5% resolution rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50">
            <CardHeader>
              <CardTitle className="text-center text-orange-800">Pending Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-center text-orange-700">81</div>
              <div className="text-center text-orange-600 mt-2">Average age: 12 days</div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="decisions" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Decision Outcome Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
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
                      <Cell fill="#10B981" /> {/* Green */}
                      <Cell fill="#8B5CF6" /> {/* Purple */}
                      <Cell fill="#F97316" /> {/* Orange */}
                    </Pie>
                    <Tooltip content={customTooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decision Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Average Decision Time</h3>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0 days</span>
                    <span className="font-medium">8.2 days</span>
                    <span>15 days</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Decision Clarity Index</h3>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Low</span>
                    <span className="font-medium">8.5/10</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Officer Assignment Efficiency</h3>
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Low</span>
                    <span className="font-medium">7.8/10</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Decision Outcome by Encroachment Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={petitionsByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip content={customTooltip} />
                  <Legend />
                  <Bar dataKey="value" stackId="a" fill="#10B981" name="Approved" />
                  <Bar dataKey="value" stackId="a" fill="#F97316" name="Denied" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Analytics;
