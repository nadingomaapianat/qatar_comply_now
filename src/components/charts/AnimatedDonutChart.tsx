import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const data = [
  { name: 'Compliant', value: 78 },
  { name: 'In Progress', value: 15 },
  { name: 'Pending', value: 7 },
];

const colors = [
  'hsl(152, 60%, 30%)',
  'hsl(159, 100%, 51%)',
  'hsl(164, 22%, 78%)',
];

const AnimatedDonutChart = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedData(data);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div ref={ref} className="w-full h-[280px] md:h-[320px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={animatedData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {animatedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(165 10% 10%)', 
              border: '1px solid hsl(164 15% 24%)',
              borderRadius: '8px',
              color: 'hsl(160 10% 95%)'
            }}
            formatter={(value: number) => [`${value}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <span className="text-3xl md:text-4xl font-bold text-foreground">{data[0].value}%</span>
          <p className="text-sm text-muted-foreground mt-1">Compliant</p>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedDonutChart;
