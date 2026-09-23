interface AdditionalSectionsProps {
  awards?: string[];
}

export function AdditionalSections({ awards }: AdditionalSectionsProps) {
  if (!awards?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6">
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
    </div>
  );
}
