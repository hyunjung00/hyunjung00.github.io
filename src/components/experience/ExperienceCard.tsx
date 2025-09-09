import { DetailedExperience } from "@/types/content";
import { experienceUrl } from "@/lib/utils";
import { MapPin, Calendar, User, Users, DollarSign } from "lucide-react";

interface ExperienceCardProps {
  experience: DetailedExperience;
  showDescription?: boolean;
}

const formatDateRange = (startDate: string, endDate?: string) => {
  return `${startDate} - ${endDate || "Present"}`;
};

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0) {
    return months > 0 ? `${years}y ${months}m` : `${years}y`;
  }
  return `${months}m`;
};

export function ExperienceCard({
  experience,
  showDescription = false,
}: ExperienceCardProps) {
  return (
    <article className="bg-card border border-border-light rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-heading mb-1">
              <a
                href={experienceUrl(experience.slug)}
                className="hover:text-primary transition-colors"
              >
                {experience.role}
              </a>
            </h3>
            <p className="text-primary font-medium text-base">
              {experience.organization}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-caption">
              {experience.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
              )}
              {experience.supervisor && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {experience.supervisor}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-heading font-medium mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              {formatDateRange(experience.start_date, experience.end_date)}
            </div>
            <span className="text-caption text-sm">
              {calculateDuration(experience.start_date, experience.end_date)}
            </span>
          </div>
        </div>

        {/* Description */}
        {showDescription && experience.description && (
          <div className="text-body">{experience.description}</div>
        )}

        {/* Key metrics */}
        {(experience.team_size || experience.budget) && (
          <div className="flex flex-wrap gap-4 text-sm">
            {experience.team_size && (
              <span className="flex items-center gap-1 text-caption">
                <Users className="w-4 h-4" />
                Team of {experience.team_size}
              </span>
            )}
            {experience.budget && (
              <span className="flex items-center gap-1 text-caption">
                <DollarSign className="w-4 h-4" />
                Budget: {experience.budget}
              </span>
            )}
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-heading">Technologies:</h4>
            <div className="flex flex-wrap gap-1">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-muted text-primary text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key bullets (first 3) */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-heading">
            Key Responsibilities:
          </h4>
          <ul className="space-y-1">
            {experience.bullets.slice(0, 3).map((bullet, index) => (
              <li
                key={index}
                className="text-body text-sm relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold"
              >
                {bullet}
              </li>
            ))}
            {experience.bullets.length > 3 && (
              <li className="text-caption text-sm italic">
                ...and {experience.bullets.length - 3} more
              </li>
            )}
          </ul>
        </div>

        {/* Top achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="border-t border-border-light pt-3">
            <h4 className="text-sm font-medium text-heading mb-2">
              Key Achievements:
            </h4>
            <ul className="space-y-1">
              {experience.achievements.slice(0, 2).map((achievement, index) => (
                <li
                  key={index}
                  className="text-accent-foreground text-sm relative pl-4 before:content-['★'] before:absolute before:left-0 before:text-primary"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
