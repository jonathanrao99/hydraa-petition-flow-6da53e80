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
  assignedTo: string;
}

// Mock data - would be fetched from API in a real app
const mockPetitions = [
  {
    id: "1",
    petitionNumber: "PTN00001/2024",
    petitionerName: "Rajesh Kumar",
    date: "15-04-2024",
    status: "Assigned",
    type: "General",
    zone: "Hyderabad West",
    assignedTo: "Sujeeth"
  },
  {
    id: "2",
    petitionNumber: "PTN00002/2024",
    petitionerName: "Priya Sharma",
    date: "14-04-2024",
    status: "Under Investigation",
    type: "Priority",
    zone: "Hyderabad East",
    assignedTo: "Bachi reddy"
  },
  {
    id: "3",
    petitionNumber: "PTN00003/2024",
    petitionerName: "Suresh Reddy",
    date: "13-04-2024",
    status: "Decision Made",
    type: "Immediate",
    zone: "Hyderabad North",
    assignedTo: "Tirumalesh"
  }
]; 