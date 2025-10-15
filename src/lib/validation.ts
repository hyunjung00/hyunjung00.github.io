import { z } from 'zod';

const ContactSchema = z.object({
  type: z.enum(['email', 'phone', 'linkedin', 'website', 'address']),
  value: z.string().min(1),
  url: z.string().optional(),
  label: z.string().optional(),
});

const PublicationSchema = z.object({
  authors: z.array(z.string().min(1)),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 10),
  title: z.string().min(1),
  venue: z.string().min(1),
  notes: z.string().optional(),
  link: z.string().url().optional(),
  equal_contrib: z.array(z.number().int().min(0)).optional(),
  type: z.enum(['journal', 'conference', 'workshop', 'preprint']).optional(),
  bold_authors: z.array(z.number().int().min(0)).optional(),
});

const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 10),
  gpa: z.string().optional(),
  location: z.string().optional(),
  interests: z.array(z.string()).optional(),
  thesis: z.string().optional(),
  advisor: z.string().optional(),
});

const ExperienceSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  bullets: z.array(z.string().min(1)),
  supervisor: z.string().optional(),
});

export const CVProfileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  contacts: z.array(ContactSchema),
  profile_summary: z.string().min(1),
  avatar: z.string().optional(),
  publications: z.array(PublicationSchema),
  education: z.array(EducationSchema),
  experience: z.array(ExperienceSchema),
  skills: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
});

export function validateCVProfile(data: unknown) {
  try {
    return CVProfileSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('CV Profile validation failed:', error.issues);
      throw new Error(`Invalid CV profile data: ${error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
}