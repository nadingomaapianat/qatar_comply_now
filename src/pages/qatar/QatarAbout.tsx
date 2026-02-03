import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import Breadcrumb from '@/components/Breadcrumb';
import { Users, Target, Award, Globe, Shield, Zap } from 'lucide-react';

const QatarAbout = () => {
  const breadcrumbItems = [
    { label: 'All Regions', href: '/hub' },
    { label: 'Qatar', href: '/qatar' },
    { label: 'About' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We build secure, reliable solutions that financial institutions can depend on for their most critical compliance needs.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Every feature is designed with regulatory accuracy in mind, ensuring zero-gap compliance with QCB and international standards.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to transform complex regulations into simple workflows.'
    },
    {
      icon: Globe,
      title: 'Regional Expertise',
      description: 'Deep understanding of Qatar financial regulations, QCB requirements, and MENA compliance landscape.'
    }
  ];

  const team = [
    { name: 'Mohammed Al-Thani', role: 'Regional Director', expertise: 'Qatar Compliance' },
    { name: 'Sara Al-Mansouri', role: 'Head of Operations', expertise: 'QCB Regulations' },
    { name: 'Ahmed Hassan', role: 'Technical Lead', expertise: 'Security Frameworks' },
    { name: 'Fatima Al-Dosari', role: 'Client Success', expertise: 'Implementation' }
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
                About comply.now Qatar
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Transforming <span className="gradient-text">Compliance</span>
                <br />for Qatar's Financial Sector
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                We're on a mission to make regulatory compliance a competitive advantage, 
                not a burden, for every financial institution in Qatar.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission & Vision */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="card-light p-8 rounded-2xl">
                <div className="icon-container-light w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower Qatar's financial institutions with intelligent compliance solutions that reduce 
                  regulatory burden by 70%, streamline certification processes, and transform 
                  compliance from a cost center into a strategic advantage.
                </p>
              </div>
              <div className="card-light p-8 rounded-2xl">
                <div className="icon-container-light w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading GRC platform for Qatar's financial sector, 
                  setting the standard for regulatory technology innovation and helping 
                  institutions achieve ISO 27001 and QCB compliance effortlessly.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <GlassCard key={index} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Team */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Qatar Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals dedicated to your compliance success
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="card-light p-6 rounded-2xl text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-1">{member.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10+</div>
                  <p className="text-muted-foreground">Institutions Served</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">70%</div>
                  <p className="text-muted-foreground">Time Saved</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">100%</div>
                  <p className="text-muted-foreground">QCB Compliant</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24/7</div>
                  <p className="text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Compliance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how comply.now can help your organization achieve compliance excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/qatar/contact"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-medium"
              >
                Contact Us
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

export default QatarAbout;
