import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, UserCheck } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
const assignedPetitions = [
  {
    id: "4",
    petitionNumber: "PTN000042024",
    petitionerName: "Lakshmi Devi",
    date: "12-04-2024",
    status: "Under Investigation",
    assignedTo: ["Jane Smith", "Rao Kumar"],
    timeBound: "Priority",
    progress: "70%"
  },
  {
    id: "5",
    petitionNumber: "PTN000052024",
    petitionerName: "Ravi Reddy",
    date: "11-04-2024",
    status: "Under Investigation",
    assignedTo: ["Jane Smith", "Rao Kumar", "Anjali Sharma"],
    timeBound: "Normal",
    progress: "45%"
  },
  {
    id: "6",
    petitionNumber: "PTN000062024",
    petitionerName: "Mohammed Ali",
    date: "10-04-2024",
    status: "Under Investigation",
    assignedTo: ["Anjali Sharma"],
    timeBound: "Immediate",
    progress: "90%"
  }
];

const AssignedPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [officerFilter, setOfficerFilter] = useState("all");

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
          <CardTitle>Cases Under Investigation</CardTitle>
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
                value={officerFilter}
                onValueChange={setOfficerFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <UserCheck className="mr-2 h-4 w-4" />
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
                    <div className="flex justify-end gap-2">
                      <Link to={`/commissioner/assigned/${petition.id}`}>
                        <Button variant="ghost" size="sm">
                          View Details
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

export default AssignedPetitions; 