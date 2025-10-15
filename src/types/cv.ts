export interface Contact {
  type: "email" | "phone" | "linkedin" | "website" | "address";
  value: string;
  url?: string;
  label?: string;
}

export interface Publication {
  authors: string[];
  year: number;
  title: string;
  venue: string;
  notes?: string;
  link?: string;
  equal_contrib?: number[]; // Indices of authors with equal contribution
  type?: "journal" | "conference" | "workshop" | "preprint";
  bold_authors?: number[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: number;
  gpa?: string;
  location?: string;
  interests?: string[];
  thesis?: string;
  advisor?: string;
}

export interface Experience {
  title: string;
  organization: string;
  location?: string;
  start_date: string;
  end_date?: string;
  bullets: string[];
  supervisor?: string;
}

export interface CVProfile {
  name: string;
  role: string;
  location?: string;
  contacts: Contact[];
  profile_summary: string;
  avatar?: string;
  publications: Publication[];
  education: Education[];
  experience: Experience[];
  skills?: string[];
  awards?: string[];
  languages?: string[];
}
