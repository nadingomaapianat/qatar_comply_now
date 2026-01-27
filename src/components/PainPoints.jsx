import React from 'react';
import { FileWarning, ShieldAlert, Layers } from 'lucide-react';

const PainPoints = ({ data }) => {
  const points = [
    {
      icon: <FileWarning className="h-8 w-8 text-orange-400" />,
      title: "Manual Reporting Fatigue",
      desc: "Drowning in spreadsheets and manual data entry? Reduce audit prep time by 40% with automated workflows."
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-red-400" />,
      title: "Executive Liability Risks",
      desc: "Personal liability for executives is rising. Get real-time visibility into compliance gaps before they become penalties."
    },
    {
      icon: <Layers className="h-8 w-8 text-purple-400" />,
      title: "Fragmented Data Silos",
      desc: "Connect risk, cyber, and ESG data in one unified dashboard. Stop chasing data across departments."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {data.painPoints.title} <br className="hidden md:block" />
            Unprecedented Regulatory Challenges
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {data.painPoints.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group">
              <div className="bg-slate-50 rounded-lg p-3 w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform border border-slate-100">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
