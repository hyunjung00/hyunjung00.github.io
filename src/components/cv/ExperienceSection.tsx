import { Experience } from '@/types/cv';
import { MapPin, Calendar, User } from 'lucide-react';

interface ExperienceSectionProps {
  experience: Experience[];
}

const formatDateRange = (startDate: string, endDate?: string) => {
  return `${startDate} - ${endDate || 'Present'}`;
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (experience.length === 0) return null;

  return (
    <section className="cv-section">
      <h2 className="cv-heading">Research Experience</h2>
      
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="cv-content">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-heading text-lg">{exp.title}</h3>
                <p className="text-primary font-medium">{exp.organization}</p>
                {exp.location && (
                  <p className="text-caption flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                )}
                {exp.supervisor && (
                  <p className="text-caption flex items-center gap-1 text-sm">
                    <User className="w-3 h-3" />
                    Supervisor: {exp.supervisor}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium text-heading flex items-center gap-1 sm:justify-end">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDateRange(exp.start_date, exp.end_date)}
                </p>
              </div>
            </div>
            
            <ul className="space-y-2 ml-4">
              {exp.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="text-body relative before:content-['•'] before:absolute before:-left-4 before:text-primary before:font-bold"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}