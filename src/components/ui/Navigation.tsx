import { Link } from 'react-router-dom';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`no-print ${className}`}>
      <div className="flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-heading hover:text-primary transition-colors"
        >
          Hyun Jung Lee
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-body hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/publications" 
            className="text-body hover:text-primary transition-colors"
          >
            Publications
          </Link>
          <Link 
            to="/experience" 
            className="text-body hover:text-primary transition-colors"
          >
            Experience
          </Link>
        </div>
      </div>
    </nav>
  );
}