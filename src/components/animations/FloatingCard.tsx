import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const FloatingCard = ({ children, className, delay = 0, hover = true }: FloatingCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative",
        className
      )}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={hover ? {
        y: -8,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      } : {}}
      style={{ perspective: 1000 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingCard;
