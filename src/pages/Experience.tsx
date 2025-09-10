import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Building } from "lucide-react";
import { DetailedExperience } from "@/types/content";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Navigation } from "@/components/ui/Navigation";
import Fuse from "fuse.js";

interface ExperiencePageProps {
  experiences: DetailedExperience[];
}

export function ExperiencePage({ experiences }: ExperiencePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(experiences, {
      keys: [
        { name: "role", weight: 0.3 },
        { name: "organization", weight: 0.3 },
        { name: "description", weight: 0.2 },
        { name: "bullets", weight: 0.1 },
        { name: "technologies", weight: 0.1 },
      ],
      threshold: 0.3,
    });
  }, [experiences]);

  // Get unique organizations
  const organizations = useMemo(() => {
    const orgSet = new Set(experiences.map((e) => e.organization));
    return Array.from(orgSet).sort();
  }, [experiences]);

  // Define time periods
  const periods = [
    { value: "current", label: "Current (2023-Present)" },
    { value: "recent", label: "Recent (2020-2023)" },
    { value: "past", label: "Past (Before 2020)" },
  ];

  // Filter experiences by period
  const filterByPeriod = (experience: DetailedExperience, period: string) => {
    const startYear = parseInt(experience.start_date.split("-")[0]);
    const endYear = experience.end_date
      ? parseInt(experience.end_date.split("-")[0])
      : new Date().getFullYear();

    switch (period) {
      case "current":
        return !experience.end_date || endYear >= 2023;
      case "recent":
        return startYear >= 2020 && startYear < 2023;
      case "past":
        return startYear < 2020;
      default:
        return true;
    }
  };

  // Filter and search experiences
  const filteredExperiences = useMemo(() => {
    let result = experiences;

    // Apply filters
    if (selectedOrg !== "all") {
      result = result.filter((e) => e.organization === selectedOrg);
    }
    if (selectedPeriod !== "all") {
      result = result.filter((e) => filterByPeriod(e, selectedPeriod));
    }

    // Apply search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery.trim());
      const searchedItems = searchResults.map((result) => result.item);
      result = result.filter((e) => searchedItems.includes(e));
    }

    // Sort by start date (newest first)
    return result.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [experiences, selectedOrg, selectedPeriod, searchQuery, fuse]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedOrg("all");
    setSelectedPeriod("all");
  };

  const hasActiveFilters =
    searchQuery || selectedOrg !== "all" || selectedPeriod !== "all";

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Navigation className="mb-8" />
        <Breadcrumbs items={[{ label: "Experience" }]} />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">
            Professional Experience
          </h1>
          <p className="text-body text-lg">
            Research positions and professional roles in AI and machine learning
          </p>
        </header>

        {/* Search and Filters */}
        <div className="bg-card border border-border-light rounded-lg p-6 mb-8 no-print">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-caption" />
              <Input
                type="text"
                placeholder="Search experience by role, organization, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-heading mb-2 block">
                  Organization
                </label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger>
                    <Building className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All organizations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All organizations</SelectItem>
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-heading mb-2 block">
                  Time Period
                </label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger>
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All periods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All periods</SelectItem>
                    {periods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-caption">
              Showing {filteredExperiences.length} of {experiences.length}{" "}
              positions
              {hasActiveFilters && " (filtered)"}
            </p>
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="no-print"
            >
              Print/PDF
            </Button>
          </div>

          {/* Experience list */}
          {filteredExperiences.length > 0 ? (
            <div className="space-y-6">
              {filteredExperiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  showDescription={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-caption text-lg mb-4">No experience found</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters to see all experience
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
