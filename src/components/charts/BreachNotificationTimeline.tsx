import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Clock, AlertTriangle, FileText, Send, CheckCircle } from 'lucide-react';

const BreachNotificationTimeline = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [hours, setHours] = useState(72);
  const [currentStep, setCurrentStep] = useState(-1);

  const steps = [
    { icon: AlertTriangle, label: 'Breach Detected', time: '0h', color: 'text-red-400' },
    { icon: FileText, label: 'Initial Assessment', time: '4h', color: 'text-orange-400' },
    { icon: FileText, label: 'Documentation', time: '24h', color: 'text-amber-400' },
    { icon: Send, label: 'DPC Notification', time: '48h', color: 'text-blue-400' },
    { icon: CheckCircle, label: 'Submitted', time: '72h', color: 'text-emerald-400' },
  ];

  useEffect(() => {
    if (isVisible) {
      // Countdown animation
      const countdownDuration = 3000;
      const startTime = Date.now();
      
      const animateCountdown = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / countdownDuration, 1);
        const remaining = Math.round(72 * (1 - progress));
        
        setHours(remaining);
        
        // Trigger steps based on progress
        const stepProgress = Math.floor(progress * steps.length);
        setCurrentStep(stepProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateCountdown);
        }
      };
      
      requestAnimationFrame(animateCountdown);
    }
  }, [isVisible]);

  const progressPercentage = ((72 - hours) / 72) * 100;

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Countdown Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card">
          <Clock className={cn(
            "w-8 h-8 transition-colors duration-300",
            hours <= 24 ? 'text-red-400' : hours <= 48 ? 'text-amber-400' : 'text-emerald-400'
          )} />
          <div>
            <span className={cn(
              "text-4xl font-bold transition-colors duration-300",
              hours <= 24 ? 'text-red-400' : hours <= 48 ? 'text-amber-400' : 'text-emerald-400'
            )}>
              {hours}
            </span>
            <span className="text-lg text-muted-foreground ml-1">hours remaining</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">72-hour notification deadline</p>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden mb-8">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted/30 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            
            return (
              <div 
                key={index}
                className={cn(
                  "flex md:flex-col items-center md:items-center gap-3 md:gap-2 transition-all duration-500",
                  isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                  isActive ? `bg-current/20 ${step.color}` : 'bg-muted text-muted-foreground',
                  isActive && index === currentStep && 'ring-2 ring-current ring-offset-2 ring-offset-background animate-pulse'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="md:text-center">
                  <span className="block text-sm font-medium text-foreground">{step.label}</span>
                  <span className={cn("text-xs", step.color)}>{step.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Message */}
      <div className={cn(
        "mt-8 text-center transition-all duration-500",
        hours === 0 ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">DPC Notification Complete</span>
        </div>
      </div>
    </div>
  );
};

export default BreachNotificationTimeline;
