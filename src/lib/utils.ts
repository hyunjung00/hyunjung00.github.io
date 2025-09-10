import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Router paths (do not include BASE_URL); Router handles base/hash
export const homeUrl = "/";
export const publicationsUrl = "/publications";
export const publicationUrl = (slug: string) => `/publications/${slug}`;
export const experienceUrl = (slug: string) => `/experience/${slug}`;
export const experienceIndexUrl = "/experience";
