import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';

const data = [
  { name: 'Energy', value: 85, risk: 'high' },
  { name: 'Manufacturing', value: 65, risk: 'medium' },
  { name: 'Agriculture', value: 45, risk: 'low' },
  { name: 'Services', value: 25, risk: 'low' },
  { name: 'Real Estate', value: 55, risk: 'medium' },
];

const riskColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

const CarbonPortfolioChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedData(data);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={animatedData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(164 15% 24%)" opacity={0.3} horizontal={false} />
          <XAxis 
            type="number" 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="hsl(164 18% 72%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={75}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(165 10% 10%)', 
              border: '1px solid hsl(164 15% 24%)',
              borderRadius: '8px',
              color: 'hsl(160 10% 95%)'
            }}
            formatter={(value: number, _name, props) => [
              `${value}% Carbon Intensity`, 
              `Risk: ${props.payload.risk.charAt(0).toUpperCase() + props.payload.risk.slice(1)}`
            ]}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 8, 8, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {animatedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={riskColors[entry.risk as keyof typeof riskColors]}
                style={{
                  filter: 'drop-shadow(0 0 4px currentColor)',
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: riskColors.high }} />
          <span className="text-xs text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: riskColors.medium }} />
          <span className="text-xs text-muted-foreground">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: riskColors.low }} />
          <span className="text-xs text-muted-foreground">Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default CarbonPortfolioChart;
