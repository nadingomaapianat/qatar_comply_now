import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, FileCheck } from 'lucide-react';

interface TimelineItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  icon: typeof CheckCircle;
}

const timelineData: TimelineItem[] = [
  {
    title: 'Gap Assessment',
    description: 'Initial NIA & ISO 27001 gap analysis completed',
    status: 'completed',
    date: 'Q1 2024',
    icon: CheckCircle,
  },
  {
    title: 'Control Implementation',
    description: 'Security controls deployed and documented',
    status: 'completed',
    date: 'Q2 2024',
    icon: CheckCircle,
  },
  {
    title: 'Internal Audit',
    description: 'Internal audit and management review',
    status: 'in-progress',
    date: 'Q3 2024',
    icon: Clock,
  },
  {
    title: 'Certification Audit',
    description: 'Stage 1 & Stage 2 certification audits',
    status: 'upcoming',
    date: 'Q4 2024',
    icon: FileCheck,
  },
  {
    title: 'Certification Achieved',
    description: 'ISO 27001 & NIA certification granted',
    status: 'upcoming',
    date: 'Q1 2025',
    icon: AlertCircle,
  },
];

const statusColors = {
  completed: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/50',
  },
  'in-progress': {
    bg: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/50',
  },
  upcoming: {
    bg: 'bg-muted/50',
    border: 'border-muted-foreground/30',
    text: 'text-muted-foreground',
    glow: '',
  },
};

interface CertificationTimelineProps {
  className?: string;
}

const CertificationTimeline = ({ className }: CertificationTimelineProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Animate progress line
      const completedCount = timelineData.filter(i => i.status === 'completed').length;
      const inProgressCount = timelineData.filter(i => i.status === 'in-progress').length;
      const targetProgress = ((completedCount + inProgressCount * 0.5) / timelineData.length) * 100;
      
      setTimeout(() => {
        setProgressWidth(targetProgress);
      }, 300);

      // Animate items sequentially
      timelineData.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, 400 + index * 200);
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {/* Desktop Timeline */}
      <div className="hidden lg:block relative">
        {/* Progress Line Background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-muted/30 rounded-full" />
        
        {/* Animated Progress Line */}
        <div 
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-muted rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressWidth}%` }}
        />

        {/* Timeline Items */}
        <div className="grid grid-cols-5 gap-2 xl:gap-4">
          {timelineData.map((item, index) => {
            const colors = statusColors[item.status];
            const isAnimated = animatedItems.includes(index);
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={cn(
                  "flex flex-col items-center transition-all duration-500",
                  isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                {/* Node */}
                <div
                  className={cn(
                    "w-10 h-10 xl:w-12 xl:h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300",
                    colors.bg,
                    colors.border,
                    item.status !== 'upcoming' && 'shadow-lg',
                    item.status !== 'upcoming' && colors.glow,
                    item.status === 'in-progress' && 'animate-pulse'
                  )}
                >
                  <Icon className={cn("w-4 h-4 xl:w-5 xl:h-5", item.status === 'upcoming' ? 'text-muted-foreground' : 'text-white')} />
                </div>

                {/* Content */}
                <div className="mt-3 xl:mt-4 text-center px-1">
                  <span className={cn("text-[10px] xl:text-xs font-medium", colors.text)}>
                    {item.date}
                  </span>
                  <h4 className="font-semibold text-xs xl:text-sm mt-1 line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] xl:text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Timeline */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {timelineData.map((item, index) => {
          const colors = statusColors[item.status];
          const isAnimated = animatedItems.includes(index);
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={cn(
                "flex gap-3 sm:gap-4 transition-all duration-500",
                isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )}
            >
              {/* Node & Line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                    colors.bg,
                    colors.border,
                    item.status === 'in-progress' && 'animate-pulse'
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", item.status === 'upcoming' ? 'text-muted-foreground' : 'text-white')} />
                </div>
                {index < timelineData.length - 1 && (
                  <div className={cn(
                    "w-0.5 h-10 sm:h-12 mt-2",
                    item.status === 'completed' ? 'bg-emerald-500' : 'bg-muted/30'
                  )} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3 sm:pb-4 min-w-0">
                <span className={cn("text-[10px] sm:text-xs font-medium", colors.text)}>
                  {item.date}
                </span>
                <h4 className="font-semibold text-xs sm:text-sm mt-1">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] sm:text-xs text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs text-muted-foreground">In Progress</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted/50 border border-muted-foreground/30" />
          <span className="text-[10px] sm:text-xs text-muted-foreground">Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default CertificationTimeline;
