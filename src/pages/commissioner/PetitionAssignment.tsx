import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCheck, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import { ENQUIRY_OFFICERS } from "@/lib/constants";

// Centralized enquiry officers list
const officers = ENQUIRY_OFFICERS;

// Mock petition data - in a real app, this would be fetched from an API
const petitionData = {
  id: "1",
  petitionNumber: "PTN00001/2025",
  date: "15-04-2024",
  petitionType: "General",
  petitionerName: "Rajesh Kumar",
  petitionerPhone: "9876543210",
  petitionerAddress: "4-5-6, Banjara Hills, Hyderabad",
  submittedBy: "Individual",
  complaintDetails: "Encroachment of public road by neighboring property owner, causing traffic issues and blocking access to my property.",
  respondentInfo: "Neighboring property owner Mr. Venkat, Address: 4-5-7, Banjara Hills, Hyderabad",
  encroachmentZone: {
    level1: "Hyderabad",
    level2: "West",
    level3: "Gachibowli",
  },
  encroachmentTypes: ["1", "3"], // Road, Footpath
  initialRemark: "Petitioner has provided photographic evidence of encroachment.",
  timeBound: "Priority",
  status: "Pending",
  assignedOfficers: [],
};

// Mock data for officer notifications
let officerNotifications: Record<string, any[]> = {};

const PetitionAssignment = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [timeBound, setTimeBound] = useState("Priority");

  const handleOfficerToggle = (officerId: string) => {
    if (selectedOfficers.includes(officerId)) {
      setSelectedOfficers(selectedOfficers.filter(id => id !== officerId));
    } else {
      // Ensure no more than 3 officers are selected
      if (selectedOfficers.length < 3) {
        setSelectedOfficers([...selectedOfficers, officerId]);
      } else {
        toast({
          title: "Maximum selection reached",
          description: "You can select up to 3 enquiry officers",
          variant: "destructive",
        });
      }
    }
  };

  const handleAssignPetition = () => {
    if (selectedOfficers.length === 0) {
      toast({
        title: "No officers selected",
        description: "Please select at least one enquiry officer",
        variant: "destructive",
      });
      return;
    }

    // Create notification for each assigned officer
    const notification = {
      id: Date.now().toString(),
      type: "petition_assigned",
      petitionId: id,
      petitionNumber: petitionData.petitionNumber,
      petitionerName: petitionData.petitionerName,
      timeBound,
      instructions,
      timestamp: new Date().toISOString(),
    };

    // Add notification to each officer's notification list
    selectedOfficers.forEach(officerId => {
      const officer = officers.find(o => o.id === officerId);
      if (officer) {
        if (!officerNotifications[officer.userId]) {
          officerNotifications[officer.userId] = [];
        }
        officerNotifications[officer.userId].push(notification);
      }
    });

    // In a real app, this would send an API request to update the petition
    // and notify the assigned officers
    
    toast({
      title: "Petition assigned successfully",
      description: `Assigned to ${selectedOfficers.length} officer(s)`,
    });
    
    // Navigate back to commissioner dashboard
    navigate("/commissioner");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assign Petition"
        description="Assign enquiry officers to investigate this petition"
        action={
          <Button variant="outline" onClick={() => navigate("/commissioner")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Petition Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{petitionData.petitionNumber}</h3>
              <StatusBadge status={petitionData.status as any} />
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Petitioner:</span>
                <p className="font-medium">{petitionData.petitionerName}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Date:</span>
                <p className="font-medium">{petitionData.date}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Type:</span>
                <p className="font-medium">{petitionData.petitionType}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Zone:</span>
                <p className="font-medium">
                  {petitionData.encroachmentZone.level3}, {petitionData.encroachmentZone.level2}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assign Enquiry Officers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select officers (up to 3)</Label>
              <div className="border rounded-md divide-y">
                {officers.map((officer) => (
                  <div key={officer.id} className="flex items-center space-x-2 p-3">
                    <Checkbox
                      id={`officer-${officer.id}`}
                      checked={selectedOfficers.includes(officer.id)}
                      onCheckedChange={() => handleOfficerToggle(officer.id)}
                      disabled={selectedOfficers.length >= 3 && !selectedOfficers.includes(officer.id)}
                    />
                    <Label
                      htmlFor={`officer-${officer.id}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      <div className="flex justify-between">
                        <span>{officer.name}</span>
                        <span className="text-sm text-muted-foreground">{officer.designation}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{officer.userId}</div>
                    </Label>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Selected: {selectedOfficers.length}/3
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions to Officers</Label>
              <Textarea
                id="instructions"
                placeholder="Enter instructions for the assigned officers"
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Time Bound</Label>
              <Select value={timeBound} onValueChange={setTimeBound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Priority">Priority</SelectItem>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAssignPetition}
              disabled={selectedOfficers.length === 0}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Assign Officers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PetitionAssignment;
