import { CVProfile } from '@/types/cv';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CVHeaderProps {
  profile: CVProfile;
}

const ContactIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'email':
      return <Mail className="w-4 h-4" />;
    case 'phone':
      return <Phone className="w-4 h-4" />;
    case 'address':
      return <MapPin className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

const formatContactValue = (contact: CVProfile['contacts'][0]) => {
  switch (contact.type) {
    case 'email':
      return `mailto:${contact.value}`;
    case 'phone':
      return `tel:${contact.value}`;
    case 'linkedin':
      return contact.url || `https://linkedin.com/in/${contact.value}`;
    case 'website':
      return contact.value.startsWith('http') ? contact.value : `https://${contact.value}`;
    default:
      return contact.url || '#';
  }
};

export function CVHeader({ profile }: CVHeaderProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="cv-section border-b-2 border-primary/20 pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-heading mb-2">{profile.name}</h1>
          <p className="text-xl text-primary font-medium mb-3">{profile.role}</p>
          {profile.location && (
            <p className="text-caption flex items-center gap-1 mb-4">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {profile.contacts.map((contact, index) => (
              <a
                key={index}
                href={formatContactValue(contact)}
                className="flex items-center gap-2 text-sm text-body hover:text-primary transition-colors group"
                target={contact.type === 'website' || contact.type === 'linkedin' ? '_blank' : undefined}
                rel={contact.type === 'website' || contact.type === 'linkedin' ? 'noopener noreferrer' : undefined}
              >
                <ContactIcon type={contact.type} />
                <span>{contact.label || contact.value}</span>
                {(contact.type === 'website' || contact.type === 'linkedin') && (
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity external-link-icon" />
                )}
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 md:items-end">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={`${profile.name} profile photo`}
              className="w-24 h-24 rounded-full border-2 border-primary/20 object-cover"
            />
          )}
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="no-print w-fit"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </header>
  );
}