import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface Principle {
  name: string;
  progress: number;
}

const defaultPrinciples: Principle[] = [
  { name: 'Strategic Alignment', progress: 85 },
  { name: 'Governance & Management', progress: 70 },
  { name: 'Risk Management', progress: 55 },
  { name: 'Products & Services', progress: 40 },
  { name: 'Disclosure & Transparency', progress: 75 },
  { name: 'Capacity Building', progress: 60 },
];

interface ESGPrinciplesProgressProps {
  principles?: Principle[];
}

const ESGPrinciplesProgress = ({ principles = defaultPrinciples }: ESGPrinciplesProgressProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedProgress, setAnimatedProgress] = useState<number[]>(principles.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      principles.forEach((principle, index) => {
        setTimeout(() => {
          const duration = 1000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setAnimatedProgress(prev => {
              const newProgress = [...prev];
              newProgress[index] = Math.round(easeOut * principle.progress);
              return newProgress;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }, index * 100);
      });
    }
  }, [isVisible, principles]);

  const getProgressColor = (value: number) => {
    if (value < 40) return 'from-red-500 to-red-600';
    if (value < 70) return 'from-amber-500 to-amber-600';
    return 'from-emerald-500 to-emerald-600';
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full space-y-5 transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {principles.map((principle, index) => (
        <div 
          key={index}
          className={cn(
            "transition-all duration-500",
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          )}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-foreground">{principle.name}</span>
            </div>
            <span className={cn(
              "text-sm font-bold tabular-nums transition-colors duration-300",
              animatedProgress[index] < 40 ? 'text-red-400' :
              animatedProgress[index] < 70 ? 'text-amber-400' :
              'text-emerald-400'
            )}>
              {animatedProgress[index]}%
            </span>
          </div>
          
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-100",
                getProgressColor(principle.progress)
              )}
              style={{ 
                width: `${animatedProgress[index]}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ESGPrinciplesProgress;
