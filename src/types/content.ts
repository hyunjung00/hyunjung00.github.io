export interface PublicationLink {
  type: 'pdf' | 'arxiv' | 'doi' | 'code' | 'website' | 'bibtex';
  url: string;
  label?: string;
}

export interface DetailedPublication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string;
  type: 'journal' | 'conference' | 'workshop' | 'preprint';
  links: PublicationLink[];
  notes?: string;
  equal_contrib?: number[];
  bold_authors?: number[];
  status?: 'published' | 'under_review';
  abstract?: string;
  keywords?: string[];
  venue_type?: string;
  impact_factor?: string;
  citation_count?: number;
}

export interface DetailedExperience {
  id: string;
  slug: string;
  organization: string;
  role: string;
  location?: string;
  start_date: string;
  end_date?: string;
  bullets: string[];
  supervisor?: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
  team_size?: number;
  budget?: string;
}

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
