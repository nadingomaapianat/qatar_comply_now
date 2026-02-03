import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BarChart3, Shield, CheckCircle, AlertTriangle, Target, TrendingUp, Zap, FileText, RefreshCw, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import RiskHeatMap from '@/components/charts/RiskHeatMap';

const RiskRegistrySoa = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Financial Sector', href: '/qatar/sector' },
    { label: 'Risk Registry & SOA' },
  ];

  const challenges = [
    { icon: AlertTriangle, title: 'Outdated Registers', description: 'Risk registers quickly become stale and irrelevant' },
    { icon: AlertTriangle, title: 'Manual SOA Updates', description: 'Statement of Applicability maintained in spreadsheets' },
    { icon: AlertTriangle, title: 'No Visibility', description: 'Lack of real-time view into risk and control status' },
    { icon: AlertTriangle, title: 'Disconnected Data', description: 'Risks and controls tracked separately' },
  ];

  const solutions = [
    { icon: BarChart3, title: 'Dynamic Registry', description: 'Living risk register that updates in real-time' },
    { icon: RefreshCw, title: 'Auto-Updated SOA', description: 'SOA automatically reflects control changes' },
    { icon: Eye, title: 'Real-time Visibility', description: 'Dashboard view of all risks and controls' },
    { icon: Target, title: 'Integrated Tracking', description: 'Risks linked to controls and evidence' },
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'Risk Register',
      description: 'Comprehensive risk management with automated scoring, treatment tracking, and owner accountability.',
      items: ['Risk scoring matrix', 'Treatment plans', 'Owner assignment', 'Review workflows']
    },
    {
      icon: FileText,
      title: 'Statement of Applicability',
      description: 'Dynamic SOA that automatically updates when controls change status or new controls are added.',
      items: ['Auto-sync with controls', 'Justification tracking', 'Version history', 'Export for auditors']
    },
    {
      icon: TrendingUp,
      title: 'Gap Analysis',
      description: 'Identify gaps between your current state and target compliance levels with actionable recommendations.',
      items: ['Gap identification', 'Remediation tracking', 'Priority scoring', 'Progress reports']
    },
  ];

  const deliverables = [
    'Centralized Risk Register',
    'Dynamic Statement of Applicability',
    'Control Effectiveness Dashboard',
    'Gap Analysis Reports',
    'Treatment Plan Tracker',
    'Risk Owner Accountability Reports',
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
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Risk & Control Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Risk Registry & SOA
              <br />
              <span className="gradient-text">Always Current, Always Ready</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Maintain a living risk register and auto-updated Statement of Applicability 
              that keeps pace with your organization's evolving risk landscape.
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
              Static risk registers and manual SOA updates create compliance gaps and audit surprises.
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
              comply.now delivers dynamic risk management with automatic SOA synchronization.
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

      {/* Risk Heat Map */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Risk <span className="gradient-text">Heat Map</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visualize your risk landscape with our interactive heat map showing risk distribution by likelihood and impact.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-8">
              <RiskHeatMap />
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
                {['Stale risk register', 'SOA updated quarterly', 'No real-time visibility', 'Risks disconnected from controls'].map((item, i) => (
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
                {['Living risk register', 'Auto-updated SOA', 'Real-time dashboards', 'Full risk-control linkage'].map((item, i) => (
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
            Ready to Transform Your Risk Management?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how comply.now can help you maintain a dynamic risk register and auto-updated SOA.
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

export default RiskRegistrySoa;
