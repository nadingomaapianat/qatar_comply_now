import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/qatar/sector', label: 'Banking Sector' },
    { href: '/qatar/about', label: 'About' },
    { href: '/qatar/pricing', label: 'Pricing' },
    { href: '/qatar/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="section-container">
        <div className="flex items-center justify-between h-28 md:h-32 lg:h-36">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="comply.now logo" 
              className="h-28 md:h-32 lg:h-36 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - More spacing */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm lg:text-base font-medium transition-all duration-300 hover:text-accent ${
                  location.pathname === link.href 
                    ? 'text-accent' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Better spacing */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <button
              type="button"
              className="btn-glass px-5 py-2.5 rounded-xl text-sm lg:text-base font-medium text-foreground"
              onClick={() => navigate('/auth/register')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn-gradient px-5 py-2.5 rounded-xl text-sm lg:text-base font-medium text-white"
              onClick={() => navigate('/auth/register')}
            >
              Request Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-up">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-base font-medium transition-colors hover:text-accent px-2 py-3 rounded-lg ${
                    location.pathname === link.href 
                      ? 'text-accent bg-muted/50' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  className="btn-glass px-4 py-3 rounded-xl text-base font-medium text-foreground w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/auth/register');
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn-gradient px-4 py-3 rounded-xl text-base font-medium text-white w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/auth/register');
                  }}
                >
                  Request Demo
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
