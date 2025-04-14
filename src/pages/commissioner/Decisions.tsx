import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
const pendingDecisions = [
  {
    id: "1",
    petitionNumber: "PTN000042024",
    petitionerName: "Lakshmi Devi",
    submissionDate: "18-04-2024",
    status: "Under Investigation",
    officerRecommendation: "Action Required",
    assignedOfficers: ["Jane Smith", "Rao Kumar"],
    evidenceCount: 5
  },
  {
    id: "2",
    petitionNumber: "PTN000052024",
    petitionerName: "Ravi Reddy",
    submissionDate: "17-04-2024",
    status: "Under Investigation",
    officerRecommendation: "No Action Required",
    assignedOfficers: ["Anjali Sharma"],
    evidenceCount: 3
  },
  {
    id: "3",
    petitionNumber: "PTN000062024",
    petitionerName: "Mohammed Ali",
    submissionDate: "16-04-2024",
    status: "Under Investigation",
    officerRecommendation: "Action Required",
    assignedOfficers: ["Jane Smith"],
    evidenceCount: 7
  }
];

const Decisions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendationFilter, setRecommendationFilter] = useState("all");

  const filteredPetitions = pendingDecisions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRecommendation = recommendationFilter === "all" || 
      petition.officerRecommendation.toLowerCase() === recommendationFilter.toLowerCase();
    
    return matchesSearch && matchesRecommendation;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Final Decisions"
        description="Review investigation reports and make final decisions on petitions"
      />

      <Card>
        <CardHeader>
          <CardTitle>Pending Decisions</CardTitle>
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
                value={recommendationFilter}
                onValueChange={setRecommendationFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recommendations</SelectItem>
                  <SelectItem value="action required">Action Required</SelectItem>
                  <SelectItem value="no action required">No Action Required</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-7 p-3 font-medium">
                <div>Petition Number</div>
                <div>Petitioner</div>
                <div>Submission Date</div>
                <div>Assigned Officers</div>
                <div>Evidence</div>
                <div>Recommendation</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredPetitions.map((petition) => (
                  <div key={petition.id} className="grid grid-cols-1 md:grid-cols-7 p-3 items-center">
                    <div className="font-medium">{petition.petitionNumber}</div>
                    <div>{petition.petitionerName}</div>
                    <div>{petition.submissionDate}</div>
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {petition.assignedOfficers.map((officer, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {officer}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {petition.evidenceCount} items
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          petition.officerRecommendation === "Action Required"
                            ? "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                            : "bg-green-50 text-green-800 ring-1 ring-inset ring-green-600/20"
                        }`}
                      >
                        {petition.officerRecommendation}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link to={`/commissioner/decisions/${petition.id}`}>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = `/commissioner/decisions/${petition.id}/make-decision`}
                      >
                        Make Decision
                      </Button>
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

export default Decisions; 