import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo className="h-28 md:h-32 lg:h-36 xl:h-40 w-auto transition-transform duration-300 hover:scale-105" />
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming regulatory compliance into your competitive advantage for Qatar.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/qatar/sector" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Financial Sector
                </Link>
              </li>
              <li>
                <Link to="/qatar/nia-iso27k" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  NIA & ISO 27K
                </Link>
              </li>
              <li>
                <Link to="/qatar/risk-registry-soa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Risk Registry & SOA
                </Link>
              </li>
              <li>
                <Link to="/qatar/pci-dss-qcb" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  PCI-DSS & QCB
                </Link>
              </li>
              <li>
                <Link to="/qatar/data-protection" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Data Protection
                </Link>
              </li>
              <li>
                <Link to="/qatar/sustainability" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sustainability & ESG
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">Documentation</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">COSO Guide</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Case Studies</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Blog</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">Request Demo</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Support</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Sales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 comply.now. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">QCB Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
