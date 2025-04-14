import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileCheck } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
const submissions = [
  {
    id: "1",
    petitionNumber: "PTN000012024",
    petitionerName: "Rajesh Kumar",
    submissionDate: "18-04-2024",
    status: "Decision Made",
    recommendation: "Action Required",
    decision: "Approved"
  },
  {
    id: "2",
    petitionNumber: "PTN000022024",
    petitionerName: "Priya Sharma",
    submissionDate: "17-04-2024",
    status: "Decision Made",
    recommendation: "No Action Required",
    decision: "Rejected"
  },
  {
    id: "3",
    petitionNumber: "PTN000032024",
    petitionerName: "Suresh Reddy",
    submissionDate: "16-04-2024",
    status: "Under Review",
    recommendation: "Action Required",
    decision: "Pending"
  }
];

const Submissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("all");

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDecision = decisionFilter === "all" || submission.decision.toLowerCase() === decisionFilter.toLowerCase();
    
    return matchesSearch && matchesDecision;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Submissions"
        description="View your submitted investigation reports and their status"
      />

      <Card>
        <CardHeader>
          <CardTitle>Submitted Reports</CardTitle>
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
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                <div>Petition Number</div>
                <div>Petitioner</div>
                <div>Submission Date</div>
                <div>Recommendation</div>
                <div>Decision</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                    <div className="font-medium">{submission.petitionNumber}</div>
                    <div>{submission.petitionerName}</div>
                    <div>{submission.submissionDate}</div>
                    <div>{submission.recommendation}</div>
                    <div>
                      <StatusBadge status={submission.status} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link to={`/officer/submissions/${submission.id}`}>
                        <Button variant="ghost" size="sm">
                          View Report
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
    </div>
  );
};

export default Submissions; 