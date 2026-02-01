import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import MaturityGauge from './MaturityGauge';

interface ComplianceDashboardProps {
  overallCompliance?: number;
  consentManagement?: number;
  dataSubjectRights?: number;
  crossBorderTransfers?: number;
  deadline?: string;
}

const ComplianceDashboard = ({
  overallCompliance = 72,
  consentManagement = 85,
  dataSubjectRights = 68,
  crossBorderTransfers = 45,
  deadline = "Nov 2026"
}: ComplianceDashboardProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Calculate days until deadline
      const deadlineDate = new Date('2026-11-01');
      const today = new Date();
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Animate the countdown
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setDaysRemaining(Math.round(easeOut * diffDays));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  const getComplianceColor = (value: number) => {
    if (value < 50) return 'text-red-400';
    if (value < 80) return 'text-amber-400';
    return 'text-emerald-400';
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Gauge */}
        <div className="flex flex-col items-center justify-center">
          <MaturityGauge 
            value={overallCompliance} 
            label="Overall PDPL Compliance" 
            size="lg"
            colorScheme="maturity"
          />
          
          {/* Deadline Countdown */}
          <div className={cn(
            "mt-6 text-center transition-all duration-500",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
              <span className="text-2xl font-bold text-amber-400">{daysRemaining}</span>
              <span className="text-sm text-muted-foreground">days until enforcement</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Deadline: {deadline}</p>
          </div>
        </div>

        {/* Sub-Metrics */}
        <div className="flex flex-col justify-center space-y-6">
          {[
            { label: 'Consent Management', value: consentManagement },
            { label: 'Data Subject Rights', value: dataSubjectRights },
            { label: 'Cross-Border Transfers', value: crossBorderTransfers },
          ].map((metric, index) => (
            <div 
              key={index}
              className={cn(
                "transition-all duration-500",
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              )}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                <span className={cn("text-sm font-bold", getComplianceColor(metric.value))}>
                  {metric.value}%
                </span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    metric.value < 50 ? 'bg-red-500' : 
                    metric.value < 80 ? 'bg-amber-500' : 
                    'bg-emerald-500'
                  )}
                  style={{ 
                    width: isVisible ? `${metric.value}%` : '0%',
                    transitionDelay: `${400 + index * 150}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">{'<50% Critical'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-muted-foreground">50-80% At Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">{'>80% Compliant'}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
