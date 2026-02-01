import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MorphingShapeProps {
  className?: string;
  color?: 'primary' | 'accent' | 'cyan';
}

const colorStyles = {
  primary: 'from-primary/40 to-primary/10',
  accent: 'from-accent/50 to-accent/10',
  cyan: 'from-cyan-500/40 to-cyan-500/10',
};

const MorphingShape = ({ className, color = 'accent' }: MorphingShapeProps) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-2xl pointer-events-none hidden sm:block",
        "bg-gradient-radial",
        colorStyles[color],
        className
      )}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default MorphingShape;
