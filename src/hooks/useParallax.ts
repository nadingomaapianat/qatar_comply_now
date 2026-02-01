import { useState, useEffect, useRef, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const updateOffset = useCallback(() => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    
    // Calculate offset based on element position relative to viewport center
    const rawOffset = (viewportCenter - elementCenter) * speed * 0.1;
    const finalOffset = direction === 'up' ? rawOffset : -rawOffset;
    
    setOffset(finalOffset);
    ticking.current = false;
  }, [speed, direction, disabled]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateOffset);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOffset();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateOffset]);

  return { ref, offset };
};

interface MouseParallaxOptions {
  strength?: number;
  disabled?: boolean;
}

export const useMouseParallax = (options: MouseParallaxOptions = {}) => {
  const { strength = 20, disabled = false } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      targetPosition.current = { x, y };
    };

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * 0.1,
        y: prev.y + (targetPosition.current.y - prev.y) * 0.1,
      }));
      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [strength, disabled]);

  return position;
};

export default useParallax;
