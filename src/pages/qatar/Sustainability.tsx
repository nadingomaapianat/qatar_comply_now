import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Leaf, BarChart3, FileText, TrendingUp, Globe, CheckCircle, Building2, Zap, TreePine } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import GlassCard from '@/components/GlassCard';
import FeatureCard from '@/components/FeatureCard';
import AssessmentSection from '@/components/AssessmentSection';
import AnimatedSection from '@/components/AnimatedSection';
import ESGPrinciplesProgress from '@/components/charts/ESGPrinciplesProgress';
import CarbonPortfolioChart from '@/components/charts/CarbonPortfolioChart';
import GreenFinanceDonut from '@/components/charts/GreenFinanceDonut';
import ClimateRiskMatrix from '@/components/charts/ClimateRiskMatrix';
import ESGTrendsChart from '@/components/charts/ESGTrendsChart';

const Sustainability = () => {
  const keyRequirements = [
    "QCB ESG & Sustainability Strategy (June 2024) and Sustainable Finance Framework",
    "Sustainability reporting aligned with ISSB (IFRS S1 & S2) from 2026",
    "Climate, environmental, and social risk management",
    "ESG risk in credit and investment policies",
    "Capital mobilization toward sustainable finance",
  ];

  const opportunities = [
    {
      category: "Access to International Funding",
      items: [
        "Green and sustainable finance facilities",
        "ESG-linked financing",
        "Green bond issuance eligibility",
        "Alignment with Qatar National Vision 2030",
      ],
    },
    {
      category: "Risk Management",
      items: [
        "Climate risk is financial risk",
        "Stranded assets in traditional energy sectors",
        "Transition risk in carbon-intensive industries",
        "Physical risk from climate events",
      ],
    },
  ];

  const features = [
    {
      icon: FileText,
      title: "Generate GRI-Aligned Reports with One Click",
      description: "Generate your annual Sustainability Report with one click. Pre-built templates for GRI Financial Services Sector Disclosures including Product Portfolio and Active Ownership.",
    },
    {
      icon: TreePine,
      title: "Measure Scope 3 Emissions of Your Loan Book",
      description: "Carbon Portfolio Analysis: Measure the Scope 3 emissions of your loan book. Understand the climate impact of your lending and identify transition risks.",
    },
    {
      icon: BarChart3,
      title: "Meet QCB Sustainability Reporting Expectations",
      description: "Track alignment with QCB sustainability and climate risk expectations. Automated generation of status reports and quantitative metrics.",
    },
    {
      icon: Globe,
      title: "Corporate Client ESG Portal",
      description: "Portal for corporate clients to submit environmental data (energy usage, waste, etc.) to the bank. Streamlines data collection for portfolio analysis.",
    },
    {
      icon: TrendingUp,
      title: "Physical vs. Transition Risk Analysis",
      description: "Model the impact of climate transition on your loan portfolio. Identify stranded assets and assess transition risk in carbon-intensive industries.",
    },
    {
      icon: Building2,
      title: "ESG Risk in Credit Decisions",
      description: "Integrate ESG risk definitions into credit policies. Support environmental and social due diligence for large corporate project assessments.",
    },
  ];

  const guidingPrinciples = [
    { title: "Strategic Alignment", items: ["Integrate sustainability into bank strategy", "Board-level commitment", "Resource allocation"] },
    { title: "Governance & Management", items: ["Clear sustainability roles", "Board reporting", "Accountability"] },
    { title: "Risk Management", items: ["ESG risk in credit policies", "Climate risk assessment", "Portfolio-level monitoring"] },
    { title: "Products & Services", items: ["Green finance products", "Sustainable lending criteria", "Financial inclusion"] },
    { title: "Disclosure & Transparency", items: ["GRI-aligned reporting", "QCB reporting", "Stakeholder communication"] },
    { title: "Capacity Building", items: ["Staff training", "Client education", "Industry collaboration"] },
  ];

  const gapAnalysisQuestions = [
    "Does the bank have clear sustainability governance reporting to the board?",
    "Is environmental/social due diligence considered for large corporate project assessments?",
    "Does the credit policy explicitly include ESG risk definitions?",
    "Are GRI-aligned sustainability reports published annually?",
    "Is climate risk integrated into credit decision-making?",
    "Are sustainability and climate metrics reported to QCB where required?",
  ];

  const assessmentQuestions = [
    {
      id: 'sustainability-gov',
      label: '1',
      question: "Does the bank have clear sustainability governance reporting to the board?",
      options: ['Yes', 'In progress', 'No'],
    },
    {
      id: 'environmental-due-diligence',
      label: '2',
      question: "Is environmental/social due diligence considered for large corporate project assessments?",
      options: ['Yes, always', 'Sometimes', 'No'],
    },
    {
      id: 'esg-credit-policy',
      label: '3',
      question: "Does the credit policy explicitly include ESG risk definitions?",
      options: ['Yes, fully integrated', 'Partially included', 'Not included'],
    },
  ];

  const deliverables = [
    "Sustainability reporting aligned with ISSB (IFRS S1 & S2) for 2026",
    "Annual GRI-aligned Sustainability Report",
    "Sustainability and climate risk status reports",
    "Climate risk assessment reports",
    "ESG portfolio analysis",
    "Qatar National Vision 2030 alignment view",
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
              { label: 'Sustainability & ESG' },
            ]}
          />

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              <span className="gradient-text">Finance the Future:</span>{' '}
              QCB Strategy & ISSB Reporting
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up-delay-1">
              QCB launched its ESG & Sustainability Strategy in 2024. Sustainability reporting aligned with ISSB (IFRS S1 & S2) applies from 2026. Aligned with Qatar National Vision 2030.
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

      {/* Regulatory Mandate Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                QCB ESG Strategy (2024) & Sustainable Finance Framework
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Qatar Central Bank launched its <span className="text-foreground font-medium">ESG and Sustainability Strategy for the Financial Sector</span> in June 2024, aligned with the Third Financial Sector Strategy and Qatar National Vision 2030. The strategy rests on three pillars: (1) climate, environmental, and social risk management, (2) capital mobilization toward sustainable finance, and (3) embedding ESG in operations. QCB's Sustainable Finance Framework applies to all banks in Qatar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A <span className="text-foreground font-medium">Sustainability Reporting Framework</span> based on ISSB standards (IFRS S1 & S2) applies for annual reporting periods beginning <span className="text-foreground font-medium">1 January 2026</span>. Banks that prepare now gain access to green finance and alignment with Qatar's national priorities.
              </p>
            </div>
            <GlassCard hover={false}>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Key Requirements</h3>
              <ul className="space-y-3">
                {keyRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Leaf size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Strategic Opportunity Section */}
      <section className="py-16">
        <div className="section-container">
          <GlassCard hover={false} className="p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
              Sustainability as Competitive Advantage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Beyond compliance, sustainability opens doors to green finance, better risk management, and market differentiation in Qatar and beyond.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((opp, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{opp.category}</h3>
                  <ul className="space-y-2">
                    {opp.items.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Zap size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Guiding Principles Progress */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Sustainable Finance <span className="gradient-text">Principles</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Track your alignment with sustainable finance principles
          </p>
          <div className="card-light p-8 rounded-2xl max-w-2xl mx-auto">
            <ESGPrinciplesProgress />
          </div>
        </div>
      </AnimatedSection>

      {/* Carbon Portfolio & Green Finance */}
      <AnimatedSection>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard hover={false} className="p-8">
              <h3 className="text-xl font-semibold text-center mb-6">Carbon Portfolio Analysis</h3>
              <CarbonPortfolioChart />
            </GlassCard>
            <GlassCard hover={false} className="p-8">
              <h3 className="text-xl font-semibold text-center mb-6">Green Finance Portfolio</h3>
              <GreenFinanceDonut />
            </GlassCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Climate Risk Matrix */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Climate Risk <span className="gradient-text">Exposure Matrix</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Visualize physical and transition risk exposure across your portfolio
          </p>
          <div className="card-light p-8 rounded-2xl max-w-3xl mx-auto">
            <ClimateRiskMatrix />
          </div>
        </div>
      </AnimatedSection>

      {/* ESG Trends */}
      <AnimatedSection>
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ESG Performance <span className="gradient-text-accent">Trends</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Track Environmental, Social, and Governance metrics over time
          </p>
          <GlassCard hover={false} className="p-8">
            <ESGTrendsChart />
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Solution Features Section */}
      <section className="py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How <span className="gradient-text">comply.now</span> Transforms Sustainability Reporting
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Automate sustainability compliance and unlock green finance opportunities for Qatar banks
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

      {/* Guiding Principles */}
      <section className="py-20 bg-muted/20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Six <span className="gradient-text-accent">Guiding Principles</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A practical framework for sustainable finance in banking
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidingPrinciples.map((principle, index) => (
              <GlassCard key={index} className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{principle.title}</h3>
                </div>
                <ul className="space-y-2">
                  {principle.items.map((item, iIndex) => (
                    <li key={iIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Gap Analysis Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sustainable Finance Gap Analysis
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Assess your bank's alignment with sustainable finance principles. Get a roadmap to strengthen ESG and climate risk integration.
              </p>
              <ul className="space-y-3 mb-8">
                {gapAnalysisQuestions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{question}</span>
                  </li>
                ))}
              </ul>
              <Link to="/qatar/contact" className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-2 group">
                Request Gap Analysis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <GlassCard hover={false} className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <TreePine className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Climate Risk is Financial Risk</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Banks must understand two types of climate risk:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Physical Risk</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Extreme weather events</li>
                    <li>• Sea-level rise</li>
                    <li>• Water scarcity impacts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Transition Risk</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Policy changes (carbon pricing)</li>
                    <li>• Technology shifts (renewables)</li>
                    <li>• Stranded assets in fossil fuels</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <AssessmentSection
        title="Sustainable Finance Gap Analysis"
        description="Assess your bank's alignment with sustainable finance principles."
        questions={assessmentQuestions}
      />

      {/* Reporting Section */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Sustainability Reporting <span className="gradient-text">Obligations</span>
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              QCB's Sustainability Reporting Framework (ISSB/IFRS S1 & S2) applies for periods beginning 1 January 2026.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard hover={false} className="text-center">
                <h3 className="font-semibold text-foreground mb-2">ISSB Reporting (from 2026)</h3>
                <p className="text-sm text-muted-foreground">
                  IFRS S1 & S2 aligned disclosures, climate and sustainability-related risks
                </p>
              </GlassCard>
              <GlassCard hover={false} className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Sustainable Finance</h3>
                <p className="text-sm text-muted-foreground">
                  Green finance volumes, ESG-aligned lending, climate risk by sector
                </p>
              </GlassCard>
              <GlassCard hover={false} className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Annual & GRI</h3>
                <p className="text-sm text-muted-foreground">
                  GRI-aligned reporting, material topics, stakeholder engagement
                </p>
              </GlassCard>
            </div>
            <p className="text-center text-muted-foreground mt-6">
              comply.now helps you prepare for 2026 and streamline all report types.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Sustainability Compliance <span className="gradient-text">Deliverables</span>
          </h2>
          <GlassCard hover={false} className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-6">The platform helps you produce:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="section-container">
          <GlassCard hover={false} className="p-8 md:p-16 text-center gradient-bg-subtle">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Finance the Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Qatar banks using comply.now to meet QCB expectations, align with Qatar National Vision 2030, 
              and turn sustainability compliance into competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/qatar/contact" className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 group">
                Request a Demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/qatar/sector" className="btn-glass px-8 py-4 rounded-xl font-semibold text-foreground">
                Back to Financial Sector
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sustainability;
