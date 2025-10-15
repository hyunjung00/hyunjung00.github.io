import { Link } from "react-router-dom";
import { homeUrl, publicationsUrl, experienceIndexUrl } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav className={`no-print ${className}`}>
      <div className="flex items-center justify-between">
        <Link
          to={homeUrl}
          className="text-xl font-bold text-heading hover:text-primary transition-colors"
        >
          Hyun Jung Lee
        </Link>

        <div className="flex items-center space-x-6">
          {/* <Link
            to={homeUrl}
            className="text-body hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to={publicationsUrl}
            className="text-body hover:text-primary transition-colors"
          >
            Publications
          </Link>
          <Link
            to={experienceIndexUrl}
            className="text-body hover:text-primary transition-colors"
          >
            Experience
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
