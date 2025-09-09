import { ReactNode } from 'react';
import { Navigation } from '@/components/ui/Navigation';

interface CVLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export function CVLayout({ children, showNavigation = true }: CVLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Theme toggle for no-print */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
          className="p-2 bg-card border border-border rounded-md shadow-sm hover:bg-hover transition-colors"
          aria-label="Toggle theme"
        >
          <span className="sr-only">Toggle theme</span>
          🌙
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 print:px-0 print:py-0">
        {showNavigation && <Navigation className="mb-8" />}
        
        <article className="bg-card border border-border-light rounded-lg shadow-sm p-8 print:border-0 print:shadow-none print:rounded-none">
          {children}
        </article>
      </main>
    </div>
  );
}
