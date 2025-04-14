import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileText } from "lucide-react";
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
  assignedTo?: string[];
}

// Mock data - would be fetched from API in a real app
const petitions: Petition[] = [
  {
    id: "1",
    petitionNumber: "PTN000012024",
    petitionerName: "Rajesh Kumar",
    date: "15-04-2024",
    status: "Pending",
    type: "General",
    zone: "Hyderabad West"
  },
  {
    id: "2",
    petitionNumber: "PTN000022024",
    petitionerName: "Priya Sharma",
    date: "14-04-2024",
    status: "Assigned",
    type: "Priority",
    zone: "Hyderabad East",
    assignedTo: ["John Doe", "Jane Smith"]
  },
  {
    id: "3",
    petitionNumber: "PTN000032024",
    petitionerName: "Suresh Reddy",
    date: "13-04-2024",
    status: "Under Investigation",
    type: "Immediate",
    zone: "Hyderabad North",
    assignedTo: ["Mike Johnson"]
  },
  {
    id: "4",
    petitionNumber: "PTN000042024",
    petitionerName: "Lakshmi Devi",
    date: "12-04-2024",
    status: "Decision Made",
    type: "General",
    zone: "Hyderabad South"
  },
];

const AdminPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");

  const filteredPetitions = petitions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || petition.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesZone = zoneFilter === "all" || petition.zone.toLowerCase() === zoneFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType && matchesZone;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Petitions"
        description="View and manage all petitions in the system"
        action={
          <Link to="/admin/petitions/new">
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
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={zoneFilter}
                onValueChange={setZoneFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="hyderabad west">Hyderabad West</SelectItem>
                  <SelectItem value="hyderabad east">Hyderabad East</SelectItem>
                  <SelectItem value="hyderabad north">Hyderabad North</SelectItem>
                  <SelectItem value="hyderabad south">Hyderabad South</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-7 p-3 font-medium">
                <div>Petition Number</div>
                <div>Petitioner</div>
                <div>Date</div>
                <div>Type</div>
                <div>Zone</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredPetitions.map((petition) => (
                  <div key={petition.id} className="grid grid-cols-1 md:grid-cols-7 p-3 items-center">
                    <div className="font-medium">{petition.petitionNumber}</div>
                    <div>{petition.petitionerName}</div>
                    <div>{petition.date}</div>
                    <div>{petition.type}</div>
                    <div>{petition.zone}</div>
                    <div>
                      <StatusBadge status={petition.status} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/petitions/${petition.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link to={`/admin/petitions/${petition.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
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

export default AdminPetitions; 