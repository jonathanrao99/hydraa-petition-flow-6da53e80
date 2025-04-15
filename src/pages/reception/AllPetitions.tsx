import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

type PetitionStatus = "Pending" | "Assigned" | "Under Investigation" | "Decision Made";

interface Petition {
  id: string;
  petitionNumber: string;
  petitionerName: string;
  date: string;
  status: PetitionStatus;
  type: string;
  zone: string;
}

// Mock data - would be fetched from API in a real app
const mockPetitions: Petition[] = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Rajesh Kumar",
    date: "15-04-2025",
    status: "Pending",
    type: "General",
    zone: "Hyderabad West"
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Priya Sharma",
    date: "14-04-2025",
    status: "Assigned",
    type: "Priority",
    zone: "Hyderabad East"
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Suresh Reddy",
    date: "13-04-2025",
    status: "Under Investigation",
    type: "Immediate",
    zone: "Hyderabad North"
  },
  {
    id: "4",
    petitionNumber: "PTN00004/2025",
    petitionerName: "Lakshmi Devi",
    date: "12-04-2025",
    status: "Decision Made",
    type: "General",
    zone: "Hyderabad South"
  },
];

const AllPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPetitions = mockPetitions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase();
    
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
              <FileText className="mr-2 h-4 w-4" />
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
                  placeholder="Search by petition number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="under investigation">Under Investigation</SelectItem>
                  <SelectItem value="decision made">Decision Made</SelectItem>
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
                      <Link to={`/reception/petitions/${petition.id}`}>
                        <Button variant="ghost" size="sm">
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
    </div>
  );
};

export default AllPetitions; 