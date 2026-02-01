import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Database, Lock, Cpu, Share2, Archive, ArrowRight } from 'lucide-react';

const stages = [
  { icon: Database, label: 'Collection', color: 'text-blue-400 bg-blue-500/20' },
  { icon: Lock, label: 'Storage', color: 'text-emerald-400 bg-emerald-500/20' },
  { icon: Cpu, label: 'Processing', color: 'text-purple-400 bg-purple-500/20' },
  { icon: Share2, label: 'Sharing', color: 'text-amber-400 bg-amber-500/20' },
  { icon: Archive, label: 'Retention', color: 'text-primary bg-primary/20' },
];

const DataProcessingFlow = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [activeStage, setActiveStage] = useState(-1);
  const [particles, setParticles] = useState<{ id: number; position: number }[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Animate stages
      stages.forEach((_, index) => {
        setTimeout(() => setActiveStage(index), index * 300);
      });
      
      // Create flowing particles
      let particleId = 0;
      const interval = setInterval(() => {
        setParticles(prev => [...prev, { id: particleId++, position: 0 }]);
        
        // Clean up old particles
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== particleId - 1));
        }, 2000);
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full py-6 transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Desktop Flow */}
      <div className="hidden md:flex items-center justify-between relative">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index <= activeStage;
          
          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              {/* Stage Node */}
              <div 
                className={cn(
                  "flex flex-col items-center z-10 transition-all duration-500",
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer hover:scale-110",
                  stage.color,
                  isActive && index === activeStage && 'ring-2 ring-current ring-offset-2 ring-offset-background'
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="mt-3 text-sm font-medium text-foreground">{stage.label}</span>
              </div>
              
              {/* Connecting Arrow */}
              {index < stages.length - 1 && (
                <div className="flex-1 flex items-center justify-center mx-2 relative overflow-hidden">
                  <div className="w-full h-0.5 bg-muted/30 relative">
                    {/* Animated particles */}
                    {particles.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute w-2 h-2 rounded-full bg-primary animate-flow-particle"
                        style={{
                          animation: 'flowParticle 2s ease-out forwards',
                        }}
                      />
                    ))}
                  </div>
                  <ArrowRight className={cn(
                    "w-4 h-4 text-muted-foreground transition-all duration-500",
                    isActive ? 'opacity-100' : 'opacity-0'
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Flow */}
      <div className="md:hidden space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index <= activeStage;
          
          return (
            <div 
              key={index}
              className={cn(
                "flex items-center gap-4 transition-all duration-500",
                isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                stage.color
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">{stage.label}</span>
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes flowParticle {
          0% { left: 0; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DataProcessingFlow;
