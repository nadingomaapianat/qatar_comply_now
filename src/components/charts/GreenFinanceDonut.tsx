import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Green Finance', value: 35, color: '#10b981' },
  { name: 'Sustainable', value: 20, color: '#3b82f6' },
  { name: 'Traditional', value: 45, color: '#6b7280' },
];

const GreenFinanceDonut = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Animate data in sequence
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData(prev => {
            const newData = [...prev];
            newData[index] = { ...item };
            return newData;
          });
        }, index * 300);
      });

      // Subtle rotation animation
      const rotationInterval = setInterval(() => {
        setRotation(prev => (prev + 0.2) % 360);
      }, 50);

      return () => clearInterval(rotationInterval);
    }
  }, [isVisible]);

  const totalGreen = data[0].value + data[1].value;

  return (
    <div ref={ref} className="w-full">
      <div className="h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="sustainableGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <Pie
              data={animatedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
              animationEasing="ease-out"
              startAngle={90 + rotation}
              endAngle={450 + rotation}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {animatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: hoveredIndex === index ? 'brightness(1.3) drop-shadow(0 0 10px currentColor)' : 'none',
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
              formatter={(value: number) => [`${value}%`, 'Portfolio Share']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-emerald-400">{totalGreen}%</span>
          <span className="text-xs text-muted-foreground">Sustainable</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
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

export default GreenFinanceDonut;
