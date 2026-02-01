import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Qatar - Single Region */}
          <Route path="/" element={<QatarHome />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
