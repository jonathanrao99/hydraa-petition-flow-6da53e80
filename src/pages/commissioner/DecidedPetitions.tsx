import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileText } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
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

const DecidedPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const navigate = useNavigate();

  const filteredPetitions = decidedPetitions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDecision = decisionFilter === "all" || 
      petition.decisionStatus.toLowerCase() === decisionFilter.toLowerCase();
    
    return matchesSearch && matchesDecision;
  });

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
        title="Decided Petitions"
        description="View all petitions that have been decided by the commissioner"
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

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-7 p-3 font-medium">
                <div>Petition Number</div>
                <div>Petitioner</div>
                <div>Decision Date</div>
                <div>Type</div>
                <div>Zone</div>
                <div>Decision</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredPetitions.map((petition) => (
                  <div key={petition.id} className="grid grid-cols-1 md:grid-cols-7 p-3 items-center">
                    <div className="font-medium">{petition.petitionNumber}</div>
                    <div>{petition.petitionerName}</div>
                    <div>{petition.decisionDate}</div>
                    <div>{petition.type}</div>
                    <div>{petition.zone}</div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getDecisionStatusColor(petition.decisionStatus)}`}>
                        {petition.decisionStatus}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/commissioner/decisions/${petition.id}/review`)}
                      >
                        View Details
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

export default DecidedPetitions; 