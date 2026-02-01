import { Link } from 'react-router-dom';

const LOGO_SRC = '/logo.png';
const LOGO_ALT = 'Comply now';

interface LogoProps {
  /** CSS class for the image (e.g. h-8, h-12). */
  className?: string;
  /** If true, wrap in Link to "/". Default true. */
  linkToHome?: boolean;
}

/**
 * Reusable logo used across all pages. Uses public /logo.png.
 * Add logo to any page by rendering <Logo /> or <Logo className="h-10" linkToHome={false} />.
 */
export default function Logo({ className = 'h-8 w-auto', linkToHome = true }: LogoProps) {
  const img = (
    <img
      src={LOGO_SRC}
      alt={LOGO_ALT}
      className={className}
    />
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
        {img}
      </Link>
    );
  }

  return img;
}
