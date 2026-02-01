import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  label?: string;
}

const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  delay = 0,
  className,
  label,
}: AnimatedCounterProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min((elapsed - delay) / duration, 1);
        
        if (progress < 0) {
          requestAnimationFrame(animate);
          return;
        }

        const easeOut = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(easeOut * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, value, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text"
        initial={{ scale: 0.5 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      >
        {prefix}{displayValue}{suffix}
      </motion.div>
      {label && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">{label}</p>
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
