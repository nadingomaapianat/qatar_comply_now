import { Link } from 'react-router-dom';
import { Shield, FileCheck, BarChart3, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PillarCard from '@/components/PillarCard';
import GlassCard from '@/components/GlassCard';

const QatarSector = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Banking Sector' },
  ];

  const pillars = [
    {
      icon: FileCheck,
      title: "NIA & ISO 27K Certification",
      description: "Keep certification on track with evidence and controls in one place, always ready for audits.",
      features: [
        "Centralized evidence repository",
        "Control mapping to ISO 27001",
        "Audit preparation workflows",
        "NIA compliance tracking"
      ],
      ctaText: "Explore NIA & ISO 27K",
      ctaLink: "/qatar/nia-iso27k"
    },
    {
      icon: BarChart3,
      title: "Risk Registry & SOA",
      description: "Central risk register and Statement of Applicability that stay up to date with controls and compliance status.",
      features: [
        "Dynamic risk register",
        "Auto-updated SOA",
        "Control effectiveness tracking",
        "Gap analysis reporting"
      ],
      ctaText: "Explore Risk Registry",
      ctaLink: "/qatar/risk-registry-soa"
    },
    {
      icon: Shield,
      title: "PCI-DSS & QCB Requirements",
      description: "Align with Qatar Central Bank expectations and PCI-DSS in a single workflow.",
      features: [
        "QCB regulatory mapping",
        "PCI-DSS v4.0 controls",
        "Unified compliance dashboard",
        "Regulatory reporting"
      ],
      ctaText: "Explore PCI-DSS & QCB",
      ctaLink: "/qatar/pci-dss-qcb"
    }
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="section-container mt-20">
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="text-lg">🇶🇦</span>
              <span className="text-sm text-muted-foreground">Qatar Financial Sector</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              Qatar Financial{' '}
              <span className="gradient-text">Compliance Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up-delay-1">
              Navigate the three critical pillars of Qatar financial compliance with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PillarCard {...pillar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Context Section */}
      <section className="py-20">
        <div className="section-container">
          <GlassCard hover={false} className="p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text-accent">
              The Regulatory Landscape
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Qatar's financial sector operates under stringent regulatory oversight from the 
              Qatar Central Bank (QCB) and the Qatar Financial Centre Regulatory Authority (QFCRA). 
              Financial institutions must maintain ISO 27001 certification, comply with PCI-DSS 
              for payment security, and align with the National Information Assurance (NIA) framework.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
              These requirements form an <span className="text-foreground font-medium">interconnected compliance ecosystem</span> where 
              maintaining certification, managing risks, and meeting QCB expectations all depend on each other. 
              comply.now provides the unified infrastructure to manage all three pillars seamlessly.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Compliance Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how comply.now can help your institution navigate Qatar's regulatory landscape with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/qatar/contact"
              className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold inline-flex items-center gap-2 group"
            >
              Schedule a Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/qatar/pricing"
              className="btn-glass px-8 py-4 rounded-xl font-semibold text-foreground"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QatarSector;
