import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface RiskCell {
  likelihood: number;
  impact: number;
  count: number;
  level: 'low' | 'medium' | 'high' | 'critical';
}

const riskData: RiskCell[] = [
  // Row 5 (Likelihood: Almost Certain)
  { likelihood: 5, impact: 1, count: 1, level: 'medium' },
  { likelihood: 5, impact: 2, count: 2, level: 'high' },
  { likelihood: 5, impact: 3, count: 0, level: 'high' },
  { likelihood: 5, impact: 4, count: 1, level: 'critical' },
  { likelihood: 5, impact: 5, count: 0, level: 'critical' },
  // Row 4 (Likelihood: Likely)
  { likelihood: 4, impact: 1, count: 2, level: 'low' },
  { likelihood: 4, impact: 2, count: 3, level: 'medium' },
  { likelihood: 4, impact: 3, count: 4, level: 'high' },
  { likelihood: 4, impact: 4, count: 2, level: 'high' },
  { likelihood: 4, impact: 5, count: 1, level: 'critical' },
  // Row 3 (Likelihood: Possible)
  { likelihood: 3, impact: 1, count: 3, level: 'low' },
  { likelihood: 3, impact: 2, count: 5, level: 'medium' },
  { likelihood: 3, impact: 3, count: 6, level: 'medium' },
  { likelihood: 3, impact: 4, count: 3, level: 'high' },
  { likelihood: 3, impact: 5, count: 2, level: 'high' },
  // Row 2 (Likelihood: Unlikely)
  { likelihood: 2, impact: 1, count: 4, level: 'low' },
  { likelihood: 2, impact: 2, count: 6, level: 'low' },
  { likelihood: 2, impact: 3, count: 4, level: 'medium' },
  { likelihood: 2, impact: 4, count: 2, level: 'medium' },
  { likelihood: 2, impact: 5, count: 1, level: 'high' },
  // Row 1 (Likelihood: Rare)
  { likelihood: 1, impact: 1, count: 5, level: 'low' },
  { likelihood: 1, impact: 2, count: 3, level: 'low' },
  { likelihood: 1, impact: 3, count: 2, level: 'low' },
  { likelihood: 1, impact: 4, count: 1, level: 'medium' },
  { likelihood: 1, impact: 5, count: 0, level: 'medium' },
];

const impactLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];

const levelColors = {
  low: 'bg-emerald-500/60 hover:bg-emerald-500/80',
  medium: 'bg-amber-500/60 hover:bg-amber-500/80',
  high: 'bg-orange-500/60 hover:bg-orange-500/80',
  critical: 'bg-red-500/60 hover:bg-red-500/80',
};

interface RiskHeatMapProps {
  className?: string;
}

const RiskHeatMap = ({ className }: RiskHeatMapProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedCells, setAnimatedCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isVisible) {
      riskData.forEach((cell, index) => {
        setTimeout(() => {
          setAnimatedCells(prev => new Set(prev).add(`${cell.likelihood}-${cell.impact}`));
        }, index * 30);
      });
    }
  }, [isVisible]);

  const getCellData = (likelihood: number, impact: number) => {
    return riskData.find(r => r.likelihood === likelihood && r.impact === impact);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      <div className="flex gap-2 sm:gap-4">
        {/* Y-axis label */}
        <div className="flex items-center justify-center w-4 sm:w-6">
          <span className="text-[8px] sm:text-xs font-medium text-muted-foreground -rotate-90 whitespace-nowrap">
            Likelihood →
          </span>
        </div>

        <div className="flex-1">
          {/* Grid */}
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1 mb-2">
            {[5, 4, 3, 2, 1].map((likelihood) => (
              [1, 2, 3, 4, 5].map((impact) => {
                const cell = getCellData(likelihood, impact);
                const isAnimated = animatedCells.has(`${likelihood}-${impact}`);
                
                return (
                  <div
                    key={`${likelihood}-${impact}`}
                    className={cn(
                      "aspect-square rounded sm:rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 cursor-pointer",
                      cell ? levelColors[cell.level] : 'bg-muted/30',
                      isAnimated ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    )}
                    style={{ transitionDelay: `${(5 - likelihood) * 50 + impact * 50}ms` }}
                    title={`Likelihood: ${likelihoodLabels[likelihood - 1]}, Impact: ${impactLabels[impact - 1]}`}
                  >
                    {cell && cell.count > 0 && (
                      <span className="text-white drop-shadow-md">{cell.count}</span>
                    )}
                  </div>
                );
              })
            ))}
          </div>

          {/* X-axis labels */}
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1 mt-1">
            {impactLabels.map((label, index) => (
              <div key={label} className="text-[7px] sm:text-[10px] text-muted-foreground text-center truncate px-0.5">
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          {/* X-axis title */}
          <div className="text-center mt-2">
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Impact →</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
        {[
          { level: 'low', label: 'Low' },
          { level: 'medium', label: 'Medium' },
          { level: 'high', label: 'High' },
          { level: 'critical', label: 'Critical' },
        ].map(({ level, label }) => (
          <div key={level} className="flex items-center gap-1 sm:gap-2">
            <div className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3 rounded", levelColors[level as keyof typeof levelColors])} />
            <span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskHeatMap;
