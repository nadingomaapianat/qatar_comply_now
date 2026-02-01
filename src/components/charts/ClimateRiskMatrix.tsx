import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface Sector {
  name: string;
  physicalRisk: 'low' | 'medium' | 'high';
  transitionRisk: 'low' | 'medium' | 'high';
  exposure: number;
}

const sectors: Sector[] = [
  { name: 'Oil & Gas', physicalRisk: 'medium', transitionRisk: 'high', exposure: 15 },
  { name: 'Renewables', physicalRisk: 'low', transitionRisk: 'low', exposure: 8 },
  { name: 'Manufacturing', physicalRisk: 'medium', transitionRisk: 'medium', exposure: 22 },
  { name: 'Agriculture', physicalRisk: 'high', transitionRisk: 'low', exposure: 12 },
  { name: 'Real Estate', physicalRisk: 'high', transitionRisk: 'medium', exposure: 18 },
  { name: 'Transport', physicalRisk: 'low', transitionRisk: 'high', exposure: 10 },
];

const riskLevelToPosition = {
  low: 0,
  medium: 1,
  high: 2,
};

const riskColors = {
  low: 'bg-emerald-500',
  medium: 'bg-amber-500',
  high: 'bg-red-500',
};

const ClimateRiskMatrix = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedSectors, setAnimatedSectors] = useState<boolean[]>(sectors.map(() => false));
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      sectors.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedSectors(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 200);
      });
    }
  }, [isVisible]);

  const getOverallRisk = (sector: Sector): 'low' | 'medium' | 'high' => {
    const physicalScore = riskLevelToPosition[sector.physicalRisk];
    const transitionScore = riskLevelToPosition[sector.transitionRisk];
    const avgScore = (physicalScore + transitionScore) / 2;
    if (avgScore < 0.7) return 'low';
    if (avgScore < 1.4) return 'medium';
    return 'high';
  };

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Matrix Grid */}
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-muted-foreground whitespace-nowrap">
          Physical Risk →
        </div>
        
        {/* X-axis label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
          Transition Risk →
        </div>

        <div className="ml-8">
          {/* Grid */}
          <div className="grid grid-cols-3 gap-1 aspect-square max-w-[400px] mx-auto">
            {[2, 1, 0].map(physicalLevel => (
              [0, 1, 2].map(transitionLevel => {
                const sectorsInCell = sectors.filter(
                  s => riskLevelToPosition[s.physicalRisk] === physicalLevel && 
                       riskLevelToPosition[s.transitionRisk] === transitionLevel
                );
                
                const cellRisk = physicalLevel + transitionLevel;
                const cellColor = cellRisk <= 1 ? 'bg-emerald-500/10' : 
                                  cellRisk <= 2 ? 'bg-amber-500/10' : 
                                  'bg-red-500/10';
                
                return (
                  <div 
                    key={`${physicalLevel}-${transitionLevel}`}
                    className={cn(
                      "rounded-lg p-2 flex flex-wrap gap-1 items-center justify-center min-h-[100px]",
                      cellColor
                    )}
                  >
                    {sectorsInCell.map((sector, idx) => {
                      const sectorIndex = sectors.indexOf(sector);
                      const isAnimated = animatedSectors[sectorIndex];
                      const isHovered = hoveredSector === sectorIndex;
                      
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "relative transition-all duration-500 cursor-pointer",
                            isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                            isHovered && 'z-10'
                          )}
                          onMouseEnter={() => setHoveredSector(sectorIndex)}
                          onMouseLeave={() => setHoveredSector(null)}
                        >
                          <div 
                            className={cn(
                              "rounded-full transition-all duration-300",
                              riskColors[getOverallRisk(sector)],
                              isHovered ? 'w-14 h-14 shadow-lg' : 'w-10 h-10'
                            )}
                            style={{
                              boxShadow: isHovered ? `0 0 20px currentColor` : 'none',
                            }}
                          />
                          
                          {/* Tooltip */}
                          <div className={cn(
                            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg text-xs whitespace-nowrap z-20 transition-all duration-200",
                            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                          )}>
                            <div className="font-semibold text-foreground">{sector.name}</div>
                            <div className="text-muted-foreground">Exposure: {sector.exposure}%</div>
                            <div className="text-muted-foreground">Physical: {sector.physicalRisk}</div>
                            <div className="text-muted-foreground">Transition: {sector.transitionRisk}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ))}
          </div>
          
          {/* Axis labels */}
          <div className="flex justify-between mt-2 px-4 text-xs text-muted-foreground max-w-[400px] mx-auto">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-8 text-xs text-muted-foreground">
          <span>High</span>
          <span>Medium</span>
          <span>Low</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        {sectors.map((sector, index) => (
          <div 
            key={index}
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-all duration-300",
              hoveredSector === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            )}
            onMouseEnter={() => setHoveredSector(index)}
            onMouseLeave={() => setHoveredSector(null)}
          >
            <div className={cn("w-3 h-3 rounded-full", riskColors[getOverallRisk(sector)])} />
            <span className="text-xs text-muted-foreground">{sector.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClimateRiskMatrix;
