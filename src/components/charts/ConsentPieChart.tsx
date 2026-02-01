import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Explicit Consent', value: 75, color: '#10b981' },
  { name: 'Implied Consent', value: 15, color: '#f59e0b' },
  { name: 'No Consent', value: 5, color: '#ef4444' },
  { name: 'Expired', value: 5, color: '#6b7280' },
];

const ConsentPieChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData(prev => {
            const newData = [...prev];
            newData[index] = { ...item };
            return newData;
          });
        }, index * 200);
      });
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full">
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={animatedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={hoveredIndex !== null ? 105 : 100}
              paddingAngle={2}
              dataKey="value"
              animationDuration={800}
              animationEasing="ease-out"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {animatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: hoveredIndex === index ? 'brightness(1.2) drop-shadow(0 0 8px currentColor)' : 'none',
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(165 10% 10%)', 
                border: '1px solid hsl(164 15% 24%)',
                borderRadius: '8px',
                color: 'hsl(160 10% 95%)'
              }}
              formatter={(value: number) => [`${value}%`, 'Percentage']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">
              {item.name}: <span className="font-medium text-foreground">{item.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsentPieChart;
