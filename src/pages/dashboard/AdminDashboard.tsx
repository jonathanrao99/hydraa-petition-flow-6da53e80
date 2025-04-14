
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Settings, Database, Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";

// Mock data - would be fetched from API in a real app
const recentUsers = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "EMP001",
    designation: "DCP",
    role: "Reception",
    email: "reception@hydraa.gov.in",
  },
  {
    id: "2",
    name: "Jane Smith",
    employeeId: "EMP002",
    designation: "ACP",
    role: "EnquiryOfficer",
    email: "officer@hydraa.gov.in",
  },
  {
    id: "3",
    name: "Michael Brown",
    employeeId: "EMP003",
    designation: "DCP",
    role: "HOD",
    email: "commissioner@hydraa.gov.in",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System administration and user management"
        action={
          <Link to="/admin/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="24"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="2 added this month"
        />
        <StatCard
          title="Total Petitions"
          value="342"
          icon={<FileText className="h-4 w-4" />}
          trend="up"
          trendValue="42 this month"
        />
        <StatCard
          title="Database Size"
          value="1.2 GB"
          icon={<Database className="h-4 w-4" />}
          trend="up"
          trendValue="0.2 GB increase"
        />
        <StatCard
          title="System Status"
          value="Healthy"
          icon={<Settings className="h-4 w-4" />}
          trend="neutral"
          trendValue="All systems operational"
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">User Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Reception Staff</span>
                        <span className="font-medium">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enquiry Officers</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commissioners</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Administrators</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Petition Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Pending</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assigned</span>
                        <span className="font-medium">87</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Under Investigation</span>
                        <span className="font-medium">132</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Made</span>
                        <span className="font-medium">78</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-5 p-3 font-medium">
                  <div>Employee ID</div>
                  <div>Name</div>
                  <div>Role</div>
                  <div>Designation</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-1 md:grid-cols-5 p-3 items-center">
                      <div className="font-medium">{user.employeeId}</div>
                      <div>{user.name}</div>
                      <div>{user.role}</div>
                      <div>{user.designation}</div>
                      <div className="flex justify-end">
                        <Link to={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/users/${user.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Link to="/admin/users/new">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                  <div>Employee ID</div>
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Designation</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                      <div className="font-medium">{user.employeeId}</div>
                      <div>{user.name}</div>
                      <div className="truncate max-w-[150px]">{user.email}</div>
                      <div>{user.role}</div>
                      <div>{user.designation}</div>
                      <div className="flex justify-end">
                        <Link to={`/admin/users/${user.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link to={`/admin/users/${user.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Database Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Database Size</span>
                          <span className="font-medium">1.2 GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Backup</span>
                          <span className="font-medium">15-04-2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Records</span>
                          <span className="font-medium">12,485</span>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Backup Database
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Uptime</span>
                          <span className="font-medium">23 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Response Time</span>
                          <span className="font-medium">245 ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Server Load</span>
                          <span className="font-medium">28%</span>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            View System Logs
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
