import { Publication } from "@/types/cv";
import { ExternalLink } from "lucide-react";
import { groupPublicationsByYear, publicationYearLabel } from "@/lib/publications";

interface PublicationsSectionProps {
  publications: Publication[];
}

const formatAuthors = (authors: string[], equalContrib?: number[], boldAuthors?: number[]) =>
  authors.map((author, index) => (
    <span key={index} className={boldAuthors?.includes(index) ? "first-author" : ""}>
      {author}{equalContrib?.includes(index) && "*"}
      {index < authors.length - 1 && ", "}
    </span>
  ));

export function PublicationsSection({ publications }: PublicationsSectionProps) {
  if (publications.length === 0) return null;

  return (
    <section className="cv-section">
      <h2 className="cv-heading">Publications</h2>
      {groupPublicationsByYear(publications).map((group) => (
        <section key={group.label} className="mb-8" aria-label={`Publications: ${group.label}`}>
          <h3 className="cv-subheading border-b border-border-light pb-2 mb-4">
            {publicationYearLabel(group.year)}
          </h3>
          <ol className="space-y-6">
            {group.publications.map((pub) => (
              <li key={pub.title} className="cv-content">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="publication-authors">
                      {formatAuthors(pub.authors, pub.equal_contrib, pub.bold_authors)}
                      {!!pub.equal_contrib?.length && (
                        <span className="text-xs text-caption ml-1">(*equal contribution)</span>
                      )}
                    </div>
                    <div className="publication-title">"{pub.title}"</div>
                    <div className="publication-venue">{pub.venue}</div>
                    {pub.status && (
                      <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        pub.status === "under_review" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {pub.status === "under_review" ? "Under review" : "Published"}
                      </span>
                    )}
                    {pub.notes && <div className="text-sm text-caption">{pub.notes}</div>}
                  </div>
                  {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm no-print"
                      aria-label={`View publication: ${pub.title}`}>
                      <span className="hidden sm:inline">View</span>
                      <ExternalLink className="w-4 h-4 external-link-icon" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </section>
  );
}
