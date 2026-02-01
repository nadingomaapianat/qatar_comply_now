import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Check, Building2 } from 'lucide-react';

const QatarPricing = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Pricing' },
  ];

  const customPackage = {
    name: 'Custom Package',
    icon: Building2,
    description: 'Tailored to your institution—modules, users, and support scaled to your needs.',
    features: [
      'Compliance modules you need (NIA & ISO 27001, Risk Registry & SOA, PCI-DSS, QCB)',
      'User count and roles that fit your team',
      'Reporting and dashboards aligned to your processes',
      'Support level and SLA to match your operations',
      'Optional on-premise, API access, and consulting'
    ],
    cta: 'Get a Quote'
  };

  const modules = [
    { name: 'NIA & ISO 27001', description: 'Certification management & audit readiness' },
    { name: 'Risk Registry & SOA', description: 'Centralized risk and controls tracking' },
    { name: 'PCI-DSS Compliance', description: 'Payment security standards' },
    { name: 'QCB Requirements', description: 'Qatar Central Bank regulatory alignment' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <AnimatedSection className="pt-20 pb-16">
          <div className="section-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="text-center mt-8">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-6">
                Simple, Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Custom</span> Package
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Pricing tailored to your institution—scope, modules, and support built around your needs. 
                QCB regulatory updates and Qatar-specific compliance included.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Custom Package */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className="relative card-light p-6 sm:p-10 rounded-2xl ring-2 ring-primary/30 shadow-xl">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                    <customPackage.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{customPackage.name}</h2>
                  <p className="text-muted-foreground mt-2">{customPackage.description}</p>
                </div>

                <div className="text-center mb-6 sm:mb-8">
                  <span className="text-3xl sm:text-4xl font-bold">Custom pricing</span>
                  <p className="text-muted-foreground text-sm sm:text-base mt-1">Based on your scope and requirements</p>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-8">
                  {customPackage.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/qatar/contact" className="block">
                  <Button className="w-full text-base btn-gradient text-white py-6">
                    {customPackage.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Modules */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Compliance Modules</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mix and match modules based on your specific regulatory requirements
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module, index) => (
                <GlassCard key={index} className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{module.name}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="card-light p-8 md:p-12 rounded-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We understand every institution has unique requirements. Let's discuss 
                a tailored solution that fits your specific compliance needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/qatar/contact">
                  <Button className="btn-gradient text-white">
                    Schedule Consultation
                  </Button>
                </Link>
                <Button variant="outline">
                  Download Pricing Guide
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default QatarPricing;
