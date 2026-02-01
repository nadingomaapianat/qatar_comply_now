import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className = '', hover = true }: GlassCardProps) => {
  return (
    <div className={`${hover ? 'glass-card-hover' : 'glass-card'} rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
