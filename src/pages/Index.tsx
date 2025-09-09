import { CVLayout } from '@/components/cv/CVLayout';
import { CVHeader } from '@/components/cv/CVHeader';
import { ProfileSection } from '@/components/cv/ProfileSection';
import { PublicationsSection } from '@/components/cv/PublicationsSection';
import { EducationSection } from '@/components/cv/EducationSection';
import { ExperienceSection } from '@/components/cv/ExperienceSection';
import { AdditionalSections } from '@/components/cv/AdditionalSections';
import { validateCVProfile } from '@/lib/validation';
import { CVProfile } from '@/types/cv';
import profileData from '../../content/profile.json';

const Index = () => {
  // Validate profile data at runtime
  let profile: CVProfile;
  try {
    profile = validateCVProfile(profileData);
  } catch (error) {
    console.error('Failed to load CV profile:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-destructive mb-4">CV Data Error</h1>
          <p className="text-body mb-4">
            There was an error loading the CV profile. Please check the content/profile.json file.
          </p>
          <details className="text-left bg-card p-4 rounded border">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="text-sm mt-2 text-caption overflow-auto">
              {error instanceof Error ? error.message : 'Unknown error'}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <CVLayout>
      <CVHeader profile={profile} />
      <ProfileSection summary={profile.profile_summary} />
      <PublicationsSection publications={profile.publications} />
      <EducationSection education={profile.education} />
      <ExperienceSection experience={profile.experience} />
      <AdditionalSections 
        skills={profile.skills}
        awards={profile.awards}
        languages={profile.languages}
      />
    </CVLayout>
  );
};

export default Index;
