import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Base-aware route helpers (work with BrowserRouter and HashRouter)
const isHashRouter = import.meta.env.PROD && import.meta.env.BASE_URL !== "/";
const baseForPaths = isHashRouter ? "/" : import.meta.env.BASE_URL;

export const homeUrl = `${baseForPaths}`;
export const publicationsUrl = `${baseForPaths}publications`;
export const publicationUrl = (slug: string) =>
  `${baseForPaths}publications/${slug}`;
export const experienceUrl = (slug: string) =>
  `${baseForPaths}experience/${slug}`;
export const experienceIndexUrl = `${baseForPaths}experience`;
