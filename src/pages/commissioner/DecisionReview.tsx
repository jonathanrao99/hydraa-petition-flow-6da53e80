import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";

// Mock data - would be fetched from API in a real app
const mockPetitions = [
  {
    id: "1",
    petitionNumber: "PTN00004/2025",
    petitionerName: "Lakshmi Devi",
    petitionerPhone: "9876543210",
    petitionerAddress: "123, Main Street, Hyderabad",
    date: "12-04-2024",
    status: "Under Investigation" as const,
    type: "Road Encroachment",
    zone: "Hyderabad West - Gachibowli",
    subject: "Illegal construction on public road",
    complaintDetails: "The respondent has constructed a temporary structure on the public road, causing inconvenience to pedestrians and vehicles.",
    respondentName: "Ramesh Kumar",
    respondentAddress: "456, Market Street, Hyderabad",
    respondentPhone: "9876543211",
    encroachmentAddress: "Near Gachibowli Circle",
    initialRemark: "Need immediate attention due to traffic congestion",
    timeBound: "Priority",
    assignedOfficers: ["Jane Smith", "Rao Kumar"],
    investigationReport: "Site visit conducted on 15-04-2024. Found temporary structure measuring 10x15 feet. Photos and measurements taken. Local residents interviewed.",
    officerRecommendation: "Recommend immediate removal of the structure as it violates public space regulations.",
    evidence: [
      {
        type: "Photo",
        description: "Front view of the encroachment",
        date: "15-04-2024",
        uploadedBy: "Jane Smith"
      },
      {
        type: "Photo",
        description: "Side view showing obstruction",
        date: "15-04-2024",
        uploadedBy: "Jane Smith"
      },
      {
        type: "Measurement",
        description: "Structure dimensions",
        date: "15-04-2024",
        uploadedBy: "Rao Kumar"
      },
      {
        type: "Witness Statement",
        description: "Local resident interview",
        date: "15-04-2024",
        uploadedBy: "Jane Smith"
      }
    ]
  },
  {
    id: "2",
    petitionNumber: "PTN00005/2025",
    petitionerName: "Ravi Reddy",
    petitionerPhone: "9876543212",
    petitionerAddress: "789, Park Avenue, Hyderabad",
    date: "11-04-2024",
    status: "Under Investigation" as const,
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
    assignedOfficers: ["Jane Smith", "Rao Kumar", "Anjali Sharma"],
    evidence: []
  },
  {
    id: "3",
    petitionNumber: "PTN00006/2025",
    petitionerName: "Mohammed Ali",
    petitionerPhone: "9876543213",
    petitionerAddress: "321, Lake View, Hyderabad",
    date: "10-04-2024",
    status: "Under Investigation" as const,
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
    assignedOfficers: ["Anjali Sharma"],
    evidence: []
  }
];

const DecisionReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [decision, setDecision] = useState("");

  // Find the petition data based on the ID from the URL
  const petitionData = mockPetitions.find(petition => petition.id === id);

  if (!petitionData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Petition not found</h2>
        <Button onClick={() => navigate("/commissioner/decisions")}>
          Back to Decisions
        </Button>
      </div>
    );
  }

  const handleSubmitDecision = () => {
    // Here you would typically make an API call to save the decision
    console.log({
      petitionId: id,
      remarks,
      decision
    });
    navigate("/commissioner/decisions");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Petition"
        description="Review all collected information and make a final decision"
        action={
          <Button variant="outline" onClick={() => navigate("/commissioner/decisions")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Petition Details */}
        <Card>
          <CardHeader>
            <CardTitle>Petition Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{petitionData.petitionNumber}</h3>
              <StatusBadge status={petitionData.status} />
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="text-muted-foreground">Type</Label>
                <p>{petitionData.type}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Zone</Label>
                <p>{petitionData.zone}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Subject</Label>
                <p>{petitionData.subject}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Complaint Details</Label>
                <p>{petitionData.complaintDetails}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Initial Remark</Label>
                <p>{petitionData.initialRemark}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Petitioner & Respondent Details */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Petitioner</h4>
              <div className="space-y-2">
                <p>{petitionData.petitionerName}</p>
                <p>{petitionData.petitionerPhone}</p>
                <p>{petitionData.petitionerAddress}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Respondent</h4>
              <div className="space-y-2">
                <p>{petitionData.respondentName}</p>
                <p>{petitionData.respondentPhone}</p>
                <p>{petitionData.respondentAddress}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Encroachment Location</h4>
              <p>{petitionData.encroachmentAddress}</p>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Details */}
        <Card>
          <CardHeader>
            <CardTitle>Investigation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Assigned Officers</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {petitionData.assignedOfficers.map((officer, index) => (
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
              <Label className="text-muted-foreground">Investigation Report</Label>
              <p className="mt-1">{petitionData.investigationReport}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Officer Recommendation</Label>
              <p className="mt-1">{petitionData.officerRecommendation}</p>
            </div>
          </CardContent>
        </Card>

        {/* Evidence */}
        {petitionData.evidence.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {petitionData.evidence.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.type}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.date} • {item.uploadedBy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Commissioner's Decision */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Make Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Textarea
                placeholder="Enter any additional remarks or observations..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Decision</Label>
              <RadioGroup value={decision} onValueChange={setDecision}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="approved" id="approved" />
                  <Label htmlFor="approved" className="font-normal">Approve</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="denied" id="denied" />
                  <Label htmlFor="denied" className="font-normal">Deny</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially_approved" id="partially_approved" />
                  <Label htmlFor="partially_approved" className="font-normal">Partially Approve</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invalid" id="invalid" />
                  <Label htmlFor="invalid" className="font-normal">Mark as Invalid</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/commissioner/decisions")}
              >
                Cancel
              </Button>
              <Button 
                className="w-full" 
                onClick={handleSubmitDecision}
                disabled={!decision}
              >
                <Save className="mr-2 h-4 w-4" />
                Submit Decision
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DecisionReview; 