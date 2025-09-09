import { DetailedExperience } from '@/types/content';
import { validateExperience } from '@/lib/contentValidation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Navigation } from '@/components/ui/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, User, Users, DollarSign, Star } from 'lucide-react';
import experienceData from '../../content/experience.json';

interface ExperienceDetailPageProps {
  slug: string;
}

export function ExperienceDetailPage({ slug }: ExperienceDetailPageProps) {
  // Validate and get experience data
  let experiences: DetailedExperience[];
  try {
    const validatedData = validateExperience(experienceData);
    experiences = validatedData.experiences;
  } catch (error) {
    console.error('Failed to load experience:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-destructive mb-4">Experience Data Error</h1>
          <p className="text-body mb-4">
            There was an error loading the experience data. Please check the content/experience.json file.
          </p>
        </div>
      </div>
    );
  }

  // Find the experience by slug
  const experience = experiences.find(e => e.slug === slug);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-heading mb-4">Experience Not Found</h1>
          <p className="text-body mb-4">
            The requested experience could not be found.
          </p>
          <Button asChild variant="outline">
            <a href="/experience">Back to Experience</a>
          </Button>
        </div>
      </div>
    );
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    return `${startDate} - ${endDate || 'Present'}`;
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return months > 0 ? `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Navigation className="mb-8" />
        <Breadcrumbs
          items={[
            { label: 'Experience', href: '/experience' },
            { label: `${experience.role} at ${experience.organization}` }
          ]} 
        />

        {/* Back button */}
        <div className="mb-6 no-print">
          <Button variant="outline" asChild>
            <a href="/experience" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Experience
            </a>
          </Button>
        </div>

        {/* Experience details */}
        <article className="bg-card border border-border-light rounded-lg p-8 print:border-0 print:shadow-none">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-heading mb-2 leading-tight">
              {experience.role}
            </h1>
            <h2 className="text-2xl text-primary font-medium mb-4">
              {experience.organization}
            </h2>
            
            {/* Meta information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-caption">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Duration:</span>
                  {formatDateRange(experience.start_date, experience.end_date)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4" />
                  <span className="text-sm">({calculateDuration(experience.start_date, experience.end_date)})</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {experience.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Location:</span>
                    {experience.location}
                  </div>
                )}
                {experience.supervisor && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Supervisor:</span>
                    {experience.supervisor}
                  </div>
                )}
              </div>
            </div>

            {/* Key metrics */}
            {(experience.team_size || experience.budget) && (
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                {experience.team_size && (
                  <div className="flex items-center gap-2 text-caption">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">Team Size:</span>
                    {experience.team_size} people
                  </div>
                )}
                {experience.budget && (
                  <div className="flex items-center gap-2 text-caption">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-medium">Budget:</span>
                    {experience.budget}
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Description */}
          {experience.description && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-heading mb-3">Overview</h3>
              <p className="text-body leading-relaxed text-base">
                {experience.description}
              </p>
            </section>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-heading mb-3">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-muted text-primary rounded-md text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Responsibilities */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-heading mb-3">Key Responsibilities</h3>
            <ul className="space-y-3">
              {experience.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="text-body relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold before:text-lg"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-heading mb-3">Key Achievements</h3>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="text-body relative pl-6 before:content-['★'] before:absolute before:left-0 before:text-primary before:text-lg"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Print actions */}
          <div className="mt-8 pt-6 border-t border-border-light no-print">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <a href="/experience">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Experience
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