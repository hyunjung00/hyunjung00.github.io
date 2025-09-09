// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PublicationsPage } from "./pages/Publications";
import { ExperiencePage } from "./pages/Experience";
import { PublicationDetailPage } from "./pages/PublicationDetail";
import { ExperienceDetailPage } from "./pages/ExperienceDetail";
import {
  validatePublications,
  validateExperience,
} from "./lib/contentValidation";
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

// Wrapper components that read :slug from the router
function PubDetail() {
  const { slug = "" } = useParams();
  return <PublicationDetailPage slug={slug} />;
}
function ExpDetail() {
  const { slug = "" } = useParams();
  return <ExperienceDetailPage slug={slug} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* basename ensures correct routing under / or /repo-name/ */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/publications"
            element={<PublicationsPage publications={publications || []} />}
          />
          <Route path="/publications/:slug" element={<PubDetail />} />
          <Route
            path="/experience"
            element={<ExperiencePage experiences={experiences || []} />}
          />
          <Route path="/experience/:slug" element={<ExpDetail />} />
          {/* Keep this catch-all for SPA 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
