import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PublicationsPage } from "./pages/Publications";
import { ExperiencePage } from "./pages/Experience";
import { PublicationDetailPage } from "./pages/PublicationDetail";
import { ExperienceDetailPage } from "./pages/ExperienceDetail";
import { validatePublications, validateExperience } from "./lib/contentValidation";
import publicationsData from "../content/publications.json";
import experienceData from "../content/experience.json";

const queryClient = new QueryClient();

// Load and validate content data
let publications, experiences;
try {
  publications = validatePublications(publicationsData).publications;
  experiences = validateExperience(experienceData).experiences;
} catch (error) {
  console.error("Content validation failed:", error);
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/publications" element={<PublicationsPage publications={publications || []} />} />
          <Route path="/publications/:slug" element={
            <PublicationDetailPage slug={window.location.pathname.split('/').pop() || ''} />
          } />
          <Route path="/experience" element={<ExperiencePage experiences={experiences || []} />} />
          <Route path="/experience/:slug" element={
            <ExperienceDetailPage slug={window.location.pathname.split('/').pop() || ''} />
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
