import { z } from 'zod';
import type { DetailedPublication } from '@/types/content';

const PublicationLinkSchema = z.object({
  type: z.enum(['pdf', 'arxiv', 'doi', 'code', 'website', 'bibtex']),
  url: z.string().url(),
  label: z.string().optional(),
});

const DetailedPublicationSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string().min(1)),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 10).nullable(),
  venue: z.string().min(1).optional(),
  type: z.enum(['journal', 'conference', 'workshop', 'preprint']),
  links: z.array(PublicationLinkSchema),
  notes: z.string().optional(),
  equal_contrib: z.array(z.number().int().min(0)).optional(),
  bold_authors: z.array(z.number().int().min(0)).optional(),
  status: z.enum(['published', 'under_review']).optional(),
  abstract: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  venue_type: z.string().min(1).optional(),
  impact_factor: z.string().optional(),
  citation_count: z.number().int().min(0).optional(),
}).superRefine((publication, context) => {
  if (publication.status === 'under_review') {
    if (publication.venue || publication.venue_type) {
      context.addIssue({
        code: 'custom',
        path: ['venue'],
        message: 'Under-review publications must not expose a submission venue',
      });
    }
    return;
  }

  if (!publication.venue) {
    context.addIssue({
      code: 'custom',
      path: ['venue'],
      message: 'Published publications must include a venue',
    });
  }
});

const DetailedExperienceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  bullets: z.array(z.string().min(1)),
  supervisor: z.string().optional(),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  team_size: z.number().int().min(1).optional(),
  budget: z.string().optional(),
});

export const PublicationsDataSchema = z.object({
  publications: z.array(DetailedPublicationSchema),
});

export const ExperienceDataSchema = z.object({
  experiences: z.array(DetailedExperienceSchema),
});

export function validatePublications(data: unknown): { publications: DetailedPublication[] } {
  try {
    // strictNullChecks is disabled in the existing project; Zod's nullable year
    // is inferred as optional, although the runtime schema requires the field.
    return PublicationsDataSchema.parse(data) as { publications: DetailedPublication[] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Publications validation failed:', error.issues);
      throw new Error(`Invalid publications data: ${error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
}

export function validateExperience(data: unknown) {
  try {
    return ExperienceDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Experience validation failed:', error.issues);
      throw new Error(`Invalid experience data: ${error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
}
