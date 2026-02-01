import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface DomainGauge {
  name: string;
  level: number;
  maxLevel: number;
}

const defaultDomains: DomainGauge[] = [
  { name: 'Governance', level: 2, maxLevel: 4 },
  { name: 'Protection', level: 3, maxLevel: 4 },
  { name: 'Detection', level: 2, maxLevel: 4 },
  { name: 'Response', level: 1, maxLevel: 4 },
];

const levelColors = [
  'from-red-500 to-red-600',
  'from-orange-500 to-orange-600',
  'from-amber-500 to-amber-600',
  'from-emerald-500 to-emerald-600',
];

const levelLabels = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

interface MaturityDomainDashboardProps {
  domains?: DomainGauge[];
}

const MaturityDomainDashboard = ({ domains = defaultDomains }: MaturityDomainDashboardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(domains.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      domains.forEach((domain, index) => {
        setTimeout(() => {
          const duration = 1200;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setAnimatedLevels(prev => {
              const newLevels = [...prev];
              newLevels[index] = easeOut * domain.level;
              return newLevels;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }, index * 200);
      });
    }
  }, [isVisible, domains]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {domains.map((domain, index) => {
          const percentage = (animatedLevels[index] / domain.maxLevel) * 100;
          const offset = circumference - (percentage / 100) * circumference;
          const currentLevel = Math.floor(animatedLevels[index]);
          
          return (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center transition-all duration-500",
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative w-28 h-28 group cursor-pointer">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    className="stroke-muted/30"
                    strokeWidth="8"
                  />
                  
                  {/* Progress circle with gradient */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    className={cn(
                      "transition-all duration-100",
                      currentLevel === 0 ? 'stroke-red-500' :
                      currentLevel === 1 ? 'stroke-orange-500' :
                      currentLevel === 2 ? 'stroke-amber-500' :
                      'stroke-emerald-500'
                    )}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
                  />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {Math.round(animatedLevels[index])}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {domain.maxLevel}</span>
                </div>

                {/* Hover scale effect */}
                <div className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-110" />
              </div>
              
              <span className="mt-3 text-sm font-medium text-foreground">{domain.name}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full mt-1",
                currentLevel < 2 ? 'bg-red-500/20 text-red-400' :
                currentLevel < 3 ? 'bg-amber-500/20 text-amber-400' :
                'bg-emerald-500/20 text-emerald-400'
              )}>
                {levelLabels[currentLevel] || 'Level 1'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {levelLabels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              index === 0 ? 'bg-red-500' :
              index === 1 ? 'bg-orange-500' :
              index === 2 ? 'bg-amber-500' :
              'bg-emerald-500'
            )} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityDomainDashboard;
