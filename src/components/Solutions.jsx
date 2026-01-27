import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Lock, Database, Leaf } from 'lucide-react';

const Solutions = ({ data }) => {
  const pillars = [
    {
      id: 'ops',
      title: 'Operational Resilience',
      desc: 'Automated COSO internal controls & audit-ready dashboards.',
      icon: <Activity className="h-6 w-6 text-teal-400" />,
      color: 'hover:border-teal-500/50 hover:shadow-teal-500/10',
      bg: 'bg-teal-950/30',
      iconBg: 'bg-teal-900/50'
    },
    {
      id: 'cyber',
      title: 'Cybersecurity',
      desc: data.solutions.cyber.desc,
      icon: <Lock className="h-6 w-6 text-blue-400" />,
      color: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
      bg: 'bg-blue-950/30',
      iconBg: 'bg-blue-900/50'
    },
    {
      id: 'data',
      title: 'Data Protection',
      desc: data.solutions.data.desc,
      icon: <Database className="h-6 w-6 text-purple-400" />,
      color: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
      bg: 'bg-purple-950/30',
      iconBg: 'bg-purple-900/50'
    },
    {
      id: 'esg',
      title: 'Sustainability',
      desc: 'ESG reporting & Carbon portfolio analysis for green finance.',
      icon: <Leaf className="h-6 w-6 text-green-400" />,
      color: 'hover:border-green-500/50 hover:shadow-green-500/10',
      bg: 'bg-green-950/30',
      iconBg: 'bg-green-900/50'
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Compliance is Interconnected—We Cover Every Pillar
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A unified platform that bridges the gap between risk, security, privacy, and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.id}
              whileHover={{ y: -5 }}
              className={`glass-panel bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl transition-all duration-300 ${pillar.color}`}
            >
              <div className={`h-12 w-12 rounded-xl ${pillar.iconBg} flex items-center justify-center mb-6 border border-white/5`}>
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
