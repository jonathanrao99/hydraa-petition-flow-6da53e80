import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import LoginPage from "@/pages/LoginPage";
import ReceptionDashboard from "@/pages/dashboard/ReceptionDashboard";
import OfficerDashboard from "@/pages/dashboard/OfficerDashboard";
import CommissionerDashboard from "@/pages/dashboard/CommissionerDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import NewPetitionForm from "@/pages/reception/NewPetitionForm";
import AllPetitions from "@/pages/reception/AllPetitions";
import AssignedPetitions from "@/pages/officer/AssignedPetitions";
import Submissions from "@/pages/officer/Submissions";
import CommissionerAssignedPetitions from "@/pages/commissioner/AssignedPetitions";
import Decisions from "@/pages/commissioner/Decisions";
import DecisionReview from "@/pages/commissioner/DecisionReview";
import PetitionAssignment from "@/pages/commissioner/PetitionAssignment";
import FeedbackSubmission from "@/pages/officer/FeedbackSubmission";
import UserManagement from "@/pages/admin/UserManagement";
import AdminPetitions from "@/pages/admin/AdminPetitions";
import SystemSettings from "@/pages/admin/SystemSettings";
import NotFound from "@/pages/NotFound";
import PendingPetitions from "@/pages/commissioner/PendingPetitions";
import DecidedPetitions from "@/pages/commissioner/DecidedPetitions";
import ReviewDecisions from "@/pages/commissioner/ReviewDecisions";
import Analytics from "@/pages/commissioner/Analytics";
import { FileText, BarChart3 } from "lucide-react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ 
  element, 
  allowedRoles = [], 
}: { 
  element: React.ReactNode, 
  allowedRoles?: string[],
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
    switch (currentUser.role) {
      case "Reception":
        return <Navigate to="/reception" replace />;
      case "EnquiryOfficer":
        return <Navigate to="/officer" replace />;
      case "HOD":
        return <Navigate to="/commissioner" replace />;
      case "Admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  
  return <>{element}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, currentUser } = useAuth();
  
  const renderHome = () => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }
    
    switch (currentUser?.role) {
      case "Reception":
        return <Navigate to="/reception" replace />;
      case "EnquiryOfficer":
        return <Navigate to="/officer" replace />;
      case "HOD":
        return <Navigate to="/commissioner" replace />;
      case "Admin":
        return <Navigate to="/admin" replace />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={renderHome()} />
      
      <Route
        path="/reception"
        element={
          <ProtectedRoute
            element={<AppShell><ReceptionDashboard /></AppShell>}
            allowedRoles={["Reception", "Admin"]}
          />
        }
      />
      <Route
        path="/reception/new-petition"
        element={
          <ProtectedRoute
            element={<AppShell><NewPetitionForm /></AppShell>}
            allowedRoles={["Reception", "Admin"]}
          />
        }
      />
      <Route
        path="/reception/petitions"
        element={
          <ProtectedRoute
            element={<AppShell><AllPetitions /></AppShell>}
            allowedRoles={["Reception", "Admin"]}
          />
        }
      />
      
      <Route
        path="/officer"
        element={
          <ProtectedRoute
            element={<AppShell><OfficerDashboard /></AppShell>}
            allowedRoles={["EnquiryOfficer", "Admin"]}
          />
        }
      />
      <Route
        path="/officer/assigned"
        element={
          <ProtectedRoute
            element={<AppShell><AssignedPetitions /></AppShell>}
            allowedRoles={["EnquiryOfficer", "Admin"]}
          />
        }
      />
      <Route
        path="/officer/assigned/:id"
        element={
          <ProtectedRoute
            element={<AppShell><FeedbackSubmission /></AppShell>}
            allowedRoles={["EnquiryOfficer", "Admin"]}
          />
        }
      />
      <Route
        path="/officer/submissions"
        element={
          <ProtectedRoute
            element={<AppShell><Submissions /></AppShell>}
            allowedRoles={["EnquiryOfficer", "Admin"]}
          />
        }
      />
      
      <Route
        path="/commissioner"
        element={
          <ProtectedRoute
            element={<AppShell><CommissionerDashboard /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/analytics"
        element={
          <ProtectedRoute
            element={<AppShell><Analytics /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/pending"
        element={
          <ProtectedRoute
            element={<AppShell><PendingPetitions /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/pending/:id"
        element={
          <ProtectedRoute
            element={<AppShell><PetitionAssignment /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/assigned"
        element={
          <ProtectedRoute
            element={<AppShell><CommissionerAssignedPetitions /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/decisions"
        element={
          <ProtectedRoute
            element={<AppShell><Decisions /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/decisions/:id/review"
        element={
          <ProtectedRoute
            element={<AppShell><DecisionReview /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/decided"
        element={
          <ProtectedRoute
            element={<AppShell><DecidedPetitions /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/review-decisions"
        element={
          <ProtectedRoute
            element={<AppShell><ReviewDecisions /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      <Route
        path="/commissioner/review-decisions/:id"
        element={
          <ProtectedRoute
            element={<AppShell><DecisionReview /></AppShell>}
            allowedRoles={["HOD", "Admin"]}
          />
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            element={<AppShell><AdminDashboard /></AppShell>}
            allowedRoles={["Admin"]}
          />
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute
            element={<AppShell><UserManagement /></AppShell>}
            allowedRoles={["Admin"]}
          />
        }
      />
      <Route
        path="/admin/petitions"
        element={
          <ProtectedRoute
            element={<AppShell><AdminPetitions /></AppShell>}
            allowedRoles={["Admin"]}
          />
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute
            element={<AppShell><SystemSettings /></AppShell>}
            allowedRoles={["Admin"]}
          />
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
