import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
export let reviewDecisions = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Lakshmi Devi",
    submissionDate: "12-04-2024",
    decisionDate: "18-04-2024",
    status: "Decision Made",
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
    status: "Decision Made",
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
    status: "Decision Made",
    decisionStatus: "Partially Approved",
    finalDecision: "The petition is partially approved. The respondent must remove the encroachment but is granted a 30-day extension.",
    type: "Public Land Encroachment",
    zone: "Hyderabad Central - Begumpet"
  }
];

const ReviewDecisions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const [decisions, setDecisions] = useState(reviewDecisions);
  const navigate = useNavigate();

  useEffect(() => {
    // Update local state when reviewDecisions changes
    setDecisions(reviewDecisions);
  }, [reviewDecisions]);

  const filteredDecisions = decisions.filter(decision => {
    const matchesSearch = 
      decision.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decision.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDecision = decisionFilter === "all" || 
      decision.decisionStatus.toLowerCase() === decisionFilter.toLowerCase();
    
    return matchesSearch && matchesDecision;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Denied":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Partially Approved":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getDecisionStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Denied":
        return "bg-red-100 text-red-800";
      case "Partially Approved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Decisions"
        description="View all decisions made on petitions"
      />

      <Card>
        <CardHeader>
          <CardTitle>Decision History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by petition number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={decisionFilter}
                onValueChange={setDecisionFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="partially approved">Partially Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredDecisions.map((decision) => (
                <Card key={decision.id}>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Petition Number</p>
                        <p className="font-medium">{decision.petitionNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Petitioner</p>
                        <p className="font-medium">{decision.petitionerName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Submission Date</p>
                        <p className="font-medium">{decision.submissionDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Decision Date</p>
                        <p className="font-medium">{decision.decisionDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(decision.status)}
                          <span className={`font-medium ${getDecisionStatusColor(decision.status)} px-2 py-1 rounded-full`}>
                            {decision.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Decision Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(decision.decisionStatus)}
                          <span className={`font-medium ${getDecisionStatusColor(decision.decisionStatus)} px-2 py-1 rounded-full`}>
                            {decision.decisionStatus}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{decision.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Zone</p>
                        <p className="font-medium">{decision.zone}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/commissioner/review-decisions/${decision.id}?readonly=true`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDecisions; 