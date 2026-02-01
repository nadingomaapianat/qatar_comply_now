import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FileSpreadsheet, LayoutDashboard, Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const BeforeAfterComparison = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [showAfter, setShowAfter] = useState(false);
  const [beforeHours, setBeforeHours] = useState(0);
  const [afterHours, setAfterHours] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Animate "Before" hours counting up
      const beforeDuration = 1000;
      const beforeStartTime = Date.now();
      const targetBefore = 40;
      
      const animateBefore = () => {
        const elapsed = Date.now() - beforeStartTime;
        const progress = Math.min(elapsed / beforeDuration, 1);
        setBeforeHours(Math.round(progress * targetBefore));
        
        if (progress < 1) {
          requestAnimationFrame(animateBefore);
        } else {
          // After "Before" animation completes, show "After" section
          setTimeout(() => {
            setShowAfter(true);
            
            // Animate "After" hours counting up
            const afterDuration = 800;
            const afterStartTime = Date.now();
            const targetAfter = 4;
            
            const animateAfter = () => {
              const elapsed = Date.now() - afterStartTime;
              const progress = Math.min(elapsed / afterDuration, 1);
              setAfterHours(Math.round(progress * targetAfter));
              
              if (progress < 1) {
                requestAnimationFrame(animateAfter);
              }
            };
            
            requestAnimationFrame(animateAfter);
          }, 300);
        }
      };
      
      setTimeout(() => requestAnimationFrame(animateBefore), 200);
    }
  }, [isVisible]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Section */}
        <div className={cn(
          "glass-card rounded-2xl p-6 border-2 border-red-500/30 bg-red-500/5 transition-all duration-500",
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-red-500/20">
              <FileSpreadsheet className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Before: Manual Process</h4>
              <p className="text-sm text-muted-foreground">Excel-based tracking</p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2 text-red-400">
              <Clock className="w-8 h-8" />
              <span className="text-5xl font-bold">{beforeHours}+</span>
              <span className="text-xl">hours</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">per audit cycle</p>
          </div>
          
          <ul className="space-y-3">
            {[
              "Manual evidence collection",
              "Email-based coordination",
              "Scattered documentation",
              "Risk of human error"
            ].map((item, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300",
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* After Section */}
        <div className={cn(
          "glass-card rounded-2xl p-6 border-2 border-emerald-500/30 bg-emerald-500/5 transition-all duration-500",
          showAfter ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        )}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <LayoutDashboard className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">After: comply.now</h4>
              <p className="text-sm text-muted-foreground">Automated dashboard</p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2 text-emerald-400">
              <Zap className="w-8 h-8" />
              <span className="text-5xl font-bold">{afterHours}</span>
              <span className="text-xl">hours</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">per audit cycle</p>
          </div>
          
          <ul className="space-y-3">
            {[
              "Automated evidence capture",
              "Real-time collaboration",
              "Centralized repository",
              "Audit-ready reports"
            ].map((item, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300",
                  showAfter ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Time Savings Indicator */}
      <div className={cn(
        "mt-6 text-center transition-all duration-500",
        showAfter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 border border-primary/30">
          <span className="text-2xl font-bold gradient-text">90%</span>
          <span className="text-sm text-muted-foreground">time reduction</span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
