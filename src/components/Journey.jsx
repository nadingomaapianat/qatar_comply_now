import React from 'react';
import { Lightbulb, LayoutDashboard, Key, Rocket, TrendingUp } from 'lucide-react';

const Journey = () => {
  const steps = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Awareness",
      desc: "Light Assessment"
    },
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      title: "Activation",
      desc: "Sandbox Dashboard"
    },
    {
      icon: <Key className="h-5 w-5" />,
      title: "Selection",
      desc: "Unlock Full Trial"
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Onboarding",
      desc: "Integration"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Expansion",
      desc: "Full Compliance"
    }
  ];

  return (
    <section id="journey" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            From Assessment to Full Compliance
          </h2>
          <p className="text-slate-600">
            Start with a free assessment and scale to enterprise-grade protection.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white border-2 border-brand-500 rounded-full flex items-center justify-center text-brand-500 shadow-lg shadow-brand-500/10 group-hover:scale-110 transition-transform duration-300 mb-4 relative z-10">
                  {step.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
