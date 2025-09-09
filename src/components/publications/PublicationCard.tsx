import { DetailedPublication } from "@/types/content";
import { publicationUrl } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ExternalLink, Award, FileText } from "lucide-react";

interface PublicationCardProps {
  publication: DetailedPublication;
  showAbstract?: boolean;
}

const VenueBadge = ({ venueType }: { venueType?: string }) => {
  const getVenueColor = (venue?: string) => {
    const colors: Record<string, string> = {
      MICCAI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ICML: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      ICLR: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      NeurIPS: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      CVPR: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "IEEE TMI":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      Nature: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Science:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return (
      colors[venue || ""] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  if (!venueType) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVenueColor(
        venueType
      )}`}
    >
      <Award className="w-3 h-3 mr-1" />
      {venueType}
    </span>
  );
};

const LinkIcon = ({ type }: { type: string }) => {
  const icons = {
    pdf: FileText,
    doi: ExternalLink,
    arxiv: FileText,
    code: ExternalLink,
    website: ExternalLink,
    bibtex: FileText,
  };
  const Icon = icons[type as keyof typeof icons] || ExternalLink;
  return <Icon className="w-4 h-4" />;
};

const formatAuthors = (authors: string[], equalContrib?: number[]) => {
  return authors.map((author, index) => {
    const isEqualContrib = equalContrib?.includes(index);
    return (
      <span key={index} className={isEqualContrib ? "equal-contrib" : ""}>
        {author}
        {isEqualContrib && "*"}
        {index < authors.length - 1 && ", "}
      </span>
    );
  });
};

export function PublicationCard({
  publication,
  showAbstract = false,
}: PublicationCardProps) {
  const hasEqualContrib =
    publication.equal_contrib && publication.equal_contrib.length > 0;

  return (
    <article className="bg-card border border-border-light rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header with venue badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="publication-title text-lg mb-2">
              <Link to={publicationUrl(publication.slug)} className="hover:text-primary transition-colors">
                {publication.title}
              </Link>
            </h3>
            <div className="publication-authors text-sm mb-1">
              {formatAuthors(publication.authors, publication.equal_contrib)}
              {hasEqualContrib && (
                <span className="text-xs text-caption ml-1">
                  (*equal contribution)
                </span>
              )}
            </div>
          </div>
          <VenueBadge venueType={publication.venue_type} />
        </div>

        {/* Publication details */}
        <div className="publication-venue text-sm">
          <span className="font-medium">{publication.venue}</span>,{" "}
          {publication.year}
          {publication.impact_factor && (
            <span className="text-caption ml-2">
              • IF: {publication.impact_factor}
            </span>
          )}
          {publication.citation_count && (
            <span className="text-caption ml-2">
              • {publication.citation_count} citations
            </span>
          )}
        </div>

        {/* Abstract */}
        {showAbstract && publication.abstract && (
          <div className="text-body text-sm">
            <strong>Abstract:</strong> {publication.abstract}
          </div>
        )}

        {/* Keywords */}
        {publication.keywords && publication.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {publication.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {publication.links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border-light">
            {publication.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-muted text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-md text-sm external-link-icon"
              >
                <LinkIcon type={link.type} />
                {link.label || link.type.toUpperCase()}
              </a>
            ))}
          </div>
        )}

        {/* Notes */}
        {publication.notes && (
          <div className="text-caption text-sm italic border-t border-border-light pt-2">
            {publication.notes}
          </div>
        )}
      </div>
    </article>
  );
}
