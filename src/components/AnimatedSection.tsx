import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  delay?: number;
}

const AnimatedSection = ({ children, className = '', variant = 'dark', delay = 0 }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={cn(
        'py-20 md:py-28 transition-all duration-700',
        variant === 'light' && 'section-light',
        variant === 'dark' && 'relative',
        className
      )}
    >
      <div
        className={cn(
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </section>
  );
};

export default AnimatedSection;
