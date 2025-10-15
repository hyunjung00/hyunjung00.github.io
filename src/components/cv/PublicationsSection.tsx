import { Publication } from "@/types/cv";
import { ExternalLink } from "lucide-react";

interface PublicationsSectionProps {
  publications: Publication[];
}

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

const formatCitation = (pub: Publication) => {
  const hasEqualContrib = pub.equal_contrib && pub.equal_contrib.length > 0;

  return (
    <div className="space-y-1">
      <div className="publication-authors">
        {formatAuthors(pub.authors, pub.equal_contrib)}
        {hasEqualContrib && (
          <span className="text-xs text-caption ml-1">
            (*equal contribution)
          </span>
        )}
      </div>
      <div>
        <span className="publication-title">"{pub.title}"</span>
      </div>
      <div className="publication-venue">
        {pub.venue}, {pub.year}
      </div>
      {pub.notes && <div className="text-sm text-caption">{pub.notes}</div>}
    </div>
  );
};

export function PublicationsSection({
  publications,
}: PublicationsSectionProps) {
  if (publications.length === 0) return null;

  // Group publications by type
  const groupedPubs = publications.reduce((acc, pub) => {
    const type = pub.type || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  const typeOrder = ["journal", "conference", "workshop", "preprint", "other"];
  const typeLabels = {
    journal: "Journal Articles",
    conference: "Conference Papers",
    workshop: "Workshop Papers",
    preprint: "Preprints",
    other: "Other Publications",
  };

  return (
    <section className="cv-section">
      <h2 className="cv-heading">Publications</h2>

      {publications.map((pub) => (
        <div key={pub.title} className="mb-6">
          <ol className="space-y-4">
            <li key={pub.authors.join(",")} className="cv-content">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">{formatCitation(pub)}</div>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm no-print"
                    aria-label={`View publication: ${pub.title}`}
                  >
                    <span className="hidden sm:inline">View</span>
                    <ExternalLink className="w-4 h-4 external-link-icon" />
                  </a>
                )}
              </div>
            </li>
          </ol>
        </div>
      ))}

      {/* {typeOrder.map(type => {
        const pubs = groupedPubs[type];
        if (!pubs?.length) return null;
        
        return (
          <div key={type} className="mb-6">
            <h3 className="cv-subheading">{typeLabels[type as keyof typeof typeLabels]}</h3>
            <ol className="space-y-4">
              {pubs
                .sort((a, b) => b.year - a.year)
                .map((pub, index) => (
                  <li key={index} className="cv-content">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        {formatCitation(pub)}
                      </div>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm no-print"
                          aria-label={`View publication: ${pub.title}`}
                        >
                          <span className="hidden sm:inline">View</span>
                          <ExternalLink className="w-4 h-4 external-link-icon" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        );
      })} */}
    </section>
  );
}
