import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileCheck, Shield, CheckCircle, AlertTriangle, Target, Award, ClipboardCheck, Zap, FileText, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import CertificationTimeline from '@/components/charts/CertificationTimeline';
import MaturityGauge from '@/components/charts/MaturityGauge';

const NiaIso27k = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Banking Sector', href: '/qatar/sector' },
    { label: 'NIA & ISO 27K' },
  ];

  const challenges = [
    { icon: AlertTriangle, title: 'Evidence Scattered', description: 'Audit evidence stored across multiple systems and folders' },
    { icon: AlertTriangle, title: 'Manual Tracking', description: 'Control status tracked in spreadsheets, prone to errors' },
    { icon: AlertTriangle, title: 'Audit Panic', description: 'Last-minute scramble before certification audits' },
    { icon: AlertTriangle, title: 'NIA Alignment', description: 'Difficulty mapping NIA requirements to ISO controls' },
  ];

  const solutions = [
    { icon: FileCheck, title: 'Centralized Evidence', description: 'Single repository for all audit evidence and artifacts' },
    { icon: Shield, title: 'Control Mapping', description: 'Automatic mapping between NIA and ISO 27001 controls' },
    { icon: Target, title: 'Audit Readiness', description: 'Always prepared with real-time certification status' },
    { icon: Award, title: 'Gap Analysis', description: 'Identify and address compliance gaps proactively' },
  ];

  const features = [
    {
      icon: ClipboardCheck,
      title: 'Evidence Repository',
      description: 'Centralized storage for all certification evidence with version control and approval workflows.',
      items: ['Document versioning', 'Approval workflows', 'Evidence linking', 'Audit trail']
    },
    {
      icon: FileText,
      title: 'Control Framework',
      description: 'Complete ISO 27001:2022 control mapping with NIA alignment and implementation tracking.',
      items: ['114 controls mapped', 'NIA alignment', 'Status tracking', 'Owner assignment']
    },
    {
      icon: Users,
      title: 'Audit Management',
      description: 'Streamlined audit preparation with automated evidence collection and auditor portal.',
      items: ['Audit scheduling', 'Finding management', 'Corrective actions', 'Auditor access portal']
    },
  ];

  const deliverables = [
    'ISO 27001 Statement of Applicability',
    'NIA Compliance Report',
    'Control Implementation Status',
    'Gap Analysis Report',
    'Audit Readiness Dashboard',
    'Evidence Package for Auditors',
  ];

  const { ref: beforeAfterRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="section-container relative z-10">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <FileCheck className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Certification Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              NIA & ISO 27001
              <br />
              <span className="gradient-text">Certification Excellence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Keep your ISO 27001 certification on track and maintain NIA compliance with centralized 
              evidence management and automated control tracking.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-xl text-white font-medium"
              >
                Request Demo <ArrowRight size={18} />
              </Link>
              <Link
                to="/qatar/sector"
                className="inline-flex items-center gap-2 btn-glass px-6 py-3 rounded-xl font-medium"
              >
                <ArrowLeft size={18} /> Back to Sector
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Challenge</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Managing ISO 27001 certification and NIA compliance manually leads to gaps, missed deadlines, and audit failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="card-light p-6 rounded-2xl border-l-4 border-red-500/50">
                <challenge.icon className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Section */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              comply.now provides a unified platform for ISO 27001 and NIA certification management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <GlassCard key={index} className="border-l-4 border-primary">
                <solution.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Before/After */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Transformation</span>
            </h2>
          </div>

          <div ref={beforeAfterRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className={cn(
              "card-light p-6 rounded-2xl border-2 border-red-500/30 bg-red-500/5 transition-all duration-500",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h4 className="font-semibold">Before</h4>
              </div>
              <ul className="space-y-3">
                {['Evidence in 10+ locations', 'Manual control tracking', '2+ weeks audit prep', 'NIA-ISO gaps unknown'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn(
              "card-light p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 transition-all duration-500",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-semibold">After</h4>
              </div>
              <ul className="space-y-3">
                {['Single evidence repository', 'Automated control tracking', 'Always audit-ready', 'Full NIA-ISO mapping'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Certification Timeline */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certification <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your path to ISO 27001 and NIA certification with clear milestones.
            </p>
          </div>

          <GlassCard className="p-8">
            <CertificationTimeline />
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Maturity Gauges */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Control <span className="gradient-text">Maturity</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <MaturityGauge value={92} label="Access Control" colorScheme="maturity" delay={0} />
            <MaturityGauge value={85} label="Risk Assessment" colorScheme="maturity" delay={150} />
            <MaturityGauge value={78} label="Incident Response" colorScheme="maturity" delay={300} />
            <MaturityGauge value={88} label="Asset Management" colorScheme="maturity" delay={450} />
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="gradient-text">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className="h-full">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Deliverables */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You <span className="gradient-text">Get</span>
              </h2>
            </div>

            <div className="card-light p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection variant="dark">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Streamline Your Certification?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how comply.now can help you achieve and maintain ISO 27001 and NIA compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/qatar/contact" className="btn-gradient px-8 py-4 rounded-xl text-white font-medium inline-flex items-center gap-2">
              Start Your Assessment <ArrowRight size={18} />
            </Link>
            <Link to="/qatar/pricing" className="btn-glass px-8 py-4 rounded-xl font-medium">
              View Pricing
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default NiaIso27k;
