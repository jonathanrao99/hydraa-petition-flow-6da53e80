import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { COMMISSIONER_NAME } from "@/lib/constants";

interface PetitionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  petition: {
    id: string;
    petitionNumber: string;
    petitionerName: string;
    petitionerPhone: string;
    petitionerAddress: string;
    date: string;
    status: "Pending" | "Assigned" | "Under Investigation" | "Decision Made";
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
    decisionStatus?: "Approved" | "Denied" | "Invalid" | "Partially Approved";
  };
}

const PetitionDetailsModal = ({ isOpen, onClose, petition }: PetitionDetailsModalProps) => {
  const getDecisionStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Denied":
        return "bg-red-100 text-red-800";
      case "Invalid":
        return "bg-yellow-100 text-yellow-800";
      case "Partially Approved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            Petition Details - {petition.petitionNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status and Basic Info */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <StatusBadge status={petition.status} />
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {petition.type}
                  </div>
                  <div>
                    <span className="font-medium">Zone:</span> {petition.zone}
                  </div>
                  <div>
                    <span className="font-medium">Time Bound:</span> {petition.timeBound}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Date:</span> {petition.date}
                  </div>
                  <div>
                    <span className="font-medium">Subject:</span> {petition.subject}
                  </div>
                  {petition.assignedOfficers && petition.assignedOfficers.length > 0 && (
                    <div>
                      <span className="font-medium">Assigned Officers:</span>{" "}
                      {petition.assignedOfficers.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Petitioner Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Petitioner Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {petition.petitionerName}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {petition.petitionerPhone}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Address:</span> {petition.petitionerAddress}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Respondent Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Respondent Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span> {petition.respondentName}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {petition.respondentPhone}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Address:</span> {petition.respondentAddress}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaint Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Complaint Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Encroachment Address:</span>{" "}
                  {petition.encroachmentAddress}
                </div>
                <div>
                  <span className="font-medium">Details:</span>
                  <p className="mt-2 text-muted-foreground">{petition.complaintDetails}</p>
                </div>
                {petition.initialRemark && (
                  <div>
                    <span className="font-medium">Initial Remark:</span>
                    <p className="mt-2 text-muted-foreground">{petition.initialRemark}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Investigation and Decision Details */}
          {petition.investigationReport && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Investigation Report</h3>
                <p className="text-muted-foreground">{petition.investigationReport}</p>
              </CardContent>
            </Card>
          )}

          {petition.officerRecommendation && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Officer Recommendation</h3>
                <p className="text-muted-foreground">{petition.officerRecommendation}</p>
              </CardContent>
            </Card>
          )}

          {petition.finalDecision && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{`${COMMISSIONER_NAME} Remarks`}</h3>
                <p className="text-muted-foreground">{petition.finalDecision}</p>
              </CardContent>
            </Card>
          )}

          {petition.decisionStatus && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Final Decision</h3>
                <div className="flex items-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDecisionStatusColor(petition.decisionStatus)}`}>
                    {petition.decisionStatus}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetitionDetailsModal; 