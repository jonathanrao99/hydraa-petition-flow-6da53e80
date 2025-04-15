import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, UserCheck } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import PetitionDetailsModal from "@/components/petition/PetitionDetailsModal";

// Mock data - would be fetched from API in a real app
const assignedPetitions = [
  {
    id: "4",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Lakshmi Devi",
    petitionerPhone: "9876543210",
    petitionerAddress: "123, Main Street, Hyderabad",
    date: "12-04-2024",
    status: "Under Investigation" as const,
    assignedTo: ["Jane Smith", "Rao Kumar"],
    timeBound: "Priority",
    progress: "70%",
    type: "Road Encroachment",
    zone: "Hyderabad West - Gachibowli",
    subject: "Illegal construction on public road",
    complaintDetails: "The respondent has constructed a temporary structure on the public road, causing inconvenience to pedestrians and vehicles.",
    respondentName: "Ramesh Kumar",
    respondentAddress: "456, Market Street, Hyderabad",
    respondentPhone: "9876543211",
    encroachmentAddress: "Near Gachibowli Circle",
    initialRemark: "Need immediate attention due to traffic congestion",
    investigationReport: "Site visit conducted on 15-04-2024. Found temporary structure measuring 10x15 feet. Photos and measurements taken. Local residents interviewed.",
    officerRecommendation: "Recommend immediate removal of the structure as it violates public space regulations.",
    finalDecision: "Pending",
    decisionStatus: "Under Investigation"
  },
  {
    id: "5",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Ravi Reddy",
    petitionerPhone: "9876543212",
    petitionerAddress: "789, Park Avenue, Hyderabad",
    date: "11-04-2024",
    status: "Under Investigation" as const,
    assignedTo: ["Jane Smith", "Rao Kumar", "Anjali Sharma"],
    timeBound: "Normal",
    progress: "45%",
    type: "Footpath Encroachment",
    zone: "Hyderabad East - Uppal",
    subject: "Vendors occupying footpath",
    complaintDetails: "Multiple street vendors have set up permanent stalls on the footpath, making it difficult for pedestrians to walk.",
    respondentName: "Multiple vendors",
    respondentAddress: "Uppal Main Road",
    respondentPhone: "N/A",
    encroachmentAddress: "Uppal Main Road footpath",
    initialRemark: "Need to verify vendor licenses and permissions",
    investigationReport: "Initial site visit completed. Found 8 unauthorized stalls. Documentation in progress.",
    officerRecommendation: "Pending",
    finalDecision: "Pending",
    decisionStatus: "Under Investigation"
  },
  {
    id: "6",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Mohammed Ali",
    petitionerPhone: "9876543213",
    petitionerAddress: "321, Lake View, Hyderabad",
    date: "10-04-2024",
    status: "Under Investigation" as const,
    assignedTo: ["Anjali Sharma"],
    timeBound: "Immediate",
    progress: "90%",
    type: "Public Land Encroachment",
    zone: "Hyderabad Central - Begumpet",
    subject: "Illegal parking on public land",
    complaintDetails: "A private parking lot is operating on public land without proper authorization.",
    respondentName: "City Parking Solutions",
    respondentAddress: "Begumpet Main Road",
    respondentPhone: "9876543214",
    encroachmentAddress: "Plot No. 45, Begumpet",
    initialRemark: "High priority due to revenue loss",
    investigationReport: "Complete investigation done. Found unauthorized parking operations. Revenue records collected. Final report being prepared.",
    officerRecommendation: "Recommend legal action and recovery of unauthorized earnings",
    finalDecision: "Pending",
    decisionStatus: "Under Investigation"
  }
];

const AssignedPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [officerFilter, setOfficerFilter] = useState("all");
  const [selectedPetition, setSelectedPetition] = useState(null);

  const officers = [...new Set(assignedPetitions.flatMap(p => p.assignedTo))];

  const filteredPetitions = assignedPetitions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOfficer = officerFilter === "all" || petition.assignedTo.includes(officerFilter);
    
    return matchesSearch && matchesOfficer;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Petitions"
        description="Track petitions under investigation"
      />

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search petitions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={officerFilter} onValueChange={setOfficerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by officer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Officers</SelectItem>
                {officers.map((officer) => (
                  <SelectItem key={officer} value={officer}>
                    {officer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Petitions Under Investigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-7 p-3 font-medium">
              <div>Petition Number</div>
              <div>Petitioner</div>
              <div>Date</div>
              <div>Assigned Officers</div>
              <div>Progress</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredPetitions.map((petition) => (
                <div key={petition.id} className="grid grid-cols-1 md:grid-cols-7 p-3 items-center">
                  <div className="font-medium">{petition.petitionNumber}</div>
                  <div>{petition.petitionerName}</div>
                  <div>{petition.date}</div>
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {petition.assignedTo.map((officer, index) => (
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
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: petition.progress }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{petition.progress}</span>
                  </div>
                  <div>
                    <StatusBadge status={petition.status} />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedPetition(petition)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPetition && (
        <PetitionDetailsModal
          isOpen={!!selectedPetition}
          onClose={() => setSelectedPetition(null)}
          petition={selectedPetition}
        />
      )}
    </div>
  );
};

export default AssignedPetitions; 