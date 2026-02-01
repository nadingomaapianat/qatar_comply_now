import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface GaugeData {
  label: string;
  value: number;
  color: string;
}

const gauges: GaugeData[] = [
  { label: 'NIA Compliance', value: 87, color: 'hsl(155, 80%, 35%)' },
  { label: 'ISO 27001', value: 94, color: 'hsl(160, 100%, 51%)' },
  { label: 'PCI-DSS v4.0', value: 78, color: 'hsl(157, 90%, 45%)' },
  { label: 'QCB Alignment', value: 91, color: 'hsl(152, 60%, 30%)' },
];

interface AnimatedGaugeProps {
  data: GaugeData;
  delay: number;
  isVisible: boolean;
}

const AnimatedGauge = ({ data, delay, isVisible }: AnimatedGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setAnimatedValue(Math.round(easeOut * data.value));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, data.value, delay]);

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div
      className={cn(
        "flex flex-col items-center transition-all duration-500",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="hsl(164 15% 24%)"
            strokeWidth={strokeWidth}
            strokeOpacity={0.3}
          />
          
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={data.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 8px ${data.color})`,
              transition: 'stroke-dashoffset 0.1s ease-out',
            }}
          />
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{animatedValue}%</span>
        </div>
      </div>
      
      <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-muted-foreground text-center line-clamp-1">
        {data.label}
      </span>
    </div>
  );
};

interface QCBComplianceGaugesProps {
  className?: string;
}

const QCBComplianceGauges = ({ className }: QCBComplianceGaugesProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4",
        className
      )}
    >
      {gauges.map((gauge, index) => (
        <AnimatedGauge
          key={gauge.label}
          data={gauge}
          delay={index * 150}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
};

export default QCBComplianceGauges;
