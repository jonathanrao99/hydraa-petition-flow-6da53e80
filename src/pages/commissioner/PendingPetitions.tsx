import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Clock } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
const pendingPetitions = [
  {
    id: "1",
    petitionNumber: "PTN00001/2025",
    petitionerName: "Rajesh Kumar",
    date: "15-04-2024",
    status: "Pending",
    timeBound: "Priority",
    subject: "Road Encroachment",
    zone: "Hyderabad West - Gachibowli"
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2025",
    petitionerName: "Priya Sharma",
    date: "14-04-2024",
    status: "Pending",
    timeBound: "Normal",
    subject: "Footpath Encroachment",
    zone: "Hyderabad East - Uppal"
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2025",
    petitionerName: "Suresh Reddy",
    date: "13-04-2024",
    status: "Pending",
    timeBound: "Immediate",
    subject: "Public Land Encroachment",
    zone: "Hyderabad Central - Begumpet"
  }
];

const PendingPetitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeBoundFilter, setTimeBoundFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");

  const zones = [...new Set(pendingPetitions.map(p => p.zone))];
  const timeBounds = ["Priority", "Immediate", "Normal"];

  const filteredPetitions = pendingPetitions.filter(petition => {
    const matchesSearch = 
      petition.petitionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.petitionerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petition.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTimeBound = timeBoundFilter === "all" || petition.timeBound === timeBoundFilter;
    const matchesZone = zoneFilter === "all" || petition.zone === zoneFilter;
    
    return matchesSearch && matchesTimeBound && matchesZone;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending Petitions"
        description="Assign enquiry officers to investigate petitions"
      />

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search petitions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={timeBoundFilter} onValueChange={setTimeBoundFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Time Bound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time Bounds</SelectItem>
                {timeBounds.map((timeBound) => (
                  <SelectItem key={timeBound} value={timeBound}>
                    {timeBound}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Petitions Awaiting Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-7 p-3 font-medium">
              <div>Petition Number</div>
              <div>Petitioner</div>
              <div>Date</div>
              <div>Subject</div>
              <div>Zone</div>
              <div>Time Bound</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredPetitions.map((petition) => (
                <div key={petition.id} className="grid grid-cols-1 md:grid-cols-7 p-3 items-center">
                  <div className="font-medium">{petition.petitionNumber}</div>
                  <div>{petition.petitionerName}</div>
                  <div>{petition.date}</div>
                  <div>{petition.subject}</div>
                  <div>{petition.zone}</div>
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
    </div>
  );
};

export default PendingPetitions; 