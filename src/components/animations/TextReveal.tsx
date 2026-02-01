import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

const TextReveal = ({ children, className, delay = 0, stagger = 0.03 }: TextRevealProps) => {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Gradient text reveal with shimmer effect
export const GradientTextReveal = ({ children, className, delay = 0 }: TextRevealProps) => {
  return (
    <motion.span
      className={cn(
        "relative inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]",
        className
      )}
      initial={{ opacity: 0, backgroundPosition: '200% center' }}
      whileInView={{ 
        opacity: 1, 
        backgroundPosition: '-200% center',
      }}
      viewport={{ once: true }}
      transition={{ 
        opacity: { duration: 0.5, delay },
        backgroundPosition: { duration: 3, delay: delay + 0.5, repeat: Infinity, ease: 'linear' }
      }}
    >
      {children}
    </motion.span>
  );
};

export default TextReveal;
