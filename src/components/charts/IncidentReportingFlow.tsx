import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { AlertCircle, Search, FileText, Send, CheckCircle, BarChart3 } from 'lucide-react';

const steps = [
  { icon: AlertCircle, label: 'Incident Detected', color: 'text-red-400 bg-red-500/20' },
  { icon: Search, label: 'Assessment', color: 'text-orange-400 bg-orange-500/20' },
  { icon: FileText, label: 'Documentation', color: 'text-amber-400 bg-amber-500/20' },
  { icon: Send, label: 'Report', color: 'text-blue-400 bg-blue-500/20' },
  { icon: CheckCircle, label: 'Submit to EG-FinCIRT', color: 'text-emerald-400 bg-emerald-500/20' },
  { icon: BarChart3, label: 'Track & Analyze', color: 'text-primary bg-primary/20' },
];

const IncidentReportingFlow = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [activeStep, setActiveStep] = useState(-1);
  const [animatedLines, setAnimatedLines] = useState<boolean[]>(steps.map(() => false));

  useEffect(() => {
    if (isVisible) {
      // Animate steps sequentially
      steps.forEach((_, index) => {
        setTimeout(() => {
          setActiveStep(index);
          
          // Animate connecting line after step appears
          if (index > 0) {
            setTimeout(() => {
              setAnimatedLines(prev => {
                const newState = [...prev];
                newState[index - 1] = true;
                return newState;
              });
            }, 200);
          }
        }, index * 400);
      });
    }
  }, [isVisible]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full py-8 transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeStep;
          
          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              {/* Step */}
              <div 
                className={cn(
                  "flex flex-col items-center transition-all duration-500 z-10",
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                  step.color,
                  isActive && index === activeStep && 'animate-pulse ring-2 ring-current ring-offset-2 ring-offset-background'
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="mt-3 text-xs font-medium text-center text-muted-foreground max-w-[80px]">
                  {step.label}
                </span>
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-muted/30 rounded-full overflow-hidden relative">
                  <div 
                    className={cn(
                      "absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500",
                      animatedLines[index] ? 'w-full' : 'w-0'
                    )}
                  />
                  {/* Animated pulse on line */}
                  {animatedLines[index] && (
                    <div className="absolute inset-y-0 right-0 w-4 bg-white/50 rounded-full animate-ping" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeStep;
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div 
                className={cn(
                  "flex-shrink-0 transition-all duration-500",
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  step.color,
                  isActive && index === activeStep && 'animate-pulse'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className={cn(
                "flex-1 transition-all duration-500",
                isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              )}>
                <span className="text-sm font-medium text-foreground">{step.label}</span>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-gradient-to-b from-current to-transparent ml-6 opacity-30" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EG-FinCIRT Badge */}
      <div className={cn(
        "mt-8 text-center transition-all duration-500",
        activeStep >= steps.length - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">EG-FinCIRT Compliant Workflow</span>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportingFlow;
