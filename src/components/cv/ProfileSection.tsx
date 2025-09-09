interface ProfileSectionProps {
  summary: string;
}

export function ProfileSection({ summary }: ProfileSectionProps) {
  if (!summary) return null;

  return (
    <section className="cv-section">
      <h2 className="cv-heading">Profile</h2>
      <p className="cv-content text-lg leading-relaxed">{summary}</p>
    </section>
  );
}