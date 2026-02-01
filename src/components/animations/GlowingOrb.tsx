import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowingOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'cyan';
  delay?: number;
  duration?: number;
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
  xl: 'w-[500px] h-[500px]',
};

const colorClasses = {
  primary: 'from-primary/30 to-primary/5',
  accent: 'from-accent/40 to-accent/5',
  cyan: 'from-cyan-500/30 to-cyan-500/5',
};

const glowColors = {
  primary: 'shadow-primary/50',
  accent: 'shadow-accent/50',
  cyan: 'shadow-cyan-500/50',
};

const GlowingOrb = ({ 
  className, 
  size = 'md', 
  color = 'primary',
  delay = 0,
  duration = 8
}: GlowingOrbProps) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        "bg-gradient-radial",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.6, 0.3],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default GlowingOrb;
