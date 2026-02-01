import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Hero3DWrapperProps {
  children: ReactNode;
  className?: string;
}

const Hero3DWrapper = ({ children, className }: Hero3DWrapperProps) => {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
};

export default Hero3DWrapper;
