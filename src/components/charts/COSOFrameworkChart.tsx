import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface COSOComponent {
  title: string;
  principles: string[];
  range: string;
  status: 'compliant' | 'partial' | 'non-compliant';
}

const cosoData: COSOComponent[] = [
  {
    title: "Control Environment",
    principles: ["Integrity & Ethics", "Board Oversight", "Structure & Authority", "Competence", "Accountability"],
    range: "1-5",
    status: 'compliant'
  },
  {
    title: "Risk Assessment",
    principles: ["Suitable Objectives", "Risk Analysis", "Fraud Risk", "Change Analysis"],
    range: "6-9",
    status: 'partial'
  },
  {
    title: "Control Activities",
    principles: ["Control Selection", "Technology Controls", "Policies & Procedures"],
    range: "10-12",
    status: 'compliant'
  },
  {
    title: "Information & Communication",
    principles: ["Relevant Information", "Internal Communication", "External Communication"],
    range: "13-15",
    status: 'partial'
  },
  {
    title: "Monitoring",
    principles: ["Ongoing Evaluations", "Deficiency Communication"],
    range: "16-17",
    status: 'non-compliant'
  }
];

const statusColors = {
  'compliant': 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
  'partial': 'bg-amber-500/20 border-amber-500 text-amber-400',
  'non-compliant': 'bg-red-500/20 border-red-500 text-red-400'
};

const statusLabels = {
  'compliant': '🟢 Compliant',
  'partial': '🟡 Partial',
  'non-compliant': '🔴 Non-Compliant'
};

const COSOFrameworkChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedItems, setAnimatedItems] = useState<boolean[]>(new Array(5).fill(false));

  useEffect(() => {
    if (isVisible) {
      cosoData.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {cosoData.map((component, index) => (
          <div
            key={index}
            className={cn(
              "glass-card rounded-xl p-4 border-2 transition-all duration-500 cursor-pointer",
              statusColors[component.status],
              animatedItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              hoveredIndex === index && 'scale-105 shadow-xl'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="text-center mb-3">
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-background/50">
                P{component.range}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-foreground text-center mb-3">
              {component.title}
            </h4>
            <div className={cn(
              "overflow-hidden transition-all duration-300",
              hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            )}>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {component.principles.map((principle, pIndex) => (
                  <li key={pIndex} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-medium">{statusLabels[component.status]}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(statusLabels).map(([status, label]) => (
          <div key={status} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default COSOFrameworkChart;
