import { Link } from 'react-router-dom';
import { Shield, Lock, Database, Leaf, BarChart3, FileCheck, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import PillarCard from '@/components/PillarCard';
import GlassCard from '@/components/GlassCard';

const QatarSector = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Financial Sector' },
  ];

  const pillars = [
    {
      icon: Shield,
      title: "Operational Resilience & Internal Controls",
      description: "Achieve continuous compliance with QCB expectations. Maintain risk register, SOA, and internal control reporting in one place.",
      features: [
        "QCB internal control expectations",
        "Dynamic risk register & SOA",
        "Control effectiveness tracking",
        "Board and regulatory reporting"
      ],
      ctaText: "Explore Risk & Controls",
      ctaLink: "/qatar/risk-registry-soa"
    },
    {
      icon: Lock,
      title: "Cybersecurity & Digital Resilience",
      description: "Align with NCSA's National Information Assurance (NIA) Standard and ISO 27001 for a mature security posture.",
      features: [
        "NCSA NIA Standard compliance",
        "ISO 27001 certification support",
        "Maturity assessment",
        "Audit-ready evidence repository"
      ],
      ctaText: "Explore NIA & ISO 27K",
      ctaLink: "/qatar/nia-iso27k"
    },
    {
      icon: Database,
      title: "Data Protection & Privacy",
      description: "Qatar PDPPL (Law 13/2016) and QFC Data Protection compliance for banks. Oversight by National Cyber Governance and Assurance Affairs.",
      features: [
        "PDPPL (Law 13/2016) & QFC regime",
        "DPO dashboard & ROPA",
        "Consent management",
        "Cross-border transfer oversight"
      ],
      ctaText: "Explore Data Protection",
      ctaLink: "/qatar/data-protection"
    },
    {
      icon: Leaf,
      title: "Sustainability & ESG Reporting",
      description: "QCB ESG & Sustainability Strategy (2024) and Sustainable Finance Framework. ISSB reporting from 2026.",
      features: [
        "QCB Sustainable Finance Framework",
        "ISSB (IFRS S1 & S2) reporting from 2026",
        "ESG risk integration",
        "Carbon and climate risk analysis"
      ],
      ctaText: "Explore Sustainability",
      ctaLink: "/qatar/sustainability"
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
              Financial Sector{' '}
              <span className="gradient-text">Compliance Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-up-delay-1">
              Navigate the four critical pillars of Qatar financial sector compliance with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              The four critical pillars—Operational Resilience & Internal Controls, Cybersecurity & Digital Resilience, 
              Data Protection & Privacy, and Sustainability & ESG—are no longer siloed.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
              They form an <span className="text-foreground font-medium">interconnected web of compliance</span> where 
              failure in one domain can affect others. comply.now provides the 
              unified infrastructure to manage all four pillars seamlessly.
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
