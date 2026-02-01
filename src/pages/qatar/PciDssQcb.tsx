import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, CreditCard, CheckCircle, AlertTriangle, Building2, Lock, Zap, FileText, ClipboardCheck, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import PCIComplianceChart from '@/components/charts/PCIComplianceChart';
import QCBComplianceGauges from '@/components/charts/QCBComplianceGauges';

const PciDssQcb = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Banking Sector', href: '/qatar/sector' },
    { label: 'PCI-DSS & QCB' },
  ];

  const challenges = [
    { icon: AlertTriangle, title: 'Dual Compliance', description: 'Managing PCI-DSS and QCB requirements separately' },
    { icon: AlertTriangle, title: 'Version Updates', description: 'Keeping up with PCI-DSS v4.0 changes' },
    { icon: AlertTriangle, title: 'Evidence Gaps', description: 'Missing documentation for regulatory audits' },
    { icon: AlertTriangle, title: 'Control Overlap', description: 'Duplicated effort across frameworks' },
  ];

  const solutions = [
    { icon: Shield, title: 'Unified Framework', description: 'Single view of PCI-DSS and QCB requirements' },
    { icon: CreditCard, title: 'PCI-DSS v4.0 Ready', description: 'Full support for latest PCI-DSS version' },
    { icon: FileText, title: 'Complete Evidence', description: 'Centralized evidence for all requirements' },
    { icon: Building2, title: 'Control Mapping', description: 'Cross-framework control alignment' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'QCB Compliance',
      description: 'Complete alignment with Qatar Central Bank regulations and reporting requirements.',
      items: ['QCB circular mapping', 'Regulatory reporting', 'Compliance monitoring', 'Deadline tracking']
    },
    {
      icon: CreditCard,
      title: 'PCI-DSS v4.0',
      description: 'Full support for PCI-DSS v4.0 with all 12 requirements and sub-requirements mapped.',
      items: ['12 requirement areas', 'SAQ support', 'Evidence collection', 'Gap remediation']
    },
    {
      icon: Eye,
      title: 'Unified Dashboard',
      description: 'Single pane of glass for both PCI-DSS and QCB compliance status.',
      items: ['Combined view', 'Control overlap', 'Status tracking', 'Executive reporting']
    },
  ];

  const deliverables = [
    'QCB Compliance Report',
    'PCI-DSS v4.0 ROC/SAQ',
    'Control Mapping Matrix',
    'Gap Remediation Plan',
    'Evidence Repository',
    'Compliance Dashboard',
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Payment & Regulatory Compliance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              PCI-DSS & QCB
              <br />
              <span className="gradient-text">Unified Compliance</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Align with Qatar Central Bank expectations and PCI-DSS v4.0 requirements 
              in a single unified workflow.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/qatar/contact"
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
              Managing PCI-DSS and QCB compliance separately creates inefficiency and gaps.
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
              comply.now unifies PCI-DSS and QCB compliance in one integrated platform.
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

      {/* PCI-DSS Compliance Chart */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PCI-DSS v4.0 <span className="gradient-text">Requirements</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track compliance across all 12 PCI-DSS requirement areas with real-time status updates.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8">
              <PCIComplianceChart />
            </GlassCard>
          </div>
        </div>
      </AnimatedSection>

      {/* QCB Compliance Gauges */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              QCB <span className="gradient-text">Alignment</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor your alignment with Qatar Central Bank requirements across key domains.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-8">
              <QCBComplianceGauges />
            </GlassCard>
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
                {['Siloed PCI-DSS & QCB work', 'Outdated PCI-DSS version', 'Evidence gaps', 'Duplicated effort'].map((item, i) => (
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
                {['Unified compliance workflow', 'PCI-DSS v4.0 ready', 'Complete evidence', 'Efficient control mapping'].map((item, i) => (
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
            Ready to Unify Your Compliance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how comply.now can help you meet PCI-DSS v4.0 and QCB requirements together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth/register" className="btn-gradient px-8 py-4 rounded-xl text-white font-medium inline-flex items-center gap-2">
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

export default PciDssQcb;
