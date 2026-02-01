import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface HeatMapCell {
  value: 'compliant' | 'partial' | 'non-compliant';
  tooltip?: string;
}

interface ControlHeatMapProps {
  rows?: string[];
  columns?: string[];
  data?: HeatMapCell[][];
}

const defaultRows = [
  "Control Environment",
  "Risk Assessment", 
  "Control Activities",
  "Info & Communication",
  "Monitoring"
];

const defaultColumns = [
  "Finance",
  "Operations",
  "IT",
  "Compliance",
  "Risk Mgmt"
];

const defaultData: HeatMapCell[][] = [
  [{ value: 'compliant' }, { value: 'compliant' }, { value: 'partial' }, { value: 'compliant' }, { value: 'compliant' }],
  [{ value: 'partial' }, { value: 'compliant' }, { value: 'partial' }, { value: 'partial' }, { value: 'compliant' }],
  [{ value: 'compliant' }, { value: 'partial' }, { value: 'compliant' }, { value: 'compliant' }, { value: 'partial' }],
  [{ value: 'partial' }, { value: 'non-compliant' }, { value: 'partial' }, { value: 'compliant' }, { value: 'partial' }],
  [{ value: 'non-compliant' }, { value: 'partial' }, { value: 'partial' }, { value: 'partial' }, { value: 'non-compliant' }]
];

const statusColors = {
  'compliant': 'bg-emerald-500/80 hover:bg-emerald-500',
  'partial': 'bg-amber-500/80 hover:bg-amber-500',
  'non-compliant': 'bg-red-500/80 hover:bg-red-500'
};

const statusLabels = {
  'compliant': 'Compliant',
  'partial': 'Partial',
  'non-compliant': 'Non-Compliant'
};

const ControlHeatMap = ({ 
  rows = defaultRows, 
  columns = defaultColumns, 
  data = defaultData 
}: ControlHeatMapProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [animatedCells, setAnimatedCells] = useState<boolean[][]>(
    data.map(row => row.map(() => false))
  );
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    if (isVisible) {
      data.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          setTimeout(() => {
            setAnimatedCells(prev => {
              const newState = prev.map(r => [...r]);
              newState[rowIndex][colIndex] = true;
              return newState;
            });
          }, (rowIndex * columns.length + colIndex) * 50);
        });
      });
    }
  }, [isVisible, data, columns.length]);

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Header row */}
        <div className="flex mb-2">
          <div className="w-32 flex-shrink-0" />
          {columns.map((col, index) => (
            <div 
              key={index} 
              className={cn(
                "flex-1 text-center text-xs font-medium text-muted-foreground px-1 transition-all duration-300",
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex mb-1">
            <div 
              className={cn(
                "w-32 flex-shrink-0 text-xs font-medium text-muted-foreground flex items-center pr-2 transition-all duration-300",
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${rowIndex * 100}ms` }}
            >
              {row}
            </div>
            {data[rowIndex]?.map((cell, colIndex) => (
              <div 
                key={colIndex} 
                className="flex-1 px-0.5"
              >
                <div
                  className={cn(
                    "h-10 rounded-md cursor-pointer transition-all duration-300 relative group",
                    statusColors[cell.value],
                    animatedCells[rowIndex]?.[colIndex] ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                    hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex && 'scale-110 z-10'
                  )}
                  onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {/* Tooltip */}
                  <div className={cn(
                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg text-xs whitespace-nowrap z-20 transition-all duration-200",
                    hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  )}>
                    <div className="font-medium text-foreground">{row}</div>
                    <div className="text-muted-foreground">{columns[colIndex]}</div>
                    <div className="mt-1 font-medium" style={{ color: cell.value === 'compliant' ? '#10b981' : cell.value === 'partial' ? '#f59e0b' : '#ef4444' }}>
                      {statusLabels[cell.value]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500" />
          <span className="text-xs text-muted-foreground">Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-xs text-muted-foreground">Non-Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default ControlHeatMap;
