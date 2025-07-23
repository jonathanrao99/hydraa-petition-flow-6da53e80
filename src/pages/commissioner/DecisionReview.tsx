import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import { COMMISSIONER_NAME } from "@/lib/constants";

type PetitionStatus = "Pending" | "Under Investigation" | "Decision Made" | "Approved" | "Denied" | "Partially Approved" | "Closed";
type DecisionStatus = "Approved" | "Denied" | "Partially Approved" | "Pending";

interface Petition {
  id: string;
  petitionNumber: string;
  petitionerName: string;
  petitionerPhone: string;
  petitionerAddress: string;
  submissionDate: string;
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
  investigationReport: string;
  officerRecommendation: string;
  finalDecision: string;
  decisionStatus: DecisionStatus;
  evidence: string[];
  decisionDate?: string;
}

const DecisionReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState("");
  const [decisionStatus, setDecisionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [petitionData, setPetitionData] = useState<Petition | null>(null);
  const [reviewDecisions, setReviewDecisions] = useState<Petition[]>([]);
  const [pendingDecisions, setPendingDecisions] = useState<Petition[]>([]);

  // Check if this is a view-only mode (accessed from Review Decisions page)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isReadOnlyMode = searchParams.get('readonly') === 'true';
    setIsReadOnly(isReadOnlyMode);
    
    // In a real app, this would be an API call to fetch the petition data
    // For now, we'll use the mock data based on the ID
    if (id) {
      const mockPetitions: Petition[] = [
        {
          id: "1",
          petitionNumber: "PTN00001/2025",
          petitionerName: "John Doe",
          petitionerPhone: "1234567890",
          petitionerAddress: "123 Main St",
          submissionDate: "2025-01-15",
          status: "Decision Made" as PetitionStatus,
          type: "Encroachment",
          zone: "Zone A",
          subject: "Illegal Construction",
          complaintDetails: "Neighbor has built an extension without permission",
          respondentName: "Jane Smith",
          respondentAddress: "124 Main St",
          respondentPhone: "0987654321",
          encroachmentAddress: "124 Main St",
          initialRemark: "Initial assessment completed",
          investigationReport: "Investigation found unauthorized construction",
          officerRecommendation: "Recommend removal of unauthorized structure",
          finalDecision: "Approved for removal",
          decisionStatus: "Approved",
          evidence: []
        },
        {
          id: "2",
          petitionNumber: "PTN00002/2025",
          petitionerName: "Alice Johnson",
          petitionerPhone: "2345678901",
          petitionerAddress: "456 Oak Ave",
          submissionDate: "2025-01-16",
          status: "Under Investigation" as PetitionStatus,
          type: "Noise Complaint",
          zone: "Zone B",
          subject: "Excessive Noise",
          complaintDetails: "Loud music playing late at night",
          respondentName: "Bob Wilson",
          respondentAddress: "458 Oak Ave",
          respondentPhone: "9876543210",
          encroachmentAddress: "458 Oak Ave",
          initialRemark: "Noise levels being monitored",
          investigationReport: "Ongoing investigation",
          officerRecommendation: "Pending",
          finalDecision: "Pending",
          decisionStatus: "Pending",
          evidence: []
        },
        {
          id: "3",
          petitionNumber: "PTN00003/2025",
          petitionerName: "Charlie Brown",
          petitionerPhone: "3456789012",
          petitionerAddress: "789 Pine St",
          submissionDate: "2025-01-17",
          status: "Decision Made" as PetitionStatus,
          type: "Property Dispute",
          zone: "Zone C",
          subject: "Boundary Issue",
          complaintDetails: "Neighbor's fence encroaching on property",
          respondentName: "David Miller",
          respondentAddress: "791 Pine St",
          respondentPhone: "8765432109",
          encroachmentAddress: "791 Pine St",
          initialRemark: "Boundary survey required",
          investigationReport: "Survey shows 2 feet encroachment",
          officerRecommendation: "Recommend partial removal",
          finalDecision: "Partially approved - adjust fence line",
          decisionStatus: "Partially Approved",
          evidence: []
        }
      ];

      const foundPetition = mockPetitions.find(p => p.id === id);
      if (foundPetition) {
        setPetitionData(foundPetition);
        if (isReadOnlyMode) {
          setDecision(foundPetition.finalDecision);
          setDecisionStatus(foundPetition.decisionStatus);
        }
      }
    }
  }, [id]);

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

  const handleSubmitDecision = async () => {
    if (!decision || !decisionStatus) {
      setError("Please provide both a decision and select a status");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // In a real app, this would be an API call
      // Decision data would be sent to API here

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the petition status in the dashboard
      // In a real app, this would update the backend state
      const updatedPetition: Petition = {
        ...petitionData!,
        status: "Decision Made",
        finalDecision: decision,
        decisionStatus: decisionStatus as DecisionStatus,
        decisionDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      };

      // Add to review decisions list
      setReviewDecisions([...reviewDecisions, updatedPetition]);

      // Remove from pending decisions
      const index = pendingDecisions.findIndex(p => p.id === id);
      if (index !== -1) {
        const newPendingDecisions = pendingDecisions.filter((_, i) => i !== index);
        setPendingDecisions(newPendingDecisions);
      }

      // Navigate back to decisions page
      navigate("/commissioner/decisions", { replace: true });
    } catch (err) {
      setError("Failed to submit decision. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Denied":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Partially Approved":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDecisionStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Denied":
        return "text-red-500";
      case "Partially Approved":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isReadOnly ? "View Decision" : "Review Petition"}
        description={isReadOnly ? "View the final decision made on this petition" : "Review the petition details and make a final decision"}
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Petition Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Petition Number</p>
                <p className="font-medium">{petitionData.petitionNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submission Date</p>
                <p className="font-medium">{petitionData.submissionDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{petitionData.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zone</p>
                <p className="font-medium">{petitionData.zone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Petitioner Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{petitionData.petitionerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{petitionData.petitionerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{petitionData.petitionerAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium">{petitionData.subject}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Details</p>
              <p className="font-medium">{petitionData.complaintDetails}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Respondent Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{petitionData.respondentName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{petitionData.respondentPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{petitionData.respondentAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Encroachment Location</p>
              <p className="font-medium">{petitionData.encroachmentAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Investigation Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Initial Remark</p>
              <p className="font-medium">{petitionData.initialRemark}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Investigation Details</p>
              <p className="font-medium">{petitionData.investigationReport}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Officer Recommendation</p>
              <p className="font-medium">{petitionData.officerRecommendation}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{isReadOnly ? "Decision Details" : "Make Decision"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Decision Status</label>
              {isReadOnly ? (
                <div className="flex items-center gap-2">
                  {getStatusIcon(decisionStatus)}
                  <span className={`font-medium ${getDecisionStatusColor(decisionStatus)} px-2 py-1 rounded-full`}>
                    {decisionStatus}
                  </span>
                </div>
              ) : (
                <Select
                  value={decisionStatus}
                  onValueChange={setDecisionStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">
                      <div className="flex items-center gap-2">
                        {getStatusIcon("Approved")}
                        <span>Approved</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Denied">
                      <div className="flex items-center gap-2">
                        {getStatusIcon("Denied")}
                        <span>Denied</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Partially Approved">
                      <div className="flex items-center gap-2">
                        {getStatusIcon("Partially Approved")}
                        <span>Partially Approved</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{`${COMMISSIONER_NAME} Remarks`}</label>
              {isReadOnly ? (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">{decision}</p>
                </div>
              ) : (
                <Textarea
                  placeholder="Enter your remarks..."
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  className="min-h-[100px]"
                />
              )}
            </div>
            {!isReadOnly && (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/commissioner/decisions")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitDecision}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Decision"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DecisionReview; 