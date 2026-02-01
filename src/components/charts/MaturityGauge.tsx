import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface MaturityGaugeProps {
  value: number;
  maxValue?: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  colorScheme?: 'default' | 'gradient' | 'maturity';
  delay?: number;
}

const MaturityGauge = ({ 
  value, 
  maxValue = 100, 
  label, 
  size = 'md',
  showPercentage = true,
  colorScheme = 'default',
  delay = 0
}: MaturityGaugeProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedValue, setAnimatedValue] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(0);

  const percentage = (value / maxValue) * 100;
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const radius = size === 'sm' ? 40 : size === 'md' ? 56 : 68;
  const circumference = 2 * Math.PI * radius;

  const getColor = (percent: number) => {
    if (colorScheme === 'maturity') {
      if (percent < 25) return 'stroke-red-500';
      if (percent < 50) return 'stroke-orange-500';
      if (percent < 75) return 'stroke-amber-500';
      return 'stroke-emerald-500';
    }
    return 'stroke-primary';
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        // Animate the gauge fill
        const duration = 1500;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setAnimatedValue(easeOut * percentage);
          setDisplayNumber(Math.round(easeOut * value));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, value, delay]);

  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div 
      ref={ref} 
      className={cn(
        "relative flex flex-col items-center transition-all duration-500",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            className="stroke-muted/30"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            className={cn("transition-all duration-100", getColor(animatedValue))}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: 'drop-shadow(0 0 8px currentColor)',
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            "font-bold text-foreground",
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'
          )}>
            {showPercentage ? `${displayNumber}%` : displayNumber}
          </span>
        </div>
      </div>
      
      <span className={cn(
        "mt-2 font-medium text-muted-foreground text-center",
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}>
        {label}
      </span>
    </div>
  );
};

export default MaturityGauge;
