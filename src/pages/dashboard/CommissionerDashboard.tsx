import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, UserCheck, BarChart2 } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import StatusBadge from "@/components/common/StatusBadge";
import { reviewDecisions } from "@/pages/commissioner/ReviewDecisions";
import Analytics from "@/pages/commissioner/Analytics";
import { COMMISSIONER_NAME } from "@/lib/constants";

// Mock data - would be fetched from API in a real app
const pendingPetitions = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Rajesh Kumar",
    date: "15-04-2024",
    status: "Pending",
    timeBound: "Priority",
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Priya Sharma",
    date: "14-04-2024",
    status: "Pending",
    timeBound: "Normal",
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Suresh Reddy",
    date: "13-04-2024",
    status: "Pending",
    timeBound: "Immediate",
  },
];

const assignedPetitions = [
  {
    id: "4",
    petitionNumber: "PTN00004/2025",
    petitionerName: "Lakshmi Devi",
    date: "12-04-2024",
    status: "Assigned",
    assignedTo: ["Sujeeth", "Bachi reddy"],
    timeBound: "Priority",
  },
  {
    id: "5",
    petitionNumber: "PTN00005/2025",
    petitionerName: "Ravi Reddy",
    date: "11-04-2024",
    status: "Under Investigation",
    assignedTo: ["Sujeeth", "Bachi reddy", "Tirumalesh"],
    timeBound: "Normal",
  },
];

const decidedPetitions = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Lakshmi Devi",
    submissionDate: "12-04-2024",
    decisionDate: "18-04-2024",
    status: "Decision Made" as const,
    decisionStatus: "Approved",
    finalDecision: "After careful consideration, the petition is approved. The respondent is ordered to remove the encroachment within 15 days.",
    type: "Road Encroachment",
    zone: "Hyderabad West - Gachibowli"
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Ravi Reddy",
    submissionDate: "11-04-2024",
    decisionDate: "17-04-2024",
    status: "Decision Made" as const,
    decisionStatus: "Denied",
    finalDecision: "Based on the investigation report, the petition is denied as the complaint was found to be invalid.",
    type: "Footpath Encroachment",
    zone: "Hyderabad East - Uppal"
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Mohammed Ali",
    submissionDate: "10-04-2024",
    decisionDate: "16-04-2024",
    status: "Decision Made" as const,
    decisionStatus: "Partially Approved",
    finalDecision: "The petition is partially approved. The respondent must remove the encroachment but is granted a 30-day extension.",
    type: "Public Land Encroachment",
    zone: "Hyderabad Central - Begumpet"
  }
];

const CommissionerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [decidedPetitions, setDecidedPetitions] = useState(reviewDecisions);

  useEffect(() => {
    // Update local state when reviewDecisions changes
    setDecidedPetitions(reviewDecisions);
  }, [reviewDecisions]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${COMMISSIONER_NAME} Dashboard`}
        description="Manage petitions and assign enquiry officers"
        showLogo={true}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Assignments"
          value={pendingPetitions.length}
          icon={<Clock className="h-4 w-4" />}
          trend="up"
          trendValue="2 new today"
          variant="pending"
        />
        <StatCard
          title="Under Investigation"
          value={assignedPetitions.length}
          icon={<UserCheck className="h-4 w-4" />}
          trend="neutral"
          trendValue="3 awaiting reports"
          variant="info"
        />
        <StatCard
          title="Decisions Made"
          value={decidedPetitions.length}
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
          trendValue="5 this month"
          variant="complete"
        />
        <StatCard
          title="Total Officers"
          value="12"
          icon={<FileText className="h-4 w-4" />}
          trend="neutral"
          trendValue="Current workforce"
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Assignment</TabsTrigger>
          <TabsTrigger value="assigned">Under Investigation</TabsTrigger>
          <TabsTrigger value="decided">Decisions Made</TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
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
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {pendingPetitions
                      .filter((p) => p.timeBound === "Priority")
                      .map((petition) => (
                        <div key={petition.id} className="grid grid-cols-1 md:grid-cols-5 p-3 items-center">
                          <div className="font-medium">{petition.petitionNumber}</div>
                          <div>{petition.petitionerName}</div>
                          <div>{petition.date}</div>
                          <div>
                            <StatusBadge status={petition.status as any} />
                          </div>
                          <div className="flex justify-end">
                            <Link to={`/commissioner/pending/${petition.id}`}>
                              <Button variant="outline" size="sm">
                                Assign
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...pendingPetitions, ...assignedPetitions]
                  .slice(0, 3)
                  .map((petition) => (
                    <Card key={petition.id} className={petition.status === "Pending" ? "border-yellow-200" : "border-blue-200"}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{petition.petitionNumber}</span>
                            <StatusBadge status={petition.status as any} />
                          </div>
                          <div className="text-sm">{petition.petitionerName}</div>
                          <div className="text-xs text-muted-foreground">
                            {petition.date} • {petition.timeBound}
                          </div>
                          {petition.status === "Pending" ? (
                            <div className="pt-2">
                              <Link to={`/commissioner/pending/${petition.id}`}>
                                <Button variant="outline" size="sm" className="w-full">
                                  Assign Officers
                                </Button>
                              </Link>
                            </div>
                          ) : (
                            <div className="pt-2">
                              <Link to={`/commissioner/assigned/${petition.id}`}>
                                <Button variant="outline" size="sm" className="w-full">
                                  Review Status
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Petitions Awaiting Assignment</CardTitle>
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
                  {pendingPetitions.map((petition) => (
                    <div key={petition.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                      <div className="font-medium">{petition.petitionNumber}</div>
                      <div>{petition.petitionerName}</div>
                      <div>{petition.date}</div>
                      <div>
                        <StatusBadge status={petition.status as any} />
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
                        <Link to={`/commissioner/pending/${petition.id}`}>
                          <Button size="sm">
                            Assign
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
        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Petitions Under Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                  <div>Petition Number</div>
                  <div>Petitioner</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Assigned To</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {assignedPetitions.map((petition) => (
                    <div key={petition.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                      <div className="font-medium">{petition.petitionNumber}</div>
                      <div>{petition.petitionerName}</div>
                      <div>{petition.date}</div>
                      <div>
                        <StatusBadge status={petition.status as any} />
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          {petition.assignedTo.map((officer, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full text-xs">
                              {officer}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link to={`/commissioner/assigned/${petition.id}`}>
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
        <TabsContent value="decided" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Decided Petitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                  <div>Petition Number</div>
                  <div>Petitioner</div>
                  <div>Decision Date</div>
                  <div>Status</div>
                  <div>Decision</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {decidedPetitions.map((petition) => (
                    <div key={petition.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                      <div className="font-medium">{petition.petitionNumber}</div>
                      <div>{petition.petitionerName}</div>
                      <div>{petition.decisionDate}</div>
                      <div>
                        <StatusBadge status={petition.status as any} />
                      </div>
                      <div>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            petition.decisionStatus === "Approved" 
                              ? "bg-green-100 text-green-800" 
                              : petition.decisionStatus === "Denied"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {petition.decisionStatus}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <Link to={`/commissioner/review-decisions/${petition.id}?readonly=true`}>
                          <Button variant="outline" size="sm">
                            View Details
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
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionerDashboard;
