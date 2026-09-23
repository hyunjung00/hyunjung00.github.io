import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthYear(value: string): string {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return value;

  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateRange(startDate: string, endDate?: string): string {
  return `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : "Present"}`;
}

// Router paths (do not include BASE_URL); Router handles base/hash
export const homeUrl = "/";
export const publicationsUrl = "/publications";
export const publicationUrl = (slug: string) => `/publications/${slug}`;
export const experienceUrl = (slug: string) => `/experience/${slug}`;
export const experienceIndexUrl = "/experience";
