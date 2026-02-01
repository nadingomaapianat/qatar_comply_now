import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { CheckCircle, Target, Zap } from 'lucide-react';

interface Milestone {
  label: string;
  date: string;
  level: number;
  isCurrent?: boolean;
  isTarget?: boolean;
}

const defaultMilestones: Milestone[] = [
  { label: 'Current State', date: 'Now', level: 2, isCurrent: true },
  { label: 'Risk-Informed', date: 'Q1 2026', level: 2 },
  { label: 'Repeatable', date: 'Q3 2026', level: 3 },
  { label: 'Adaptive', date: 'Q1 2027', level: 4, isTarget: true },
];

interface MaturityTimelineProps {
  milestones?: Milestone[];
}

const MaturityTimeline = ({ milestones = defaultMilestones }: MaturityTimelineProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [progress, setProgress] = useState(0);
  const [animatedMilestones, setAnimatedMilestones] = useState<boolean[]>(milestones.map(() => false));

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const prog = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - prog, 3);
        
        setProgress(easeOut * 100);
        
        const milestoneThresholds = [0, 33, 66, 100];
        milestoneThresholds.forEach((threshold, index) => {
          if (easeOut * 100 >= threshold) {
            setTimeout(() => {
              setAnimatedMilestones(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, 100);
          }
        });
        
        if (prog < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animate), 300);
    }
  }, [isVisible, milestones.length]);

  const getLevelColor = (level: number, isActive: boolean) => {
    if (!isActive) return 'from-muted to-muted';
    switch (level) {
      case 1: return 'from-red-500 to-orange-500';
      case 2: return 'from-orange-500 to-amber-500';
      case 3: return 'from-amber-500 to-primary';
      case 4: return 'from-primary to-accent';
      default: return 'from-muted to-muted';
    }
  };

  const getLevelBadgeStyle = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 2: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 3: return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 4: return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full py-12 transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Timeline container */}
      <div className="relative px-6">
        {/* Background track */}
        <div className="absolute top-10 left-6 right-6 h-1 bg-muted/20 rounded-full">
          {/* Dotted pattern overlay */}
          <div 
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, hsl(var(--muted-foreground) / 0.3) 8px, hsl(var(--muted-foreground) / 0.3) 12px)'
            }}
          />
        </div>
        
        {/* Animated progress line with glow */}
        <div className="absolute top-10 left-6 right-6">
          <div 
            className="h-1 bg-gradient-to-r from-primary via-accent to-accent rounded-full transition-all duration-100 relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-sm bg-gradient-to-r from-primary via-accent to-accent opacity-60"
            />
            {/* Moving highlight */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent animate-pulse"
              style={{ 
                boxShadow: '0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent) / 0.5)',
                opacity: progress < 100 ? 1 : 0
              }}
            />
          </div>
        </div>
        
        {/* Milestones */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => {
            const isActive = progress >= (index / (milestones.length - 1)) * 100;
            
            return (
              <div 
                key={index}
                className={cn(
                  "flex flex-col items-center transition-all duration-500 relative",
                  animatedMilestones[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                )}
              >
                {/* Connector glow (visible when active) */}
                {isActive && index > 0 && (
                  <div className="absolute top-10 right-full w-full h-0.5 bg-gradient-to-r from-transparent to-accent/50 -translate-y-1/2 z-0" />
                )}
                
                {/* Milestone marker */}
                <div className={cn(
                  "relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500",
                  milestone.isCurrent 
                    ? 'bg-gradient-to-br from-primary to-accent shadow-lg shadow-accent/30' 
                    : milestone.isTarget 
                      ? 'bg-gradient-to-br from-accent to-primary shadow-lg shadow-primary/30' 
                      : isActive
                        ? 'bg-gradient-to-br from-muted to-card border-2 border-accent/50'
                        : 'bg-muted/50 border-2 border-muted-foreground/20'
                )}>
                  {/* Inner glow ring for current/target */}
                  {(milestone.isCurrent || milestone.isTarget) && (
                    <div className="absolute inset-1 rounded-xl border border-white/20" />
                  )}
                  
                  {/* Icon/Number */}
                  {milestone.isCurrent ? (
                    <div className="flex flex-col items-center">
                      <Zap className="w-6 h-6 text-white" />
                      <span className="text-xs font-bold text-white/80 mt-0.5">L{milestone.level}</span>
                    </div>
                  ) : milestone.isTarget ? (
                    <div className="flex flex-col items-center">
                      <Target className="w-6 h-6 text-white" />
                      <span className="text-xs font-bold text-white/80 mt-0.5">L{milestone.level}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <CheckCircle className={cn(
                        "w-6 h-6",
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      )} />
                      <span className={cn(
                        "text-xs font-bold mt-0.5",
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      )}>L{milestone.level}</span>
                    </div>
                  )}
                </div>
                
                {/* Label section */}
                <div className="mt-6 text-center space-y-2">
                  <span className={cn(
                    "block font-semibold text-sm md:text-base",
                    milestone.isCurrent || milestone.isTarget ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {milestone.label}
                  </span>
                  
                  {/* Date badge */}
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium border",
                    milestone.isCurrent 
                      ? 'bg-accent/10 text-accent border-accent/30'
                      : milestone.isTarget
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-muted/50 text-muted-foreground border-muted'
                  )}>
                    {milestone.date}
                  </span>
                  
                  {/* Level indicator */}
                  <div className={cn(
                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border mt-2",
                    getLevelBadgeStyle(milestone.level)
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full bg-gradient-to-r",
                      getLevelColor(milestone.level, true)
                    )} />
                    Level {milestone.level}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        {[
          { level: 1, name: 'Partial' },
          { level: 2, name: 'Risk-Informed' },
          { level: 3, name: 'Repeatable' },
          { level: 4, name: 'Adaptive' },
        ].map((item) => (
          <div key={item.level} className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full bg-gradient-to-r",
              getLevelColor(item.level, true)
            )} />
            <span className="text-xs text-muted-foreground">
              L{item.level}: {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityTimeline;
