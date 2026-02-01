import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationProvider } from "./context/RegistrationContext";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

// Qatar pages
import QatarHome from "./pages/qatar/QatarHome";
import QatarAbout from "./pages/qatar/QatarAbout";
import QatarPricing from "./pages/qatar/QatarPricing";
import QatarContact from "./pages/qatar/QatarContact";
import QatarSector from "./pages/qatar/QatarSector";
import NiaIso27k from "./pages/qatar/NiaIso27k";
import RiskRegistrySoa from "./pages/qatar/RiskRegistrySoa";
import PciDssQcb from "./pages/qatar/PciDssQcb";

// Auth & app pages
import Registration from "./pages/auth/Registration/Registration";
import Login from "./pages/auth/Registration/Login";
import VerifyEmailPage from "./pages/auth/VerifyEmail/verifyemail";
import ResetPasswordPage from "./pages/auth/forgetPassword/forgetPassword";
import ProfileCompletion from "./pages/ProfileCompletion";
import KnowMyOrg from "./pages/MyOrgnization/KnowMyOrg";
import RegisterStatusPage from "./pages/checkSteps/checkSteps";
import RateAssessment from "./pages/AssessmentQuestion/questionAssessment";
import ResultAssessment from "./pages/AssessmentQuestion/resultAssessment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RegistrationProvider>
          <ScrollToTop />
        <Routes>
            <Route path="/" element={<QatarHome />} />
            <Route path="/auth/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verifyemail" element={<VerifyEmailPage />} />
            <Route path="/checkSteps" element={<RegisterStatusPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/questionAssessment" element={<RateAssessment />} />
            <Route path="/resultAssessment" element={<ResultAssessment />} />
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            <Route path="/know-my-org" element={<KnowMyOrg />} />
            <Route path="/assessment-question" element={<RateAssessment />} />

            <Route path="/qatar" element={<QatarHome />} />
            <Route path="/qatar/about" element={<QatarAbout />} />
            <Route path="/qatar/pricing" element={<QatarPricing />} />
            <Route path="/qatar/contact" element={<QatarContact />} />
            <Route path="/qatar/sector" element={<QatarSector />} />
            <Route path="/qatar/nia-iso27k" element={<NiaIso27k />} />
            <Route path="/qatar/risk-registry-soa" element={<RiskRegistrySoa />} />
            <Route path="/qatar/pci-dss-qcb" element={<PciDssQcb />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </RegistrationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
