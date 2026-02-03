import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, Lock, AlertTriangle, FileCheck, Users, Database, CheckCircle, Globe, Clock, Scale, UserCheck } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import GlassCard from '@/components/GlassCard';
import FeatureCard from '@/components/FeatureCard';
import AnimatedSection from '@/components/AnimatedSection';
import ComplianceDashboard from '@/components/charts/ComplianceDashboard';
import DataProcessingFlow from '@/components/charts/DataProcessingFlow';
import ConsentPieChart from '@/components/charts/ConsentPieChart';
import BreachNotificationTimeline from '@/components/charts/BreachNotificationTimeline';

const DataProtection = () => {
  const penalties = [
    { amount: "Significant fines", offense: "Processing without required authorization (PDPPL)" },
    { amount: "Higher penalties", offense: "Breach of sensitive data (financial records are sensitive)" },
    { amount: "Criminal liability", offense: "For executives in cases of intentional violations" },
    { amount: "Regulatory action", offense: "National Cyber Governance and Assurance Affairs oversight; QFC DPO for QFC entities" },
  ];

  const features = [
    {
      icon: UserCheck,
      title: "Track Explicit Consent for Every Customer",
      description: "Track explicit consent as required by Qatar PDPPL (and QFC regime where applicable). Integration with your channels ensures consent is captured, stored, and auditable.",
    },
    {
      icon: Users,
      title: "Dedicated DPO Workspace",
      description: "A dedicated workspace for your Data Protection Officer to manage Subject Access Requests, Data Subject Rights, and consent withdrawals.",
    },
    {
      icon: Database,
      title: "Record of Processing Activities (ROPA)",
      description: "Automated creation of the Record of Processing Activities required by the law. Maps all personal data processing across your organization.",
    },
    {
      icon: Globe,
      title: "Cross-Border Transfer Management",
      description: "Manage authorizations for processing sensitive data and cross-border transfers in line with Qatar PDPL and QCB expectations.",
    },
    {
      icon: Clock,
      title: "Breach Notification Workflow",
      description: "Structured workflow for notifying the competent authority within the required timeframe. Includes documentation and evidence.",
    },
    {
      icon: Shield,
      title: "Automated Data Discovery",
      description: "Identify Personal Data and Sensitive Data (including financial records) across systems. Build a comprehensive data inventory.",
    },
  ];

  const dataRights = [
    { right: "Right of Access", description: "Customers can request copies of their personal data" },
    { right: "Right to Rectification", description: "Correction of inaccurate data" },
    { right: "Right to Erasure", description: "Right to be Forgotten requests" },
    { right: "Right to Object", description: "Objection to processing" },
    { right: "Right to Data Portability", description: "Transfer data to another provider" },
  ];

  const diagnosticAreas = [
    "Lawful Basis: Do you have documented lawful basis (Contract, Consent, Legitimate Interest) for all processing activities?",
    "Data Rights: Can your systems execute a Right to be Forgotten request within the legal timeframe?",
    "Cross-Border: Do you transfer customer data outside Qatar? Have you obtained the required authorization?",
    "DPO Appointment: Is your Data Protection Officer qualified and designated?",
    "Consent Management: Is consent captured, stored, and auditable across all channels?",
  ];

  const deliverables = [
    "Record of Processing Activities (ROPA)",
    "Consent records and audit trails",
    "Data Subject Request logs",
    "Breach notification documentation",
    "Cross-border transfer documentation",
    "DPIA reports",
    "DPO activity reports",
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="section-container mt-20">
          <Breadcrumb
            items={[
              { label: 'Qatar Home', href: '/' },
              { label: 'Financial Sector', href: '/qatar/sector' },
              { label: 'Data Protection' },
            ]}
          />

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              <span className="gradient-text">Data Protection & Privacy</span>{' '}
              for Qatar Banks
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up-delay-1">
              Qatar's Personal Data Privacy Protection Law (PDPPL, Law No. 13 of 2016) is in force, overseen by National Cyber Governance and Assurance Affairs. QFC-licensed entities must also comply with QFC Data Protection Regulations. Is your bank ready?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-2">
              <Link to="/qatar/contact" className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group">
                Request Demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/qatar/sector" className="btn-glass px-8 py-4 rounded-xl font-semibold text-foreground inline-flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Back to Sector
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Context Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                PDPPL & QFC Data Protection
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Qatar's Personal Data Privacy Protection Law (PDPPL, Law No. 13 of 2016) is overseen by <span className="text-foreground font-medium">National Cyber Governance and Assurance Affairs</span>. 
                Banks must comply with PDPPL; those in the Qatar Financial Centre (QFC) are also subject to <span className="text-foreground font-medium">QFC Data Protection Regulations 2021</span> (in force from June 2022), administered by the QFC Data Protection Office.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Obligations include lawful basis for processing, Record of Processing Activities (ROPA), consent management, cross-border transfer controls, and fulfilling data subject rights within statutory timeframes.
              </p>
            </div>
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Key Obligations</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Lawful basis</span>
                    <p className="text-sm text-muted-foreground">Documented for all processing activities</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">DPO</span>
                    <p className="text-sm text-muted-foreground">Designation and registration where required</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">ROPA</span>
                    <p className="text-sm text-muted-foreground">Record of Processing Activities maintained</p>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Financial Impact Section */}
      <section className="py-16">
        <div className="section-container">
          <GlassCard hover={false} className="p-8 md:p-12 max-w-4xl mx-auto border-l-4 border-l-accent">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text-accent">
              The Cost of Non-Compliance
            </h2>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Risks of non-compliance (PDPPL / QFC regime):</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {penalties.map((penalty, index) => (
                <div key={index} className="flex items-start gap-3 bg-muted/30 p-3 rounded-lg">
                  <Scale size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{penalty.amount}:</span>
                    <p className="text-sm text-muted-foreground">{penalty.offense}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Compliance Dashboard Section */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            PDPPL Compliance <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Track your overall compliance status and key metrics in real-time
          </p>
          <div className="card-light p-8 rounded-2xl">
            <ComplianceDashboard />
          </div>
        </div>
      </AnimatedSection>

      {/* Data Processing Flow */}
      <AnimatedSection>
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Data Processing <span className="gradient-text-accent">Activities Flow</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Visualize and manage your data lifecycle from collection to retention
          </p>
          <GlassCard hover={false} className="p-8">
            <DataProcessingFlow />
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Consent & Breach Section */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-light p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-center mb-6">Consent Management Status</h3>
              <ConsentPieChart />
            </div>
            <div className="card-light p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-center mb-6">Breach Notification Timeline</h3>
              <BreachNotificationTimeline />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Features Section */}
      <section className="py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How <span className="gradient-text">comply.now</span> Ensures PDPPL Compliance
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            End-to-end data protection compliance management for Qatar banks
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checker Section */}
      <section className="py-20 bg-muted/20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                PDPPL Compliance Checker
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Assess your bank's readiness for Qatar PDPPL and, where applicable, QFC Data Protection. Our diagnostic covers critical areas and highlights immediate risks.
              </p>
              <ul className="space-y-3 mb-8">
                {diagnosticAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{area}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth/register" className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-2 group">
                Start Your Assessment
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <GlassCard hover={false} className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Data Subject Rights</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Qatar PDPPL grants customers specific rights that banks must fulfill:
              </p>
              <ul className="space-y-3">
                {dataRights.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{item.right}:</span>{' '}
                      <span className="text-muted-foreground">{item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You <span className="gradient-text">Get</span>
            </h2>
          </div>
          <div className="card-light p-8 rounded-2xl max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection variant="dark">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Qatar PDPPL Compliance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how comply.now can help your bank meet data protection and QCB expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/qatar/contact" className="btn-gradient px-8 py-4 rounded-xl text-white font-medium inline-flex items-center gap-2">
              Request Demo <ArrowRight size={18} />
            </Link>
            <Link to="/qatar/sector" className="btn-glass px-8 py-4 rounded-xl font-medium">
              Back to Financial Sector
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default DataProtection;
