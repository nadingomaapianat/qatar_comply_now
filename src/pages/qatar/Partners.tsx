import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import Breadcrumb from '@/components/Breadcrumb';
import { Handshake, ShieldCheck, FileCheck, AlertTriangle, BarChart3, ClipboardList, UserPlus, LogIn } from 'lucide-react';

const Partners = () => {
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Partners' },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Risk Assessment',
      description: 'Evaluate and score the risk each partner or vendor introduces to your organization.',
    },
    {
      icon: FileCheck,
      title: 'Compliance Verification',
      description: 'Manage audits, questionnaires, and evidence collection so partners meet required standards.',
    },
    {
      icon: ClipboardList,
      title: 'Contract & Documents',
      description: 'Store and track compliance-related contracts, SLAs, and certificates in one place.',
    },
    {
      icon: AlertTriangle,
      title: 'Issue & Finding Tracking',
      description: 'Log and monitor compliance gaps or security incidents related to third parties.',
    },
    {
      icon: BarChart3,
      title: 'Dashboard & Reporting',
      description: 'Overview of compliance status across all partners for management reporting.',
    },
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
                Third-Party & Vendor Compliance
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Partner</span> Management
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Manage vendor risk and compliance in one place. Assess partners, track audits,
                and stay aligned with QCB and international requirements.
              </p>
            </div>
          </div>
        </AnimatedSection>

        

        {/* What it does */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">Why Partner Management?</h2>
              <p className="text-muted-foreground text-center max-w-2xl">
                Transform how you manage third-party and supplier compliance—from spreadsheets and
                scattered documents to a single, auditable workflow.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <GlassCard key={index} className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

       

        {/* For partners: how to join */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="card-light rounded-2xl p-8 md:p-10 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Partner with us</h2>
              <p className="text-muted-foreground mb-6">
                Are you a vendor, service provider, or technology partner? Apply to join our network
                and connect with institutions that need compliant third parties.
              </p>
              <Link
                to="/qatar/partners/join"
                className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
              >
                Apply to join
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* What partners can do on our platform after joining */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What partners can do after they join</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
              After we approve your application, we create <strong>one partner account</strong> for your organization. You log in to the same compliance platform (with partner access), where you can:
            </p>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-sm">
              One approved partner = one partner account. (Additional users can be added to your partner account if needed.)
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <ClipboardList className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Complete compliance questionnaires</h3>
                <p className="text-sm text-muted-foreground">
                  Respond to client and framework questionnaires (ISO 27001, QCB, etc.) in one place and keep responses up to date.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload certificates & documents</h3>
                <p className="text-sm text-muted-foreground">
                  Store and share certificates, SOC reports, and compliance evidence with institutions that assess you.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">View assessment status</h3>
                <p className="text-sm text-muted-foreground">
                  See your risk and compliance status as seen by clients, and fix gaps before the next assessment.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get visibility to institutions</h3>
                <p className="text-sm text-muted-foreground">
                  Approved partners can be discovered by financial institutions looking for compliant vendors on the platform.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Receive and resolve findings</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified of audit findings or issues from clients and track remediation in the partner portal.
                </p>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <LogIn className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Log in to the compliance platform</h3>
                <p className="text-sm text-muted-foreground">
                  Use your partner account to log in to the same compliance platform as our client companies. You get a partner view: profile, documents, questionnaires, and status in one dashboard.
                </p>
              </GlassCard>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="py-20">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Manage Partner Compliance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a demo and see how the Partner module fits into your compliance program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/qatar/contact"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-medium"
              >
                Request Demo
              </Link>
              <Link
                to="/qatar"
                className="btn-glass px-8 py-4 rounded-xl font-medium"
              >
                Back to Qatar Home
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
