import { Education } from '@/types/cv';
import { MapPin, GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section className="cv-section">
      <h2 className="cv-heading">Education</h2>
      
      <div className="space-y-6">
        {education
          .sort((a, b) => b.year - a.year)
          .map((edu, index) => (
            <div key={index} className="cv-content">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-heading flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  {edu.location && (
                    <p className="text-caption flex items-center gap-1 text-sm">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-heading">{edu.year}</p>
                  {edu.gpa && (
                    <p className="text-sm text-caption">GPA: {edu.gpa}</p>
                  )}
                </div>
              </div>
              
              {edu.thesis && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-heading">Thesis:</p>
                  <p className="text-sm text-body italic">"{edu.thesis}"</p>
                  {edu.advisor && (
                    <p className="text-sm text-caption">Advisor: {edu.advisor}</p>
                  )}
                </div>
              )}
              
              {edu.interests && edu.interests.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-heading mb-1">Research Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}