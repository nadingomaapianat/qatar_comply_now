import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ControlStatus {
  name: string;
  implemented: number;
  partial: number;
  notImplemented: number;
}

const defaultControls: ControlStatus[] = [
  { name: 'Identity & Access Management', implemented: 75, partial: 15, notImplemented: 10 },
  { name: 'Data Loss Prevention', implemented: 45, partial: 35, notImplemented: 20 },
  { name: 'Network Segmentation', implemented: 60, partial: 25, notImplemented: 15 },
  { name: 'Endpoint Security', implemented: 80, partial: 15, notImplemented: 5 },
  { name: 'Cloud Security', implemented: 35, partial: 40, notImplemented: 25 },
];

interface ControlStatusBarsProps {
  controls?: ControlStatus[];
}

const ControlStatusBars = ({ controls = defaultControls }: ControlStatusBarsProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedWidths, setAnimatedWidths] = useState<number[]>(controls.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      controls.forEach((_, index) => {
        setTimeout(() => {
          const duration = 800;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setAnimatedWidths(prev => {
              const newWidths = [...prev];
              newWidths[index] = easeOut * 100;
              return newWidths;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }, index * 150);
      });
    }
  }, [isVisible, controls]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full space-y-6 transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {controls.map((control, index) => {
        const animationProgress = animatedWidths[index] / 100;
        
        return (
          <div 
            key={index}
            className={cn(
              "transition-all duration-500",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">{control.name}</span>
              <span className="text-xs text-muted-foreground">
                {Math.round(control.implemented * animationProgress)}% Implemented
              </span>
            </div>
            
            <div className="h-4 bg-muted/30 rounded-full overflow-hidden flex">
              {/* Implemented (Green) */}
              <div 
                className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${control.implemented * animationProgress}%` }}
              />
              
              {/* Partial (Amber) */}
              <div 
                className="h-full bg-amber-500 transition-all duration-300 ease-out"
                style={{ width: `${control.partial * animationProgress}%` }}
              />
              
              {/* Not Implemented (Red) */}
              <div 
                className="h-full bg-red-500 transition-all duration-300 ease-out"
                style={{ width: `${control.notImplemented * animationProgress}%` }}
              />
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Implemented</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500" />
          <span className="text-xs text-muted-foreground">Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-xs text-muted-foreground">Not Implemented</span>
        </div>
      </div>
    </div>
  );
};

export default ControlStatusBars;
