interface AdditionalSectionsProps {
  skills?: string[];
  awards?: string[];
  languages?: string[];
}

export function AdditionalSections({ skills, awards, languages }: AdditionalSectionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills && skills.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-heading">Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-muted text-primary font-medium text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {awards && awards.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-heading">Awards & Honors</h2>
          <ul className="space-y-2">
            {awards.map((award, index) => (
              <li key={index} className="cv-content text-sm">
                {award}
              </li>
            ))}
          </ul>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-heading">Languages</h2>
          <ul className="space-y-1">
            {languages.map((language, index) => (
              <li key={index} className="cv-content text-sm">
                {language}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}