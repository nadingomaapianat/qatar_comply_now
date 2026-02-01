import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
      <a 
        href="https://comply.now"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </a>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
