import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, FileCheck, BarChart3, Database, Leaf, Clock, CheckCircle, Zap, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import QatarComplianceRadar from '@/components/charts/QatarComplianceRadar';
import QCBComplianceGauges from '@/components/charts/QCBComplianceGauges';
import ParticleField from '@/components/animations/ParticleField';
import FloatingCard from '@/components/animations/FloatingCard';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

const pillars = [
  {
    icon: Shield,
    title: 'Operational Resilience & Internal Controls',
    description: 'QCB internal control expectations, risk register, and SOA in one place.',
    features: [
      'Dynamic risk register & SOA',
      'Control effectiveness tracking',
      'Board and regulatory reporting',
    ],
    route: '/qatar/risk-registry-soa',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: FileCheck,
    title: 'Cybersecurity & Digital Resilience',
    description: 'NCSA NIA Standard and ISO 27001 certification support, always audit-ready.',
    features: [
      'NCSA NIA Standard compliance',
      'ISO 27001 control mapping',
      'Audit preparation workflows',
    ],
    route: '/qatar/nia-iso27k',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: Database,
    title: 'Data Protection & Privacy',
    description: 'PDPPL and QFC Data Protection compliance—consent, ROPA, and DPO workspace.',
    features: [
      'PDPPL (Law 13/2016) & QFC regime',
      'DPO dashboard & ROPA',
      'Consent & cross-border management',
    ],
    route: '/qatar/data-protection',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Leaf,
    title: 'Sustainability & ESG Reporting',
    description: 'QCB ESG Strategy (2024), Sustainable Finance Framework, ISSB reporting from 2026.',
    features: [
      'QCB Sustainable Finance Framework',
      'ISSB (IFRS S1 & S2) from 2026',
      'Climate and ESG risk analysis',
    ],
    route: '/qatar/sustainability',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
];

const benefits = [
  {
    icon: Clock,
    title: 'Decrease Compliance Time',
    description: 'Less manual work, fewer spreadsheets, one platform for certifications and QCB requirements.',
    metric: 70,
    metricSuffix: '%',
    metricLabel: 'time saved',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Monitoring',
    description: "Ongoing visibility into control status, risks, and SOA so you're always audit-ready.",
    metric: 24,
    metricSuffix: '/7',
    metricLabel: 'visibility',
  },
];

const stats = [
  { value: 114, suffix: '+', label: 'Controls Mapped' },
  { value: 12, suffix: '', label: 'PCI-DSS Requirements' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '%', label: 'Faster Audits' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const BeforeAfterQatar = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const beforeItems = [
    "Scattered evidence across systems",
    "Outdated SOA documents",
    "Manual risk tracking",
    "Audit panic mode",
    "Siloed QCB & PCI-DSS work"
  ];

  const afterItems = [
    "One dashboard, all evidence",
    "Auto-updated SOA",
    "Real-time risk visibility",
    "Always audit-ready",
    "Unified QCB & PCI-DSS workflow"
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -15 }}
          animate={isVisible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
          className="glass-card rounded-2xl p-6 border-2 border-red-500/30 bg-red-500/5 relative overflow-hidden"
          style={{ perspective: 1000 }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-red-500/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-foreground">Before: Manual Process</h4>
                <p className="text-sm text-muted-foreground">Scattered compliance</p>
              </div>
            </div>
            
            <ul className="space-y-3">
              {beforeItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 15 }}
          animate={isVisible ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="glass-card rounded-2xl p-6 border-2 border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden"
          style={{ perspective: 1000 }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-emerald-500/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-emerald-400" />
              </motion.div>
              <div>
                <h4 className="font-semibold text-foreground">After: comply.now</h4>
                <p className="text-sm text-muted-foreground">Unified compliance</p>
              </div>
            </div>
            
            <ul className="space-y-3">
              {afterItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  </motion.div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const QatarHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
        {/* Particle Background */}
        <div className="absolute inset-0 opacity-40">
          <ParticleField particleCount={60} color="green" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🇶🇦
              </motion.span>
              <span className="text-sm text-muted-foreground">Qatar Compliance</span>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="inline-block">Qatar Compliance</span>
              <br />
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                QCB, NIA, ISO 27001 & PCI-DSS
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
              variants={itemVariants}
            >
              Meet Qatar Central Bank requirements, maintain your risk registry and SOA, streamline NIA and ISO 27K certification, comply with data protection (PDPPL), and meet sustainability expectations — all in one platform.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/qatar/contact"
                  className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-xl text-white font-medium group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">Request a Demo</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-accent rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Qatar Section */}
      <AnimatedSection variant="light">
        <div className="section-container">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Qatar, <span className="gradient-text">Why Now</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Qatar's financial sector faces increasing regulatory pressure. QCB mandates, ISO 27001 certification, 
              PCI-DSS, data protection (PDPL), and sustainability expectations are now table stakes for banks operating in Qatar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['QCB', 'ISO 27001', 'PCI-DSS', 'PDPL & ESG'].map((item, index) => (
                <motion.div
                  key={item}
                  className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="text-3xl font-bold gradient-text mb-1 relative z-10">{item}</div>
                  <p className="text-sm text-muted-foreground relative z-10">
                    {item === 'QCB' ? 'Central Bank Requirements' : item === 'ISO 27001' ? 'Security Certification' : item === 'PCI-DSS' ? 'Payment Security' : 'Data Protection & Sustainability'}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Compliance Overview Charts */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Compliance <span className="gradient-text">At a Glance</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Real-time visibility into your Qatar compliance posture across all frameworks.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <FloatingCard delay={0}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Framework Coverage</h3>
                <QatarComplianceRadar />
              </GlassCard>
            </FloatingCard>
            
            <FloatingCard delay={0.2}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-center">Compliance Status</h3>
                <QCBComplianceGauges />
              </GlassCard>
            </FloatingCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Three Pillars with Fancy Cards */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We <span className="gradient-text">Help With</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four critical pillars to streamline your Qatar compliance journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <FloatingCard key={index} delay={index * 0.15}>
                <Link to={pillar.route} className="block group h-full">
                  <motion.div
                    className={cn(
                      "glass-card rounded-2xl p-6 h-full relative overflow-hidden",
                      "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity",
                      "group-hover:before:opacity-100"
                    )}
                    whileHover={{ 
                      boxShadow: '0 0 40px rgba(7, 255, 169, 0.15)',
                    }}
                  >
                    {/* Animated border gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(7, 255, 169, 0.3), transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <pillar.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{pillar.description}</p>
                      <ul className="space-y-2 mb-4">
                        {pillar.features.map((feature, fIndex) => (
                          <motion.li 
                            key={fIndex} 
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + fIndex * 0.1 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FloatingCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Key Benefits with Animated Counters */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="gradient-text">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <FloatingCard key={index} delay={index * 0.2}>
                <GlassCard className="text-center relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 relative z-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <AnimatedCounter
                    value={benefit.metric}
                    suffix={benefit.metricSuffix}
                    delay={0.3 + index * 0.2}
                  />
                  <div className="text-sm text-muted-foreground mb-4">{benefit.metricLabel}</div>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm relative z-10">{benefit.description}</p>
                </GlassCard>
              </FloatingCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Before vs After */}
      <AnimatedSection variant="dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="gradient-text">Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how comply.now transforms your compliance operations.
            </p>
          </div>

          <BeforeAfterQatar />
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection variant="dark">
        <div className="section-container relative">
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Qatar Compliance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how comply.now can help you meet QCB, ISO 27001, and PCI-DSS requirements with less effort.
            </p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/qatar/contact"
                  className="inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-xl text-white font-medium relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', skewX: -15 }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10"
                  
                  >Request a Demo</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/qatar/pricing"
                  className="inline-flex items-center gap-2 btn-glass px-8 py-4 rounded-xl font-medium hover:bg-muted/50 transition-colors"
                >
                  View Pricing
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default QatarHome;
