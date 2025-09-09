import { DetailedPublication } from '@/types/content';
import { validatePublications } from '@/lib/contentValidation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Navigation } from '@/components/ui/Navigation';
import { PublicationCard } from '@/components/publications/PublicationCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, FileText, Award } from 'lucide-react';
import publicationsData from '../../content/publications.json';

interface PublicationDetailPageProps {
  slug: string;
}

export function PublicationDetailPage({ slug }: PublicationDetailPageProps) {
  // Validate and get publications data
  let publications: DetailedPublication[];
  try {
    const validatedData = validatePublications(publicationsData);
    publications = validatedData.publications;
  } catch (error) {
    console.error('Failed to load publications:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-destructive mb-4">Publication Data Error</h1>
          <p className="text-body mb-4">
            There was an error loading the publications data. Please check the content/publications.json file.
          </p>
        </div>
      </div>
    );
  }

  // Find the publication by slug
  const publication = publications.find(p => p.slug === slug);

  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-heading mb-4">Publication Not Found</h1>
          <p className="text-body mb-4">
            The requested publication could not be found.
          </p>
          <Button asChild variant="outline">
            <a href="/publications">Back to Publications</a>
          </Button>
        </div>
      </div>
    );
  }

  const formatAuthors = (authors: string[], equalContrib?: number[]) => {
    return authors.map((author, index) => {
      const isEqualContrib = equalContrib?.includes(index);
      return (
        <span key={index} className={isEqualContrib ? 'equal-contrib' : ''}>
          {author}
          {isEqualContrib && '*'}
          {index < authors.length - 1 && ', '}
        </span>
      );
    });
  };

  const hasEqualContrib = publication.equal_contrib && publication.equal_contrib.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Navigation className="mb-8" />
        <Breadcrumbs
          items={[
            { label: 'Publications', href: '/publications' },
            { label: publication.title }
          ]} 
        />

        {/* Back button */}
        <div className="mb-6 no-print">
          <Button variant="outline" asChild>
            <a href="/publications" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Publications
            </a>
          </Button>
        </div>

        {/* Publication details */}
        <article className="bg-card border border-border-light rounded-lg p-8 print:border-0 print:shadow-none">
          {/* Header */}
          <header className="mb-8">
            {publication.venue_type && (
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  publication.venue_type === 'MICCAI' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  publication.venue_type === 'ICML' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                  publication.venue_type === 'IEEE TMI' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  <Award className="w-4 h-4 mr-2" />
                  {publication.venue_type}
                </span>
              </div>
            )}
            
            <h1 className="text-3xl font-bold text-heading mb-4 leading-tight">
              {publication.title}
            </h1>
            
            <div className="space-y-3">
              <div className="publication-authors text-lg">
                {formatAuthors(publication.authors, publication.equal_contrib)}
                {hasEqualContrib && (
                  <p className="text-sm text-caption mt-1">*Authors contributed equally to this work</p>
                )}
              </div>
              
              <div className="publication-venue text-lg">
                <span className="font-medium">{publication.venue}</span>, {publication.year}
              </div>
              
              {/* Metrics */}
              <div className="flex flex-wrap gap-4 text-sm text-caption">
                {publication.impact_factor && (
                  <span>Impact Factor: {publication.impact_factor}</span>
                )}
                {publication.citation_count && (
                  <span>{publication.citation_count} citations</span>
                )}
                <span className="capitalize">{publication.type}</span>
              </div>
            </div>
          </header>

          {/* Abstract */}
          {publication.abstract && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-heading mb-3">Abstract</h2>
              <p className="text-body leading-relaxed text-base">
                {publication.abstract}
              </p>
            </section>
          )}

          {/* Keywords */}
          {publication.keywords && publication.keywords.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-heading mb-3">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {publication.links.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-heading mb-3">Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {publication.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-primary-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg group external-link-icon"
                  >
                    <div className="flex-shrink-0">
                      {link.type === 'pdf' || link.type === 'bibtex' ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">
                        {link.label || link.type.toUpperCase()}
                      </div>
                      <div className="text-xs opacity-75 truncate">
                        {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Notes */}
          {publication.notes && (
            <section className="border-t border-border-light pt-6">
              <h2 className="text-xl font-semibold text-heading mb-3">Additional Notes</h2>
              <p className="text-body italic">
                {publication.notes}
              </p>
            </section>
          )}

          {/* Print actions */}
          <div className="mt-8 pt-6 border-t border-border-light no-print">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <a href="/publications">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Publications
                </a>
              </Button>
              <Button onClick={() => window.print()} variant="outline">
                Print/PDF
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}