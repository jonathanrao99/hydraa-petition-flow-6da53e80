import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import PetitionDetailsModal from "@/components/petition/PetitionDetailsModal";

type PetitionStatus = "Pending" | "Assigned" | "Under Investigation" | "Decision Made";
type DecisionStatus = "Approved" | "Denied" | "Invalid" | "Partially Approved";

interface Petition {
  id: string;
  petitionNumber: string;
  petitionerName: string;
  petitionerPhone: string;
  petitionerAddress: string;
  date: string;
  status: PetitionStatus;
  type: string;
  zone: string;
  subject: string;
  complaintDetails: string;
  respondentName: string;
  respondentAddress: string;
  respondentPhone: string;
  encroachmentAddress: string;
  initialRemark: string;
  timeBound: string;
  assignedOfficers?: string[];
  investigationReport?: string;
  officerRecommendation?: string;
  finalDecision?: string;
  decisionStatus?: DecisionStatus;
}

// Mock data - would be fetched from API in a real app
const mockPetitions: Petition[] = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Rajesh Kumar",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad West",
    date: "15-04-2025",
    status: "Pending",
    type: "General",
    zone: "Hyderabad West",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "John Doe",
    respondentAddress: "Hyderabad East",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad West",
    initialRemark: "",
    timeBound: "1 month",
    assignedOfficers: [],
    investigationReport: "",
    officerRecommendation: "",
    finalDecision: "",
    decisionStatus: undefined
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Priya Sharma",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad East",
    date: "14-04-2025",
    status: "Assigned",
    type: "Priority",
    zone: "Hyderabad East",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "Jane Doe",
    respondentAddress: "Hyderabad East",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad East",
    initialRemark: "Initial inspection confirms the presence of unauthorized construction. The structure appears to be a temporary shed built without proper permits. Further investigation required to determine the extent of encroachment.",
    timeBound: "2 months",
    assignedOfficers: ["Officer3"],
    investigationReport: "",
    officerRecommendation: "",
    finalDecision: "",
    decisionStatus: undefined
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Suresh Reddy",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad North",
    date: "13-04-2025",
    status: "Under Investigation",
    type: "Immediate",
    zone: "Hyderabad North",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "John Smith",
    respondentAddress: "Hyderabad North",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad North",
    initialRemark: "Initial inspection confirms the presence of unauthorized construction. The structure appears to be a temporary shed built without proper permits. Further investigation required to determine the extent of encroachment.",
    timeBound: "3 months",
    assignedOfficers: ["Officer4"],
    investigationReport: "A detailed site inspection was conducted on 13-04-2025. The investigation revealed:\n- The construction extends 2.5 meters into the public space\n- No building permits were obtained for the structure\n- The construction violates municipal bylaws regarding public space usage\n- Multiple residents have reported inconvenience due to the encroachment\n- The structure poses a potential safety hazard during emergency situations",
    officerRecommendation: "",
    finalDecision: "",
    decisionStatus: undefined
  },
  {
    id: "4",
    petitionNumber: "PTN00004/2025",
    petitionerName: "Lakshmi Devi",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad South",
    date: "12-04-2025",
    status: "Decision Made",
    type: "General",
    zone: "Hyderabad South",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "Jane Smith",
    respondentAddress: "Hyderabad South",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad South",
    initialRemark: "Initial inspection confirms the presence of unauthorized construction. The structure appears to be a temporary shed built without proper permits. Further investigation required to determine the extent of encroachment.",
    timeBound: "4 months",
    assignedOfficers: ["Officer5"],
    investigationReport: "A detailed site inspection was conducted on 12-04-2025. The investigation revealed:\n- The construction extends 2.5 meters into the public space\n- No building permits were obtained for the structure\n- The construction violates municipal bylaws regarding public space usage\n- Multiple residents have reported inconvenience due to the encroachment\n- The structure poses a potential safety hazard during emergency situations",
    officerRecommendation: "Based on the investigation findings, it is recommended that:\n1. The respondent be issued a notice to remove the unauthorized construction within 15 days\n2. A fine be imposed for violation of municipal bylaws\n3. The area be restored to its original condition\n4. Regular monitoring be conducted to prevent future encroachments",
    finalDecision: "After careful consideration of the investigation report and officer recommendations, the following decision has been made:\n1. The respondent is ordered to remove the unauthorized construction within 15 days\n2. A fine of ₹25,000 is imposed for violation of municipal bylaws\n3. Failure to comply will result in legal action and additional penalties\n4. The decision is subject to appeal within 30 days",
    decisionStatus: "Approved"
  },
  {
    id: "5",
    petitionNumber: "PTN00005/2025",
    petitionerName: "Amit Patel",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad Central",
    date: "11-04-2025",
    status: "Decision Made",
    type: "General",
    zone: "Hyderabad Central",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "Mike Johnson",
    respondentAddress: "Hyderabad Central",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad Central",
    initialRemark: "Initial inspection reveals that the reported construction is within the property boundaries and does not constitute encroachment.",
    timeBound: "1 month",
    assignedOfficers: ["Officer6"],
    investigationReport: "A detailed site inspection was conducted on 11-04-2025. The investigation revealed:\n- The construction is within the property boundaries\n- All necessary permits are in place\n- The construction complies with municipal bylaws\n- No evidence of public space encroachment was found",
    officerRecommendation: "Based on the investigation findings, it is recommended that:\n1. The petition be dismissed as the complaint is not valid\n2. The petitioner be informed about the property boundaries\n3. No further action is required",
    finalDecision: "After careful consideration of the investigation report and officer recommendations, the following decision has been made:\n1. The petition is dismissed as the complaint is not valid\n2. The construction is within legal boundaries and has all necessary permits\n3. No further action will be taken on this matter",
    decisionStatus: "Denied"
  },
  {
    id: "6",
    petitionNumber: "PTN00006/2025",
    petitionerName: "Sneha Gupta",
    petitionerPhone: "9876543210",
    petitionerAddress: "Hyderabad North",
    date: "10-04-2025",
    status: "Decision Made",
    type: "Priority",
    zone: "Hyderabad North",
    subject: "Encroachment",
    complaintDetails: "The petitioner has reported an unauthorized construction in the public space adjacent to their property. The construction has blocked access to the main road and is causing inconvenience to the residents. The petitioner has provided photographic evidence of the encroachment and requests immediate action.",
    respondentName: "Sarah Williams",
    respondentAddress: "Hyderabad North",
    respondentPhone: "1234567890",
    encroachmentAddress: "Hyderabad North",
    initialRemark: "Initial inspection reveals that the reported location is outside the jurisdiction of this department.",
    timeBound: "1 month",
    assignedOfficers: ["Officer7"],
    investigationReport: "A detailed review was conducted on 10-04-2025. The review revealed:\n- The reported location falls under a different municipal zone\n- This department does not have jurisdiction over the area\n- The complaint should be redirected to the appropriate authority",
    officerRecommendation: "Based on the review findings, it is recommended that:\n1. The petition be marked as invalid due to jurisdiction issues\n2. The petitioner be directed to the appropriate department\n3. The case be closed in our system",
    finalDecision: "After careful consideration of the review findings, the following decision has been made:\n1. The petition is invalid as it falls outside our jurisdiction\n2. The petitioner should contact the North Zone Municipal Office\n3. This case is closed in our system",
    decisionStatus: "Invalid"
  }
];

const AllPetitions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);

  const filteredPetitions = mockPetitions.filter((petition) => {
    const matchesSearch =
      petition.petitionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || petition.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Petitions"
        description="View and manage all submitted petitions"
        action={
          <Link to="/reception/new-petition">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Petition
            </Button>
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Petitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by petition number or petitioner name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                  <SelectItem value="Decision Made">Decision Made</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-6 p-3 font-medium">
                <div>Petition Number</div>
                <div>Petitioner</div>
                <div>Date</div>
                <div>Type</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredPetitions.map((petition) => (
                  <div key={petition.id} className="grid grid-cols-1 md:grid-cols-6 p-3 items-center">
                    <div className="font-medium">{petition.petitionNumber}</div>
                    <div>{petition.petitionerName}</div>
                    <div>{petition.date}</div>
                    <div>{petition.type}</div>
                    <div>
                      <StatusBadge status={petition.status} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPetition(petition)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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

export default AllPetitions; 