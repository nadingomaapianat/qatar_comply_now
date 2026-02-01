import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  label: string;
  value: number;
  delay?: number;
  variant?: 'primary' | 'mint' | 'sage';
}

const ProgressBar = ({ label, value, delay = 0, variant = 'primary' }: ProgressBarProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(value);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  const gradientClass = {
    primary: 'from-primary to-accent',
    mint: 'from-accent to-primary',
    sage: 'from-gradient-sage to-accent',
  };

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-semibold text-accent">{value}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out',
            gradientClass[variant]
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
