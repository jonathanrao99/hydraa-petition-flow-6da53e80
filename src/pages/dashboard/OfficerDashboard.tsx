import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, AlertTriangle, Bell, Search } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import NotificationService from "@/services/notificationService";
import { COMMISSIONER_NAME } from "@/lib/constants";

// Define the Petition type
type Petition = {
  id: string;
  petitionNumber: string;
  petitionerName: string;
  petitionerPhone: string;
  petitionerAddress: string;
  type: string;
  zone: string;
  subject: string;
  complaintDetails: string;
  respondentName: string;
  respondentAddress: string;
  respondentPhone: string;
  encroachmentAddress: string;
  initialRemark: string;
  investigationReport: string;
  officerRecommendation: string;
  finalDecision: string;
  decisionStatus: string;
  submissionDate: string;
  assignedDate: string;
  timeBound: string;
  instructions: string;
};

// Mock data for assigned petitions
const mockAssignedPetitions: Petition[] = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Rajesh Kumar",
    petitionerPhone: "9876543210",
    petitionerAddress: "4-5-6, Banjara Hills, Hyderabad",
    type: "General",
    zone: "Gachibowli, West",
    subject: "Encroachment of public road",
    complaintDetails: "Encroachment of public road by neighboring property owner, causing traffic issues and blocking access to my property.",
    respondentName: "Venkat",
    respondentAddress: "4-5-7, Banjara Hills, Hyderabad",
    respondentPhone: "9876543211",
    encroachmentAddress: "4-5-7, Banjara Hills, Hyderabad",
    initialRemark: "Petitioner has provided photographic evidence of encroachment.",
    investigationReport: "",
    officerRecommendation: "",
    finalDecision: "",
    decisionStatus: "Under Investigation",
    submissionDate: "15-04-2024",
    assignedDate: "16-04-2024",
    timeBound: "Priority",
    instructions: "Please investigate the encroachment and submit a detailed report with photographic evidence.",
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Priya Sharma",
    petitionerPhone: "9876543212",
    petitionerAddress: "7-8-9, Jubilee Hills, Hyderabad",
    type: "Noise Complaint",
    zone: "Jubilee Hills, West",
    subject: "Excessive noise from construction site",
    complaintDetails: "Construction work is being carried out beyond permitted hours, causing disturbance to residents.",
    respondentName: "ABC Construction",
    respondentAddress: "7-8-10, Jubilee Hills, Hyderabad",
    respondentPhone: "9876543213",
    encroachmentAddress: "7-8-10, Jubilee Hills, Hyderabad",
    initialRemark: "Multiple complaints received from residents in the area.",
    investigationReport: "",
    officerRecommendation: "",
    finalDecision: "",
    decisionStatus: "Under Investigation",
    submissionDate: "16-04-2024",
    assignedDate: "17-04-2024",
    timeBound: "Immediate",
    instructions: "Visit the site during evening hours and verify the complaint. Check for any permits and their validity.",
  },
];

const OfficerDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [assignedPetitions, setAssignedPetitions] = useState<Petition[]>(mockAssignedPetitions);

  // Mock current officer ID - in a real app, this would come from authentication
  const currentOfficerId = "Jane/ACP";

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationService = NotificationService.getInstance();
      const userNotifications = notificationService.getNotifications(currentOfficerId);
      setNotifications(userNotifications);
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification: any) => {
    const notificationService = NotificationService.getInstance();
    notificationService.markAsRead(notification.id, currentOfficerId);
    setNotifications(notifications.filter(n => n.id !== notification.id));
    toast({
      title: "Notification",
      description: `Petition ${notification.petitionNumber} assigned to you`,
    });
  };

  const handleSubmitReport = async (petition: Petition) => {
    const notificationService = NotificationService.getInstance();
    
    // Send notification about investigation completion
    await notificationService.sendNotification({
      type: "investigation_completed",
      priority: "high",
      title: "Investigation Report Submitted",
      message: `Investigation report has been submitted for petition ${petition.petitionNumber}`,
      petitionId: petition.id,
      petitionNumber: petition.petitionNumber,
      recipients: [
        {
          userId: "commissioner",
          email: "commissioner@hydraa.gov",
          name: COMMISSIONER_NAME,
        },
      ],
    });

    toast({
      title: "Report Submitted",
      description: "Your investigation report has been submitted successfully",
    });
  };

  const filteredPetitions = assignedPetitions.filter(petition => {
    const searchLower = searchTerm.toLowerCase();
    return (
      petition.petitionNumber.toLowerCase().includes(searchLower) ||
      petition.petitionerName.toLowerCase().includes(searchLower) ||
      petition.subject.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiry Officer Dashboard"
        description="View and respond to assigned petitions"
      />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Officer Dashboard</h1>
        <div className="relative">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {notifications.length}
              </Badge>
            )}
          </Button>
          {notifications.length > 0 && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg p-2 z-10">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{notification.petitionNumber}</div>
                    <Badge variant={notification.timeBound === "Priority" ? "destructive" : "default"}>
                      {notification.timeBound}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {notification.petitionerName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search petitions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Assigned to You"
          value="15"
          icon={<FileText className="h-4 w-4" />}
          trend="up"
          trendValue="3 new this week"
          variant="info"
        />
        <StatCard
          title="Pending Investigation"
          value="8"
          icon={<Clock className="h-4 w-4" />}
          trend="neutral"
          trendValue="2 require immediate attention"
          variant="pending"
        />
        <StatCard
          title="Completed"
          value="7"
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
          trendValue="5 this month"
          variant="success"
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Petitions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Priority Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-5 p-3 font-medium">
                    <div>Petition</div>
                    <div>Petitioner</div>
                    <div>Date</div>
                    <div>Time Bound</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {assignedPetitions
                      .filter((p) => p.timeBound === "Priority" || p.timeBound === "Immediate")
                      .map((petition) => (
                        <div key={petition.id} className="grid grid-cols-1 md:grid-cols-5 p-3 items-center">
                          <div className="font-medium">{petition.petitionNumber}</div>
                          <div>{petition.petitionerName}</div>
                          <div>{petition.submissionDate}</div>
                          <div>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                petition.timeBound === "Priority" 
                                  ? "bg-red-100 text-red-800" 
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {petition.timeBound}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <Link to={`/officer/assigned/${petition.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {assignedPetitions.map((petition) => (
                    <Card key={petition.id} className={
                      petition.timeBound === "Priority" 
                        ? "border-red-200 bg-red-50" 
                        : petition.timeBound === "Immediate"
                          ? "border-orange-200 bg-orange-50"
                          : ""
                    }>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{petition.petitionNumber}</span>
                            <StatusBadge status={petition.decisionStatus as any} />
                          </div>
                          <div className="text-sm">{petition.petitionerName}</div>
                          <div className="text-xs text-muted-foreground">
                            {petition.submissionDate} • {petition.timeBound}
                          </div>
                          <div className="pt-2">
                            <Link to={`/officer/assigned/${petition.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                Review Petition
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Assigned Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                  <div>Petition Number</div>
                  <div>Petitioner</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Time Bound</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredPetitions.map((petition) => (
                    <div key={petition.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                      <div className="font-medium">{petition.petitionNumber}</div>
                      <div>{petition.petitionerName}</div>
                      <div>{petition.submissionDate}</div>
                      <div>
                        <StatusBadge status={petition.decisionStatus as any} />
                      </div>
                      <div>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            petition.timeBound === "Priority" 
                              ? "bg-red-100 text-red-800" 
                              : petition.timeBound === "Immediate"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {petition.timeBound}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Link to={`/officer/assigned/${petition.id}`}>
                          <Button variant="outline" size="sm">
                            View
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
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPetitions.map((petition) => (
          <Card key={petition.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{petition.petitionNumber}</span>
                <StatusBadge status={petition.decisionStatus as any} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Petitioner:</span>
                  <p className="font-medium">{petition.petitionerName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Subject:</span>
                  <p className="font-medium">{petition.subject}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Zone:</span>
                  <p className="font-medium">{petition.zone}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Time Bound:</span>
                  <Badge variant={petition.timeBound === "Priority" ? "destructive" : "default"}>
                    {petition.timeBound}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" onClick={() => handleSubmitReport(petition)}>
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfficerDashboard;
